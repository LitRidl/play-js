var Brick = function (x, y, w, h, color, speed) {
    this.x = x;
    this.y = y;

    this.h = h;
    this.w = w;

    this.x_mid = x + w / 2;
    this.y_mid = y + h / 2;

    this.color = color;

    this.vx = 0;
    this.vy = 0;

    this.speed = speed || 0;
};

Brick.prototype.distance = function (b2) {
    var dx = b2.x - this.x;
    var dy = b2.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Brick.prototype.inside = function (x, y) {
    var x_inside = (x >= this.x) && (x <= this.x + this.w),
        y_inside = (y >= this.y) && (y <= this.y + this.h);
    return x_inside && y_inside;
};

Brick.prototype.isOverlapping = function (b2) {
    var x1 = (this.x <   b2.x +   b2.w),
        y1 = (this.y <   b2.y +   b2.h),
        x2 = (b2.x   < this.x + this.w),
        y2 = (b2.y   < this.h + this.y);

    return (x1 && x2 && y1 && y2);
};

Brick.prototype.clone = function () {
    var clone = new Brick(this.x, this.y, this.h, this.w, this.color);

    clone.vx = this.vx;
    clone.vy = this.vy;

    return clone;
};
