var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('./lib/ImageUploader.js', { debug: true })
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./lib'))
});

gulp.task('watch', function() {
  gulp.watch('./*.jsx', ['browserify'])
});

gulp.task('default', ['browserify']);
