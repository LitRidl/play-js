function Scene(restitution) {
    this.circles = [];

    this.restitution = restitution || 1.0;
};


Scene.prototype.addCircle = function (circle) {
    this.circles.push(circle);
};


Scene.prototype.update = function (dt) {
    dt = dt || 1;
    if (this.circles.length == 0) {
        return;
    }

    var circles = this.circles;
    var radius = circles[0].radius;


    var h = 600, w = 800;

    for (var i = 0, length = circles.length; i < length; ++i) {
        if (circles[i].x <= 0 + circles[i].radius || circles[i].x >= w - circles[i].radius) {
            circles[i].vx = -circles[i].vx;
        }
        if (circles[i].y <= 0 + circles[i].radius || circles[i].y >= h - circles[i].radius) {
            circles[i].vy = -circles[i].vy;
        }
    };

    this.collide();

    for (var i = 0, length = circles.length; i < length; ++i) {
        this.circles[i].x += this.circles[i].vx;
        this.circles[i].y += this.circles[i].vy;

        this.circles[i].vx += this.circles[i].ax;
        this.circles[i].vy += this.circles[i].ay;

        this.circles[i].vx *= this.restitution;
        this.circles[i].vy *= this.restitution;

        if (Math.abs(this.circles[i].vx) < 0.001) {
            this.circles[i].vx = 0.0;
        }

        if (Math.abs(this.circles[i].vy) < 0.001) {
            this.circles[i].vy = 0.0;
        }
    }

    var h = 600, w = 800;

    for (var i = 0, length = circles.length; i < length; ++i) {
        if (circles[i].x <= 0 + circles[i].radius || circles[i].x >= w - circles[i].radius) {
            circles[i].vx = -circles[i].vx;
        }
        if (circles[i].y <= 0 + circles[i].radius || circles[i].y >= h - circles[i].radius) {
            circles[i].vy = -circles[i].vy;
        }
    };
};


Scene.prototype.collide = function () {
    var circles = this.circles;
    var circles_new = new Array(circles.length);
    for (var i = circles_new.length - 1; i >= 0; i--) {
        circles_new[i] = circles[i].clone();
    };

    var a, b;
    for (var i = 0, length = circles.length; i < length; ++i) {
        // if (circles[i].vx == 0 && circles[i].vy == 0) {
        //     continue;
        // }
        for (var j = i + 1; j < length; ++j) {
            if (i == j) {
                continue;
            }
            if (circles[i].distance(circles[j]) <= circles[i].radius + circles[j].radius) {
                console.log("collision between ", i, " and ", j);
                a = circles[i];
                b = circles[j];

                circles_new[i].vx = (a.vx * (a.mass - b.mass) + (2 * b.mass * b.vx)) / (a.mass + b.mass);
                circles_new[i].vy = (a.vy * (a.mass - b.mass) + (2 * b.mass * b.vy)) / (a.mass + b.mass);
                circles_new[j].vx = (b.vx * (b.mass - a.mass) + (2 * a.mass * a.vx)) / (a.mass + b.mass);
                circles_new[j].vy = (b.vy * (b.mass - a.mass) + (2 * a.mass * a.vy)) / (a.mass + b.mass);

                // circles_new[i].x += circles_new[i].vx;
                // circles_new[i].y += circles_new[i].vy;
                // circles_new[j].x += circles_new[j].vx;
                // circles_new[j].y += circles_new[j].vy;
            }
        }
    }

    this.circles = circles_new;
};

Scene.prototype.circleOn = function (x, y) {
    var circles = this.circles;

    for (var i = circles.length - 1; i >= 0; i--) {
        if (circles[i].inside(x, y)) {
            return i;
        }
    }

    return -1;
};

Scene.prototype.gatherSelectedTo = function (x, y) {
    var circles = this.circles;

    var dx, dy, v;
    for (var i = circles.length - 1; i >= 0; i--) {
        if (circles[i].selected == true) {
            dx = x - circles[i].x;
            dy = y - circles[i].y;

            v = Math.sqrt(dx * dx + dy * dy);

            circles[i].vx = dx / v;
            circles[i].vy = dy / v;

            circles[i].selected = false;
        }
    };

    //this.circles = circles;
};

Scene.prototype.checkNoOverlaps = function (x, y) {
    var circles = this.circles;
    for (var i = circles.length - 1; i >= 0; i--) {
        if (circles[i].distance(new Circle(x, y)) < 2 * circles[i].radius) {
            return false;
        }
    }
    return true;
};
