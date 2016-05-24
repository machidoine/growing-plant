console.log("hello");
angular.module("plant", [])
.controller("GrowingPlantController", function($scope, $element) {
	$scope.grid = [];
	$scope.menuModel = {currentItem : {}, items : [{type : 'seed'}, {type : 'tutor'}, {type : 'fork'}]}
    var socket = io.connect();  

    socket.on('myConnect', function(points) {
    	$scope.grid = points;
    	$scope.$apply();
		//drawPoints(points);
    });
    
    socket.on('gridElementReceive', function(points) {
    	$scope.grid = points;
    	$scope.$apply();
        console.log("Promis j'ai cliqué");
       //drawPoints(points);
    });
    
    $scope.send = function send(gridIndex) {
    	if($scope.menuModel.currentItem.type) {
    		gridIndex.type = $scope.menuModel.currentItem.type;
    		console.log("sending...", gridIndex);
        	socket.emit('addGridElement', gridIndex);	
    	}
    	
    }

 })
 .directive("gpGrid", function() {
 	return {
 		templateUrl : 'templates/grid.html',
 		scope : {grid : "=", currentItemSelected : "=", clickOnGrid:"&"},
 		restrict:"E",
 		controller : function($scope, $element) {
			$($element).on('click',function(e){
				var posX = e.pageX - $(this).offset().left;
				var posY = e.pageY - $(this).offset().top;

				var indexX =  Math.floor(posX / 15); 
				var indexY = Math.floor(posY / 15); 
				
				$scope.clickOnGrid()({"x":indexX,"y":indexY});
				console.log("click event");
			})

			$scope.placeholderGridItem = {x:0,y:0,type:""};

			$scope.onMouseMove = function(e){
				var posX = e.pageX - $(e.currentTarget).offset().left;
				var posY = e.pageY - $(e.currentTarget).offset().top;

				var indexX =  Math.floor(posX / 15); 
				var indexY = Math.floor(posY / 15);

				$scope.placeholderGridItem = {
					x:indexX,
					y:indexY,
					type:$scope.currentItemSelected.type
				}
			}
 		}
 	};
 })
 .directive("gpMenuItems", function() {
 	console.log("tot");
 	return {
 		templateUrl : 'templates/menu-items.html',
 		restrict : 'E',
 		scope : {menuModel : "="},
 		controller : function($scope, $element) {
			
 		}
 	}
 })
