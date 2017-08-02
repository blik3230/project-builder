/**
 * Created by ITUA on 01.08.2017.
 */
var app = angular.module('builder',[]);

app.service('pageListService', function ($http) {
	function getPages() {
		return $http.post('/pages');
	}

	function addNewPage(data, cb) {
		$http.post('/add-page', data)
				.then(result => {
					cb(result.data);
				})
	}

	return {
		getPages: getPages,
		addNewPage: addNewPage
	}
});

app.controller('PageListController', function (pageListService) {
	pageListService.getPages()
			.then(result => {
				this.pages = result.data;
				this.currentPage = this.pages[0].html;
			});

	this.newPage = {};

	this.displayPage = function(page) {
		this.currentPage = page.html;
	};

	this.addNewPage = function() {
		if(!this.newPage.pugName) return;

		const data = {
			page_name: this.newPage.pugName,
			page_html: this.newPage.htmlName || this.newPage.pugName,
		};

		pageListService.addNewPage(data, result => {
			this.pages = result.pages;
			console.log(result)
			this.newPage.htmlName = this.newPage.pugName = this.showFormAddPage = null;
		});
	}
});

app.directive('pageList', function () {
	return {
		restrict: 'E',
		template: `
		<ol class="list-pages">
			<li class="list-pages__item" ng-repeat="page in pageList.pages">
				<a class="link" target="_blank" ng-href="{{page.html}}" ng-mouseenter="pageList.displayPage(page)">{{page.name}}</a>
			</li>
		</ol>
	`
	}
});


// todo: Прописать правельные название страницы в списке, название страници в проекте
// todo: Все изменения делаются через конфиг.
// todo: переименовать project-config.json в pages.json