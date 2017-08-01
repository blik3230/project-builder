/**
 * Created by ITUA on 11.11.2016.
 */
const sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	config = {
		src: ['./src/helpers/main-helpers.scss'],
		dist: './dist/css/',
		fileName: 'helpers.css',
		watch: ['./src/helpers/**/*.scss', './src/common/varibles.scss']
	};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('helpers:scss');
	
	gulp.task('helpers:scss', function() {
		
		return gulp.src(config.src)
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write())
			.pipe(rename(config.fileName))
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream({match: '**/*.css'}));
	});
	
	
	if(!global.isProd) {
		
		// scss
		watch(config.watch, function (file) {
			gulp.start('helpers:scss');
		});
	}
};