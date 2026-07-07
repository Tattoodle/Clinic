<?php
// Cloudflare traffic proxy for the Rathmines Doctors Clinic stats page.
// Holds the API token server-side (config.php, not in git), checks the page
// password, and returns simple JSON. Falls back to sample data if unconfigured.
header('Content-Type: application/json');
header('Cache-Control: no-store');

$cfg = @include __DIR__ . '/config.php';
if (!is_array($cfg)) $cfg = [];
$PASSWORD = $cfg['password'] ?? null;

// --- rate limiting (per client IP) to stop password guessing ---
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? ($_SERVER['REMOTE_ADDR'] ?? '0');
$rlFile = sys_get_temp_dir() . '/cfstats_rl_' . md5($ip) . '.json';
$rl = json_decode(@file_get_contents($rlFile), true) ?: ['fails' => 0, 'first' => 0, 'until' => 0];
$now = time();
if (($rl['until'] ?? 0) > $now) { http_response_code(429); echo json_encode(['error' => 'locked', 'retry' => $rl['until'] - $now]); exit; }
if (!empty($rl['first']) && $now - $rl['first'] > 900) $rl = ['fails' => 0, 'first' => 0, 'until' => 0]; // reset window after 15 min

// --- password gate (protects this endpoint too) ---
$pw = $_GET['pw'] ?? ($_SERVER['HTTP_X_STATS_PW'] ?? '');
if ($PASSWORD === null || !hash_equals((string)$PASSWORD, (string)$pw)) {
  if ($pw !== '') { // count only real guesses
    $rl['fails']++; if (empty($rl['first'])) $rl['first'] = $now;
    if ($rl['fails'] >= 5) { $rl['until'] = $now + 300; } // lock 5 min after 5 wrong tries
    @file_put_contents($rlFile, json_encode($rl));
  }
  http_response_code(401);
  echo json_encode(['error' => 'unauthorized']);
  exit;
}
if (is_file($rlFile)) @unlink($rlFile); // correct password clears the counter

$range = $_GET['range'] ?? '7';
$days  = $range === 'all' ? 365 : max(1, (int)$range);
$token = $cfg['token'] ?? '';
$zone  = $cfg['zone'] ?? '';

if (!$token || !$zone) { echo json_encode(sample($days) + ['demo' => true]); exit; }

// cache ~2 min (skip it when the page asks for a forced refresh)
$fresh = !empty($_GET['fresh']);
$cache = sys_get_temp_dir() . "/cfstats_{$zone}_{$range}.json";
if (!$fresh && is_file($cache) && time() - filemtime($cache) < 120) { echo file_get_contents($cache); exit; }

$since = gmdate('Y-m-d', time() - $days * 86400);
$q = 'query{viewer{zones(filter:{zoneTag:"'.$zone.'"}){httpRequests1dGroups(limit:400,orderBy:[date_ASC],filter:{date_geq:"'.$since.'"}){dimensions{date}sum{pageViews threats}uniq{uniques}}}}}';
$res = cf($token, $q);
$groups = $res['data']['viewer']['zones'][0]['httpRequests1dGroups'] ?? null;

if (!is_array($groups) || !count($groups)) { echo json_encode(sample($days) + ['demo' => true, 'note' => 'api_unavailable']); exit; }

$series = []; $visitors = 0; $pageviews = 0; $threats = 0; $bv = -1; $bd = null;
foreach ($groups as $g) {
  $u = (int)($g['uniq']['uniques'] ?? 0);
  $series[] = ['date' => $g['dimensions']['date'], 'value' => $u];
  $visitors += $u;
  $pageviews += (int)($g['sum']['pageViews'] ?? 0);
  $threats  += (int)($g['sum']['threats'] ?? 0);
  if ($u > $bv) { $bv = $u; $bd = $g['dimensions']['date']; }
}

$out = json_encode([
  'visitors' => $visitors, 'pageviews' => $pageviews, 'threats' => $threats,
  'busiest'  => $bd ? date('l', strtotime($bd)) : '—',
  'series'   => $series,
  'topPages' => topPages($token, $zone, $days),
  'live' => true,
]);
@file_put_contents($cache, $out);
echo $out;

// ---------- helpers ----------
function cf($token, $query) {
  $ch = curl_init('https://api.cloudflare.com/client/v4/graphql');
  curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => 1, CURLOPT_POST => 1, CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => ["Authorization: Bearer $token", "Content-Type: application/json"],
    CURLOPT_POSTFIELDS => json_encode(['query' => $query])]);
  $r = curl_exec($ch); curl_close($ch);
  return json_decode($r, true) ?: [];
}

function topPages($token, $zone, $days) {
  $since = gmdate('Y-m-d\TH:i:s\Z', time() - 82800); // adaptive dataset capped at 1 day on this plan
  $q = 'query{viewer{zones(filter:{zoneTag:"'.$zone.'"}){httpRequestsAdaptiveGroups(limit:30,orderBy:[count_DESC],filter:{datetime_geq:"'.$since.'",requestSource:"eyeball"}){count dimensions{clientRequestPath}}}}}';
  $rows = cf($token, $q)['data']['viewer']['zones'][0]['httpRequestsAdaptiveGroups'] ?? [];
  $label = ['/'=>'Home','/services'=>'Services','/doctor'=>'Meet the Doctor','/contact'=>'Contact & Hours','/privacy'=>'Privacy'];
  $out = [];
  foreach ($rows as $r) {
    $p = rtrim($r['dimensions']['clientRequestPath'] ?? '/', '/'); if ($p === '') $p = '/';
    if (strpos($p, '/assets') === 0 || strpos($p, '.') !== false) continue; // skip files
    if ($p !== '/' && preg_match('#^/(dev|stats|old)#', $p)) continue;       // skip internal areas
    $out[] = ['name' => $label[$p] ?? $p, 'v' => (int)$r['count']];
    if (count($out) >= 5) break;
  }
  return $out;
}

function sample($days) {
  $series = []; $base = $days <= 7 ? 42 : ($days <= 30 ? 38 : 34); $v = 0; $pv = 0;
  for ($i = $days - 1; $i >= 0; $i--) {
    $val = max(4, (int)round($base + sin($i / 2) * 10 + (rand(0, 14) - 7)));
    $series[] = ['date' => gmdate('Y-m-d', time() - $i * 86400), 'value' => $val];
    $v += $val;
  }
  $pv = (int)round($v * 2.4);
  return ['visitors'=>$v,'pageviews'=>$pv,'threats'=>(int)round($v*0.35),'busiest'=>'Monday','series'=>$series,
    'topPages'=>[['name'=>'Home','v'=>(int)round($pv*.34)],['name'=>'Services','v'=>(int)round($pv*.24)],['name'=>'Contact & Hours','v'=>(int)round($pv*.2)],['name'=>'Meet the Doctor','v'=>(int)round($pv*.14)]]];
}
