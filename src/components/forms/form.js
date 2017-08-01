require('../../utils/js/jquery.validate');
const ServerErr = require('./form__server-err/form__server-err');
const sendForm = require('./sendForm');

const defaultSetting = {
	onSuccess: function (data, self) {
		self.showMessage('тут будет вставлен текст с сервера')
	},
	onError: function (error, self) {
		self.serverErr.showError(error);
	}
};

const serverErrorText = {
	ru: 'Сервер временно недоступен. Пожалуйста, попробуйте позже.',
	en: 'The server is temporarily unavailable. Please try again later.',
	ua: 'Сервер тимчасово недоступний. Будь-ласка, спробуйте пізніше.'
};

/**
 * Объект для работы с формой.
 * Включает в себя:
 * валидацию, поле bitrix местоположение, отображение ошибок сервера.
 * @param $form {jQuery} - элемент формы (должен быть 1)
 * @param setting
 * @param setting.onSuccess {Function} Колбек успешной отправки формы на сервер
 * @param setting.onError {Function} Колбек ошибки отправки формы на сервер
 * @constructor
 */
function Form($form, setting) {
	this.setting = $.extend({}, defaultSetting, setting);
	
	this.$form = $form;
	this.serverErr = new ServerErr($form);
	this.btnSubmit = $form.find('.form__submit');
		
	this.initHandlers()
}

Form.prototype.initHandlers = function () {
	
	// submit формы
	this.handleSubmit = this.handleSubmit.bind(this);
	this.btnSubmit.on('click', this.handleSubmit);
	
	// клик по кнопке OK в элементе form__message
	this.$form.find('.form__btn-close-message')
			.on('click', () => {
				this.hideMessage();
			})
};

Form.prototype.handleSubmit = function(e) {
	e.preventDefault();
	
	const $form = this.$form;
	
	if($form.validate()) {
		this.sendForm();
	}
	
};

Form.prototype.sendForm = function () {
	const self = this;
	const xhr      = new XMLHttpRequest();
	const formDate = new FormData(this.$form.get(0));
	const url = this.$form.attr('action');
	const sessid = window.BX && window.BX.bitrix_sessid();
	
	const sendSuccess = this.setting.onSuccess;
	const sendError = this.setting.onError;
	
	this.showPreloader();
	
	formDate.append('sessid', sessid);
	formDate.append('ajax', 'y');
	
	xhr.open('POST', url);
	xhr.send(formDate);
	xhr.onreadystatechange = function () {
		let resp;
		
		if(this.readyState != 4) return;
		
		self.hidePreloader();
		
		if (this.status != 200) {
			let lang = $(document.body).data('language');
			lang = serverErrorText[lang]? lang: 'ua';
			sendError(serverErrorText[lang], self);
			return;
		}
		
		console.log(this.responseText);
		resp = JSON.parse(this.responseText);
		
		if(resp['TYPE'] == 'OK') {
			sendSuccess(resp, self);
			return;
		}
		
		sendError(resp['MESSAGE'], self);
	};
};

Form.prototype.showMessage = function(msg) {
	const $textSuccess = this.$form.find('.form__text-success');
	
	if($textSuccess[0]) {
		$textSuccess.text(msg);
		this.$form.addClass('form_show-message');
	} else {
		console.warn('Сообщение с сервера не выводится, не хватает элементов form__message>form__text-success')
	}
};

Form.prototype.hideMessage = function() {
	this.$form[0].reset();
	this.$form.removeClass('form_show-message');
};

Form.prototype.showPreloader = function () {
	this.btnSubmit
			.addClass('btn_show-preloader')
			.attr('disable', true)
	;
};

Form.prototype.hidePreloader = function () {
	this.btnSubmit
			.removeClass('btn_show-preloader')
			.attr('disable', false);
};
module.exports = Form;