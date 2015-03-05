var ArkanoidGame = function (settings) {
    Game.apply(this, arguments);

    this.rows = settings.rows;
    this.bricks_in_row = settings.bricks_in_row;
    this.bricks_available = 0;

    this.balls = settings.balls;

    this.score_color = settings.score_color;

    this.platform_width  = settings.platform_width;
    this.platform_height = settings.platform_height;

    this.platform_color = settings.platform_color;
    this.platform_side_color = settings.platform_side_color;
    this.platform_center_ratio = settings.platform_center_ratio;

    this.platform_speed = settings.platform_speed;

    this.ball_radius = settings.ball_radius;
    this.ball_color  = settings.ball_color;
    this.ball_speed  = settings.ball_speed;

    this.brick_color = settings.brick_color;

    this.score = 0;
    this.score_per_brick = settings.score_per_brick;

    this.angular_dampening = settings.angular_dampening;
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

ArkanoidGame.prototype.setUpPlatform = function () {
    var scene = this.scene;

    var platform_x = this.w / 2 - this.platform_width / 2,
        platform_y = this.h - 2 * this.platform_height;

    scene.platform = new Platform(platform_x, platform_y,
                                  this.platform_width, this.platform_height,
                                  this.platform_color, this.platform_speed);
    scene.platform.setCenterRatio(this.platform_center_ratio);
    scene.platform.setAngularDampening(this.angular_dampening);

    scene.ball = new Ball(this.w / 2 - this.ball_radius, platform_y - 2 * this.ball_radius,
                          this.ball_radius * 2, this.ball_radius * 2,
                          this.ball_color, this.ball_speed);
    scene.ball.sticky = true;
};

ArkanoidGame.prototype.setUpLevel = function () {
    this.balls = this.settings.balls;
    this.bricks_available = this.rows * this.bricks_in_row;

    this.setUpPlatform();

    var margin = 6,
        x_space_per_brick = (this.w - 2 * margin) / this.bricks_in_row,
        y_space_per_brick = ((this.h - margin) / 3) / this.rows;

    var x_offset = 2 * margin,
        y_offset = 2 * margin;

    for (var row = 0; row < this.rows; ++row) {
        for (var col = 0; col < this.bricks_in_row; ++col) {
            this.scene.addBrick(new Brick(x_offset, y_offset, x_space_per_brick - 2 * margin, 50, this.brick_color));
            x_offset += x_space_per_brick;
        }
        x_offset = 2 * margin;
        y_offset += y_space_per_brick;
    }
};

ArkanoidGame.prototype.handleKeyDown = function (action, type) {
    if (type == 'keydown' && (action == 'left' || action == 'right')) {
        this.scene.movePlatform(action, type);
    } else if (type == 'keyup' && (action == 'left' || action == 'right')) {
        this.scene.movePlatform(action, type);
    } else if (action == 'interact' && type == 'keyup') {
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
        if (bricks[i] === null) {
            continue;
        }
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
    }

    ctx.fillStyle = this.platform_side_color;
    ctx.fillRect(this.scene.platform.x, this.scene.platform.y, this.scene.platform.w, this.scene.platform.h);

    ctx.fillStyle = this.scene.platform.color;
    var x = this.scene.platform.x + this.scene.platform.w * (1 - this.platform_center_ratio) / 2,
        y = this.scene.platform.y;
    ctx.fillRect(x, y, this.scene.platform.w * this.platform_center_ratio, this.scene.platform.h);

    ctx.fillStyle = this.scene.ball.color;
    ctx.drawCircle(this.scene.ball.x + this.scene.ball.radius, this.scene.ball.y + this.scene.ball.radius,
                   this.scene.ball.radius);

    var bricks_destroyed = this.scene.update();

    if (bricks_destroyed > 0) {
        this.score += bricks_destroyed * this.score_per_brick;
        this.bricks_available -= bricks_destroyed;

        if (this.bricks_available == 0) {
            this.score = 0;
            this.addMessage(new Message("You win!", 60));
            this.setUpLevel();
        }
    } else if (bricks_destroyed === null) { // Ball lost
        --this.balls;
        if (this.balls == 0) {
            this.score = 0;
            this.addMessage(new Message("Game over!", 60));
            this.setUpLevel();
        } else {
            this.addMessage(new Message("Oops! Ball lost!", 60));
            this.setUpPlatform();
        }
    }

    // Print score
    var score_msg = ('0000' + this.score).slice(-4);

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";

    this.ctx.fillStyle = this.score_color;
    this.ctx.font = "30pt Arial";
    this.ctx.fillText(score_msg, 70, 65);

    this.ctx.fillText(String(this.balls) + ((this.balls == 1)? " ball" : " balls"), this.w - 85, 65);


    // Print messages
    this.drawMessages();
};
