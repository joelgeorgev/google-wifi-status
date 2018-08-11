import test from 'ava'
import childProcess from 'child_process'

import api from './api.js'

test.cb('--all', t => {
  // For Windows
  const cp = childProcess.spawn('node ./index.js --all', { shell: true })
  cp.on('error', t.ifError)
  cp.on('close', code => {
    t.is(code, 0)
    t.end()
  })
})

test.cb('-vcugid', t => {
  // For Windows
  const cp = childProcess.spawn('node ./index.js -vugid', { shell: true })
  cp.on('error', t.ifError)
  cp.on('close', code => {
    t.is(code, 0)
    t.end()
  })
})

test.cb('no options passed', t => {
  // For Windows
  const cp = childProcess.spawn('node ./index.js', { shell: true })
  cp.on('error', t.ifError)
  cp.on('close', code => {
    t.is(code, 0)
    t.end()
  })
})

test('api call', async t => {
  try {
    const status = await api
    t.true(status.wan.online)
  } catch (err) {
    t.is(err, 'Your Google Wifi is offline.')
  }
})