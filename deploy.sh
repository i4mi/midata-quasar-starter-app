#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# move generated files out of spa folder as children of dist
cp -r dist/spa/* dist
rm -r dist/spa

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

cd dist
git init
git branch -m main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:drewjosh/midata-quasar-starter-app.git gh-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
