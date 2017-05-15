#!/usr/bin/env node

'use strict';

const http = require('http');
const program = require('commander');
const chalk = require('chalk');
const text = chalk.blue;
const error = chalk.red;
const log = console.log;

const getStatus = function () {

    const options = {
        host: 'onhub.here',
        path: '/api/v1/status'
    };

    const callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            const status = JSON.parse(str);

            const getFormattedTime = function (seconds) {
                var minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
                var hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
                var days = Math.floor(hours / 24);
                hours = hours % 24;
                return days + ' days, ' +
                    hours + ' hours, ' +
                    minutes + ' minutes, ' +
                    seconds + ' seconds';
            }

            if (program.swversion) { log(text('Software Version:', status.software.softwareVersion)); }
            if (program.uptime) { log(text('Total Uptime:', getFormattedTime(status.system.uptime))); }
            if (program.gip) { log(text('Gateway IP:', status.wan.gatewayIpAddress)); }
            if (program.ip) { log(text('IP Address:', status.wan.localIpAddress)); }
            if (program.dns) { log(text('DNS Servers:', status.wan.nameServers)); }
            if (program.all) {
                log(text('\nSoftware:\n'));
                log(text('Software Version:', status.software.softwareVersion));
                log(text('Update Channel:', status.software.updateChannel));
                log(text('Latest Software Version:', status.software.updateNewVersion));
                log(text('Update Required:', status.software.updateRequired));
                log(text('\nSystem:\n'));
                log(text('Country Code:', status.system.countryCode.toUpperCase()));
                log(text('Device ID:', status.system.deviceId));
                log(text('Hardware ID:', status.system.hardwareId));
                log(text('Total Uptime:', getFormattedTime(status.system.uptime)));
                log(text('\nWAN:\n'));
                log(text('Gateway IP:', status.wan.gatewayIpAddress));
                log(text('IP Method:', status.wan.ipMethod.toUpperCase()));
                log(text('IP Address:', status.wan.localIpAddress));
                log(text('DNS Servers:', status.wan.nameServers));
            }
        });
    }

    const request = http.request(options, callback);

    request.on('error', function () {
        log(error('Your Google Wifi is offline.'));
    });

    request.end();
}

program
    .option('-v, --swversion', 'Software Version')
    .option('-u, --uptime', 'Total Uptime')
    .option('-g, --gip', 'Gateway IP')
    .option('-i, --ip', 'IP Address')
    .option('-d, --dns', 'DNS Servers')
    .option('-a, --all', 'All Stats')
    .parse(process.argv);

// If no option passed, show help
if (!process.argv.slice(2).length) {
    program.help();
}

getStatus();