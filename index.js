#!/usr/bin/env node

'use strict';

const http = require('http');
const program = require('commander');
const chalk = require('chalk');
const blue = chalk.blue;
const red = chalk.red;
const log = console.log;

const getStats = function () {

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
            const stats = JSON.parse(str);

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

            if (program.swversion) { log(blue('Software Version:', stats.software.softwareVersion)); }
            if (program.uptime) { log(blue('Total Uptime:', getFormattedTime(stats.system.uptime))); }
            if (program.gip) { log(blue('Gateway IP:', stats.wan.gatewayIpAddress)); }
            if (program.ip) { log(blue('IP Address:', stats.wan.localIpAddress)); }
            if (program.dns) { log(blue('DNS Servers:', stats.wan.nameServers)); }
            if (program.all) {
                log(blue('Software Version:', stats.software.softwareVersion));
                log(blue('Total Uptime:', getFormattedTime(stats.system.uptime)));
                log(blue('Gateway IP:', stats.wan.gatewayIpAddress));
                log(blue('IP Address:', stats.wan.localIpAddress));
                log(blue('DNS Servers:', stats.wan.nameServers));
            }
        });
    }

    const request = http.request(options, callback);

    request.on('error', function () {
        log(red('Your Google Wifi is offline.'));
    });

    request.end();
}

program
    .option('-v, --swversion', 'Software Version')
    .option('-u, --uptime', 'Total Uptime')
    .option('-g, --gip', 'Gateway IP')
    .option('-i, --ip', 'IP Address')
    .option('-d, --dns', 'DNS Servers')
    .option('-a, --all', 'Display all stats')
    .parse(process.argv);

// If no option passed, show help
if (!process.argv.slice(2).length) {
    program.help();
}

getStats();