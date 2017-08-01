/**
 * Created by Владыка Макс on 09.02.2017.
 */

const modal = require('../madal');


function clickBtn(el) {
	
}

let el = document.querySelectorAll('btn-modal');



document.addEventListener('click', function (event) {
	
	if(event.target.classList.contains('btn-modal')) {
		initModal(event.target);
	}
	
});

function initModal(el) {
	el.modal({
		el: el,
		
	});
}

