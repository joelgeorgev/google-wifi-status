#!/usr/bin/env node

'use strict'

const program = require('commander')
const ora = require('ora')
const cliSpinners = require('cli-spinners')
const chalk = require('chalk')
const prettyMs = require('pretty-ms')

const api = require('./api')

const text = chalk.cyan
const error = chalk.red
const log = console.log

program
  .option('-v, --swversion', 'Software Version')
  .option('-c, --checkupdate', 'Check for software update')
  .option('-u, --uptime', 'Total Uptime')
  .option('-g, --gip', 'Gateway IP')
  .option('-i, --ip', 'IP Address')
  .option('-d, --dns', 'DNS Servers')
  .option('-a, --all', 'All Stats')
  .parse(process.argv)

// If no option passed, show help
if (!process.argv.slice(2).length) {
  program.help()
}

const spinner = ora({
  text: 'Connecting',
  spinner: cliSpinners.dots3
}).start()

api
  .then(status => {
    spinner.stop()
    if (program.swversion) { log(text('Software Version:', status.software.softwareVersion)) }
    if (program.checkupdate) {
      status.software.updateRequired ? log(text(status.software.updateNewVersion + ' update is available.')) :
        log(text('Your Google Wifi is up to date.'))
    }
    if (program.uptime) { log(text('Total Uptime:', prettyMs(status.system.uptime * 1000, { verbose: true }))) }
    if (program.gip) { log(text('Gateway IP:', status.wan.gatewayIpAddress)) }
    if (program.ip) { log(text('IP Address:', status.wan.localIpAddress)) }
    if (program.dns) { log(text('DNS Servers:', status.wan.nameServers)) }
    if (program.all) {
      log(text('\nSoftware:\n'))
      log(text('Software Version:', status.software.softwareVersion))
      log(text('Update Channel:', status.software.updateChannel))
      const updateRequired = status.software.updateRequired
      if (updateRequired) {
        log(text('Latest Software Version:', status.software.updateNewVersion))
      }
      log(text('Update Required:', updateRequired))
      log(text('\nSystem:\n'))
      log(text('Country Code:', status.system.countryCode.toUpperCase()))
      log(text('Device ID:', status.system.deviceId))
      log(text('Hardware ID:', status.system.hardwareId))
      log(text('Total Uptime:', prettyMs(status.system.uptime * 1000, { verbose: true })))
      log(text('\nWAN:\n'))
      log(text('Gateway IP:', status.wan.gatewayIpAddress))
      log(text('IP Method:', status.wan.ipMethod.toUpperCase()))
      log(text('IP Address:', status.wan.localIpAddress))
      log(text('DNS Servers:', status.wan.nameServers))
    }
  })
  .catch(err => {
    spinner.stop()
    log(error(err))
  })