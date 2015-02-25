var Game = {
	launch: function (ctx, render, fps) {
		(function step () {
	        setTimeout(function () {
	            requestAnimationFrame(step);
	            render(ctx);
	        }, 1000 / fps);
	    })();
	}
};
