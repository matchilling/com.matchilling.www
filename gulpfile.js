'use strict';

let babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    concatJson = require('gulp-concat-json'),
    fs = require('fs'),
    gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    jade = require('gulp-jade'),
    minifyHtml = require('gulp-html-minifier'),
    path = require('path'),
    pgp = fs.readFileSync('./node_modules/com-matchilling-pgp-public/mathiasschilling-pub-sub.asc').toString(),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps');

const CNAME = 'www.matchilling.com';
const DISTRIBUTION = 'dist';
const PACKAGE = require('./package.json');
const PATH = {
    font: ['./resource/font/web/**/*'],
    img: ['./resource/image/**/*'],
    js: ['./client/**/*.js'],
    template: ['./resource/view/**/*.jade'],
    scss: ['./resource/scss/*.scss']
};

let dist = function(subpath) {
    return !subpath ? DISTRIBUTION : path.join(DISTRIBUTION, subpath);
};

// Build then deploy to GitHub pages gh-pages branch
gulp.task('build-deploy-gh-pages', function(callback) {
    runSequence('dist', 'deploy-gh-pages', callback);
});

// Deploy to GitHub pages gh-pages branch
gulp.task('deploy-gh-pages', function() {
    return gulp.src(dist('**/*')).pipe(
        ghPages({
            remoteUrl: PACKAGE.repository.url,
            silent: false,
            branch: 'gh-pages'
        }));
});

gulp.task('default', ['dist', 'watch']);

gulp.task('dist', ['dist-client-js', 'dist-css', 'dist-html'], function() {
    gulp.src(PATH.img).pipe(gulp.dest(dist('assets/image')));
    gulp.src(PATH.font).pipe(gulp.dest(dist('assets/font')));
    fs.writeFile(dist('CNAME'), CNAME, 'utf-8');
});

gulp.task('dist-client-js', function() {
    browserify({
            entries: './client/js/app.js',
            debug: true
        })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(dist('assets')));
});

gulp.task('dist-css', function() {
    gulp.src(PATH.scss)
        .pipe(sourcemaps.init({
            loadMaps: false
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(dist('assets/css')));
});

gulp.task('dist-html', function() {
    gulp.src('./resource/view/index.jade')
        .pipe(jade({
            locals: {
                config: {
                    baseUrl: 'https://www.matchilling.com',
                    domain: 'matchilling.com',
                    googleAnalyticsId: 'UA-80325806-1'
                },
                author: {
                    name: PACKAGE.author.name,
                    email: PACKAGE.author.email,
                    pgp: pgp.replace('Version: GnuPG v1', 'Version: GnuPG v1\nEmail: ' + PACKAGE.author.email)
                }
            }
        }))
        .pipe(minifyHtml({
            collapseWhitespace: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(dist()));
});

gulp.task('watch', ['dist'], function() {
    browserSync.init({
        server: {
            baseDir: dist()
        }
    });

    gulp.watch(PATH.js, ['dist-client-js']).on('change', reload);
    gulp.watch(PATH.scss, ['dist-css']).on('change', reload);
    gulp.watch(PATH.template, ['dist-html']).on('change', reload);
});
