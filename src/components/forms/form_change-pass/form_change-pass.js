/**
 * Created by ITUA on 16.06.2017.
 */

function init() {
	const $formChangePass = $('.form_change-pass');
	
	$formChangePass.find('.form__submit').on('click', function (e) {
		e.preventDefault();
		
		if( !$formChangePass.validate() ) return;
		
		console.log('validate ok')
		
	});
}

module.exports = init;