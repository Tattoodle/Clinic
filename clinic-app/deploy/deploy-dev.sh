#!/usr/bin/env bash
# Build the new React site for the /dev staging area and deploy it to Hostinger.
# Live root (drclinicdublin.com) is never touched — only public_html/dev.
#
# Usage:  ./deploy/deploy-dev.sh
# Needs:  ~/.ssh/id_ed25519_hostinger (the deploy key added to Hostinger).
set -euo pipefail

HOST="u835103123@89.117.169.48"
PORT="65002"
KEY="$HOME/.ssh/id_ed25519_hostinger"
REMOTE_DIR="domains/drclinicdublin.com/public_html/dev"

# repo's clinic-app/ dir (this script lives in clinic-app/deploy/)
cd "$(dirname "$0")/.."

echo "→ Building (base=/dev/) ..."
DEPLOY_BASE=/dev/ npm run build

echo "→ Adding /dev .htaccess + noindex ..."
cp deploy/dev.htaccess dist/.htaccess
# staging build should not be indexed (header in .htaccess does this too)
sed -i '' 's/content="index, follow"/content="noindex, nofollow"/' dist/index.html 2>/dev/null \
  || sed -i 's/content="index, follow"/content="noindex, nofollow"/' dist/index.html

echo "→ Deploying to $REMOTE_DIR ..."
( cd dist && COPYFILE_DISABLE=1 tar czf - . ) \
  | ssh -i "$KEY" -p "$PORT" -o IdentitiesOnly=yes "$HOST" \
      "mkdir -p $REMOTE_DIR && tar xzf - -C $REMOTE_DIR && find $REMOTE_DIR -name '._*' -delete"

echo "✓ Done → https://www.drclinicdublin.com/dev/"
