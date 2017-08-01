/**
 * Created by ITUA on 14.11.2016.
 */
const svgSymbolSprite = require('gulp-svg-symbols'),
	svgmin = require('gulp-svgmin'),
	gulpif = require('gulp-if'),
	watch = require('gulp-watch'),
	replace = require('gulp-replace');

let config = {
	src: 'src/statics/for-svg-symbol/*.svg',
	pugOutput: 'src/common/',
	pugTmplt: './gulp/templates/svg-use.pug',
	scssOutput: 'src/common/',
	scssTmplt: './gulp/templates/svg-sprite.scss',
	dist: 'dist/images/sprites/',
	watch: ['src/statics/for-svg-symbol/*']
};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('sprite:svg-symbol');
	
	
	gulp.task('sprite:svg-symbol', function () {
		
		return gulp.src(config.src)
			.pipe(svgmin({
				js2svg: {
					pretty: true
				}
			}))
			.pipe(replace('&gt;', '>'))
			.pipe(svgSymbolSprite({
				svgClassname: 'svg-symbol',
				templates: [
					'default-svg',
					'default-demo',
					config.scssTmplt,
					config.pugTmplt
				]
			}))
			.pipe(gulpif(/[.]pug$/, gulp.dest(config.pugOutput)))
			.pipe(gulpif(/[.]scss$/, gulp.dest(config.scssOutput)))
			.pipe(gulpif(/[.]svg$/, gulp.dest(config.dist)))
			.pipe(gulpif(/[.]html$/, gulp.dest('dist/')))
	});
	
	if(!global.isProd) {
		// sprite svg
		watch(config.watch, function (file) {
			gulp.start('sprite:svg-symbol');
			serv.reload();
		});
	}
};