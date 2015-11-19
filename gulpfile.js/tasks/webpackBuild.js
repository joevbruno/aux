import gutil from 'gulp-util';
import webpack from 'webpack';
import gulp from 'gulp';
import config from './webpack';

gulp.task('webpack', (callback) => {
  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    callback();
  });
});
