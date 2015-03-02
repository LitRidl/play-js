var Game = function (settings) {
    if (settings === undefined) {
        return;
    }

    this.settings = settings || { };

    this.fps = settings.fps || 60;
    this.speed = settings.speed || 1;
    this.canvas = settings.canvas;

    this.h = this.canvas.height;
    this.w = this.canvas.width;

    this.ctx = this.canvas.getContext('2d');
    //this.ctx.translate(0.5, 0.5);

    this.scene = new Scene(Math.pow(settings.dampening, 1.0 / this.fps), this.h, this.w, this.speed);

    this.messages = [];
};

Game.prototype.addMessage = function (message) {
    this.messages.push(message);
};

Game.prototype.getMessages = function () {
    var result = [];

    for (var i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].duration > 0) {
            --this.messages[i].duration;
            result.push(this.messages[i])
        }
    };
    this.messages = result;

    return result;
};

Game.prototype.launch = function () {
    var render = this.render.bind(this);

    (function GameLoopStep () {
        setTimeout(function () {
            requestAnimationFrame(GameLoopStep, this.canvas);
            render();
        }, 1000 / this.fps);
    })();
};
