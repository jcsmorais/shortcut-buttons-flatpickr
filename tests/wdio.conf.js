const path = require('path');

exports.config = {
    capabilities: [{
        browserName: 'chrome',
    }],
    mochaOpts: {
        compilers: [
            'ts:ts-node/register',
        ],
    },
    reporters: [
        'spec',
    ],
    screenshotPath: path.join(__dirname, '/screenshots'),
    specs: [
        path.join(__dirname, '/functional/**/*.test.ts'),
    ],
};
