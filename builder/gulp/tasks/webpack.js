/**
 * Created by ITUA on 14.11.2016.
 */
const webpackStream = require('webpack-stream'),
	webpack = webpackStream.webpack,
	named = require('vinyl-named'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	gutil = require('gulp-util');



module.exports = function(gulp, serv, defaultTask) {
	defaultTask.push('webpack');
	
	console.log('in webpack' + global.isProd);
	
	var options = {
		output: {
			filename: '[name].js'
		},
		watch: !global.isProd,
		devtool: global.isProd? null: 'cheap-eval-source-map',
		resolve: {
			modulesDirectories: ['src', 'node_modules'],
			alias: {
				//vue: 'vue/dist/vue.js'
			}
		},
		module: {
			loaders: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						// https://github.com/babel/babel-loader#options
						cacheDirectory: true,
						presets: ['es2015']
					}
				},
				{
					test: /\.html$/,
					loader: 'html?config=otherHtmlLoaderConfig'
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery"
			}),
			new webpack.NoErrorsPlugin()
		]
	};
	
	
	gulp.task('webpack', function (callback) {
		
		let firstBuildReady = false;
		
		function done(err, stats) {
			let firstBuildReady = true;
			
			if (err) {
				// The err is here just to match the API but isnt used
				return;
			}
			
			stats = stats || {};
			
			gutil.log(stats.toString({
				colors: gutil.colors.supportsColor
			}));
		}
		
		if(global.isProd) {
			options.plugins.push(new webpack.optimize.UglifyJsPlugin({
				minimize: true
			}));
		}
		
		return gulp.src('src/entry/js/*.js')
			.pipe(plumber({
				errorHandler: notify.onError(function(err){
					return {
						title: 'Webpack',
						message: err.message
					}
				})
			}))
			.pipe(named())
			.pipe(webpackStream(options, null, done))
			.pipe(gulp.dest('dist/js'))
			.pipe(serv.stream({match: '**/*.js'}))
			.pipe(notify('Done! master zooboole.'))
			.on('data', function() {
				if(firstBuildReady) {
					callback();
				}
			})
	});
};