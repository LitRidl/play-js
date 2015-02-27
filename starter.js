var colors = {
    'red':    '#F15A5A',
    'yellow': '#F0C419',
    'green':  '#4EBA6F',
    'blue':   '#2D95BF',
    'purple': '#955BA5',
    'dark':   '#333333',
    'white':  '#FFFFFF',
    'black':  '#000000'
};

var random_color = function () {
    return '#' + Math.random().toString(16).substr(-6);
};

var create_coordinate_handler = function (action, context) {
    return (function (e) {
        e.preventDefault();
        var x, y;

        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
        }

        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;

        action.call(this, x, y);

        return false;
    }).bind(context);
};

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('viewport');

    var settings = {
        canvas: canvas,

        fps: 60,

        dampening: 0.98,

        background_color: colors.white,
        background_border: colors.dark,
        background_linewidth: 5,

        circle_radius: 50,
        circle_color: colors.blue,
        circle_border: colors.yellow,
        circle_linewidth: 1,

        circle_color_selected: colors.red
    };

    var game = new CirclesGame(settings);
    game.launch();

    canvas.addEventListener("contextmenu", create_coordinate_handler(function (x, y) {
        var circle_idx = this.scene.circleOn(x, y);

        if (circle_idx != -1) {
            this.scene.circles[circle_idx].selected = !this.scene.circles[circle_idx].selected;
        } else if (this.scene.checkNoOverlaps(x, y)) {
            this.scene.addCircle(new Circle(x, y, this.settings.circle_radius, 1.0, random_color()));
        } else {
            var msg = new Message('Overlapping circles!', 1.0 * this.fps); // 1 second
            this.addMessage(msg);
        }
    }, game));

    canvas.addEventListener("click", create_coordinate_handler(function (x, y) {
        this.scene.gatherSelectedTo(x, y);
    }, game));
});
