var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var exec = require('gulp-exec');

var jekyllsrc = "./src/";
var jekyllsite = "./site/";

// Compile Sass to CSS
gulp.task('sass', function () {
	gulp.src(jekyllsrc + '_scss/*.scss')
		.pipe(sass({ includePaths : [jekyllsrc + '_scss/includes'] }))
		.pipe(gulp.dest(jekyllsrc + '/css'));
});



// Run the jekyll build
// Can this just use jekyll watch, or will we get race conditions?
gulp.task('jekyll', function () {
	gulp.src("./")
		.pipe(exec('jekyll build'));
});




/*
	Default tasks
 */

gulp.task('default', function(){
	gulp.run('sass');
  gulp.watch(jekyllsrc + "/_scss/**", function() {
    gulp.run('sass');
    gulp.run('jekyll');
  });
});


/*
	Default tasks
 */

gulp.task('deploy', function(){
	gulp.run('jekyll');
	// gulp.run('images');
	gulp.run('gh-pages');
});
