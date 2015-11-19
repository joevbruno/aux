/** ====================================================================================
    ====================================================================================
    SASS TASK: HANDLES CORE AND HANDLES EACH FILE IN COMPONENTS INDIVIDUALLY
    ====================================================================================
    ==================================================================================== */
import docs from 'sassdoc';
import gulp from 'gulp';
import sass from 'gulp-sass';
import minify from 'gulp-minify-css';
import maps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import size from 'gulp-size';
import rename from 'gulp-rename';
import notify from '../util/notify';
import debug from 'gulp-debug';
import check from 'gulp-if';
import gutil from 'gulp-util';
import path from 'path';
import postcss from 'gulp-postcss';
import foreach from 'gulp-foreach';
import lost from 'lost';
import browserSync from 'browser-sync';

/* =========== SASS TASK BEGINS HERE =============== */

// Setup
const config = {
  sass: { outputStyle: 'compact', errLogToConsole: true },
  production: !!gutil.env.production,
  paths: {
    coreSrc: ['./example/src/styles/main.scss'],
    coreDest: './example/public/css',
  },
  docs: {
    publish: false,
    dest: 'docs', // Folder name
    verbose: true
  },
  processors: [
    autoprefixer({browsers: ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10']}),
    lost()
  ]
};

const getSassy = (srcPath, destPath) => {
  return gulp.src( srcPath, { base: process.cwd() } )
    .pipe( debug())
    .pipe( config.docs.publish ? docs(config.docs).on('error', notify.error) : gutil.noop() )
    .pipe( maps.init() )
    .pipe( sass(config.sass) ).on( 'error', notify.error )
    .pipe( maps.write() )
    .pipe( check(['*.css', '!*.map'], postcss(config.processors)) )
    .pipe( size() ) // outputs files size
    .pipe( config.production ? minify() : gutil.noop() )
    .pipe( config.production ? size() : gutil.noop() )
    .pipe( rename( (filePath) => {
      filePath.basename = config.production ? filePath.basename + '.min' : filePath.basename;
      return filePath;
    }) )
    .pipe( debug())
    .pipe( gulp.dest(destPath) )
    .pipe( browserSync.stream() );
};


// Task action
gulp.task('sass', () => {
  const core = getSassy(config.paths.coreSrc, config.paths.coreDest);
  gulp.watch(config.paths.coreSrc, ['sass']);
  return Promise.resolve(core).then(() => {
    console.log('finished sass');
  }).catch( (err) => {
    console.log(err);
  });
});
