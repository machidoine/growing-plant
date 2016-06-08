var game = new Phaser.Game(1200,900,Phaser.AUTO,'',{
    preload: preload,
    create: create,
    update: update,
    render : render
});

var socket;
var gridData = [];
var gridGraphics = [];
var floor;
var game;
var map;
var layer1;

function preload() {
    console.log("preload");
    socket = io.connect();
    socket.on('myConnect', function(gridReceived) {
        //console.log(gridReceived);
        gridData = gridReceived;
    });
    socket.on('gridElementReceive', function(gridReceived) {
        gridData = gridReceived;
        //console.log('received');
    });

    game.load.image('plants', 'assets/GrowingPlant-SpriteSheet.png');
}

function create() {
    game.stage.backgroundColor = '#2d2d2d';

    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage('plants', null, 150, 150);

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
    layer1 = map.create('level1', 25, 25, 150, 150);
    map.putTile(9, 1, 1, layer1);
}

function update() {
    //gridGraphics = [];
    //gridData.forEach(function(cell) {
       
      // gridGraphics.push(new Phaser.Rectangle(cell.x, cell.y, 50,50)); 
    //});
    //console.log(gridGraphics);
}

function render() {
    //console.log("render");
    //gridGraphics.forEach(function(graphic) {
        //game.debug.geom(graphic,'#0000ff');
    //});

    //game.debug.geom(floor,'#0000ff');
    
}