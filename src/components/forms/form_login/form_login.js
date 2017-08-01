const Form = require('../form');

module.exports = function() {
	const $formLogin = $('.form_login');
	
	new Form($formLogin, {
		onSuccess: function(result, self) {
			let curLanguage = document.body.dataset.language;
			
			// todo: внести актуальные ссылки
			const links = {
				ua: '/',
				ru: '/ru/'
			};
			
			curLanguage = links[curLanguage]? curLanguage: 'ua';
			
			window.location.href = links[curLanguage];
		}
	});
};