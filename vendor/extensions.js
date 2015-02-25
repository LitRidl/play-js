(function () {
	CanvasRenderingContext2D.prototype.drawCircle = function (x, y, radius) {
	    this.beginPath();

	    this.arc(x, y, radius, 0, 2 * Math.PI);

	    this.fill();
	    this.stroke();

	    this.closePath();
	}
})();
