/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	cssGlobbing = require('gulp-css-globbing'),
	watch = require('gulp-watch'),
	config = {
		src: ['./src/entry/scss/*.scss'],
		dist: './dist/css/',
		watch: ['./src/**/*.scss', '!./src/vendors/', '!./src/helpers/', './src/vendors/_tools.scss']
	};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('scss:build');
	
	gulp.task('scss:build', function() {
				
		return gulp.src(config.src)
			.pipe(cssGlobbing({
				// Configure it to use SCSS files
				extensions: ['.scss']
			}))
			.pipe(sourcemaps.init())
			.pipe(sass({
				cache_location: './cache',
				cache: true,
				outputStyle: 'expanded',
				precision: 3,
				includePaths: ['node_modules/susy/sass']
			}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream({match: '**/*.css'}));
	});
	
	// scss
	if(!global.isProd) {
		watch(config.watch, function (file) {
			gulp.start('scss:build');
		});
	}
};