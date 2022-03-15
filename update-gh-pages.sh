#!/usr/bin/env bash

set -eu

# setup variables for script
repo_uri="https://github.com/drewjosh/midata-quasar-starter-app"
remote_name="origin"
main_branch="main"
target_branch="gh-pages"
build_dir="dist"

# set git config
git config --global user.name "$GITHUB_ACTOR"
git config --global user.email "${GITHUB_ACTOR}@bots.github.com"
git config --global init.defaultBranch "$main_branch"

# install dependencies
npm i --no-progress

# build app
npm run build

# move app content one folder to be directly in dist
cp -r dist/spa/* dist
rm -r dist/spa

# change to gh-pages branch and rebase
git checkout "$target_branch"
git rebase "${remote_name}/${main_branch}"

# remove unnecessary files
rm -r node_modules
cp -r -f dist/* ./
rm -r dist
ls -la

# add files to commit
git add -A

# commit
git commit -m "updated GitHub Pages"
if [ $? -ne 0 ]; then
    echo "nothing to commit"
    exit 0
fi

# set remote url and push!
git remote add origin "$repo_uri"
git remote set-url "$remote_name" "$repo_uri"
git push --force-with-lease "$remote_name" "$target_branch"
