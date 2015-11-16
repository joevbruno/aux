/** ====================================================================================
    ====================================================================================
    COPY HTML PUBLIC (AND MINIFIY IF SO DESIRED)
    ====================================================================================
    ==================================================================================== */
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import watch from 'gulp-watch';
import debug from 'gulp-debug';

const config = {
  src: ['./example/src/*.html', './example/src/**/**.html' ],
  dest: './example/public'
};

gulp.task('html', () => {
  const html = gulp.src(config.src)
  .pipe( debug() )
  .pipe( htmlmin({collapseWhitespace: false}) )
  .pipe( gulp.dest(config.dest) );
  return Promise.resolve(html)
    .then(() => {
      return watch(config.src, () => {
        gulp.start('html');
      });
    }).catch((err) => {
      console.log(err);
    });
});
