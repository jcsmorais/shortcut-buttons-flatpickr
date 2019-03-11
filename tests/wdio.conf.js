const path = require('path');

exports.config = {
    capabilities: [{
        browserName: 'chrome',
        maxInstances: 1,
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
    services: ['selenium-standalone'],
    specs: [
        path.join(__dirname, '/functional/**/*.test.ts'),
    ],
};
