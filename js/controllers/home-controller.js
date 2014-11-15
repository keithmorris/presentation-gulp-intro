(function () {
	"use strict";
	var app;
	try {
		app = angular.module(appInfo.moduleName);
	} catch (e) {
		app = angular.module(appInfo.moduleName, appInfo.deps);
	}

	app.controller('HomeController', [
        '$scope',
        '$routeParams',
        function ($scope, $routeParams) {
		$scope.name = "HomeController";
		$scope.params = $routeParams;
		$scope.pageClass = 'page-home';
        $scope.state.beverageType = null;
        $scope.state.subNavTemplate = null;
        $scope.state.footerTemplate = null;

	}])
	
}());
