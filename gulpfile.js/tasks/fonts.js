import gulp from 'gulp';
import changed from 'gulp-changed';
import watch from 'gulp-watch';

/** ====================================================================================
    ====================================================================================
    COPY FONTS TO PUBLIC FOLDER
    ====================================================================================
    ==================================================================================== */

const config = {
  src: './example/src/fonts',
  dest: './example/public/fonts'
};

gulp.task('fonts', () => {
  const fonts = gulp.src(config.src)
    .pipe( changed(config.dest) ) // Ignore unchanged files
    .pipe( gulp.dest(config.dest) );
  return Promise.resolve(fonts)
    .then(() => {
      return watch(config.src, () => {
        gulp.start('fonts');
      });
    }).catch((err) => {
      console.log(err);
    });
});
