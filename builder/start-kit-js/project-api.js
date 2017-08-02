/**
 * Created by ITUA on 31.07.2017.
 */
const fs   = require('fs');
const path = require('path');
const async = require('async');

const configPath = path.normalize('./project-config.json');
const pagesDirPath = path.normalize('./src/pages');

function getConfig(callback) {

	readConfigFile((error, config) => {
		if(error) {
			// только если файл небыл создан.

			gatherConfig(pagesDirPath, (err, pages) => {
				if(err) {
					console.log('Ошибка при поиске файлов pug');
					console.error(err);
				} else {
					writeConfig(pages, (config) => {
						console.log('Конфиг файл записан!');
						callback(config);
					})
				}
			});
		} else {
			callback(config);
		}
	});
}

function readConfigFile(callback) {
	fs.readFile(configPath, (err, data) => {
		if(err) {

			if(err.code == 'ENOENT') {
				console.log('файл конфига не создан');
				console.log(pagesDirPath);
				callback(err);
			} else {
				console.log('Ошибка при чтении файла');
				throw err;
			}
				return;
		}

		callback(null, JSON.parse(data));
	});
}

function writeConfig(data, callback) {

	fs.writeFile(configPath, JSON.stringify(data), (err) => {
		if(err) {
			console.error('При записи файла настроек произошла ошибка');
		}

		callback(data);
	});
}

function updateConfig(callback) {

}

function addPage(newPage, callback) {
	const pageName = newPage.pageName;
	const dirPath = path.join(pagesDirPath, pageName);
	fs.stat(dirPath, (err, stat) => {
		if(!err) {
			callback('Ошибка, такая страница уже существует.');
			return;
		}

		if(err.code === 'ENOENT') {
			// создаем файлы и подключаем scss
			fs.mkdir(dirPath, (err) => {

				createPageFiles(pageName, (err, result) => {
					if(err) {
						callback(err);
					}

					readConfigFile((err, config) => {
						if(err) {
							console.log('ошибка при создании стриници, не могу прочитать конфиг')
							callback('ошибка при создании стриници, не могу прочитать конфиг');
							return;
						}

						config.push({
							html: newPage.htmlName + '.html',
							name: newPage.pageName,
							path: dirPath + newPage.pageName + '.pug'
						});

						writeConfig(config, r => {
							callback(null, {
								result: result,
								pages: r
							});
						})
					});

				});
			});

			return;
		}

		throw err;
	});
}

function createPageFiles(pageName, callback) {
	const dirForNewPage = path.join(pagesDirPath, pageName);
	const dataForPug = 'extends ../../layouts/layout-registration/layout-registration';
	let counterOfFiles = 0;

	fs.writeFile(path.join(dirForNewPage, pageName + ".js"), 'test', (err) => {
		if(err && err.code !== 'ENOENT') {
			throw err;
		}

		checkCounter();
	});

	fs.writeFile(path.join(dirForNewPage, pageName + ".pug"), dataForPug, (err) => {
		if(err && err.code !== 'ENOENT') {
			throw err;
		}

		checkCounter();
	});

	fs.writeFile(path.join(dirForNewPage, pageName + ".scss"), `.${pageName} {}`, (err) => {
		if(err && err.code !== 'ENOENT') {
			throw err;
		}

		checkCounter();
	});

	fs.writeFile(path.join(dirForNewPage, "_index.scss"), `@import "${pageName}";\n`, (err) => {

		fs.appendFile(path.join(pagesDirPath, "_index.scss"), `@import "${pageName}/index";\n`, (err) => {
			if(err && err.code !== 'ENOENT') {
				throw err;
			}

			checkCounter();
		});
	});

	function checkCounter() {
		counterOfFiles +=1;

		if(counterOfFiles == 4) {
			callback(null, 'Все файлы записаны')
		}
	}
}

/**
 * Соберает информацию о страницах в проекте.
 * Когда все файлы и папки рекурсивно пройденны
 * вернет в callback массив страниц
 * @param {String} dirPath - путь к папке
 * @param {Function} callback
 */
function gatherConfig(dirPath, callback) {

	fs.readdir(dirPath, (err, files) => {
		if(err) {
			console.log('Ошибка чтения папки cо страницами', dirPath);
			callback(err);
			return;
		}

		let filePaths = [];

		async.eachSeries(files, (fileName, eachCallback) => {
			const filePath = path.join(dirPath, fileName);

			fs.stat(filePath, (err, stat) => {
				if(err) return eachCallback(err);

				if(stat.isDirectory()) {
					gatherConfig(filePath, (err, subDirFiles) => {
						if(err) return eachCallback(err);

						filePaths = filePaths.concat(subDirFiles);
						eachCallback(null);
					})
				} else {
					if(stat.isFile() && /.pug$/.test(filePath)) {
						const name = path.basename(filePath, '.pug');

						filePaths.push({
							html: name + '.html',
							name: name,
							path: filePath
						});
					}

					eachCallback(null);
				}
			});
		}, function(err) {
			callback(err, filePaths);
		});
	});
}

exports.getConfig = getConfig;
exports.addPage = addPage;
