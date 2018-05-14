const spawn = require('child_process').spawn,
    gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    gulpif = require('gulp-if'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence'),
    del = require('del');

gulp.task('build', ['copyToBuildDir'], () => {
    return gulp.src('build/*.html')
        .pipe(usemin({
            js: [uglify, rev],
            css: [rev]
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('deploy', cb => {
    gulpSequence('build', 'upload', 'clean', cb);
});

gulp.task('upload', cb => {
    spawn('./node_modules/.bin/shipit', ['development', 'deploy:development'])
        .stdout
        .on('data', buf => console.log(buf.toString()))
        .on('end', cb);
});

gulp.task('clean', () => del('build'));

gulp.task('copyToBuildDir', () => {
    return gulp.src(['**/*', '*', '!node_modules/**/*'])
        .pipe(gulp.dest('build'));
});