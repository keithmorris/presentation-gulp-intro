(function () {
	"use strict";
	var app;
	try {
		app = angular.module(appInfo.moduleName);
	} catch (e) {
		app = angular.module(appInfo.moduleName, appInfo.deps);
	}

	app
		.config([
			'$routeProvider',
			'$locationProvider',
			'mapLocatorProvider',
			'productServiceProvider',
			function ($routeProvider, $locationProvider, mapLocatorProvider, productServiceProvider) {

				productServiceProvider.init({
					svcUrl: "/data/products.json" //also configured in app/controllers/BeveragesBaseController.php
				});

				mapLocatorProvider.init({
					zipcode: "null"
				});

				$routeProvider
					.when('/', {
						templateUrl: function(params) {
							params.locator = false; 
							return "/viewapi/"
						},
						controller : 'HomeController'
					})
					// GOLD PEAK TEA
					.when('/tea', {
						templateUrl: function(params) {
							params.category = "tea"
							return "/viewapi/tea/index"
						},
						controller : 'StaticPageController'
					})
					.when('/tea/gold-peak-products/', {
						templateUrl: "/viewapi/tea/gold-peak-products",
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/flavor', { 
						templateUrl: function (params) {
							params.group = "flavor";
							return "/viewapi/tea/gold-peak-products";
						},
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/size', { 
						templateUrl: function (params) {
							params.group = "size";
							return "/viewapi/tea/gold-peak-products";
						},
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/size/:size', { 
						templateUrl: function (params) {
							params.group = "size";
							return "/viewapi/tea/gold-peak-products";
						},
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/size/:size/filter/:filter', {
						templateUrl: function (params) {
							params.group = "size";
							return '/viewapi/tea/gold-peak-products';
						},
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/flavor/:flavor', {
						templateUrl: function (params) {
							params.group = "flavor";
							return '/viewapi/tea/gold-peak-products';
						},
						controller : 'TeaController'
					})
					.when('/tea/gold-peak-products/flavor/:flavor/filter/:filter', {
						templateUrl: function (params) {
							params.group = "flavor";
							return '/viewapi/tea/gold-peak-products';
						},
						controller : 'TeaController'
					})
					//END GOLD PEAK TEA

					//GOLD PEAK COFFEE

					.when('/coffee', {
						templateUrl: function(params) {
							params.category = "coffee"
							return "/viewapi/coffee/index"
						},
						controller : 'StaticPageController'
					})

					.when('/coffee/sell-gold-peak-coffee', {
						templateUrl: function(params) {
							params.category = "coffee"
							return "/viewapi/coffee/sell-gold-peak-coffee"
					},
						controller : 'StaticPageController'
					})

					.when('/coffee/gold-peak-products', {
						templateUrl: function (params) {
						params.group = "flavor";
						return "/viewapi/coffee/gold-peak-products"
					},
						controller : 'CoffeeController'
					})
					.when('/coffee/gold-peak-products/flavor/:flavor', {
						templateUrl: function (params) {
							params.group = "flavor";
							return '/viewapi/coffee/gold-peak-products';
						},
						controller : 'CoffeeController'
					})
					.when('/coffee/gold-peak-products/flavor/:flavor/filter/:filter', {
						templateUrl: function (params) {
							params.group = "flavor";
							return '/viewapi/coffee/gold-peak-products';
						},
						controller : 'CoffeeController'
					})
					.when('/:category/why-gold-peak', {
						templateUrl: function (params) {
						return "/viewapi/" + params.category +"/why-gold-peak"
					},
						controller : 'StaticPageController'
					})
					.when('/:category/find-gold-peak-beverages', {
						templateUrl: function (params) {
						params.locator = true; 
						return "/viewapi/" + params.category +"/find-gold-peak-beverages"
					},
						controller : 'LocatorController'
					})
					.when('/:category/find-gold-peak-beverages/location/:location', {
						templateUrl: function (params) {
						params.locator = true; 
						return "/viewapi/" + params.category +"/find-gold-peak-beverages"
					},
						controller : 'LocatorController'
					})
					.when('/find-gold-peak-beverages', {
						templateUrl: function (params) {
						params.locator = true; 
						params.category = false;
						return "/viewapi/find-gold-peak-beverages"
					},
						controller : 'LocatorController'
					})
					.when('/find-gold-peak-beverages/location/:location', {
						templateUrl: function (params) {
						params.locator = true; 
						params.category = false;
						return "/viewapi/find-gold-peak-beverages"
					},
						controller : 'LocatorController'
					})
					.when('/find-gold-peak-beverages/:category', {
						templateUrl: function (params) {
						params.locator = true; 
						params.category = false;
						return "/viewapi/find-gold-peak-beverages"
					},
						controller : 'LocatorController'
					})
					.when('/errors/missing', {
						templateUrl: function (params) {
						return "/viewapi/errors/missing"
					},
						controller : 'HomeController'
					})
					.otherwise({
		               templateUrl: function (params) {
						return "/viewapi/errors/missing"
					},
						controller : 'HomeController'
		            });


				$locationProvider.html5Mode(true).hashPrefix('!');
			}
		]);
}());


