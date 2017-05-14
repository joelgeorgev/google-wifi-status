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
            console.log('Google Wifi Stats:', stats);
        });
    }

    const request = http.request(options, callback);

    request.on('error', function () {
        console.log('Your Google Wifi is offline.');
    });

    request.end();
}

program
    .option('-v, --version', 'Software Version')
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