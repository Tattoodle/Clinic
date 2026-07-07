<?php
// Copy this file to config.php on the server and fill in the values.
// config.php is git-ignored so the token never lands in the repo.
return [
  // Cloudflare API token with "Analytics -> Read" on the zone.
  'token' => 'PASTE_CLOUDFLARE_TOKEN_HERE',
  // Zone ID (Cloudflare dashboard -> the domain -> Overview -> API -> Zone ID).
  'zone' => '7cce2499abdf96409a2ce10670156887',
  // Password for the stats page gate.
  'password' => 'CHANGE_ME',
];
