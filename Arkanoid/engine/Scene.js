var Scene = function (h, w, speed) {
    this.bricks = [];

    this.platform = null;
    this.ball = null;

    this.h = h;
    this.w = w;
};

Scene.prototype.movePlatform = function (direction, type) {
    var dx = 0;

    if (direction == 'left') {
        dx = -this.platform.speed;
    } else if (direction == 'right') {
        dx = +this.platform.speed;
    }

    var margin = this.ball.radius / 2;
    if (this.platform.x + dx <= margin) {
        dx = this.platform.x - margin; // BUG? Bad collision detection
    } else if (this.platform.x + dx + this.platform.w >= this.w - margin) {
        dx = this.w - margin - this.platform.x - this.platform.w;
    }

    if (type == 'keydown') {
        this.platform.vx = dx;
    } else if (type == 'keyup') {
        this.platform.vx = 0;
    }
};

Scene.prototype.launchBall = function () {
    if (this.ball.sticky) {
        this.ball.vx = 0;
        this.ball.vy = -this.ball.speed;

        this.ball.sticky = false;
    }
};

Scene.prototype.addBrick = function (brick) {
    this.bricks.push(brick);
};

Scene.prototype.update = function (dt) {
    var h = this.h,
        w = this.w;

    this.platform.x += this.platform.vx;

    var ball_margin = this.ball.radius / 2;
    if (this.platform.x <= 0) {
        this.platform.x = ball_margin;
    } else if (this.platform.x + this.platform.w >= this.w - ball_margin) {
        this.platform.x = this.w - ball_margin - this.platform.w;
    }

    if (this.ball.sticky) {
        this.ball.x = this.platform.x + this.platform.w / 2 - this.ball.radius;
    } else {
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        this.ball.mid_x += this.ball.vx;
        this.ball.mid_y += this.ball.vy;
    }

    if (this.platform.isOverlapping(this.ball) && !this.ball.sticky) {
        var dx = (this.ball.x + this.ball.w / 2) - this.platform.x; // ???
        var dx_relative = dx / this.platform.w;

        var hypot = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
        var angle = Math.acos(this.ball.vx / hypot);

        this.ball.vy *= -1;

        var sidelobe_ratio = (1 - this.platform.center_ratio) / 2;

        if (dx_relative > sidelobe_ratio && dx_relative < sidelobe_ratio + this.platform.center_ratio) {
            this.ball.vx = (this.ball.vx + this.platform.vx) / 2;
        } else {
            var v = -(dx_relative - 0.5) * Math.PI;
            this.ball.vx = this.ball.speed * Math.cos(angle + this.platform.angular_dampening * v);
        }
    } else if (this.ball.isOverlapping(new Brick(0, this.h - this.platform.h, this.w, this.platform.h))) {
        return null;
    }

    var x = this.ball.x + this.ball.w / 2,
        y = this.ball.y + this.ball.h / 2;

    var margin = 5;

    if (x <= margin + this.ball.radius || x >= w - this.ball.radius - margin) {
        this.ball.vx = -this.ball.vx;
    }
    if (y <= margin + this.ball.radius || y >= h - this.ball.radius - margin) {
        this.ball.vy = -this.ball.vy;
    }

    var bricks = this.bricks;
    var bricks_destroyed = 0;

    for (var i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i] !== null && this.ball.isOverlapping(bricks[i])) {
            this.ball.vx *= -0.6;
            this.ball.vy *= -1;

            ++bricks_destroyed;

            bricks[i] = null;
        }
    };

    return bricks_destroyed;
};
