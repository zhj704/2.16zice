/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-02-16 09:07:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-16 10:14:29
 */
var gulp = require('gulp');
var scss = require("gulp-sass");
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require("gulp-webserver");

//编译sass
gulp.task('comscss', function() {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(scss())
            .pipe(gulp.dest('./src/css'))
    })
    //压缩css
gulp.task('zipsass', function() {
    return gulp.src("./src/css/**/*.css")
        .pipe(mincss())
        .pipe(gulp.dest('./build/css'))
})

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
    //开启服务
gulp.task("opserver", function() {
    return gulp.src('src')
        .pipe(server({
            host: "169.254.149.0",
            port: 3030,
            livereload: true
        }))
})