# Google Wifi Status
A Node.js CLI app that displays status of your Google Wifi router.

## Installation
```
npm install google-wifi-status -g
```

## Usage
```
Options:

    -h, --help       output usage information
    -v, --swversion  Software Version
    -u, --uptime     Total Uptime
    -g, --gip        Gateway IP
    -i, --ip         IP Address
    -d, --dns        DNS Servers
    -a, --all        Display all
```

## Example
```
google-wifi-status -v
// Software Version: 9334.41.3
```

```
google-wifi-status -u
// Total Uptime: 0 days, 14 hours, 18 minutes, 40 seconds
```

## License
MIT