var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('sass', function() {
  gulp.src('client/scss/growing-plant.scss')
  .pipe(sass({style: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('client/css'))
});

gulp.task('coffee', function() {
  gulp.src('client/coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(concat('growing-plant.app.js'))
    .pipe(gulp.dest('client/js'));
});

gulp.task('watch',function(){
	gulp.watch('client/scss/**/*.scss', ['sass']);
})

gulp.task('default',['sass', 'coffee', 'watch']);