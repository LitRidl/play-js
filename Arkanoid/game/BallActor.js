var Ball = function () {
    Game.apply(this, arguments);

    // Max-Square
    this.h = Math.max(this.h, this.w);
    this.w = this.h;

    this.radius = this.h;
};

Ball.prototype = new Brick();
Ball.prototype.constructor = Ball;
