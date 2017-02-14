var gulp = require('gulp'),
sass = require('gulp-sass'),
connect = require('gulp-connect');

var autoHtml = 'project/cayh-dzyl/*.html';
var autoCss = 'project/cayh-dzyl/css/*.css'

gulp.task('testSass', function() {
    return gulp.src('src/sass/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
});

// gulp.task('default', ['testSass']);

gulp.task('html', function() {
    gulp.src(autoHtml)
    .pipe(connect.reload())
})

gulp.task('css', function() {
    gulp.src(autoCss)
    .pipe(connect.reload())
})

gulp.task('localServe', function() {
    connect.server({
        livereload: true,
        port: 2333
    });
})

gulp.task('watch', function () {
    gulp.watch(autoHtml, ['html']);
    gulp.watch(autoCss, ['css']);
});

gulp.task('default', ['html', 'css', 'watch', 'localServe']);









// gulp.task('js', function () {
// 16
// 17     gulp.src(jsSrc)
// 18         .pipe(concat('main.js'))
// 19         .pipe(gulp.dest(jsDist))
// 20         .pipe(rename({suffix: '.min'}))
// 21         .pipe(uglify())
// 22         .pipe(gulp.dest(jsDist))
// 23         .pipe(connect.reload())
// 24
// 25 });
// 26
// 27 //定义html任务
// 28 gulp.task('html', function () {
// 29
// 30     gulp.src(htmlSrc)
// 31         .pipe(gulp.dest(htmlDist))
// 32         .pipe(connect.reload());
// 33
// 34 });
// 35
// 36 //定义livereload任务
// 37 gulp.task('connect', function () {
// 38     connect.server({
// 39         livereload: true
// 40     });
// 41 });
// 42
// 43
// 44 //定义看守任务
// 45 gulp.task('watch', function () {
// 46
// 47     gulp.watch('src/*.html', ['html']);
// 48
// 49     gulp.watch('src/js/*.js', ['js']);
// 50
// 51 });
// 52
// 53
// 54 //定义默认任务
// 55 gulp.task('default', [ 'js', 'html','watch', 'connect']);
