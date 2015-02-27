var CirclesGame = function () {
    Game.apply(this, arguments);
};

CirclesGame.prototype = new Game();
CirclesGame.prototype.constructor = CirclesGame;


CirclesGame.prototype.drawBackground = function (fill, stroke, stroke_width) {
    var ctx = this.ctx;

    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, this.w, this.h);

    ctx.lineWidth = stroke_width;
    ctx.strokeStyle = stroke;
    ctx.strokeRect(0, 0, this.w, this.h);
};

CirclesGame.prototype.drawMessages = function () {
    var messages = this.getMessages();

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";

    for (var i = messages.length - 1; i >= 0; i--) {
        this.ctx.fillStyle = messages[i].color;
        this.ctx.font = messages[i].font;
        this.ctx.fillText(messages[i].text, this.w / 2, this.h / 2);
    };
};

CirclesGame.prototype.render = function () {
    var w = this.w,
        h = this.h;

    var ctx = this.ctx;
    var settings = this.settings;
    var circles = this.scene.circles;

    this.drawBackground(settings.background_color,
                        settings.background_border,
                        settings.background_linewidth);

    ctx.lineWidth = settings.circle_linewidth;
    ctx.strokeStyle = settings.circle_border;

    var radius = settings.circle_radius - settings.circle_linewidth;

    for (var i = 0, length = circles.length; i < length; ++i) {
        if (!circles[i].selected) {
            ctx.fillStyle = circles[i].color;
        } else {
            ctx.fillStyle = settings.circle_color_selected;
        }

        ctx.drawCircle(circles[i].x, circles[i].y, radius);
    }

    this.drawMessages();

    this.scene.update();
};
