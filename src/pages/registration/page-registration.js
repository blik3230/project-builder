/**
 * Created by ITUA on 15.11.2016.
 */

const initModalRegSuccess  = require('../../components/modals/modal_reg-success/modal_reg-success');
const initTabs             = require('../../components/blocks/tabs/tabs');
const initRegSwitcher      = require('../../components/blocks/registration/reg-switcher/reg-switcher');
const initFormRegistration = require('../../components/forms/form_registration/form_registration');
const initFormLogin = require('../../components/forms/form_login/form_login');
const initFormRecovery = require('../../components/forms/form_recovery/form_recovery');

function init() {
	if( !$('.page-registration')[0] ) return;
	
	initModalRegSuccess();
	initTabs();
	initRegSwitcher();
	initFormRegistration();
	initFormLogin();
	initFormRecovery()
}

module.exports = init;
