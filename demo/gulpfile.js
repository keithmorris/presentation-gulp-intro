"use strict";

var concat  = require('gulp-concat'),
	gulp    = require('gulp'),
	less    = require('gulp-less'),
	request = require('request'),
	run     = require('run-sequence'),
	uglify  = require('gulp-uglify');

gulp.task('less', function () {
	return gulp.src(['./less/styles.less'])
		.pipe(less())
		.pipe(gulp.dest('./css/'));
});

gulp.task('jsmin', function () {
	return gulp.src([
		'./js/**/*.js',
		'!./js/app.min.js'
	])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js/'));
});

gulp.task('watch', [], function () {
	gulp.watch(['./less/**/*.less'], ['less']);
	gulp.watch([
		'./js/**/*.js',
		'!./js/app.min.js'
	], ['jsmin'])
});

gulp.task('async', function (callback) {

	var options = {
		url: "http://filltext.com",
		qs : {
			rows : 10,
			fname: '{firstName}',
			lname: '{lastName}'
		}
	};

	request(options, function (error, resp, body) {
		console.log(JSON.parse(body));
		callback();
	});

});


gulp.task('default', ['less', 'jsmin']);
