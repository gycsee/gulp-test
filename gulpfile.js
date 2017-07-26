'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var src = {
  sass: './sass/*.scss',
  css: './css',
  dist: './dist'
}

gulp.task('compass', function() {
  return gulp.src(src.sass)
    .pipe(plugins.compass({
      http_path: '/',
      css: 'css',
      sass: 'sass',
      image: 'img',
      relative: true,
      style: 'compact'
    }))
    .pipe(plugins.autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1'
      ],
      cascade: false
    }))
    .pipe(gulp.dest(src.css))
    // .pipe(plugins.minifyCss())
    // .pipe(plugins.rename({
    //   suffix: '.min'
    // }))
    // .pipe(gulp.dest(src.dist));
});

gulp.task('compass:watch', function() {
  gulp.watch(src.sass, ['compass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running task "compass"');
    });
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: ['./'],
    port: 8080,
    livereload: true,
  });
});

gulp.task('connect-reload', function() {
  gulp.src('./*.html')
    .pipe(plugins.connect.reload());
});

gulp.task('connect:watch', ['connect'], function() {
  gulp.watch(['./*.html', './css/*.css'], ['connect-reload'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running task "connect-reload"');
    });
});


gulp.task('default', ['connect:watch', 'compass:watch']);
