# Notify release to Slack

GitHub Actions Trigger

```
name: "Notify release to Slack"
on:
  release:
    types: [published]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - run: |
        echo "${{ github.event.release.tag_name }}"
        echo "${{ github.event.release.name }}"
        echo "${{ github.event.release.body }}"
    - name: get message and post to slack
      uses: actions/notify-release-to-slack@v1.0
      with:
        slackWebhookUrl: ${{ secrets.SLACK_WEBHOOK_URL }}
        releaseMessage: ${{ github.event.release.body }}
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
