var Circle = function (x, y, radius, mass, color) {
    this.x = x;
    this.y = y;

    this.radius = radius || 0;
    this.mass = mass || 1.0;

    this.color = color;
    this.selected = false;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0.0;
    this.ay = 0.0;
};

Circle.prototype.distance = function (c2) {
    var dx = c2.x - this.x;
    var dy = c2.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Circle.prototype.inside = function (x, y) {
    var dx = this.x - x;
    var dy = this.y - y;
    return (dx * dx + dy * dy) < (this.radius * this.radius);
};

Circle.prototype.clone = function () {
    var clone = new Circle(this.x, this.y, this.radius, this.mass, this.color);
    clone.selected = this.selected;
    clone.vx = this.vx;
    clone.vy = this.vy;
    clone.ax = this.ax;
    clone.ay = this.ay;
    return clone;
}