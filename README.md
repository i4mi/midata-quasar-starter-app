# Midata Quasar Starter Application

A starter/demo application created with the Quasar CLI and UI Framework. It provides an introduction to web development and shows what MIDATA is and how to set up an application on the MIDATA test server. It also includes a small MIDATA application that showcases the OAuth 2.0 authentication process and implements basic functionality of the npm package [JSonFhir](https://www.npmjs.com/package/@i4mi/js-on-fhir).

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

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
