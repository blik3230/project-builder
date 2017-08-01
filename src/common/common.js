/**
 * Created by ITUA on 16.11.2016.
 */
//require('magnific-popup');

module.exports = {
	init: init
};

function init() {
	// default modals
	var $defaultModals = $('.js-btn-modal');
	
	if($defaultModals[0]) {
		$defaultModals
			.magnificPopup({
				type: 'inline',
				mainClass: 'mfp-zoom-in',
				focus: 'input',
				removalDelay: 300,
				showCloseBtn: false
			});
	}
	
	
	$('.js-modal-close').on('click', function () {
		$.magnificPopup.close();
	});
	
	// common custom select3230
	var $select3230 = $('.js-select3230');
	
	// masked input
	
}