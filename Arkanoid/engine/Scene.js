function Scene(h, w, speed) {
    this.bricks = [];

    this.platform = null;
    this.ball = null;

    this.h = h;
    this.w = w;

    this.speed = speed || 1;
};

Scene.prototype.movePlatform = function (direction) {
    var dx = 0;
    if (direction == 'left') {
        dx = -this.platform.speed;
    } else if (direction == 'right') {
        dx = +this.platform.speed;
    }

    var margin = 10; // this.ball.radius; // ??
    if (this.platform.x + dx <= 0) {
        dx = margin - this.platform.x;
    } else if (this.platform.x + dx + this.platform.w >= this.w - margin) {
        dx = this.w - margin - this.platform.x - this.platform.w;
    }

    this.platform.x += dx;

    if (this.ball.sticky) {
        this.ball.x += dx;
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
    var margin = 5;

    var h = this.h,
        w = this.w;

    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // BUGGED
    if (this.platform.isOverlapping(this.ball) && !this.ball.sticky) {
        var dx = this.ball.x_mid - this.platform.x; // ???
        var dx_relative = dx / this.platform.w;
        console.log(dx, dx_relative);

        this.ball.vy *= -1;
        if (dx_relative > 0.33 && dx_relative < 0.66) {
            this.ball.vx *= -1;
        } else {
            var v = (dx_relative - 0.5) * Math.PI;
            this.ball.vx = Math.cos(v);
            console.log(v, Math.cos(v));
        }

        //this.ball.sticky = true;
    }

    if (this.ball.x <= margin + this.ball.radius || this.ball.x >= w - this.ball.radius - margin) {
        this.ball.vx = -this.ball.vx;
    }
    if (this.ball.y <= margin + this.ball.radius || this.ball.y >= h - this.ball.radius - margin) {
        this.ball.vy = -this.ball.vy;
    }


    if (this.bricks.length == 0) {
        return;
    }

    var bricks = this.bricks;
    var radius = bricks[0].radius;


    for (var i = 0, length = bricks.length; i < length; ++i) {
        if (bricks[i].x <= margin + bricks[i].radius || bricks[i].x >= w - bricks[i].radius - margin) {
            bricks[i].vx = -bricks[i].vx;
        }
        if (bricks[i].y <= margin + bricks[i].radius || bricks[i].y >= h - bricks[i].radius - margin) {
            bricks[i].vy = -bricks[i].vy;
        }
    };

    this.collide();

    for (var i = 0, length = bricks.length; i < length; ++i) {
        this.bricks[i].x += this.bricks[i].vx;
        this.bricks[i].y += this.bricks[i].vy;

        this.bricks[i].vx += this.bricks[i].ax;
        this.bricks[i].vy += this.bricks[i].ay;

        this.bricks[i].vx *= this.restitution;
        this.bricks[i].vy *= this.restitution;

        if (Math.abs(this.bricks[i].vx) < 0.001) {
            this.bricks[i].vx = 0.0;
        }

        if (Math.abs(this.bricks[i].vy) < 0.001) {
            this.bricks[i].vy = 0.0;
        }
    }

    for (var i = 0, length = bricks.length; i < length; ++i) {
        if (bricks[i].x <= 0 + bricks[i].radius || bricks[i].x >= w - bricks[i].radius) {
            bricks[i].vx = -bricks[i].vx;
        }
        if (bricks[i].y <= 0 + bricks[i].radius || bricks[i].y >= h - bricks[i].radius) {
            bricks[i].vy = -bricks[i].vy;
        }
    };
};


Scene.prototype.collide = function () {
    var bricks = this.bricks;
    var bricks_new = new Array(bricks.length);
    for (var i = bricks_new.length - 1; i >= 0; i--) {
        bricks_new[i] = bricks[i].clone();
    }

    var a, b;
    for (var i = 0, length = bricks.length; i < length; ++i) {
        for (var j = i + 1; j < length; ++j) {
            if (bricks[i].distance(bricks[j]) <= bricks[i].radius + bricks[j].radius) {
                // console.log("collision between ", i, " and ", j);
                a = bricks[i];
                b = bricks[j];

                bricks_new[i].vx = (a.vx * (a.mass - b.mass) + (2 * b.mass * b.vx)) / (a.mass + b.mass);
                bricks_new[i].vy = (a.vy * (a.mass - b.mass) + (2 * b.mass * b.vy)) / (a.mass + b.mass);
                bricks_new[j].vx = (b.vx * (b.mass - a.mass) + (2 * a.mass * a.vx)) / (a.mass + b.mass);
                bricks_new[j].vy = (b.vy * (b.mass - a.mass) + (2 * a.mass * a.vy)) / (a.mass + b.mass);
            }
        }
    }

    this.bricks = bricks_new;
};

Scene.prototype.circleOn = function (x, y) {
    var bricks = this.bricks;

    for (var i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i].inside(x, y)) {
            return i;
        }
    }

    return -1;
};

Scene.prototype.gatherSelectedTo = function (x, y) {
    var bricks = this.bricks;

    var dx, dy, v;
    for (var i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i].selected == true) {
            dx = x - bricks[i].x;
            dy = y - bricks[i].y;

            v = Math.sqrt(dx * dx + dy * dy);

            bricks[i].vx = dx / v * this.speed;
            bricks[i].vy = dy / v * this.speed;

            bricks[i].selected = false;
        }
    }
};

Scene.prototype.checkNoOverlaps = function (x, y) {
    var bricks = this.bricks;
    for (var i = bricks.length - 1; i >= 0; i--) {
        if (bricks[i].distance(new Circle(x, y)) < 2 * bricks[i].radius) {
            return false;
        }
    }
    return true;
};
