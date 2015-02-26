var Game = {
	launch: function (canvas, render, fps) {
		var ctx = canvas.getContext('2d');
		(function step () {
	        setTimeout(function () {
	            requestAnimationFrame(step, canvas);
	            render(ctx);
	        }, 1000 / fps);
	    })();
	}
};
