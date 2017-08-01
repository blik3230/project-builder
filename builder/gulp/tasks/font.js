/**
 * Created by ITUA on 14.11.2016.
 */
const watch = require('gulp-watch');

let config = {
	src: './src/statics/fonts/**/*',
	dist: './dist/fonts/',
	watch: ['./src/statics/fonts/**/*']
};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('font:copy');
	
	gulp.task('font:copy', function () {
		return gulp.src(config.src)
			.pipe(gulp.dest(config.dist))
			.pipe(serv.stream());
	});
	
	if(!global.isProd) {
		// fonts
		watch(config.watch, function () {
			gulp.start('font:copy');
		});
	}
};