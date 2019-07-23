'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let rewrite = require('gulp-rewrite-css');
let concat = require('gulp-concat');
let lazypipe = require('lazypipe');
let gulpif = require('gulp-if');
let uglify = require('gulp-uglify-es').default;
let sourcemaps = require('gulp-sourcemaps');
let build = require('./build');
let path = require('path');
let fs = require('fs');
let filter = require('gulp-filter');
let autoprefixer = require('gulp-autoprefixer');
let rtlcss = require('gulp-rtlcss');
let cleancss = require('gulp-clean-css');
let yargs = require('yargs');

// merge with default parameters
let args = Object.assign({
    prod: false,
    sass: true,
    js: true,
    media: true,
}, yargs.argv);

let allAssets = true;


if (args.prod !== false) {
    // force disable debug for production
    build.config.debug = false;
    build.config.compile.jsUglify = true;
    build.config.compile.cssMinify = true;
}

module.exports = {

    // default letiable config
    config: Object.assign({}, {
        debug: false,
        compile: {
            jsUglify: false,
            cssMinify: false,
            jsSourcemaps: false,
            cssSourcemaps: false,
        },
    }, build.config),

    /**
     * Walk into object recursively
     * @param array
     * @param funcname
     * @param userdata
     * @returns {boolean}
     */
    objectWalkRecursive: function (array, funcname, userdata) {
        if (!array || typeof array !== 'object') {
            return false;
        }
        if (typeof funcname !== 'function') {
            return false;
        }
        for (let key in array) {
            // apply "funcname" recursively only on object
            if (Object.prototype.toString.call(array[key]) === '[object Object]') {
                let funcArgs = [array[key], funcname];
                if (arguments.length > 2) {
                    funcArgs.push(userdata);
                }
                if (module.exports.objectWalkRecursive.apply(null, funcArgs) === false) {
                    return false;
                }
                // continue
            }
            try {
                if (arguments.length > 2) {
                    funcname(array[key], key, userdata);
                } else {
                    funcname(array[key], key);
                }
            } catch (e) {
                return false;
            }
        }
        return true;
    },

    /**
     * Add JS compilation options to gulp pipe
     */
    jsChannel: function () {
        let config = this.config.compile;
        return lazypipe().pipe(function () {
            return gulpif(config.jsSourcemaps, sourcemaps.init({loadMaps: true, debug: config.debug}));
        }).pipe(function () {
            return gulpif(config.jsUglify, uglify());
        }).pipe(function () {
            return gulpif(config.jsSourcemaps, sourcemaps.write('./'));
        });
    },

    /**
     * Add CSS compilation options to gulp pipe
     */
    cssChannel: function (rtl, includePaths) {
        let config = this.config.compile;
        return lazypipe().pipe(function () {
            return gulpif(config.cssSourcemaps, sourcemaps.init({loadMaps: true, debug: config.debug}));
        }).pipe(function () {
            return sass({
                errLogToConsole: true,
                includePaths: includePaths,
                // outputStyle: config.cssMinify ? 'compressed' : '',
            }).on('error', sass.logError);
        }).pipe(function () {
            // convert rtl for style.bundle.css only here, others already converted before
            return gulpif(rtl, rtlcss());
        }).pipe(function () {
            return gulpif(config.cssMinify, cleancss());
        }).pipe(function () {
            return gulpif(true, autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            }));
        }).pipe(function () {
            return gulpif(config.cssSourcemaps, sourcemaps.write('./'));
        });
    },

    /**
     * Multiple output paths by output config
     * @param path
     * @param outputFile
     * @param type
     * @returns {*}
     */
    outputChannel: function (path, outputFile, type) {
        if (!allAssets) {
            if (args.sass && ['styles', 'styles-by-demo'].indexOf(type) === -1) {
                return lazypipe().pipe(function () {
                    // noop
                });
            }
            if (args.js && ['scripts'].indexOf(type) === -1) {
                return lazypipe().pipe(function () {
                    // noop
                });
            }
            if (args.media && ['media', 'fonts', 'images'].indexOf(type) === -1) {
                return lazypipe().pipe(function () {
                    // noop
                });
            }
        }

        if (typeof path === 'undefined') {
            console.log('Output path not defined');
        }
        if (typeof outputFile === 'undefined') {
            outputFile = '';
        }

        let piping = lazypipe();

        let regex = new RegExp(/\{\$.*?\}/);
        let matched = path.match(regex);
        if (matched) {
            let outputs = build.config.dist;
            // console.log(build.config.dist);
            outputs.forEach(function (output) {
                if (output.indexOf('/**/') !== -1) {
                    module.exports.getDemos().forEach(function (demo) {
                        let outputPath = path.replace('**', demo).replace(matched[0], output.replace('**', demo)).replace(outputFile, '');
                        // exclude unrelated demo assets
                        if (outputPath.indexOf('/assets/demo/') !== -1 && outputPath.indexOf('/assets/demo/' + demo) === -1) {
                        	console.log('test');
                            let f = filter(outputPath, {restore: true});
                            piping = piping.pipe(function () {
                                return f;
                            });
                            (function (_output) {
                                piping = piping.pipe(function () {
                                    return gulp.dest(_output);
                                });
                            })(outputPath);
                            piping = piping.pipe(function () {
                                return f.restore;
                            });
                        } else {
                            (function (_output) {
                                piping = piping.pipe(function () {
                                    return gulp.dest(_output);
                                });
                            })(outputPath);
                        }
                    });
                } else {
                    if (path.indexOf('/**/') !== -1) {
                        module.exports.getDemos().forEach(function (demo) {
                            let outputPath = path.replace('**', demo).replace(matched[0], output).replace(outputFile, '');
                            (function (_output) {
                                piping = piping.pipe(function () {
                                    return gulp.dest(_output);
                                });
                            })(outputPath);
                        });
                    } else {
                        let outputPath = path.replace(matched[0], output).replace(outputFile, '');
                        (function (_output) {
                            piping = piping.pipe(function () {
                                return gulp.dest(_output);
                            });
                        })(outputPath);
                    }
                }
            });
        }

        return piping;
    },

    /**
     * Convert string path to actual path
     * @param path
     * @returns {*}
     */
    dotPath: function (path) {
        let regex = new RegExp(/\{\$(.*?)\}/),
            dot = function (obj, i) {
                return obj[i];
            };
        let matched = path.match(regex);
        if (matched) {
            let realpath = matched[1].split('.').reduce(dot, build);
            return path = path.replace(matched[0], realpath);
        }

        return path;
    },

    /**
     * Convert multiple paths
     * @param paths
     */
    dotPaths: function (paths) {
        paths.forEach(function (path, i) {
            paths[i] = module.exports.dotPath(path);
        });
    },

    /**
     * Css path rewriter when bundle files moved
     * @param folder
     */
    cssRewriter: function (folder) {
        let imgRegex = new RegExp(/\.(gif|jpg|jpeg|tiff|png|ico)$/i);
        // let fontRegex = new RegExp(/\.(otf|eot|svg|ttf|woff|woff2)$/i);
        let vendorGlobalRegex = new RegExp(/vendors\/global/i);
        let config = this.config;

        return lazypipe().pipe(function () {
            // rewrite css relative path
            return rewrite({
                destination: folder,
                debug: config.debug,
                adaptPath: function (ctx) {
                    let isCss = ctx.sourceFile.match(/\.[css]+$/i);
                    // process css only
                    if (isCss[0] === '.css') {
                        let pieces = ctx.sourceDir.split(/\\|\//);

                        let vendor = '';
                        if (vendorGlobalRegex.test(folder)) {
                            // only vendors/base pass this
                            vendor = pieces[pieces.indexOf('node_modules') + 1];
                            if (pieces.indexOf('node_modules') === -1) {
                                vendor = pieces[pieces.indexOf('vendors') + 1];
                            }
                        }

                        let file = module.exports.baseFileName(ctx.targetFile);

                        let extension = 'fonts/';
                        if (imgRegex.test(file)) {
                            extension = 'images/';
                        }

                        return path.join(extension + vendor, file);
                    }
                },
            });
        });
    },

    /**
     * Get end filename from path
     * @param path
     * @returns {string}
     */
    baseFileName: function (path) {
        let maybeFile = path.split('/').pop();
        if (maybeFile.indexOf('.') !== -1) {
            return maybeFile;
        }
        return '';
    },

    baseName: function (str) {
        let base = String(str).substring(str.lastIndexOf('/') + 1);
        if (base.lastIndexOf('.') !== -1) {
            base = base.substring(0, base.lastIndexOf('.'));
        }
        return base;
    },

    /**
     * Remove file name and get the path
     */
    pathOnly: function (str) {
        let array = str.split('/');
        if (array.length > 0) {
            array.pop();
        }
        return array.join('/');
    },

    /**
     * Bundle
     * @param bundle
     */
    bundle: function (bundle) {
        let _self = this;
        let streams = [];
        let stream;

        if (bundle.hasOwnProperty('src') && bundle.hasOwnProperty('bundle')) {

            // for images & fonts as per vendor
            if ('mandatory' in bundle.src && 'optional' in bundle.src) {
                let vendors = {};

                for (let key in bundle.src) {
                    if (!bundle.src.hasOwnProperty(key)) {
                        continue;
                    }
                    vendors = Object.assign(vendors, bundle.src[key]);
                }

                for (let vendor in vendors) {
                    if (!vendors.hasOwnProperty(vendor)) {
                        continue;
                    }

                    let vendorObj = vendors[vendor];

                    for (let type in vendorObj) {
                        if (!vendorObj.hasOwnProperty(type)) {
                            continue;
                        }

                        _self.dotPaths(vendorObj[type]);

                        let output;
                        switch (type) {
                            case 'fonts':
                                stream = gulp.src(vendorObj[type], {allowEmpty: true});
                                output = _self.outputChannel(bundle.bundle[type] + '/' + vendor, undefined, type)();
                                if (output) {
                                    stream.pipe(output);
                                }
                                streams.push(stream);
                                break;
                            case 'images':
                                stream = gulp.src(vendorObj[type], {allowEmpty: true});
                                output = _self.outputChannel(bundle.bundle[type] + '/' + vendor, undefined, type)();
                                if (output) {
                                    stream.pipe(output);
                                }
                                streams.push(stream);
                                break;
                        }
                    }
                }
            }

            // flattening array
            if (!('styles' in bundle.src) && !('scripts' in bundle.src)) {
                let src = {styles: [], scripts: []};
                _self.objectWalkRecursive(bundle.src, function (paths, type) {
                    switch (type) {
                        case 'styles':
                        case 'scripts':
                            src[type] = src[type].concat(paths);
                            break;
                        case 'images':
                            // images for mandatory and optional vendor already processed
                            if (!'mandatory' in bundle.src || !'optional' in bundle.src) {
                                src[type] = src[type].concat(paths);
                            }
                            break;
                    }
                });
                bundle.src = src;
            }

            for (let type in bundle.src) {
                if (!bundle.src.hasOwnProperty(type)) {
                    continue;
                }
                // skip if not array
                if (Object.prototype.toString.call(bundle.src[type]) !== '[object Array]') {
                    continue;
                }
                // skip if no bundle output is provided
                if (typeof bundle.bundle[type] === 'undefined') {
                    continue;
                }

                _self.dotPaths(bundle.src[type]);
                let outputFile = _self.baseFileName(bundle.bundle[type]);

                switch (type) {
                    case 'styles':
                        if (bundle.bundle.hasOwnProperty(type)) {
                            // rtl css bundle
                            if (build.config.compile.rtl.enabled) {
                                let toRtlFiles = [];
                                let rtlFiles = [];
                                bundle.src[type].forEach(function (path) {
                                    // get rtl css file path
                                    let cssFile = _self.pathOnly(path) + '/' + _self.baseName(path) + '.rtl.css';
                                    // check if rtl file is exist
                                    if (fs.existsSync(cssFile) && build.config.compile.rtl.skip.indexOf(_self.baseName(path)) === -1) {
                                        rtlFiles = rtlFiles.concat(cssFile);
                                    } else {
                                        // rtl css file not exist, use default css file
                                        cssFile = path;
                                    }
                                    toRtlFiles = toRtlFiles.concat(cssFile);
                                });

                                let shouldRtl = false;
                                if (_self.baseName(bundle.bundle[type]) === 'style.bundle') {
                                    shouldRtl = true;
                                }
                                let rtlOutput = _self.pathOnly(bundle.bundle[type]) + '/' + _self.baseName(bundle.bundle[type]) + '.rtl.css';
                                stream = gulp.src(toRtlFiles, {allowEmpty: true}).pipe(_self.cssRewriter(bundle.bundle[type])()).pipe(concat(_self.baseName(bundle.bundle[type]) + '.rtl.css')).pipe(_self.cssChannel(shouldRtl)());
                                let output = _self.outputChannel(rtlOutput, _self.baseName(bundle.bundle[type]) + '.rtl.css', type)();
                                if (output) {
                                    stream.pipe(output);
                                }
                                streams.push(stream);
                            }

                            // default css bundle
                            stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.cssRewriter(bundle.bundle[type])()).pipe(concat(outputFile)).pipe(_self.cssChannel()());
                            let output = _self.outputChannel(bundle.bundle[type], outputFile, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);
                        }
                        break;

                    case 'scripts':
                        if (bundle.bundle.hasOwnProperty(type)) {
                            stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(concat(outputFile)).pipe(_self.jsChannel()());
                            let output = _self.outputChannel(bundle.bundle[type], outputFile, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);
                        }

                        break;

                    case 'images':
                        if (bundle.bundle.hasOwnProperty(type)) {
                            stream = gulp.src(bundle.src[type], {allowEmpty: true});
                            let output = _self.outputChannel(bundle.bundle[type], undefined, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);
                        }
                        break;
                }
            }
        }

        return streams;
    },

    /**
     * Copy source to output destination
     * @param bundle
     */
    output: function (bundle) {
        let _self = this;
        let stream;
        let streams = [];

        if (bundle.hasOwnProperty('src') && bundle.hasOwnProperty('output')) {
            for (let type in bundle.src) {
                if (!bundle.src.hasOwnProperty(type)) {
                    continue;
                }

                _self.dotPaths(bundle.src[type]);

                let output;
				let shouldRtl = false;
                if (bundle.output.hasOwnProperty(type)) {
                    switch (type) {
                        case 'styles':
                            // non rtl styles
                            stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.cssChannel()());
                            output = _self.outputChannel(bundle.output[type], undefined, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);

                            // rtl styles for scss
                            if (build.config.compile.rtl.enabled) {
                                bundle.src[type].forEach(function (output) {
                                    if (output.indexOf('.scss') !== -1) {
                                        return shouldRtl = true;
                                    }
                                });
                                stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.cssChannel(shouldRtl)()).pipe(rename({suffix: '.rtl'}));
                                let output = _self.outputChannel(bundle.output[type], undefined, type)();
                                if (output) {
                                    stream.pipe(output);
                                }
                                streams.push(stream);
                            }
                            break;
                        /*case 'styles-by-demo':
                            // custom scss with suffix demos
                            module.exports.getDemos().forEach(function (demo) {
                                // custom page scss
                                stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.cssChannel(false, [
                                    '../themes/themes/' + module.exports.config.theme + '/src/sass/theme/demos/' + demo + '/', //  development
                                    '../src/assets/sass/theme/demos/' + demo + '/', // release default package
                                    '../src/sass/theme/demos/' + demo + '/', // release angular package
                                ])());// pipe(rename({ suffix: '.' + demo })).

                                let output = _self.outputChannel(bundle.output[type], undefined, type)();
                                if (output) {
                                    stream.pipe(output);
                                }
                                streams.push(stream);

                                if (build.config.compile.rtl.enabled) {
                                    bundle.src[type].forEach(function (output) {
                                        if (output.indexOf('.scss') !== -1) {
                                            return shouldRtl = true;
                                        }
                                    });
                                    stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.cssChannel(shouldRtl, [
                                        '../themes/themes/' + module.exports.config.theme + '/src/sass/theme/demos/' + demo + '/', //  development
                                        '../src/assets/sass/theme/demos/' + demo + '/', // release default package
                                        '../src/sass/theme/demos/' + demo + '/', // release angular package
                                    ])()).pipe(rename({suffix: '.rtl'}));
                                    let output = _self.outputChannel(bundle.output[type], undefined, type)();
                                    if (output) {
                                        stream.pipe(output);
                                    }
                                    streams.push(stream);
                                }
                            });
                            break;*/
                        case 'scripts':
                        	console.log(bundle.src[type]);
                            stream = gulp.src(bundle.src[type], {allowEmpty: true}).pipe(_self.jsChannel()());
                            output = _self.outputChannel(bundle.output[type], undefined, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);
                            break;
                        default:
                            stream = gulp.src(bundle.src[type], {allowEmpty: true});
                            output = _self.outputChannel(bundle.output[type], undefined, type)();
                            if (output) {
                                stream.pipe(output);
                            }
                            streams.push(stream);
                            break;
                    }
                }
            }
        }

        return streams;
    },

	/*
    getDemos: function () {
        let demos = Object.keys(build.build.demos);
        // build by demo, leave demo empty to generate all demos
        if (typeof build.config.demo !== 'undefined' && build.config.demo !== '') {
            demos = build.config.demo.split(',').map(function (item) {
                return item.trim();
            });
        }
        return demos;
    },*/

    getFolders: function (dir) {
        return fs.readdirSync(dir).filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    },

};
