const core = require('@actions/core')
const github = require('@actions/github')
const fetch = require('node-fetch')

async function getReleaseMessage(GITHUB_REPOSITORY, GITHUB_REF, githubToken) {
  const repos = GITHUB_REPOSITORY.split('/')
  const owner = repos[0]
  const repo = repos[1]
  const octokit = github.getOctokit(githubToken)

  const data = await octokit.repos.getRelease({
    owner,
    repo,
    GITHUB_REF,
  })

  console.log(data)
  return data
}

async function sendMessage(slackWebhookUrl, text) {
  const response = await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(text)
  })

  return response
}

function run() {
  try {
    const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY']
    if (!GITHUB_REPOSITORY) {
      throw new Error('Missing environment GITHUB_REPOSITORY')
    }
    const GITHUB_REF = process.env['GITHUB_REF']
    if (!GITHUB_REF) {
      throw new Error('Missing environment GITHUB_REF')
    }

    const githubToken = core.getInput('githubToken')
    const slackWebhookUrl = core.getInput('slackWebhookUrl')

    const text = getReleaseMessage(GITHUB_REPOSITORY, GITHUB_REF, githubToken)
    const response = sendMessage(slackWebhookUrl, text)

    core.setOutput('response', response)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
