"use strict";
requirejs.config({
    // baseUrl: 'js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: './vendors/jquery.min',
        Phaser: './vendors/phaser',
        io: '/socket.io/socket.io'
    },

    // Add this map config in addition to any baseUrl or
    // paths config you may already have in the project.
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': {'jquery': 'jquery-private'},

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'jquery-private': {'jquery': 'jquery'}
    }
});

requirejs(['jquery', 'Phaser', 'io', 'sprite-factory', 'game', '../inventory/inventory'],
    ($, Phaser, io, SpriteFactory, Game, Inventory) => {
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });

        let inventory = new Inventory.Inventory();


        $(document).ready(function () {

            var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game', {
                preload: preload,
                create: create,
                update: update,
                render: render
            });

            function preload() {
                game.load.atlas('plant-textures', 'assets/growing-plant-spritesheet.png', 'assets/growing-plant-spritesheet.json');
            }

            function create() {
                var graphics = game.add.graphics(0, 0);

                SpriteFactory.instance.game = game;
                new Game(game, io.connect()).start();


                game.stage.backgroundColor = '#befe9e';

            }


            function update() {


            }

            function render() {

            }
        });
    });
