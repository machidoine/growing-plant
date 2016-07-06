$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});

$(document).ready(function(){

    var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{
        preload: preload,
        create: create,
        update: update,
        render : render
    });

    var socket;
    var game;
    var plantMap;
    var directions = {
        'up' : 0,
        'down' : 180,
        'right' : 90,
        'left' : -90
    }

    var PlantMap = class {
        constructor(game) {
            this.game = game;
            this.group = game.add.group();
            this._sprites = [];
        }

        add(plant) {
            var sprite = this.group.create(0, 0, 'plant-textures', plant.type + '-' + plant.team);
             /*sprite.rotation = directions[plant.direction];
           sprite.pivot.x = sprite.x + 12.5;
            sprite.pivot.y = sprite.y + 12.5;
            sprite.anchor.setTo(0,0);
            sprite.pivot.x = sprite.x + 12.5;
            sprite.pivot.y = sprite.y + 12.5;*/
            sprite.anchor.setTo(0.5, 0.5);
            sprite.angle = directions[plant.direction];
            sprite.x = sprite.width * plant.position.x + 12.5;
            sprite.y = sprite.height * plant.position.y + 12.5;
        }

        spriteInputListener(e) {
            console.log('clicked');
            console.log(e);
        }

        clear() {
            this.group.removeAll();
        }

        addAll(plants){
            var me = this;
            plants.forEach(function(plant){
               me.add(plant); 
            });
        }

        replaceBy(plants) {
            this.clear();
            this.addAll(plants);
            // this.group.callAll('events.onInputDown.add', 'events.onInputDown', this.spriteInputListener, this);
            // this.group.setAll('inputEnabled', true);
        }

        getCellByType(type) {
            return this._sprites.filter(function(e) {
               return e.type == type; 
            });
        }

    }

    function preload() {
        game.load.atlas('plant-textures', 'assets/growing-plant-spritesheet.png', 'assets/growing-plant-spritesheet.json');
    }

    function create() {
        var graphics = game.add.graphics(0, 0);


        plantMap = new PlantMap(game);

        socket = io.connect();
        socket.on('myConnect', function(gridReceived) {
            plantMap.replaceBy(gridReceived);
        });
        socket.on('gridElementReceive', function(gridReceived) {
            $('.debug').html(JSON.stringify(gridReceived, null, 4).replace(/(?:\r\n|\r|\n)/g, '<br />'));
            console.log('received');
            plantMap.replaceBy(gridReceived);
        });

        game.stage.backgroundColor = '#2d2d2d';
        // plantMap.addPlant({x: 0, y: 0, type: 'seed'});    

        game.input.addMoveCallback(clickOnGrid, this);
    }

    function clickOnGrid() {
        if(game.input.mousePointer.isDown) {
            //console.log('clicked');
            var mouseX = game.input.activePointer.worldX;
            var mouseY = game.input.activePointer.worldY;

            var x = game.math.snapToFloor(mouseX, 25) / 25;
            var y = game.math.snapToFloor(mouseY, 25) / 25;

            socket.emit('addGridElement', {position:{x:x, y:y}, type:'seed'});

            //$.getJSON('http://localhost:3000/data.json',{}, function(data){
                //plantMap.replaceBy(data);
            //});

        }
    }

    function update() {
    }

    function render() {

    }
})
