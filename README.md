# Google Wifi Status
A Node.js CLI app that displays status of your Google Wifi router.

## Installation
```bash
$ npm install google-wifi-status -g
```

## Usage
```bash
$ google-wifi-status --help

  Usage: index [options]

  Options:

    -h, --help       output usage information
    -v, --swversion  Software Version
    -u, --uptime     Total Uptime
    -g, --gip        Gateway IP
    -i, --ip         IP Address
    -d, --dns        DNS Servers
    -a, --all        All Stats
```

## Example
```bash
$ google-wifi-status -v
Software Version: 9334.41.3
```

```bash
$ google-wifi-status -u
Total Uptime: 0 days, 11 hours, 05 minutes, 16 seconds
```

## License
MIT