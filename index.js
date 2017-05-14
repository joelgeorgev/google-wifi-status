#!/usr/bin/env node

'use strict';

const program = require('commander');

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