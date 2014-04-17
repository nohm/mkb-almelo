var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');

var paths = {
  scripts: {
    coffee: ['app/scripts/**/*.coffee'],
    js: ['app/scripts/**/*.js']
  },
  styles:  ['app/styles/**/*.scss', 'app/styles/**/*.css'],
  images:  ['app/images/**/*']
};

gulp.task('coffee', function() {
  // Compile Coffescript, minify and uglify JS
  return gulp.src(paths.scripts.coffee)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('jshint', function() {
  // Minify and uglify JS
  return gulp.src(paths.scripts.js)
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(sass({style: 'compressed'}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images'));
});

// Clean up the dist folder
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], { read: false }).pipe(clean());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts.coffee, ['coffee']);
  gulp.watch(paths.scripts.js, ['jshint']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['coffee', 'jshint', 'styles', 'images']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
