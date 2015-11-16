/** ====================================================================================
    ====================================================================================
    RUNS ON 'GULP' COMMAND IN TERMINAL
    ====================================================================================
    ==================================================================================== */
import gulp from 'gulp';

gulp.task('default', () => {
  gulp.start(['fonts', 'images', 'html', 'sass', 'browserSync']);
});