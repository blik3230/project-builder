/**
 * Created by ITUA on 14.11.2016.
 */
const spritesheet = require('gulp-svg-spritesheet'),
	svgmin = require('gulp-svgmin'),
	watch = require('gulp-watch');

let config = {
	src: 'src/statics/for_sprite_svg/*.svg',
	dist: 'dist/images/sprites/sprite.svg',
	scss: 'src/utils/scss/mixins/sprite_svg.scss',
	cssPath: '../images/sprites/sprite.svg',
	template: 'gulp/templates/scss.svg-sprite.mustache',
	watch: ['src/statics/for_sprite_svg/*']
};

module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('sprite:svg');
	
	var opts = {
		cssPathSvg: config.cssPath,
		templateSrc: config.template,
		templateDest: config.scss,
		positioning: 'packed',
		padding: 5,
		units: 'px',
		pixelBase: 16
	};
	
	gulp.task('sprite:svg', function () {
		
		return gulp.src(config.src)
			.pipe(spritesheet(opts))
			.pipe(svgmin())
			.pipe(gulp.dest(config.dist))
	});
	
	if(!global.isProd) {
		// sprite svg
		watch(config.watch, function (file) {
			gulp.start('sprite:svg');
			serv.reload();
		});
	}
};