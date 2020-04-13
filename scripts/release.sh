#!/bin/sh -e

if [ -z "$VERSION" ]; then
    echo "required env variable VERSION is not set"
    exit 1
fi

node <<EOF
const fs = require('fs');

const pkgJson = require('./package.json');
pkgJson.version = "${VERSION}";

fs.writeFileSync('./package.json', JSON.stringify(pkgJson, null, 4));
EOF

sed "s/%VERSION%/${VERSION}/" docs/version-badge.template.svg > docs/static/img/version-badge.svg

yarn build

git add -u
git commit -m "Release v${VERSION}"
git tag -s -m "release" "v${VERSION}"

git push
git push --tags
