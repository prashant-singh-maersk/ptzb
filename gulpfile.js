(function(r) {
    var gulp = r('gulp'),
        scss = r('gulp-sass'),
        rename = r('gulp-rename'),
        browserSync = require('browser-sync'),
        strip = r('gulp-strip-comments'),
        base = {
            src: 'src/',
            dist: 'static/',
            html: 'html/'
        },
        paths = {
            src: {
                sass: base.src + 'scss/**/*.scss',
                js:base.src + 'js/**/*.js'
            },
            dist: {
                css: base.dist + 'css',
                js:base.dist + 'js'
            },
            html: base.html + '*.html',
            main:{
                sass:base.src + 'scss/main.scss',
                js:base.src + 'js/main.js'
            }

        };


    //tasks

    gulp.task('css', function() {
        return gulp.src(paths.main.sass)
            .pipe(scss({ errLogToConsole: true }))
            .pipe(gulp.dest(paths.dist.css))
            .pipe(strip.text())
            .pipe(scss({ outputStyle: 'compressed' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.dist.css));
    });

    gulp.task('js-watch',function(done){
        browserSync.reload();
        done();
    })

    gulp.task('css-watch', ['css'], function(done) {
        browserSync.reload();
        done();
    });

    gulp.task('html-watch', function(done) {
        browserSync.reload();
        done();
    });

    gulp.task('all-watch',['css-watch','html-watch','js-watch']);

    gulp.task('default', ['css'], function() {
        browserSync.init(null, {
            server: {
                baseDir: "./",
                index:'html/index.html'
            }
        });
        gulp.watch([paths.src.sass,paths.html,paths.src.js], ['all-watch']);
    });

}(require));
