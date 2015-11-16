'use strict';
/** ====================================================================================
    ====================================================================================
    COPY AND MINIFY IMAGES (PNG, JPEG, SVG, ETC) FROM ASSETS TO PUBLIC 
    ====================================================================================
    ==================================================================================== */
import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';

const config = {
    src:'./assets/01-Config/images',
    dest: './public/images'
}

gulp.task('images', () => {
    let images =  gulp.src(config.src)
        .pipe( changed(config.dest)) // Ignore unchanged files
        .pipe( imagemin()) // Optimize
        .pipe( gulp.dest(config.dest))
    return Promise.resolve(images)
    .then(() => {
        return watch(config.src, () => {
            gulp.start('images');
        });
    }).catch((err) => {
        console.log(err);
    });
});
