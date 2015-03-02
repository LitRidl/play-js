var ArkanoidGame = function (settings) {
    Game.apply(this, arguments);

    this.rows = settings.rows;
    this.bricks_in_row = settings.bricks_in_row;

    this.platform_width  = settings.platform_width;
    this.platform_height = settings.platform_height;
};

ArkanoidGame.prototype = new Game();
ArkanoidGame.prototype.constructor = ArkanoidGame;


ArkanoidGame.prototype.drawBackground = function (fill, stroke, stroke_width) {
    var ctx = this.ctx;

    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, this.w, this.h);

    ctx.lineWidth = stroke_width;
    ctx.strokeStyle = stroke;
    ctx.strokeRect(0, 0, this.w, this.h);
};

ArkanoidGame.prototype.drawMessages = function () {
    var messages = this.getMessages();

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";

    for (var i = messages.length - 1; i >= 0; i--) {
        this.ctx.fillStyle = messages[i].color;
        this.ctx.font = messages[i].font;
        this.ctx.fillText(messages[i].text, this.w / 2, this.h / 2);
    };
};

ArkanoidGame.prototype.setUpLevel = function () {
    var scene = this.scene;
    var brick;

    scene.platform = new Platform(this.w / 2 - 50 / 2, 10, 50, 10);
    scene.ball = new Ball();

    for (var row = 0; row < this.rows; ++row) {
        for (var col = 0; col < this.bricks_in_row; ++col) {
            brick = new Brick();
        }
    }
};

ArkanoidGame.prototype.handleKeyDown = function (action) {
    if (action == 'left' || action == 'right') {
        this.scene.movePlatform(action);
    } else if (action == 'interact') {
        this.scene.launchBall();
    }
};

ArkanoidGame.prototype.render = function () {
    var w = this.w,
        h = this.h;

    var ctx = this.ctx;
    var settings = this.settings;
    var circles = this.scene.circles;

    this.drawBackground(settings.background_color,
                        settings.background_border,
                        settings.background_linewidth);

    // ctx.lineWidth = settings.circle_linewidth;
    // ctx.strokeStyle = settings.circle_border;

    var radius = settings.circle_radius; // - settings.circle_linewidth;

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
