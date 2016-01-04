var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer'); 

gulp.task('browserify', function() {
    browserify({
        entries: ['./public/main.js'],
        debug: true, // Enable sourcemapping
    })
    .transform(babelify, {presets: ['react']}) // Convert JSX to normal JS
    .bundle() // Create the bundled file
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['browserify']);