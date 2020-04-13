#!/bin/sh

echo "=== Deploying npm module"
pushd dist
npm publish
popd

echo "=== Deploying docs"
pushd docs
yarn
GIT_USER=hmil yarn deploy
popd