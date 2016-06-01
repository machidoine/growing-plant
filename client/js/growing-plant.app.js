
/*
	GROWING-PLANT
 */
angular.module('plant', []);

angular.module('plant', []).controller('GrowingPlantController', function($scope, $element) {
  var socket;
  $scope.grid = [];
  $scope.menuModel = {
    currentItem: {},
    items: [
      {
        type: 'seed'
      }, {
        type: 'tutor'
      }, {
        type: 'fork'
      }
    ]
  };
  socket = io.connect();
  socket.on('myConnect', function(points) {
    $scope.grid = points;
    $scope.$apply();
  });
  socket.on('gridElementReceive', function(points) {
    $scope.grid = points;
    $scope.$apply();
    console.log('Promis j\'ai cliqué');
  });
  return $scope.send = function(gridIndex) {
    if ($scope.menuModel.currentItem.type) {
      gridIndex.type = $scope.menuModel.currentItem.type;
      console.log('sending...', gridIndex);
      socket.emit('addGridElement', gridIndex);
    }
  };
});

angular.module('plant').directive('gpGrid', function() {
  return {
    templateUrl: 'templates/grid.html',
    scope: {
      grid: '=',
      currentItemSelected: '=',
      clickOnGrid: '&'
    },
    restrict: 'E',
    controller: function($scope, $element) {
      $($element).find('.grid').on('click', function(e) {
        var indexX, indexY, posX, posY;
        posX = e.pageX - ($(this).offset().left);
        posY = e.pageY - ($(this).offset().top);
        indexX = Math.floor(posX / 15);
        indexY = Math.floor(posY / 15);
        $scope.clickOnGrid()({
          'x': indexX,
          'y': indexY
        });
        console.log('click event');
      });
      $scope.placeholderGridItem = {
        x: 0,
        y: 0,
        type: ''
      };
      $scope.onMouseMove = function(e) {
        var indexX, indexY, posX, posY;
        posX = e.pageX - ($(e.currentTarget).offset().left);
        posY = e.pageY - ($(e.currentTarget).offset().top);
        indexX = Math.floor(posX / 15);
        indexY = Math.floor(posY / 15);
        $scope.placeholderGridItem = {
          x: indexX,
          y: indexY,
          type: $scope.currentItemSelected.type
        };
      };
    }
  };
});

angular.module('plant').directive('gpMenuItems', function() {
  console.log('tot');
  return {
    templateUrl: 'templates/menu-items.html',
    restrict: 'E',
    scope: {
      menuModel: '='
    },
    controller: function($scope, $element) {}
  };
});
