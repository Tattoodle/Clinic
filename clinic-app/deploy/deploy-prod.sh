#!/usr/bin/env bash
# Build the new React site for PRODUCTION and deploy it to the live root.
# Usage:  ./deploy/deploy-prod.sh
# Note: overwrites index.html + assets at the web root. Old static-site files
# (css/ js/ imgs/ default.php) are left in place — remove them separately after
# the first go-live (they're backed up in /old and in the repo's live-site/).
set -euo pipefail

HOST="u835103123@89.117.169.48"
PORT="65002"
KEY="$HOME/.ssh/id_ed25519_hostinger"
ROOT="domains/drclinicdublin.com/public_html"

cd "$(dirname "$0")/.."

echo "→ Building production (base=/) ..."
DEPLOY_BASE=/ npm run build
cp deploy/prod.htaccess dist/.htaccess

echo "→ Deploying to live root ($ROOT) ..."
( cd dist && COPYFILE_DISABLE=1 tar czf - . ) \
  | ssh -i "$KEY" -p "$PORT" -o IdentitiesOnly=yes "$HOST" \
      "tar xzf - -C $ROOT && find $ROOT -maxdepth 2 -name '._*' -delete 2>/dev/null; echo deployed"

echo "✓ Live → https://www.drclinicdublin.com/"
