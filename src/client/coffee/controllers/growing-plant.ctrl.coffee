angular.module('plant', []).controller 'GrowingPlantController', ($scope, $element) ->
  $scope.grid = []
  $scope.menuModel =
    currentItem: {}
    items: [
      {type: 'seed'}
      {type: 'tutor'}
      {type: 'fork'}
    ]

  socket = io.connect()
  socket.on 'myConnect', (points) ->
    $scope.grid = points
    $scope.$apply()
    #drawPoints(points);
    return

  socket.on 'gridElementReceive', (points) ->
    $scope.grid = points
    $scope.$apply()
    console.log 'Promis j\'ai cliqué'
    #drawPoints(points);
    return

  $scope.send = (gridIndex) ->
    if $scope.menuModel.currentItem.type
      gridIndex.type = $scope.menuModel.currentItem.type
      console.log 'sending...', gridIndex
      socket.emit 'addGridElement', gridIndex
    return
