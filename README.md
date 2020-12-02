# Notify release to Slack

GitHub Actions Trigger

```
on:
  release:
    types: [published]
```

## setup

```
nodenv install 12.20.0
npm i -g npm
npm i -g yarn
npm i -g @vercel/ncc
yarn add @actions/core @actions/github
```

## build

```
ncc build index.js --license licenses.txt
```
