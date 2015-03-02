var Platform = function () {
    Game.apply(this, arguments);
};

Platform.prototype = new Brick();
Platform.prototype.constructor = Platform;
