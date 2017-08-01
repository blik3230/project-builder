function init() {
	var elFrame = document.getElementById('iframe'),
	    curLink = null,
	    links   = document.getElementsByTagName('a');

	for (var i = 0; i < links.length; i += 1) {
		links[i].addEventListener('focus', handle, false);
		links[i].addEventListener('mouseenter', handle, false);

		if (!i) {
			links[i].focus();
		}
	}

	function handle() {
		if (curLink) {
			curLink.classList.remove('active');
		}

		curLink = this;
		curLink.classList.add('active');

		elFrame.src = curLink.href;
	}
}

function getPages(cb) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/pages');

	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
			alert('ошибка');
		} else {
			cb(JSON.parse(this.response));
		}
	};

	xhr.send();
}

function addPage() {
	const pageName = prompt('Введите имя страницы');

	if (!pageName) return;

	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/add-page');

	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
			alert('ошибка');
		} else {
			console.log(this.response);
		}
	};

	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.send(JSON.stringify({
		page_name: pageName
	}));

}

document.addEventListener('DOMContentLoaded', function () {
	getPages(function (pages) {
		pages.push({
			name: 'svg-symbols-demo-page'
		});

		const html = pages.map(page => {
			if (page.name == 'index') return;

			return `
				<li class="list-pages__item"><a class="link" href="${page.name}.html" target="_blanck">${page.name}</a></li>
			`;
		}).join('');

		document.querySelector('.list-pages').innerHTML = html;
		init();
	});
});

