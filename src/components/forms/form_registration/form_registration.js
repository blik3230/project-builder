/**
 * Created by ITUA on 15.06.2017.
 */
require('jquery-mask-plugin/dist/jquery.mask.min.js');

const Form = require('../form');
const BXLocation = require('../fields/bx-location/bx-location');

module.exports = function() {
	const $formRegistration = $('.form_registration');
	
	//инициализация bx-location
	new BXLocation($('.bx-location'));
	
	//init mask for input name phone
	$formRegistration.find('input[name="phone"]').mask(
			'0NNNNNNNNN',
			{
				placeholder: "0441234567",
				translation: {
					N: {
						pattern: /[0-9*]/
					},
					0: {
						pattern: /0/
					}
				}
			}
	);
	
	new Form($formRegistration, {
		onSuccess: function (data, self) {
			itua.modalRegSuccess.open();
			self.$form[0].reset();
		}
	});
};