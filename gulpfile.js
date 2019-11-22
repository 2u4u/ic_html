'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    replace = require('gulp-replace'),
    cssmin = require('gulp-clean-css'),
    browserSync = require("browser-sync").create();
// rimraf = require('rimraf'),
// reload = browserSync.reload;
// watch = require('gulp-watch'),

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        img: 'build/images/',
        // js: 'build/js/',
        // fonts: 'build/fonts/',
        // opencartcss: "opencart/css"
    },
    src: {
        html: 'src/[^_]*.html',
        style: 'src/scss/[^_]*.scss',
        css: 'src/scss/*.css',
        img: 'src/images/*.{jpg,jpeg,png}',
        // js: 'src/js/*.js',
        //         svg: 'src/images/*.svg',
        // fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/scss/**/*.{scss,css}',
        css: 'src/scss/*.css',
        img: 'src/images/*.*',
        // js: 'src/js/**/*.js',
        // fonts: 'src/fonts/*.*',
    },
    //     clean: './build'
};

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
    browserSync.watch('build', browserSync.reload)
})

gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// gulp.task('opencart', function () {
//     return gulp.src(path.src.style)
//         .pipe(replace('../images/', '/image/catalog/'))
//         .pipe(sass())
//         .pipe(prefixer({
//             browsers: ['last 4 versions']
//         }))
//         .pipe(cssmin())
//         .pipe(gulp.dest(path.build.opencartcss))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });


gulp.task('sass', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('image', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// gulp.task('js', function () {
//     return gulp.src(path.src.js)
//         // .pipe(sourcemaps.init())
//         .pipe(uglify())
//         // .pipe(sourcemaps.write())
//         .pipe(gulp.dest(path.build.js))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });


// gulp.task('fonts', function () {
//     return gulp.src(path.src.fonts)
//         .pipe(gulp.dest(path.build.fonts))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

gulp.task('css', function () {
    return gulp.src(path.src.css)
        .pipe(cssmin())
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", function () {
    gulp.watch([path.watch.html], gulp.series('html'));
    // gulp.watch([path.watch.js], gulp.series('js'));
    gulp.watch([path.watch.style], gulp.series('sass'));
    // gulp.watch([path.watch.style], gulp.series('opencart'));
    gulp.watch([path.watch.css], gulp.series('css'));
    // gulp.watch([path.watch.fonts], gulp.series('fonts'));
    gulp.watch([path.watch.img], gulp.series('image'));
});

gulp.task('default', gulp.series(
    gulp.parallel(
        'html',
        'sass',
        // 'js',
        // 'fonts',
        'css',
        // 'opencart'
        'image',
    ),
    // 'watch',
    gulp.parallel(
        'watch',
        'serve'
    )
));

// gulp.task('build', gulp.parallel(
//     'html:build',
//     'js:build',
//     'style:build',
//     'fonts:build',
//     'image:build',
//     'copy:css'
// ));

