var Ball = function () {
    Brick.apply(this, arguments);

    // Max-Square
    this.h = Math.max(this.h, this.w);
    this.w = this.h;

    this.radius = this.h / 2;

    this.sticky = false;
};

Ball.prototype = new Brick();
Ball.prototype.constructor = Ball;
