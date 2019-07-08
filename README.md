# Sho.co Gatsby + Netlify CMS + Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/244ca93c-f74c-48ca-bcf6-6c06bd5c12bb/deploy-status)](https://app.netlify.com/sites/cocky-pasteur-b020e9/deploys)


## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ npm i
$ npm start
```
### Access Staging Build Locally
```
#Make sure you have the dependencies installed
$ npm build
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```
### Coding Standard Packages
ESLint Instruction how to install 

1. npm install -g eslint
2. eslint-plugin-react@latest @eslint@latest

Reference:LINK:https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint