var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var riot = require('gulp-riot');

gulp.task('clean', function() {
    return gulp.src('docs/')
        .pipe(clean());
}); 

gulp.task('index', function() {
    return gulp.src('index-dev.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('docs/'));
});

gulp.task('css', function() {
    return gulp.src([
            'node_modules/spectre.css/docs/spectre.min.css',
            'node_modules/spectre.css/docs/spectre-icons.min.css',
            'css/style.css'
        ])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/css'));
});

gulp.task('libs', function() {
    return gulp.src([
            'node_modules/riot/riot.min.js',
            'node_modules/riot-route/docs/route.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('docs/js'));
});

gulp.task('scripts', function() {
    return gulp.src([
            'js/**'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('docs/js'));
});

gulp.task('tags', function() {
    return gulp.src(['tags/**'])
        .pipe(riot())
        .pipe(uglify({mangle: false}))
        //.pipe(concat('tags.min.js'))
        .pipe(gulp.dest('docs/tags'));
});

gulp.task('data', function() {
    return gulp.src(['data/**'])
        .pipe(gulp.dest('docs/data'));
});

gulp.task('service-works', function() {
    return gulp.src(['sw.js'])
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('docs/'));
});

gulp.task('manifest', function() {
    return gulp.src(['manifest.json'])        
        .pipe(gulp.dest('docs'));
});

gulp.task('img', function() {
    return gulp.src(['img/**'])
        .pipe(gulp.dest('docs/img'));
});

var build = gulp.series('clean', gulp.parallel('index', 'libs', 'scripts', 'css', 'tags', 'data', 'service-works', 'img', 'manifest'));
gulp.task('default', build);


gulp.task('watch', function(){
    gulp.watch('tags/**', gulp.series('tags'));
});