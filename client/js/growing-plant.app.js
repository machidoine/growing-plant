angular.module("plant",[])
.controller("ChatController", function($scope) {
        var socket = io.connect();

        $scope.messages = [];
        $scope.roster = [];
        $scope.name = '';
        $scope.text = '';
        
        socket.on('connect', function () {
          $scope.setName();
        });

        socket.on('message', function (msg) {
          $scope.messages.push(msg);
          $scope.$apply();
        });

        socket.on('roster', function (names) {
          $scope.roster = names;
          $scope.$apply();
        });

        $scope.send = function send() {
          socket.emit('message', $scope.text);
          $scope.text = '';
        };

        $scope.setName = function setName() {
          socket.emit('identify', $scope.name);
        };
})
.directive("canvasRender",function(){
    return{
        template:"<canvas width='960' height='800'></canvas>",
        scope:{
            messages:"="
        },
        replace : true,
        restrict: "E",
        link: function ($scope, $element) {
            
            $scope.stage = "";
            
            initStage();
            
            var socket = io.connect();
            socket.on('message', function (msg) {
                drawBubbles(msg);
            });
            
            function initStage(){
                if ($scope.stage) {
                       $scope.stage.autoClear = true;
                       $scope.stage.removeAllChildren();
                       $scope.stage.update();
               } else {
                   $scope.stage = new createjs.Stage($element[0]);
               }
            }
            
            function drawBubbles(message) {
                var circle = new createjs.Shape();
                var circleRadius = getRandomArbitrary(50,100);
                circle.graphics.beginFill(getRandomColor()).drawCircle(0, 0, circleRadius);
                
                var randomLocation = {
                    "x": getRandomArbitrary(100,860),
                    "y": getRandomArbitrary(100,700)
                };
                circle.x = randomLocation.x;
                circle.y = randomLocation.y;
                
                var text = new createjs.Text(message.text, "15px Arial", "#000000");
                text.x = randomLocation.x - text.getBounds().width / 2;
                text.y = randomLocation.y - text.getBounds().height / 2;

                var author = new createjs.Text(message.name, "12px Arial", "#666666");
                author.x = randomLocation.x - author.getBounds().width / 2;
                author.y = randomLocation.y - author.getBounds().height / 2 + 18;
                
                $scope.stage.addChild(circle);
                $scope.stage.addChild(text);
                $scope.stage.addChild(author);
                
                createjs.Tween
                .get(circle)
                .to({ scaleX: 0.2, scaleY: 0.2 })
                .to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut)
                
                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", $scope.stage);
            }
            
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            function getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            
        }
    }
})