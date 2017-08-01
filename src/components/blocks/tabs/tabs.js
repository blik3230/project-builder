/**
 * Created by ITUA on 14.06.2017.
 */

module.exports = function() {
	const allTabs = $('.tabs');
	
	allTabs.each(function () {
		new Tabs($(this));
	});
};

const classNameOfActiveNavItem = 'tabs__nav-item_active';
const classNameOfActiveTab = 'tabs__item_active';

function Tabs($root) {
	let self = this,
	    curTab,
	    currentTabName;
	
	this.$navItems = $root.find('.tabs__nav-item');
	this.$tabs = $root.find('.tabs__item');
	
	curTab = $root.find(`.${classNameOfActiveNavItem}`);
	currentTabName = curTab.data('target') || this.$navItems.eq(0).data('target');
	
	this.openTab(currentTabName);
	
	this.$navItems.on('click', function() {
		const tabName = $(this).data('target');
		
		self.openTab(tabName);
	});
}

Tabs.prototype.openTab = function (tabName) {
	this.$navItems
			.filter(`.${classNameOfActiveNavItem}`)
			.removeClass(classNameOfActiveNavItem);
	
	this.$navItems
			.filter(`[data-target="${tabName}"]`)
			.addClass(classNameOfActiveNavItem);
	
	this.$tabs
			.filter(`.${classNameOfActiveTab}`)
			.removeClass(classNameOfActiveTab);
	
	this.$tabs
			.filter(`[data-tab="${tabName}"]`)
			.addClass(classNameOfActiveTab);
};