var Platform = function () {
    Brick.apply(this, arguments);
};

Platform.prototype = new Brick();
Platform.prototype.constructor = Platform;

Platform.prototype.setCenterRatio = function (ratio) {
    this.center_ratio = ratio;
};

Platform.prototype.setAngularDampening = function (damp) {
    this.angular_dampening = damp;
};
