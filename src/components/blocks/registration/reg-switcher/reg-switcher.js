/**
 * Created by ITUA on 14.06.2017.
 */
module.exports = function() {
	const el = document.querySelector('.reg-switcher');
	const btnRecovery = el.querySelector('.reg-switcher__btn-recovery');
	const btnLogin = el.querySelector('.reg-switcher__btn-login');
	
	btnRecovery.addEventListener('click', function () {
		el.classList.add('reg-switcher_show-recovery');
	});
	
	btnLogin.addEventListener('click', function () {
		el.classList.remove('reg-switcher_show-recovery');
	});
};