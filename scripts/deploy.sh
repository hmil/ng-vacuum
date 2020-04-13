#!/bin/sh

if [ -z "$REPO_ROOT" ]; then
    echo "Required environment variable REPO_ROOT is not set!"
    exit 1
fi

git fetch --tags

if [ -z $(git tag --contains HEAD) ]; then
    echo "Skipping release because this is not a tagged commit"
    exit 0
fi

echo "=== Configuring credentials"
git config --global user.name "${GH_NAME}"
git config --global user.email "${GH_EMAIL}"
echo "machine github.com login ${GH_NAME} password ${GH_TOKEN}" > ~/.netrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > "${HOME}/.npmrc"

echo "=== Deploying npm module"
cd "$REPO_ROOT/dist"
npm publish

echo "=== Deploying docs"
cd "$REPO_ROOT/docs"
yarn
GIT_USER="${GH_NAME}" yarn deploy
