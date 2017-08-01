/**
 * Created by ITUA on 21.06.2017.
 */

function BxLocation($root) {
	this.$root = $root;
	this.$label = $root.find('.bx-location__label');
	this.$search = $root.find('.bx-location__inp');
	this.$list = $root.find('.bx-location__list');
	this.$cityVal = $root.find('.bx-location__city-val');
	
	this.lang = $(document.body).data('language') || 'ua';
	this.activeItem = null;
	this.isOpenPopup = false;
	this.callbackSelect = $root.data('callback');
	
	// превязка контекста к обработчикам
	this.onLabelClick = this.onLabelClick.bind(this);
	this.onBodyClick  = this.onBodyClick.bind(this);
	this.onSearchInput  = this.onSearchInput.bind(this);
	this.onItemClick  = this.onItemClick.bind(this);
	
	
	this.$label.on('click' , this.onLabelClick);
	let self = this;
	this.$label.on('keydown', function (e) {
		const key = e.key.toLowerCase();
		console.log(key);
		
		if(key == 'tab') return;
		
		if(key == ' ' || key == 'enter' || key == 'arrowdown') {
			self.openPopup();
			return false;
		}
	});
	
	this.$label.on('blur', function () {
	
	});
	this.$search.on('input' , this.onSearchInput);
	this.$search.on('keydown' , function(e) {
		if(e.key.toLowerCase() == 'tab') {
			self.closePopup();
		}
	});
	this.$list.on('click', '.bx-location__item', this.onItemClick);
}

BxLocation.prototype.openPopup = function () {
	this.isOpenPopup = true;
	this.$root.addClass('bx-location_open');
	this.$search.focus();
	$(document.body).on('click', this.onBodyClick);
};

BxLocation.prototype.closePopup = function () {
	this.isOpenPopup = false;
	this.$root.removeClass('bx-location_open');
	$(document.body).off('click', this.onBodyClick);
};

BxLocation.prototype.getListOfCity = function (phrase) {
	const lang = this.lang;
	
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const formData = new FormData();
		
		formData.append('select[1]', 'CODE');
		formData.append('select[VALUE]', 'ID');
		formData.append('select[DISPLAY]', 'NAME.NAME');
		formData.append('additionals[1]', 'PATH');
		formData.append('filter[=PHRASE]', phrase);
		formData.append('filter[=NAME.LANGUAGE_ID]', lang);
		formData.append('version', 2);
		formData.append('PAGE_SIZE', 10);
		formData.append('PAGE', 0);
		
		window.BX && formData.append('sessid', window.BX.bitrix_sessid());
		
		xhr.open(
				'POST',
				'/bitrix/components/bitrix/sale.location.selector.search/get.php'
		);
		
		xhr.send(formData);
		
		xhr.onreadystatechange = function () {
			if (this.readyState != 4) return;
			
			
			if (this.status != 200) {
				// обработать ошибку
				reject('ошибка сервера');
				return;
			}
			
			const resp = JSON.parse(toTwoBrases(this.responseText));
			resolve(resp.data);
			
			console.log(resp)
		};
	});
};

BxLocation.prototype.showList = function() {
	this.$root.addClass('bx-location_not-empty');
};

BxLocation.prototype.hideList = function() {
	this.$root.removeClass('bx-location_not-empty');
};

BxLocation.prototype.renderList = function (data) {
	const items = data.ITEMS;
	const pathItems = data.ETC.PATH_ITEMS;
	console.log(items);
	console.table(pathItems);
	
	if(!items.length) {
		this.hideList();
		return;
	}
	
	let template = items
			.map(item => {
				
				const paths = item['PATH'];
				let pathOfCity = paths.map(path => {
					return ', ' + pathItems[path]['DISPLAY'];
				}).join('');
				
				
				const fullName = toOneBrases(`${item['DISPLAY']}${pathOfCity} `);
				
				return `
					<li class="bx-location__item" 
						data-value="${item['VALUE']}" 
						data-name="${item['DISPLAY']}"
						data-code="${item['CODE']}">${fullName}</li>
				`;
			})
			.join('');
	
	this.$list.html(template);
	this.showList();
};

BxLocation.prototype.selectItem = function($item) {
	const fullName = $item.text();
	const name = $item.data('name');
	const cityID = $item.data('value');
	const code = $item.data('code');
	
	
	this.$label.val(fullName);
	this.$cityVal.val(cityID);
	
	if(this.callbackSelect) {
		
		if(!window[this.callbackSelect]) {
			console.error(`Нет функции ${this.callbackSelect}`)
		} else {
			const data = {
				ID: cityID,
				CODE: code,
				NAME: name,
				FULL_NAME: fullName
			};
			window[this.callbackSelect](data)
		}
	}
};

// handlers
BxLocation.prototype.onLabelClick = function (e) {
	e.stopPropagation();
	
	if(this.isOpenPopup) {
		this.closePopup();
	} else {
		this.openPopup();
	}
};

BxLocation.prototype.onBodyClick = function(e) {
	const $target = $(e.target);
	console.log('body click');
	
	if($target.is(this.$label) || $target.closest('.bx-location')[0]) {
		return;
	}
	
	this.closePopup();
};

BxLocation.prototype.onSearchInput = function (e) {
	const val = this.$search.val();
	const self = this;
	
	if(val.length > 1) {
		this.getListOfCity(val)
				.then(
						resp => {
							self.renderList(resp);
						},
						err => {
							console.log(err);
						}
				)
	} else {
		this.hideList();
	}
};

BxLocation.prototype.onItemClick = function (e) {
	const $item = $(e.target);
	this.selectItem($item);
	this.closePopup();
};

function toOneBrases(str) {
	return str.replace(/"/g, '\'');
}

function toTwoBrases(str) {
	return str.replace(/'/g, '"');
}

module.exports = BxLocation;