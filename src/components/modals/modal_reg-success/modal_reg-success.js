/**
 * Created by ITUA on 15.06.2017.
 */
require('magnific-popup');

module.exports = function() {
	const $modal = $('#modal-reg-success');
	const $btnClose = $modal.find('.modal__btn-close');
	
	window.itua = window.itua || {};
	window.itua.modalRegSuccess = {
		$el: $modal,
		open: function(data) {
			console.log('open modal server-resp');
			
			if(data) {
				
				if(data.title) {
					this.setTitle(data.title);
				}
				
				if(data.desc) {
					this.setDesc(desc);
				}
			}
			
			$.magnificPopup.open({
				type:         'inline',
				mainClass:    'mfp-zoom-in',
				removalDelay: 300,
				showCloseBtn: false,
				items:        {
					src: this.$el
				}
			})
			
		},
		setTitle: function(text) {
			this.$el.find('.modal__title').text(text);
		},
		setDesc: function(text) {
			this.$el.find('.modal__desc').text(text);
		},
		close: function () {
			$.magnificPopup.close();
		}
	};
	
	$btnClose.on('click', function () {
		window.itua.modalRegSuccess.close();
	})
};