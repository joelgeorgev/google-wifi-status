#!/usr/bin/env node

'use strict';

const http = require('http');
const program = require('commander');

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

            if (program.swversion) { console.log('Software Version:', stats.software.softwareVersion); }
            if (program.uptime) { console.log('Total Uptime:', stats.system.uptime); }
            if (program.gip) { console.log('Gateway IP:', stats.wan.gatewayIpAddress); }
            if (program.ip) { console.log('IP Address:', stats.wan.localIpAddress); }
            if (program.dns) { console.log('DNS Servers:', stats.wan.nameServers); }
            if (program.all) {
                console.log('Software Version:', stats.software.softwareVersion);
                console.log('Total Uptime:', stats.system.uptime);
                console.log('Gateway IP:', stats.wan.gatewayIpAddress);
                console.log('IP Address:', stats.wan.localIpAddress);
                console.log('DNS Servers:', stats.wan.nameServers);
            }
        });
    }

    const request = http.request(options, callback);

    request.on('error', function () {
        console.log('Your Google Wifi is offline.');
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