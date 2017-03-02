(function(r) {
    var gulp = r('gulp'),
        scss = r('gulp-sass'),
        rename = r('gulp-rename'),
        browserSync = require('browser-sync'),
        strip = r('gulp-strip-comments'),
        sprite = r('gulp.spritesmith'),
        requireJsOptimize = r('gulp-requirejs-optimize'),
        imageop = r('gulp-imagemin'),
        cssBase64 = r('gulp-css-base64'),
        //gzip = r('gulp-gzip'),
        /*options = {
            config: 'scripts/config.js',
            exclude: ['underscore', 'jquery'],
            transitive: true
        },*/
        base = {
            src: 'src/',
            dist: 'static/',
            html: 'html/'
        },
        paths = {
            src: {
                sass: base.src + 'scss/**/*.scss',
                js: base.src + 'js/**/*.js',
                spriteImg: base.src + 'images/sprite/*.{png,jpg}',
                img: base.src + 'images/*.{jpg,png}'
            },
            dist: {
                css: base.dist + 'css',
                js: base.dist + 'js',
                spriteImg: base.dist + 'images/sprite',
                img: base.dist + 'images'
            },
            html: base.html + '*.html',

            main: {
                sass: base.src + 'scss/main.scss',
                js: base.src + 'js/main.js',
            }

        };


    //tasks
    gulp.task('base64', ['css'], function() {
        return gulp.src('static/css/main.css')
            .pipe(cssBase64({
                extensionsAllowed: ['.png', '.jpg']
            }))
            .pipe(gulp.dest(paths.dist.css + '/base'))
            .pipe(scss({ outputStyle: 'compressed' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.dist.css + '/base'));
    });

    gulp.task('js', function() {
        return gulp.src(paths.main.js)
            .pipe(requireJsOptimize({
                baseUrl: 'src/js',
                mainConfigFile: 'src/js/main.js',
                preserveLicenseComments: false
            }))
            /*.pipe(gulp.dest(paths.dist.js))
            .pipe(gzip({ append: false }))*/
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

    gulp.task('css',/* ['sprite'], */function() {
        return gulp.src(paths.main.sass)
            .pipe(scss({ errLogToConsole: true }))
            .pipe(gulp.dest(paths.dist.css))
            .pipe(strip.text())
            .pipe(scss({ outputStyle: 'compressed' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(paths.dist.css));
    });

    gulp.task('image-optimize', function() {
        gulp.src(paths.src.img)
            .pipe(imageop({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(paths.dist.img))
    });

    gulp.task('js-watch', ['js'], function(done) {
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
    gulp.task('default', ['css', 'js'], function() {
        browserSync.init(null, {
            server: {
                baseDir: "./",
                index: 'html/vendor-list.html'
            }
        });
        gulp.watch([paths.src.sass], ['css-watch']);
        gulp.watch([paths.html], ['html-watch']);
        gulp.watch([paths.src.js], ['js-watch']);
        //gulp.watch([paths.src.spriteImg], ['sprite-watch']);
    });

    gulp.task('build', ['css', 'js', 'image-optimize', 'base64']);

}(require));
