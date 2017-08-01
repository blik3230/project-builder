/**
 * Created by ITUA on 16.06.2017.
 */
const initFormChangePass = require('../../components/forms/form_change-pass/form_change-pass');

function init() {
	if( !$('.page-change-pass')[0]) return;
	
	initFormChangePass();
}

module.exports = init;