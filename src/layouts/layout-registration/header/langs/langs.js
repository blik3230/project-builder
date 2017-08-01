/**
 * Created by ITUA on 13.06.2017.
 */

module.exports = init;

function init() {
	
	$('.langs__toggle').on('click', function () {
		const $rootEl = $(this).closest('.langs');

		if($rootEl.hasClass('langs_open')) {
			close()
		} else {
			open();
		}
		
		function open() {
			$rootEl.addClass('langs_open');
			document.body.addEventListener('click', onBodyClick);
		}
		
		function close() {
			$rootEl.removeClass('langs_open');
			document.body.removeEventListener('click', onBodyClick);
		}
		
		function onBodyClick(e) {
			let el = e.target;

			while(el != $rootEl[0] && el != document.body) {
				el = el.parentElement;
			}

			if(el == document.body) {
				close();
			}
		}
	});
}