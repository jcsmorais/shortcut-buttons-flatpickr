import * as path from 'path';
import * as webpack from 'webpack';

// tslint:disable-next-line:no-var-requires
const args = require('minimist')(process.argv.slice(2));

const isProduction = args && args.mode === 'production';
const filename = isProduction ? '[name].min.js' : '[name].js';

const config: webpack.Configuration = {
    devtool: isProduction ? 'source-map' : false,
    entry: {
        'shortcut-buttons-flatpickr': path.resolve('src/index.ts'),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                test: /\.ts?$/,
                use: 'tslint-loader',
            },
            {
                exclude: /node_modules/,
                test: /\.ts?$/,
                use: 'ts-loader',
            },
        ],
    },
    output: {
        filename,
        library: 'ShortcutButtonsPlugin',
        libraryExport: 'ShortcutButtonsPlugin',
        libraryTarget: 'umd',
        path: path.resolve('dist'),
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                },
            },
        }),
    ],
    resolve: {
        extensions: [
            '.ts',
        ],
    },
};

export default config;
