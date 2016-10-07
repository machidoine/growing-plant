require(['garden-element-map', 'ui-map', 'constants'], function () {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });

    $(document).ready(function () {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

        var socket;
        var game;
        var gardenElementMap;
        var uiMap;

        function preload() {
            game.load.atlas('plant-textures', 'assets/growing-plant-spritesheet.png', 'assets/growing-plant-spritesheet.json');
        }

        function create() {
            var graphics = game.add.graphics(0, 0);

            gardenElementMap = new GardenElementMap(game);


            socket = io.connect();
            uiMap = new UIMap(game, socket);

            socket.on('myConnect', function (gridReceived) {
                gardenElementMap.replaceBy(gridReceived);
            });
            socket.on('gridElementReceive', function (gridReceived) {
                $('.debug').html(JSON.stringify(gridReceived, null, 4).replace(/(?:\r\n|\r|\n)/g, '<br />'));
                gardenElementMap.replaceBy(gridReceived);
            });

            game.stage.backgroundColor = '#befe9e';

        }


        function update() {
        }

        function render() {

        }
    });
});
