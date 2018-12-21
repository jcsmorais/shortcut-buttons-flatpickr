import * as path from 'path';
import * as webpack from 'webpack';

// tslint:disable:no-var-requires
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const args = require('minimist')(process.argv.slice(2));
// tslint:enable:no-var-requires

const isProduction = args && args.mode === 'production';
const filename = isProduction ? '[name].min.css' : '[name].css';
const plugins = [
    new ExtractTextPlugin({ filename }),
];

const optimization = isProduction ? {
    minimizer: [
        new OptimizeCssAssetsPlugin(),
    ],
} : {};

const config: webpack.Configuration = {
    entry: {
        airbnb: path.resolve('src/style/themes/airbnb.styl'),
        confetti: path.resolve('src/style/themes/confetti.styl'),
        dark: path.resolve('src/style/themes/dark.styl'),
        light: path.resolve('src/style/themes/light.styl'),
        material_blue: path.resolve('src/style/themes/material_blue.styl'),
        material_green: path.resolve('src/style/themes/material_green.styl'),
        material_orange: path.resolve('src/style/themes/material_orange.styl'),
        material_red: path.resolve('src/style/themes/material_red.styl'),
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer'),
                                ],
                            },
                        },
                        'stylus-loader',
                    ],
                }),
            },
        ],
    },
    optimization,
    output: {
        filename,
        path: path.resolve('dist/themes'),
    },
    plugins,
};

export default config;
