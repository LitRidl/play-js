var ArkanoidGame = function (settings) {
    Game.apply(this, arguments);

    this.rows = settings.rows;
    this.bricks_in_row = settings.bricks_in_row;

    this.platform_width  = settings.platform_width;
    this.platform_height = settings.platform_height;
    this.platform_color  = settings.platform_color;
    this.platform_speed  = settings.platform_speed;

    this.ball_radius = settings.ball_radius;
    this.ball_color  = settings.ball_color;
    this.ball_speed  = settings.ball_speed;
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

    var platform_x = this.w / 2 - this.platform_width / 2,
        platform_y = this.h - 2 * this.platform_height;

    scene.platform = new Platform(platform_x, platform_y,
                                  this.platform_width, this.platform_height,
                                  this.platform_color, this.platform_speed);

    scene.ball = new Ball(this.w / 2 - this.ball_radius, platform_y - 2 * this.ball_radius,
                          this.ball_radius * 2, this.ball_radius * 2,
                          this.ball_color, this.ball_speed);
    scene.ball.sticky = true;

    var brick;
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
    var bricks = this.scene.bricks;

    this.drawBackground(settings.background_color,
                        settings.background_border,
                        settings.background_linewidth);

    for (var i = 0, length = bricks.length; i < length; ++i) {
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
    }

    ctx.fillStyle = this.scene.platform.color;
    ctx.fillRect(this.scene.platform.x, this.scene.platform.y, this.scene.platform.w, this.scene.platform.h);

    ctx.fillStyle = this.scene.ball.color;
    ctx.drawCircle(this.scene.ball.x + this.scene.ball.radius, this.scene.ball.y +  + this.scene.ball.radius,
                   this.scene.ball.radius);

    this.drawMessages();

    this.scene.update();
};
