/**
 * Created by ITUA on 14.11.2016.
 */
const gulpSpritesmith = require('gulp.spritesmith'),
	buffer = require('vinyl-buffer'),
	imagemin = require('gulp-imagemin'),
	watch = require('gulp-watch');

let config = {
	src: 'src/statics/for_sprite_png/*.*',
	dist: 'dist/images/sprites/',
	scss: 'src/utils/scss/mixins/',
	template: 'gulp/templates/scss.sprite.mustache',
	watch: ['src/statics/for_sprite_png/*']
};


module.exports = function (gulp, serv, defaultTask) {
	defaultTask.push('sprite:png');
	
	gulp.task('sprite:png', function (done) {
		var params = {
			imgName: 'sprite.png',
			imgPath: '../images/sprites/sprite.png',
			cssName: 'sprite.scss',
			padding: 25,
			cssFormat: 'scss',
			algorithm: 'binary-tree',
			cssTemplate: config.template
		};
		
		var spriteData = gulp.src(config.src)
			.pipe(gulpSpritesmith(params));
		
		spriteData.img
			.pipe(buffer())
			.pipe(imagemin())
			.pipe(gulp.dest(config.dist));
		
		spriteData.css
			.pipe(gulp.dest(config.scss));
		
		done();
	});
	
	if(!global.isProd) {
		// sprite png
		watch(config.watch, function (file) {
			gulp.start('sprite:png');
			serv.reload();
		});
	}
};