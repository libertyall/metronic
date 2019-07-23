let gulp = require('gulp');
let yargs = require('yargs');
let build = require('./build');
let func = require('./helpers');
let rename = require('gulp-rename');
let rtlcss = require('gulp-rtlcss');
let glob = require('glob');
let fs = require('fs');
let pretty = require('pretty');
let sass = require('gulp-sass');
let merge = require('merge-stream');
let del = require('del');

// merge with default parameters
let args = Object.assign({
    prod: false,
    rtl: '',
    exclude: '',
    theme: '',
    path: '',
}, yargs.argv);

if (args.prod !== false) {
    // force disable debug for production
    build.config.debug = false;
    build.config.compile = Object.assign(build.config.compile, {
        'jsUglify': true,
        'cssMinify': true,
        'jsSourcemaps': false,
        'cssSourcemaps': false,
    });
}

if (args.rtl !== '') {
    build.config.compile.rtl.enabled = (args.rtl === 'true');
}

gulp.task('rtl', function (cb) {
    let streams = [];
    let stream = null;
    func.objectWalkRecursive(build.build, function (val, key, userData) {
        if (userData.indexOf(key) === -1 && typeof val.styles !== 'undefined' && key !== 'bundle') {
            // rtl conversion in each plugins
            for (let i in val.styles) {
                if (!val.styles.hasOwnProperty(i)) {
                    continue;
                }
                let toRtlFile = func.dotPath(val.styles[i]);

                // exclude scss file for now
                if (toRtlFile.indexOf('.scss') === -1) {
                    stream = gulp.src(toRtlFile, {allowEmpty: true}).pipe(rtlcss()).pipe(rename({suffix: '.rtl'})).pipe(gulp.dest(func.pathOnly(toRtlFile)));
                    streams.push(stream);

                    // convert rtl for minified
                    if (!(/\.min\./i).test(toRtlFile)) {
                        stream = gulp.src(toRtlFile, {allowEmpty: true}).pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(rename({suffix: '.min.rtl'})).pipe(gulp.dest(func.pathOnly(toRtlFile)));
                        streams.push(stream);
                    }
                }
            }
        }
    }, build.config.compile.rtl.skip);

    return merge(streams);
});

// task to bundle js/css
gulp.task('build-bundle', function (cb) {

    func.objectWalkRecursive(build.build,  (val) => {

        if (val.hasOwnProperty('src')) {
            if (val.hasOwnProperty('bundle')) {
                func.bundle(val);
            }
            if (val.hasOwnProperty('output')) {
                func.output(val);
            }
        }
    });
    cb();
});

let tasks = ['clean'];
if (build.config.compile.rtl.enabled) {
    tasks.push('rtl');
}
tasks.push('build-bundle');

// entry point
gulp.task('default', gulp.series(tasks));

// html formatter
gulp.task('html-formatter', function (cb) {
    let dir = args.path;
    if (dir === '') {
        console.log('The option --path is required');
        cb();
        return;
    }
    glob(process.cwd() + '/' + dir + '/**/*.html',
        // ignore assets folder
        {ignore: [process.cwd() + '/' + dir + '/assets/**'],},
        function (er, files) {
            files.forEach(function (path) {
                fs.readFile(path, {encoding: 'UTF-8'}, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    let formatted = pretty(data, {
                        ocd: true,
                        indent_size: 1,
                        indent_char: '\t',
                        unformatted: ['code', 'pre', 'em', 'strong'],
                    });
                    fs.writeFile(path, formatted, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log(path + ' formatted!');
                    });
                });
            });
        });
    cb();
});

// copy from src to dist folder
gulp.task('html', function (cb) {
    gulp.src(process.cwd() + '/../src/**')
        .pipe(gulp.dest('../dist'));
    cb();
});

// build default and copy demo from src to dist folder
let buildTasks = ['html'];
if (build.config.compile.rtl.enabled) {
    buildTasks.push('rtl');
}
buildTasks.push('build-bundle');
gulp.task('build', gulp.series(buildTasks));
