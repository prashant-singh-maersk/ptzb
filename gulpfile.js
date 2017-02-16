(function(r) {
    var gulp = r('gulp'),
        scss = r('gulp-sass'),
        rename = r('gulp-rename'),
        browserSync = require('browser-sync'),
        strip = r('gulp-strip-comments'),
        sprite = r('gulp.spritesmith'),
        requireJsOptimize = r('gulp-requirejs-optimize'),
        options = {
            config: 'scripts/config.js',
            exclude: ['underscore', 'jquery'],
            transitive: true
        },
        base = {
            src: 'src/',
            dist: 'static/',
            html: 'html/'
        },
        paths = {
            src: {
                sass: base.src + 'scss/**/*.scss',
                js: base.src + 'js/**/*.js',
                spriteImg: base.src + 'images/sprite/*.png'
            },
            dist: {
                css: base.dist + 'css',
                js: base.dist + 'js',
                spriteImg: base.dist + 'images/sprite'
            },
            html: base.html + '*.html',

            main: {
                sass: base.src + 'scss/main.scss',
                js: base.src + 'js/main.js',
            }

        };


    //tasks

    gulp.task('requirejsBuild', function() {
        return gulp.src(paths.main.js)
            .pipe(requireJsOptimize({
                baseUrl:'src/js',
                mainConfigFile:'./src/js/config.js'
                }))
            .pipe(gulp.dest(paths.dist.js)); // pipe it to the output DIR
    });


    gulp.task('sprite', function() {

        var spriteData = gulp.src(paths.src.spriteImg)
            .pipe(sprite({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: '../images/sprite/sprite.png'
            }));

        spriteData.img.pipe(gulp.dest(paths.dist.spriteImg));
        spriteData.css.pipe(gulp.dest(base.src + 'scss'));
        return spriteData;
    });

    gulp.task('css', ['sprite'], function() {
        return gulp.src(paths.main.sass)
            .pipe(scss({ errLogToConsole: true }))
            .pipe(gulp.dest(paths.dist.css))
            .pipe(strip.text())
            .pipe(scss({ outputStyle: 'compressed' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.dist.css));
    });

    gulp.task('js-watch', function(done) {
        browserSync.reload();
        done();
    });

    gulp.task('css-watch', ['css'], function(done) {
        browserSync.reload();
        done();
    });

    gulp.task('html-watch', function(done) {
        browserSync.reload();
        done();
    });
    gulp.task('sprite-watch', ['sprite'], function(done) {
        browserSync.reload();
        done();
    });

    gulp.task('all-watch', ['css-watch', 'html-watch', 'js-watch', 'sprite-watch']);

    gulp.task('default', ['css','requirejsBuild'], function() {
        browserSync.init(null, {
            server: {
                baseDir: "./",
                index: 'html/index.html'
            }
        });
        gulp.watch([paths.src.sass, paths.html, paths.src.js, paths.src.spriteImg], ['all-watch']);
    });

}(require));
