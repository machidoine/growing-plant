var socket = io.connect();


socket.on('myConnect', function (points) {
    drawPoints(points);
});

socket.on('gridElementReceive', function (points) {
    console.log("Promis j'ai cliqué");
    drawPoints(points);
});

var send = function send(gridIndex) {
    socket.emit('addGridElement', gridIndex);
}

function drawPoints(points) {

    var $grid = $(".grid");
    $grid.empty();
    $.each(points, function (i, el) {
        console.log(el);
        $grid.append($("<div/>").addClass("grid-element").addClass("cell-" + el.type).addClass(el.color).css({
            "left": el.x * 15,
            "top": el.y * 15
        }));
    })
}


$('.grid').on('click', function (e) {
    var posX = e.pageX - $(this).offset().left;
    var posY = e.pageY - $(this).offset().top;

    var indexX = Math.floor(posX / 15);
    var indexY = Math.floor(posY / 15);

    send({"x": indexX, "y": indexY, "type": "seed"});

})