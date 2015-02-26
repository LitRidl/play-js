var fps = 60;

var colors = {
    'red':    '#F15A5A',
    'yellow': '#F0C419',
    'green':  '#4EBA6F',
    'blue':   '#2D95BF',
    'purple': '#955BA5',
    'dark':   '#333333'
};

var drawBackground = function (ctx, w, h, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, w, h);

    ctx.lineWidth = 5;
    ctx.strokeStyle = stroke;
    ctx.strokeRect(0, 0, w, h);
};

var dx = 0, dy = 0;

var render = function (ctx) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height;

    drawBackground(ctx, w, h, colors.red, colors.dark);

    ctx.fillStyle = colors.blue;
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.yellow;

    dx = (dx + 1) % (w / 2);
    dy = (dy + 1) % (h / 2);
    ctx.drawCircle(w / 2 + dx, h / 2 + dy, 50 - 2);
};

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('viewport');
    
    Game.launch(canvas, render, fps);
});
