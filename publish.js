const https = require('https')
const { username, password } = require('./credentials')

const data = {
  branch: 'default',
  modules: {
      main: 'require("hello");',
      hello: 'console.log("Hello World!");'
  }
}

const req = https.request({
	hostname: 'screeps.com',
	port: 443,
	path: '/api/user/code',
	method: 'POST',
	auth: `${username}:${password}`,
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
})

req.write(JSON.stringify(data))
req.end()
