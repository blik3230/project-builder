/**
 * Created by ITUA on 10.11.2016.
 */

const pug = require('gulp-pug'),
	through2 = require('through2').obj,
	fs = require('fs'),
	path = require('path'),
	watch = require('gulp-watch'),
	flatten = require('gulp-flatten');

var tree = {},
	config = {
		src: ['./src/pages/**/*.pug', './src/entry/builder/index.pug'],
		dist: './dist/',
		watch: {
			pug:  ['./src/**/*.pug', './src/entry/builder/**.*'], // todo: стоит ли следить за всеми типами файлов в папке pages?
			html: ['./dist/*.html']
		}
	};

function updateTree(filepath) {
	
	tree[filepath] = getFileDependencies(filepath);
}

function getFileContent(filepath) {
	
	try {
		return fs.readFileSync(filepath).toString();
	} catch (err) {
		return false;
	}
}

function getFileDependencies(filepath) {
	var dependencies = [];
	var skip = -1;

	if(/(js|css)$/.test(filepath)) {
		return dependencies;
	}

	var content = getFileContent(filepath);


	if(!content) throw new Error('ошибка подключения файла ' + filepath);
	
	content.split('\n').forEach((line) => {
		const comment = /\/\//.exec(line);
		if (comment) {
			skip = comment.index;
			return;
		}
		const whiteSpaces = /^\s*/.exec(line);
		if (whiteSpaces[0].length <= skip || /^\S/.test(line)) {
			skip = -1;
		}
		const keyword = /(?:^\s*)(?:include|extends)(\b.*\b)(?:\.pug|\s*$)/g.exec(line);
		
		if (keyword && skip === -1) {
			var dir = path.dirname(filepath),
				dependence = (keyword[1]).trim();

			if(!/(\..{2,5})$/.test(dependence)) {
				dependence += '.pug';
			}

			var	dependencePath = path.join(dir, dependence);

			dependencies.push(dependencePath);
			
			getFileDependencies(dependencePath).forEach((p) => {
				// todo: проверять может зависимость уже есть
				dependencies.push(p);
			});
			//dependencies.concat()
		}
	});
	
	return dependencies;
}
	

module.exports = function(gulp, serv, defaultTask) {
	defaultTask.push('pug:build');
	
	gulp.task('pug:build', function () {
		
		return gulp.src(config.src)
			.pipe(through2(function (file, enc, callback) {
				var filepath = file.base + file.relative;
				var dependencies = tree[filepath];
				
				if (!dependencies ||
					filepath == global.changedTempalteFile ||
					(tree[filepath] && tree[filepath].indexOf(global.changedTempalteFile) != -1)) {
					
					updateTree(filepath);
					console.log('---to pug--- ' + filepath);
					callback(null, file);
					
				} else {
					callback();
				}
				
				/*tree[filepath].forEach((p)=>{
				 console.log(p);
			 	});*/
				
				return;
			}))
			.pipe(pug({
				pretty: '\t'
			}).on('error', function (e) {
				console.error(e.message);
				this.end();
			}))
			.pipe(flatten({ includeParents: 0 }))
			.pipe(gulp.dest(config.dist));
	});
	
	if(!global.isProd) {
		// pug
		watch(config.watch.pug, function(file) {
			global.changedTempalteFile = file.path;
			gulp.start('pug:build');
		});
		
		// html
		watch(config.watch.html)
				.on('change', function (event) {
					console.log(`change html ${event.path}`);
					serv.reload();
				});
	}
};