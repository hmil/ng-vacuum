#!/bin/sh

if [ -z "$REPO_ROOT" ]; then
    echo "Required environment variable REPO_ROOT is not set!"
    exit 1
fi

echo "=== Configuring credentials"
git config --global user.name "${GH_NAME}"
git config --global user.email "${GH_EMAIL}"
echo "machine github.com login ${GH_NAME} password ${GH_TOKEN}" > ~/.netrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "$REPO_ROOT/.npmrc"

echo "=== Deploying npm module"
cd "$REPO_ROOT/dist"
npm publish

echo "=== Deploying docs"
cd "$REPO_ROOT/docs"
yarn
GIT_USER="${GH_NAME}" yarn deploy
