var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');
    jade = require('gulp-jade'),
    jadeconfig = require('./jade_config.js');

var paths = {
  jade: ['jade_config.js'],
  html: ['app/html/**/*.jade'],
  scripts: {
    coffee: ['app/scripts/**/*.coffee'],
    js: ['app/scripts/**/*.js']
  },
  styles:  ['app/styles/**/*.scss', 'app/styles/**/*.css'],
  images:  ['app/images/**/*']
};

gulp.task('jade', function () {
  // Compile jade to html
  return gulp.src(paths.html)
    .pipe(jade({locals: jadeconfig()}))
    .pipe(gulp.dest('dist/'))
    .on('error', gutil.log);
});

gulp.task('coffee', function() {
  // Compile Coffescript, minify and uglify JS
  return gulp.src(paths.scripts.coffee)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .on('error', gutil.log);
});

gulp.task('jshint', function() {
  // Minify and uglify JS
  return gulp.src(paths.scripts.js)
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .on('error', gutil.log);
});

gulp.task('styles', function () {
  // Compile Sass and minify it
  return gulp.src(paths.styles)
    .pipe(sass({style: 'compressed'}))
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/assets/css'))
    .on('error', gutil.log);
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(changed('dist/assets/img'))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/assets/img'))
    .on('error', gutil.log);
});

// Clean up the dist folder
gulp.task('clean', function () {
  return gulp.src(['dist/assets/js', 'dist/assets/css', 'dist/assets/img'], { read: false }).pipe(clean());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.html, ['jade']);
  gulp.watch(paths.scripts.coffee, ['coffee']);
  gulp.watch(paths.scripts.js, ['jshint']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['jade', 'coffee', 'jshint', 'styles', 'images']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
