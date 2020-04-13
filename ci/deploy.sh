#!/bin/sh

echo "=== Configuring credentials"
git config --global user.name "${GH_NAME}"
git config --global user.email "${GH_EMAIL}"
echo "machine github.com login ${GH_NAME} password ${GH_TOKEN}" > ~/.netrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

echo "=== Deploying npm module"
pushd dist
npm publish
popd

echo "=== Deploying docs"
pushd docs
yarn
GIT_USER="${GH_NAME}" yarn deploy
popd
