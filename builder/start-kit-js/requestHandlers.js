/**
 * Created by ITUA on 28.07.2017.
 */
const pageList = require('./getPagesList');
const projectAPI = require('./project-api');
const path = require('path');

exports.indexPage = function(req, res) {
	res.sendFile(path.normalize('./dist/index.html'));
};

exports.getPages = function (req, res) {
	projectAPI.getConfig(config => {
		res.send(JSON.stringify(config));
	});
};

exports.writeConfig = function (req, res) {
	pageList.writeConfig(pages => {
		res.send(pages);
	});
};

exports.addPage = function (req, res) {
	const newPage = {
		pageName: req.body['page_name'],
		htmlName: req.body['page_html']
	};

	projectAPI.addPage(newPage, (err, result) => {
		if(err) {
			res.send(err);
		} else {
			res.send(result);
		}
	})
};

exports.getConfig = function (req, res) {

};