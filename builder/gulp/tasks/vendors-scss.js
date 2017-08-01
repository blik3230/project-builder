/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	config = {
		src: ['./src/vendors/main-vendors.scss'],
		dist: './dist/css/',
		fileName: 'vendors.css',
		watch: ['./src/vendors/**/*.scss']
	};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('vendors:scss');
	
	gulp.task('vendors:scss', function() {
		
		return gulp.src(config.src)
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(rename(config.fileName))
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream({match: '**/*.css'}));
	});
	
	//todo: cat
	
	
	if(!global.isProd) {
		
		// scss
		watch(config.watch, function (file) {
			gulp.start('vendors:scss');
		});
	}
};