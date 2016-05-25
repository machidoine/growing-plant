angular.module('plant').directive 'gpMenuItems', ->
  console.log 'tot'
  {
    templateUrl: 'templates/menu-items.html'
    restrict: 'E'
    scope: menuModel: '='
    controller: ($scope, $element) ->

  }