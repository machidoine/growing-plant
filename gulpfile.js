let gulp = require('gulp');
let gutil = require('gulp-util');
let sass = require('gulp-sass');
let coffee = require('gulp-coffee');
let concat = require('gulp-concat');
let ts = require('gulp-typescript');

gulp.task('sass', function() {
  gulp.src('src/client/scss/growing-plant.scss')
  .pipe(sass({style: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('client/css'))
});


gulp.task('ts', function() {
    return gulp.src('src/client/inventory/ts/**/*.ts')
        .pipe(ts({noImplicitAny: true, target:'ES6', module:'amd'}).on('error', gutil.log))
        .pipe(gulp.dest('src/client/inventory'));
});

gulp.task('watch',function(){
	gulp.watch('src/client/scss/**/*.scss', ['sass']);
    gulp.watch('src/client/**/*.ts', ['ts']);

});

gulp.task('default',['sass', 'ts', 'watch']);
