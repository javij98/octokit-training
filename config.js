const dotenv = require('dotenv')
dotenv.config()

const github_token = process.env.GITHUB_TOKEN

module.exports = github_token
