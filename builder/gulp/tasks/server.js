/**
 * Created by ITUA on 10.11.2016.
 */
const browserSync = require('browser-sync').create();

module.exports = function(gulp, defaultTask) {
	
	if(!global.isProd) {
		defaultTask.push('server');
		
		gulp.task('server', function () {
			browserSync.init({
				// server: {
				// 	baseDir: "./dist/"
				// },
				proxy: "http://localhost:3131/",
				//tunnel: true,
				host: 'localhost',
				port: 9000,
			});
		});
	}
	
	return browserSync;
};