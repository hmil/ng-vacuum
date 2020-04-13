#!/bin/sh

echo "=== Deploying npm module"
cd dist
npm publish

echo "=== Deploying docs"
pushd docs
yarn
GIT_USER=hmil yarn deploy

