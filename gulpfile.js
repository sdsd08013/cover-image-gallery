var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('./lib/ImageUploader.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./lib'))
});

gulp.task('watch', function() {
  gulp.watch('./*.jsx', ['browserify'])
});

gulp.task('default', ['browserify', 'watch']);
