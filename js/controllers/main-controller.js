(function () {
	"use strict";
	var app;
	try {
		app = angular.module(appInfo.moduleName);
	} catch (e) {
		app = angular.module(appInfo.moduleName, appInfo.deps);
	}

	app.controller('MainController', ['$scope', '$route', '$routeParams', '$location', '$animate', '$window', function ($scope, $route, $routeParams, $location, $animate, $window) {
		$scope.$route = $route;
		$scope.$location = $location;
		$scope.$routeParams = $routeParams;
		$scope.setupComplete = false;

		$scope.history = [];
		$scope.appInfo = {
			inApp: true
		};

		$scope.state = {
			beverageType: null,
			subNavTemplate: null,
			footerTemplate: null,
			isMobile: isMobile()
		};		

		
		//check to make sure the html has rendered
		$scope.$on('onFinishRender', function(event, data) {
			$scope.setupComplete = true;

			/*REMOVE UNWANTED MARKUP FOR NON JS USE */			
			jQuery('.non_js_markup').remove();

		});


		$scope.isActive = function(route) {
			var path = $location.path();

			if(route.indexOf("*") != -1){
				return route = path.indexOf(route.replace("/*","")) != 0 ? false : true;
			} else {
				return route === path;
			}
	    }

	    $scope.$watch('isMobile', function(newVal, oldVal){
          if(newVal === oldVal){
            return
          }

          if(newVal){
          }
        }, true);

	    /*hide page to help ease page transitions
		$scope.$on('$routeChangeStart', function (evt, newUrl, oldUrl) {
			jQuery('.page').hide();
		});*/

		$scope.$on('$locationChangeStart', function (evt, newUrl, oldUrl) {
			$scope.history.push(newUrl);
		});


		jQuery(window).resize(function(){
			 	//update current scope based on the new innerWidth and let angular update the view.
			if (!$scope.$$phase) {
				$scope.$apply(function(){
					$scope.state.isMobile = isMobile();
				});
			}
		});

        //Added Scroll to top for natural browser refresh
        $scope.$on('$viewContentLoaded', function(){
            jQuery(window).scrollTop(0);
        });

		function isMobile(){
			var w = window.innerWidth;
			return (w <= 768) 
		}

		$scope.deeplinkLocator = function(val){
			var category = (!$scope.state.beverageType) ? "" : "/" + $scope.state.beverageType;
			if(val && validateLocation(val)){
				window.location = category + "/find-gold-peak-beverages/location/" + val;
			} else {
				$scope.invalidEntry = true;
			}
		}

		function validateLocation(str) { //validation function for user inputted location
            var patt1 = /\b[a-zA-Z][a-zA-Z]+[,\s][ ]?[a-zA-Z]{2}\b/, // city and state abbreviation
                patt2 = /^(\d{5}(-\d{4})?)$/, // or zip code
                patt3 = /\b[a-zA-Z][a-zA-Z]+[,\s][ ]?(\d{5}(-\d{4})?)\b/, //city and zipcode
                patt4 = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/; //city or state (letters, spaces, and dashes)
            return (patt1.test(str) || patt2.test(str) || patt3.test(str) || patt4.test(str));
        }
	}])


}());
