var game = new Phaser.Game(1200,900,Phaser.AUTO,'',{
    preload: preload,
    create: create,
    update: update,
    render : render
});

var socket;
var game;
var plantMap;

var PlantMap = class {
    constructor(game) {
        this.game = game;
        this.group = game.add.group();
        this._sprites = [];
    }

    add(plant) {
        this.group.setAll('inputEnabled', true);
        this.group.callAll('events.onInputDown.add', 'events.onInputDown', this.spriteInputListener, this);
       
        var sprite = this.group.create(0, 0, 'plant-textures', plant.type);
        sprite.x = sprite.width * plant.x;
        sprite.y = sprite.height * plant.y;
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
    plantMap = new PlantMap(game);

    socket = io.connect();
    socket.on('myConnect', function(gridReceived) {
        plantMap.replaceBy(gridReceived);
    });
    socket.on('gridElementReceive', function(gridReceived) {
        plantMap.replaceBy(gridReceived);
    });

    game.stage.backgroundColor = '#2d2d2d';
    // plantMap.addPlant({x: 0, y: 0, type: 'seed'});    

    game.input.addMoveCallback(clickOnGrid, this);
}

function clickOnGrid() {
    if(game.input.mousePointer.isDown) {
        console.log('clicked');
        var mouseX = game.input.activePointer.worldX;
        var mouseY = game.input.activePointer.worldY;

        var x = game.math.snapToFloor(mouseX, 25) / 25;
        var y = game.math.snapToFloor(mouseY, 25) / 25;

        socket.emit('addGridElement', {x:x, y:y, type:'seed'});
    }
}

function update() {
   
}

function render() {
    
}