/**
 * Created by ITUA on 13.06.2017.
 */

const initHeader           = require('../../layouts/layout-registration/header/header');
const initPageRegistration = require('../../pages/registration/page-registration');
const initPageChangePass = require('../../pages/change-pass/page-change-pass');

$(function () {
	initHeader();
	initPageRegistration();
	initPageChangePass();
});

