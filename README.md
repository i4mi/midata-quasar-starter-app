# Midata Quasar Starter Template

This is the Starter-Template of the demo application. It is based on the starter/demo application (main fork), but now it only contains the components required to start a project with MIDATA. The idea is to use this fork as a starting point and then copying the components
from the other forks if required for your use-case.

The starter-template provides an introduction to what MIDATA is and how to set up an application on the MIDATA test server. It also includes a small MIDATA application that showcases the OAuth 2.0 authentication process and implements basic functionality of the npm package [JSonFhir](https://www.npmjs.com/package/@i4mi/js-on-fhir).

This starter/demo application is aimed at students and interested parties who are planning to develop a web application with MIDATA. It should give a first insight into the subjects.

## Setup
Node and npm have to be installed on your machine. The nodejs package includes both node and npm executables.

### Node
- #### Node installation on Windows

  Go to the [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm with apt install, using the following commands.

```bash
sudo apt install nodejs
sudo apt install npm
```

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.
```bash
node --version
v14.17.5

npm --version
7.24.2
```

If you need to update `npm`, you can update using `npm`.
```bash
npm install npm -g
```

### Repository
To download the repo from github, use `git clone https://github.com/i4mi/midata-quasar-starter-app.git` in your terminal.

### Install the dependencies
Then change the directory with `cd midata-quasar-starter-app` and install the dependencies.
```bash
npm i
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
Make sure that port 8080 isn't already in use. You need to be running the webapp on http://localhost:8080, otherwise the MIDATA demo won't work (due to OAuth2 redirect url mismatch).
```bash
npx quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
npx quasar build
```

### Automatic deployment to GitHub Pages
The production build of the app can be deployed automatically to the GitHub Pages by using the GitHub Actions.
A workflow is already implemented, it just needs a few settings. You can also adjust it to your own needs (for example linting on development branch).

After correct setup, the workflow deploys the app when you push to a branch **main**. When you use **master** see the corresponding setting below. When changes are detected the workflow pushes the generated build files to a branch **gh-pages**. There the files are picked up by a GitHub-internal job and published to a public, repository specific domain. For this repository it is: https://i4mi.github.io/midata-quasar-starter-app/

#### Check publicPath
When the app is served in a subdirectory (bla.com/pizza/ instead of bla.com), which is the case for the GitHub Pages, you need to set the variable **publicPath** in **quasar.conf.js** to the name of the subdirectory (corresponds to your repository name).
For this app the production **publicPath** is "/midata-quasar-starter-app/".

#### Redirect URL for Midata
The MIDATA service needs to know the URL where to redirect the user after successful login.
This can be configured in **quasar.conf.js** with the **VUE_FHIR_REDIRECT_URL** variable (second entry).
Make sure it also includes "/#/midata/demo" and it is registered as **redirect URI** in the MIDATA app declaration.

#### Enable GitHub Pages
1. If it doesn't exist yet, push a new branch to your repository called **gh-pages**
2. Open repository settings > Pages
3. Select Source: gh-pages, /root -> Save

#### Check default branch
Make sure the name of your default branch is listed as trigger in the workflow file. Currently it uses the branch **main** to trigger the **build_and_deploy** job.
The workflow file is located here: **root/.github/workflows/main.yml**
Note: Depending on your ssh token permissions you may only be able to edit files in this location via browser.

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

