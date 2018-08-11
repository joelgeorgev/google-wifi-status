'use strict'

const http = require('http')

module.exports = new Promise((resolve, reject) => {
  const options = {
    host: 'onhub.here',
    path: '/api/v1/status'
  }

  const request = http.request(options, response => {
    let str = ''
    response.on('data', (chunk => { str += chunk }))
    response.on('end', (() => { resolve(JSON.parse(str)) }))
  })
  request.on('error', (() => { reject('Your Google Wifi is offline.') }))
  request.end()
})