/**
 * Created by ой on 25.10.2015.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

gulp.task('styles', function () {
    gulp.src('public/css/style.less')
        .pipe(less())
        .pipe(gulp.dest('public/'))
});

gulp.task('build', function() {
    gulp.src('public/js/app.js')
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('watchJs', function () {
    watch(["public/js/**/*.js"], function() {
        gulp.start("build");
    });
});

gulp.task('watchLess', function () {
    watch(["public/css/*.less"], function() {
        gulp.start("styles");
    });
});


gulp.task('default',['build','styles','watchJs','watchLess']);