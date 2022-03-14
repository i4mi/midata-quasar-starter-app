#!/usr/bin/env bash

set -eu

repo_uri="https://github.com/drewjosh/midata-quasar-starter-app"
remote_name="origin"
main_branch="master"
target_branch="gh-pages"
build_dir="dist"

git config --global user.name "$GITHUB_ACTOR"
git config --global user.email "${GITHUB_ACTOR}@bots.github.com"

npm i --no-progress

npm run build

cp -r dist/spa/* dist
rm -r dist/spa

git checkout "$target_branch"
git rebase "${remote_name}/${main_branch}"

rm -r node_modules
cp -r -f dist/* ./
rm -r dist
ls -la

git add -A

git commit -m "updated GitHub Pages"
if [ $? -ne 0 ]; then
    echo "nothing to commit"
    exit 0
fi

git remote set-url "$remote_name" "$repo_uri"
git push --force-with-lease "$remote_name" "$target_branch"
