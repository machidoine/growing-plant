console.log("hello");
angular.module("plant", [])
.controller("GrowingPlantController", function($scope, $element) {
    $($element).on('click','.grid-element',function(){
		var index = $(this).data("index");
    	$scope.send(index);
    	console.log('click element', index);
    })

    var socket = io.connect();
    
    $scope.playGrid = [];  
    
    socket.on('connect', function() {

        $scope.$apply();
    });

    socket.on('myConnect', function(grid) {
		$scope.playGrid = grid;
        $scope.$apply();
    });
    
    socket.on('gridElementReceive', function(grid) {
        //console.log($scope.playGrid);
        $scope.playGrid = grid;
        //console.log($scope.playGrid);
        $scope.$apply();
    });
    
    $scope.send = function send(gridIndex) {
        socket.emit('addGridElement', gridIndex);
    }

})
