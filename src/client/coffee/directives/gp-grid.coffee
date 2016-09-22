angular.module('plant').directive 'gpGrid', ->
  {
    templateUrl: 'templates/grid.html'
    scope:
      grid: '='
      currentItemSelected: '='
      clickOnGrid: '&'
    restrict: 'E'
    controller: ($scope, $element) ->
      $($element).find('.grid').on 'click', (e) ->
        posX = e.pageX - ($(this).offset().left)
        posY = e.pageY - ($(this).offset().top)
        indexX = Math.floor(posX / 15)
        indexY = Math.floor(posY / 15)
        $scope.clickOnGrid()
          'x': indexX
          'y': indexY
        console.log 'click event'
        return

      $scope.placeholderGridItem =
        x: 0
        y: 0
        type: ''

      $scope.onMouseMove = (e) ->
        posX = e.pageX - ($(e.currentTarget).offset().left)
        posY = e.pageY - ($(e.currentTarget).offset().top)
        indexX = Math.floor(posX / 15)
        indexY = Math.floor(posY / 15)
        $scope.placeholderGridItem =
          x: indexX
          y: indexY
          type: $scope.currentItemSelected.type
        return

      return

  }