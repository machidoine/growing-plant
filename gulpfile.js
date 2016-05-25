var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('client/scss/growing-plant.scss')
  .pipe(sass({style: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('client/css'))
});

gulp.task('watch',function(){
	gulp.watch('client/scss/**/*.scss', ['sass']);
})

gulp.task('default',['sass', 'watch']);