/**
 * Created by ITUA on 12.06.2017.
 */
const concat = require('gulp-concat');

let config = {
	
};

// todo: добавить задачи для продакшена. чтобы файлы ложились в разные шаблоны
module.exports = function(gulp, serv, defaultTask) {
	
	if(false && global.isProd) {
		defaultTask.push('production:deploy');
		defaultTask.push('production:main-cat');
		defaultTask.push('production:registration-cat');
		
		gulp.task('production:deploy', function(done) {
			gulp.src(['./dist/**/*.*', '!./dist/**/*.html', '!./dist/css/*.css'])
				.pipe(gulp.dest('../templatesDemo/'))
		});
		
		gulp.task('production:main-cat', ['scss:build', 'vendors:scss', 'helpers:scss'], function(done) {
			gulp.src(['./dist/css/style.css', './dist/css/vendors.css', './dist/css/helpers.css'])
				.pipe(concat('styleM.css'))
				.pipe(gulp.dest('../templatesDemo/css/'))
		});
		
		gulp.task('production:registration-cat', ['scss:build', 'vendors:scss', 'helpers:scss'], function(done) {
			gulp.src(['./dist/css/registration.css', './dist/css/vendors.css', './dist/css/helpers.css'])
				.pipe(concat('styleR.css'))
				.pipe(gulp.dest('../templatesDemo/css/'))
		});
		
	}
};