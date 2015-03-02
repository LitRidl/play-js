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
    // ADD WALL COLLISION CHECKS !!!!
    if (direction == 'left') {
        dx = -speed;
    } else if (direction == 'right') {
        dx = +speed;
    }
    this.platform.x += dx;
};

Scene.prototype.launchBall = function () {
    this.ball.vx = 0;
    this.ball.vy = this.speed;
};

Scene.prototype.addBrick = function (brick) {
    this.bricks.push(brick);
};

Scene.prototype.cutoffDisplacement = function (x, w, margin) {
    return (x <= margin + c.radius || x >= w - c.radius - margin);
};

Scene.prototype.update = function (dt) {
    dt = dt || 1;
    if (this.bricks.length == 0) {
        return;
    }

    var bricks = this.bricks;
    var radius = bricks[0].radius;


    var h = this.h,
        w = this.w;

    var margin = 5;

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
