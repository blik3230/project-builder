/**
 * Created by ITUA on 31.07.2017.
 */
const fs = require('fs');
const path = require('path');
const async = require('async');

function getPages(dirPath, callback) {

	fs.readdir(dirPath, (err, files) => {
		if(err) return callback(err);

		let filePaths = [];
		async.eachSeries(files, (fileName, eachCallback) => {
			let filePath = path.join(dirPath, fileName);

			fs.stat(filePath, (err, stat) => {
				if(err) return eachCallback(err);

				if(stat.isDirectory()) {
					getPages(filePath, (err, subDirFiles) => {
						if(err) return eachCallback(err);

						filePaths = filePaths.concat(subDirFiles);
						eachCallback(null);
					});
				} else {
					if(stat.isFile() && /.pug$/.test(filePath)) {
						const filename = path.basename(filePath, '.pug');

						getPageConfig(filename, (config) => {
							filePaths.push(config);
							eachCallback(null);
						});
					} else {
						eachCallback(null);
					}
				}
			});
		}, function(err) {
			callback(err, filePaths);
		});
	});
}

function getNextSortIndex(cb) {
	getPages(pages => {
		cb(pages.length);
	})
}

function getPageConfig(pagePath, cb) {
	const pagename = path.basename(pagePath, '.pug');
	const dirPath = path.dirname(pagePath);
	const configPath = path.join(dirPath, pagePath + '.json');

	fs.readFile(configPath, (err, data) => {
		if(err) {
			if (err.code === "ENOENT") {
				getNextSortIndex((id) => {

					const config = {
						id: id,
						name: pagename,
					};

					createConfigFile(pagePath, config, () => {
						console.log('Создан файл настроек страницы');
						cb(config);
					});
				});

				return;
			} else {
				throw err;
			}
		}

		cb(JSON.parse(data));
	});
}

function createConfigFile(path, configData, cb) {

	fs.writeFile(path, JSON.stringify(configData), (err) => {
		if(err) throw err;
		cb();
	});
}

getPageConfig(configPath, (config) => {
	console.log('Получен объект настроек');
	console.log(config);
});