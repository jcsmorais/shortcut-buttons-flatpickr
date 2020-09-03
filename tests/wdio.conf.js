const path = require('path');

exports.config = {
    capabilities: [{
        browserName: 'chrome',
    }],
    framework: 'mocha',
    logLevel: 'error',
    mochaOpts: {
        compilers: [
            'ts-node/register',
        ],
        ui: 'bdd',
    },
    reporters: [
        'spec',
    ],
    runner: 'local',
    screenshotPath: path.join(__dirname, '/screenshots'),
    services: ['chromedriver'],
    specs: [
        path.join(__dirname, '/functional/**/*.test.ts'),
    ],
};
