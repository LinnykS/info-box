angular.module('app', [])
	.directive('infoBox', infoBoxDerective);

	function infoBoxDerective () {
		return {
			replace: true,
			restrict: 'EA',
			controller: infoBoxController,
			controllerAs: 'ctrl',
			bindToController: true,
			templateUrl: 'src/templates/info-box.template.html'
		}
	}
	
	function infoBoxController ($http) {
		var isDetailsLinkActive = true,
			ctrl = this,
			index = 0;

		ctrl.product = {};
		ctrl.products = {};
		ctrl.showDescriptionDetails = false;
		ctrl.showDetailsTitle = 'show details';

		$http.get('src/static/info_box.json').
			success(function(data) {
				ctrl.products = data;
			}).
			error(function(data, status) {
				console.warn('Something wrong with your data! Status:' + status);
			});
		
		ctrl.switcher = function (duration) {
			index = index + duration;

			if (index < 0) {
				index = ctrl.products.length + duration;
			} else if (index > ctrl.products.length) {
				index = 1;
			}

			ctrl.product = ctrl.products[index];
		};

		ctrl.showDetails = function () {
			if (isDetailsLinkActive) {
				ctrl.hideProductCover = true;
				ctrl.showDescriptionDetails = true;
				ctrl.showDetailsTitle = 'hide details';

				isDetailsLinkActive = false;
			} else {
				ctrl.hideProductCover = false;
				ctrl.showDescriptionDetails = false;
				ctrl.showDetailsTitle = 'show details';

				isDetailsLinkActive = true;
			} 
		};
	};
