var gulp = require('gulp');
var print = require('gulp-print');
var babel = require('gulp-babel');

gulp.task('compile', function() {
    return gulp.src('lib/*.js')
        .pipe(print())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build'));
});