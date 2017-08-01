/**
 * Created by ITUA on 06.01.2017.
 */
let Validator = {
	email: function($field, lang) {
		let val = $field.val();
		
		if(!/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}\s*$/ig.test(val)) {
			let msg = $field.data('error-type') || this._errMsgs[lang].email;
			this._showError($field, msg);
			return false;
		}
		
		return true;
	},
	
	phone: function($field, lang) {
		let val = $field.val();
		
		if(!/^0\d{9}$/.test(val)) {
			let msg = $field.data('error-type') || this._errMsgs[lang].phone;
			this._showError($field, msg);
			return false;
		}
		
		return true;
	},
	
	pass: function($field, lang) {
		let val = $field.val();
		
		if(val.length < 6) {
			let msg = $field.data('error-type') || this._errMsgs[lang].pass;
			this._showError($field, msg);
			return false;
		}
		
		this.tmpPass = val;
		return true;
	},
	
	phonemail: function($field, lang) {
		const val = $field.val();
		
		// если нет собаки и нет не одной буквы то это телефон, иначе mail
		if( /^.*[a-zA-Zа-яА-Я@]+.*$/.test(val) ) {
			return this.email($field, lang);
		}
			
		return this.phone($field, lang);
	},
	
	confpass: function($field, lang) {
		let pass = this.tmpPass;
		let val = $field.val();
		
		if(!pass) {
			// ошибка валидации поля пароль
			// подтверждение пароля не проверяем
			return true;
		}
		
		this.tmpPass = null;
		
		if(pass != val) {
			let msg = $field.data('error-type') || this._errMsgs[lang].confpass;
			this._showError($field, msg);
			return false;
		}
		
		return true;
	},
	
	integer: function($field, lang) {
		let val = $field.val(),
			validLength = $field.data('valid-length');
		
		if(val.search(/\D/) != -1) {
			let msg = $field.data('error-type') || this._errMsgs[lang].integer;
			this._showError($field, msg);
			return false;
		}
		
		if(validLength) {
			if (val.length != validLength) {
				this._showError($field, `Должно быть ${validLength} символов`);
				return false;
			}
		}
		
		return true;
	},
	
	float: function($field) {
		
		return true;
	},
	
	select: function($field, lang) {
		
		if($field.val().length) {
			// поле заполненно
			return true;
		}
		
		let msg = $field.data('error-type') || this._errMsgs[lang].required;
		this._showError($field, msg);
		return false;
	},
	
	required: function($field, lang) {
		
		if($field.val().length) {
			// поле заполненно
			return true;
		}
		
		let msg = $field.data('error-required') || this._errMsgs[lang].required;
		
		this._showError($field, msg);
		return false;
	},
	_resetErrMsg: function($field) {
		$field
				.removeClass('form__field_error')
				.closest('.form__wrap-field').removeClass('form__wrap-field_error');
	},
	_showError: function($field, msg) {
		const self = this;
		msg = $field.data('valid-msg') || msg;
		
		let $formError = $field.siblings('.form__msg-error');
		
		if(!$formError[0]) {
			$formError = $('<div class="form__msg-error"></div>');
			$field.after($formError);
		}
		
		$formError.text(msg);
		
		setTimeout(function () {
			$field
					.addClass('form__field_error')
					.closest('.form__wrap-field').addClass('form__wrap-field_error');
		}, 50);
		
		$field.one('focus',function() {
			self._resetErrMsg($field);
		});
	},
	_required: function($field, lang) {
				
		if($field.prop('required')) {
			return this.required($field, lang);
		}
		
		return true;
	},
	_validate: function($field, lang) {
		let type = $field.data('type-of-validate');
		
		if( !type || !(type in this) ) {
			// проверка по типу не производится
			// тип или не указан или указан неверно
			return true;
		}
		
		return this[type]($field, lang);
	},
	_errMsgs: {
		ru: {
			email: 'Некорректное значение email',
			required: 'Заполните поле',
			phone: 'Формат телефона 0441234567',
			integer: 'Укажите правильное значение',
			pass: 'Не меньше 6-ти символов',
			confpass: 'Пароли не совпадают'
		},
		ua: {
			email: 'Некоректне значення email',
			required: 'Заповніть поле',
			phone: 'Формат телефону 0441234567',
			integer: 'Вкажіть правильне значення',
			pass: 'Не менше 6-ти символів',
			confpass: 'Паролі не збігаються'
		}
	}
};

const defaultLanguage = 'ua';

$.fn.validate = function() {
	let $form         = this,
	    $fields       = $form.find('.js-validate'),
	    resValidation = true,
	    lang = $('body').data('language');
	
	lang = Validator._errMsgs[lang] ? lang : 'defaultLanguage';
	
	$form.prop('novalidate', true);
	
	$fields.each(function () {
		let $field = $(this);
		
		Validator._resetErrMsg($field);
		
		if($field.is(':hidden')) {
			// скрытое поле не проверяем
			return;
		}
		
		if(!Validator._required($field, lang) || !Validator._validate($field, lang)) {
			resValidation = false;
		}
	});
	
	return resValidation;
};