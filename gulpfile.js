/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-02-16 09:07:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-16 10:29:37
 */
var gulp = require('gulp');
var scss = require("gulp-sass");
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require("gulp-webserver");
var concat = require("gulp-concat");
//编译sass
gulp.task('comscss', function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
})

//开启服务
gulp.task("opserver", function() {
    return gulp.src('src')
        .pipe(server({
            host: "169.254.149.0",
            port: 3030,
            livereload: true
        }))
})

//压缩css
gulp.task('zipsass', function() {
    return gulp.src("./src/css/**/*.css")
        .pipe(mincss())
        .pipe(gulp.dest('./build/css'))
})

//合并js
gulp.task('scripts', function() {
    return gulp.src('./src/script/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/js'));
});

//压缩js
gulp.task('zipjs', function() {
    return gulp.src("./src/script/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('./build/script'))
})

//启用监听
gulp.task("auto", function() {
    return gulp.watch("./src", gulp.series('comscss', "zipsass", "zipjs"))
})

gulp.task('build', gulp.parallel('zipsass', "zipjs"))