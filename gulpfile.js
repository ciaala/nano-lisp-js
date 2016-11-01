/* globals console, require */
"use strict";

var gulp = require("gulp");
var changed = require("gulp-changed");
var concat = require("gulp-concat");
var fs = require("fs");
var header = require("gulp-header");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var zip = require("gulp-zip");
var karmaServer = require("karma").Server;

var pkg = require("./package.json");

var CONST = {
	SRC_FOLDER: "src",
	DIST_FOLDER: "dist",
	SCSS_FOLDER: "src/sass/*.scss",
	MIN_SUFFIX: ".min.js",
	CSS_SRC: "src/jasmine-tree.css",
	JS_SRC: "src/js/nanolisp.js",
	FOLDERS_TO_ARCHIVE: ["LICENSE","dist/**/*", "lib/**/*", "src/**/*", "test/**/*"],
	ARCHIVE_FILE: "jasmine-tree.zip",
	ARCHIVE_FOLDER: "archive",
	VERSION_PATTERN: new RegExp("version = \"(\\d.\\d(.\\d)?)\";")
};

function assembleBanner(version){
	var now = new Date();
	var banner = [
		"/*! ",
		pkg.name + " " + version + " " + now.toISOString(),
		"Copyright " + now.getFullYear() + " Massimo Foti (massimo@massimocorner.com) and Emily Meroni (emily.meroni@gmail.com)",
		"Licensed under the Apache License, Version 2.0 | http://www.apache.org/licenses/LICENSE-2.0",
		" */",
		""].join("\n");
	return banner;
}

function getJsVersion(){
	var buffer = fs.readFileSync(CONST.JS_SRC);
	var fileStr = buffer.toString("utf8", 0, buffer.length);
	var version = CONST.VERSION_PATTERN.exec(fileStr)[1];
	return version;
}

gulp.task("coverage", function (done) {
	// Use Karma only for the sake of producing a code coverage report
	new karmaServer({
		configFile: __dirname + "/test/karma.conf.js"
	}, done).start();
});

gulp.task("js", function(){
	var jsVersion = getJsVersion();
	return gulp.src(CONST.JS_SRC)
		.pipe(sourcemaps.init())
			// The "changed" task needs to know the destination directory
			// upfront to be able to figure out which files changed
			.pipe(changed(CONST.DIST_FOLDER))
			.pipe(header(assembleBanner(jsVersion))) // Banner for copy
			.pipe(gulp.dest(CONST.DIST_FOLDER))
			.pipe(uglify({
				mangle: false
			}))
			.pipe(rename({
				extname: CONST.MIN_SUFFIX
			}))
			.pipe(header(assembleBanner(jsVersion))) // Banner for minified
		.pipe(sourcemaps.write(".", {
			includeContent: true,
			sourceRoot: "."
		}))
		.pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task("scss", function(){
	var jsVersion = getJsVersion();
	gulp.src(CONST.SCSS_FOLDER)
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(header(assembleBanner(jsVersion)))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task("zip", function(){
	return gulp.src(CONST.FOLDERS_TO_ARCHIVE, {base: "."})
		.pipe(zip(CONST.ARCHIVE_FILE))
		.pipe(gulp.dest(CONST.ARCHIVE_FOLDER));
});

gulp.task("default", function(callback){
	runSequence(
		"scss",
		"js",
		"zip",
		function(error){
			if(error){
				console.log(error.message);
			}
			else{
				console.log("BUILD FINISHED SUCCESSFULLY");
			}
			callback(error);
		});
});