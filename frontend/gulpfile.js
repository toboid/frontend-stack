/**
 * Linting
 * build:es6 = builders for Babel and browserify
 * jadeTemplates = compile the jade files
 * reactTemplates = use the react template system. This creates JS templats for us
 * 					had to use some regex it to make it work with commonJS, but it works.
 */

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	babelify = require('babelify'),
	through2 = require('through2'),
	browserify = require('browserify'),
	gulpRename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	jade = require('gulp-jade'),
    reactTemplates = require('gulp-react-templates'),
	replace = require('gulp-regex-replace');
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	exec = require('gulp-exec');

paths = {
    javascripts: ['src/javascript/**/*.js', '!src/javascript/**/*.rt.js', '!src/javascript/lib/lodash.js' ],
    css: ['src/**/*.css'],
    jade: ['src/**/*.jade']

};

gulp.task('clean', function () {
    return gulp.src('build/', {
        read: false
    })
    .pipe(clean());
});

gulp.task('lint', function () {
    return gulp.src(paths.javascripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// gulp.task('build:es6',['reactTemplates'],function() {
// 	return gulp.src(['./src/javascript/app.js'])
// 		.pipe(through2.obj(function(file, enc, next) {
// 			browserify(file.path, {
// 					insertGlobals: true,
// 					noParse: "./node_modules/react/addons",
// 					debug: true
// 				})
// 				.transform(babelify, { compact: false })
// 				.bundle(function(err, res) {
// 					if (err) {
// 						return next(err);
// 					}
// 					file.contents = res;
// 					next(null, file);
// 				});
// 		}))
// 		.on('error', function(error) {
// 			console.log(error.stack);
// 			this.emit('end');
// 		})
// 		.pipe(gulpRename('app.js'))
// 		.pipe(gulp.dest('../nodejs/public/js/'));
// });

var rollup  = require('gulp-rollup');

//   gulp.src('src/main.js', {read: false})
//     .pipe(rollup({
//         // any option supported by rollup can be set here, including sourceMap
//         sourceMap: true
//     }))
//     .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
//     .pipe(gulp.dest('dist'));
// });
var commonjs = require('rollup-plugin-commonjs');
var babel = require('rollup-plugin-babel');
// var concat = require("gulp-concat");

// var babel = require("gulp-babel");
// gulp.task('build:es6', ['reactTemplates'], function () {
//   return gulp.src("src/**/*.js")
//     .pipe(babel({  "presets": ["es2015"]}))
//     .pipe(concat("all.js"))
//     .pipe(gulp.dest("build"));


// });
gulp.task('build:es6', ['reactTemplates'], function () {
    return gulp.src(['./src/javascript/app.js'])
	    .pipe(rollup({
	    	format : 'iife',
	    	external : ['moment', 'lodash', 'page', 'React'],
	        plugins: [
			    babel({
			    	"presets": ["es2015-rollup"],
			        exclude: ['bower_components/**','node_modules/**']
			        // runtimeHelpers: true 

			    }),
			    commonjs({
			        include: 'bower_components/**',
			        // search for files other than .js files (must already
			        // be transpiled by a previous plugin!)
			        // extensions: [ '.js', '.coffee' ] // defaults to [ '.js' ]
			    })
			]

    	}))
    	// .pipe(sourcemaps.write(".")) // this only works if the sourceMap option is true
		.pipe(gulpRename('app.js'))
		.pipe(gulp.dest('../nodejs/public/js/'));
});

gulp.task('jadeTemplates', function () {
    var locals = {}
    return gulp.src('./src/*.jade')
		.pipe(jade({
		    locals: locals
		}))
		.pipe(gulp.dest('../nodejs/public'))
});

gulp.task('reactTemplates1', function () {
    return gulp.src('src/**/*.rt')
	    .pipe(exec('rt "<%= file.path %>" -c -k -m=es6'))
});

gulp.task('reactTemplates', ['reactTemplates1'], function () {
    return gulp.src('src/views/*.rt.js')
    .pipe(replace({regex: '{ React }', replace: 'React'}))
    .pipe(replace({regex: 'react/addons', replace: 'React'}))
    .pipe(replace({regex: '{ moment }', replace: 'moment'}))
    .pipe(replace({regex: '{ moment }', replace: 'moment'}))
    .pipe(gulp.dest('src/javascript/views'));
});

// Copy all html
gulp.task('copy', function () {
    return gulp.src(paths.css)
    // Pass in options to the task
    .pipe(gulp.dest('../nodejs/public'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.javascripts, ['lint', 'build:es6']);
    gulp.watch('src/**/*.rt', ['build:es6']);
    gulp.watch(paths.css, ['copy']);
    gulp.watch('src/**/*.jade', ['jadeTemplates']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['lint', 'build:es6', 'jadeTemplates']);
gulp.task('default', ['build', 'watch']);
