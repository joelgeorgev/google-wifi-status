# Google Wifi Status

[![CI](https://github.com/joelgeorgev/google-wifi-status/workflows/CI/badge.svg)](https://github.com/joelgeorgev/google-wifi-status/actions)

> A Node.js CLI app that displays status of your Google Wifi / OnHub router.

## Installation
```bash
$ npm install google-wifi-status -g
```

## Usage
```
$ google-wifi-status --help

  Usage: index [options]

  Options:

    -h, --help          output usage information
    -v, --swversion     Software Version
    -c, --checkupdate   Check for software update
    -u, --uptime        Total Uptime
    -g, --gip           Gateway IP
    -i, --ip            IP Address
    -d, --dns           DNS Servers
    -a, --all           All Stats

$ google-wifi-status -v
Software Version: 9334.41.3

$ google-wifi-status -c
Your Google Wifi is up to date.

$ google-wifi-status -u
Total Uptime: 11 hours 5 minutes 16 seconds
```

## License
MIT