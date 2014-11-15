(function () {
	"use strict";
	var app;
	try {
		app = angular.module(appInfo.moduleName);
	} catch (e) {
		app = angular.module(appInfo.moduleName, appInfo.deps);
	}

	app.filter('reverse', function () {
		return function (items) {
			return items.slice().reverse();
		};
	})
}());
