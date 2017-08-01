/**
 * Created by ITUA on 20.06.2017.
 */

module.exports = ServerErr;

function ServerErr($form) {
	this.$serverErr = $form.find('.server-err');
	this.$btnSubmit = $form.find('.form__submit');
	
	if(!this.$serverErr[0]) throw new Error(`У формы \'${$form.attr('class') }\' нет разметки \'.server-err\' для вывода ошибки`);
}

ServerErr.prototype.showError = function (err) {
	const self = this;
	
	this.$serverErr.find('.server-err__text').text(err);
	this.$serverErr.addClass('server-err_show');
	
	const topOfScreen = this.$serverErr.get(0).getBoundingClientRect().top;
	
	if(topOfScreen < 0 || topOfScreen > window.innerHeight) {
		scrollPageToEl(this.$serverErr);
	}
	
	
	this.$btnSubmit.one('click', function () {
		self.hideError();
	})
};

ServerErr.prototype.hideError = function () {
	this.$serverErr.removeClass('server-err_show');
};

function scrollPageToEl($el) {
	let scrollPosition = $el.offset().top + $el.height() + 10 - window.innerHeight;
	
	$('html, body').animate({
		scrollTop: scrollPosition
	})
}
