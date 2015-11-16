'use strict';

/** ====================================================================================
    ====================================================================================
    BROWSERSYNC + WEBPACK HOT RELOADING = LIVE INJECT HTML, JS, CSS (NO PAGE REFRESH)
    ====================================================================================
    ==================================================================================== */

import browserSync from 'browser-sync';
import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from './webpack';
import gutil from 'gulp-util';
import connect from 'connect-logger';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleWare from 'http-proxy-middleware';

gulp.task('browserSync', () => {
    let bundler = webpack(webpackConfig);

    browserSync({
        server: {
            baseDir: './example/public',
            middleware: [
                function (req, res, next) {
                    console.log('Hi from middleware');
                    next();
                },
                connect(), // log HTTP connections (GET, POST) to terminal
                webpackHotMiddleware(bundler), // live inject JS
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    noInfo: false,
                    quiet: false,
                    stats: { colors: true }
                }),
            ]
        },
        plugins: [
            {
                module: 'bs-html-injector', // live inject html
                options: { files: ['example/public/*.html'] }
            }
        ]
    });
});
