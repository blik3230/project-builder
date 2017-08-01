/**
 * Created by ITUA on 14.11.2016.
 *
 * init modules for header
 */
const initLangs = require('./langs/langs');

module.exports = init;

function init(opts) {
	initLangs();
}