'use strict';

const gulp = require('gulp'),
  childProcess  = require('child_process'),
	initPug = require('./builder/gulp/tasks/pug'),
	initServer = require('./builder/gulp/tasks/server'),
	initScss = require('./builder/gulp/tasks/scss'),
	initVendorsScss = require('./builder/gulp/tasks/vendors-scss'),
	initHelpersScss = require('./builder/gulp/tasks/helpers-scss'),
	initWebpack = require('./builder/gulp/tasks/webpack'),
	initFont = require('./builder/gulp/tasks/font'),
	initImgmin = require('./builder/gulp/tasks/imgmin'),
	initSpritePng = require('./builder/gulp/tasks/sprite-png'),
	initSpriteSvg = require('./builder/gulp/tasks/sprite-svg'),
	initSpriteSvgSymbol = require('./builder/gulp/tasks/sprite-svg-symbol'),
	initProdaction = require('./builder/gulp/tasks/prodaction');

global.isProd = process && !! process.env.NODE_ENV;
console.log('prod ' + global.isProd);

if(!global.isProd) {
	var p = childProcess.fork('builder-server.js');

	p.on('message', function(data) {
		console.log('stdout: ' + data)
	})
}

let defaultTask = [];

const serv = initServer(gulp, defaultTask);

// initImgmin(gulp, serv, defaultTask);
//
// initSpritePng(gulp, serv, defaultTask);
//
// initSpriteSvg(gulp, serv, defaultTask);
//
// initSpriteSvgSymbol(gulp, serv, defaultTask);
//
initPug(gulp, serv, defaultTask);
//
// initVendorsScss(gulp, serv, defaultTask);
//
// initHelpersScss(gulp, serv, defaultTask);
//
// initScss(gulp, serv, defaultTask);
//
// initFont(gulp, serv, defaultTask);
//
// initWebpack(gulp, serv, defaultTask);
//
// initProdaction(gulp, serv, defaultTask);

console.log(defaultTask);

gulp.task('default', defaultTask);

gulp.task('deploy', ['prod'], function() {
	//todo: do it
});
