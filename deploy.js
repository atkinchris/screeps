const https = require('https')
const fs = require('fs')
const { username, password } = require('./credentials')

const bundle = fs.readFileSync('./bundle.js', 'utf8')
const data = {
  branch: 'simulation',
  modules: {
    main: bundle,
  },
}

const req = https.request({
  hostname: 'screeps.com',
  port: 443,
  path: '/api/user/code',
  method: 'POST',
  auth: `${username}:${password}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

req.write(JSON.stringify(data))
req.end()
