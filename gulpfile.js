var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');


gulp.task('build', function () {
  return gulp.src('src/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', function(cb){
  return gulp.src(['dist/*.js', '!dist/*.min.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['build', 'minify'], function () {
    gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
