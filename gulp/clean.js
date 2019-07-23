let gulp = require('gulp');
let del = require('del');
let build = require('./build');

let getPaths = () => {
	let realPaths = [];
	build.config['dist'].forEach((path) => {
		realPaths.push(path + '/*');
		realPaths.push('!' + path + '/lib');
	});
	return realPaths;
};

gulp.task('clean', () => del(getPaths(), {force: true}));
