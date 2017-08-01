/**
 * Created by ITUA on 14.11.2016.
 */
const imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	through2 = require('through2').obj,
	watch = require('gulp-watch');

let config = {
	src: './src/statics/images/**/*',
	dist: 'dist/images/',
	watch: ['./src/statics/images/**/*']
};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('img:min');
	
	gulp.task('img:min', function () {
		return gulp.src(config.src)
			.pipe(imagemin({
				progressive: true,
				use: [pngquant()],
				interlaced: true
			}))
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream());
	});
	
	if(!global.isProd) {
		// imgmin
		watch(config.watch, function () {
			gulp.start('img:min');
		});
	}
};