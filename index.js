const fetch = require('node-fetch')
const CORS = require('micro-cors')()

module.exports = CORS(async () => {
    const request = await fetch('https://api.github.com/orgs/zeit/members')
    const data = await request.json()
  
    return data
  })