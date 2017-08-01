const Form = require('../form');

module.exports = function () {
	const $formRecovery = $('.form_recovery');
	
	new Form($formRecovery, {
		onSuccess: function(data, self) {
			self.showMessage('Сообщение об успешной регистрации. Приходит с сервера')
		}
	});
};