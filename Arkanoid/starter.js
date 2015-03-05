var colors = {
    'red':    '#F15A5A',
    'yellow': '#F0C419',
    'green':  '#4EBA6F',
    'blue':   '#2D95BF',
    'purple': '#955BA5',
    'dark':   '#333333',
    'white':  '#FFFFFF',
    'black':  '#000000'
};

var getActionFor = function (charCode) {
    if (charCode == 87 || charCode == 38) { // W, arrow_up
        return 'up';
    }
    if (charCode == 83 || charCode == 40) { // S, arrow_down
        return 'down';
    }
    if (charCode == 65 || charCode == 37) { // A, arrow_left
        return 'left';
    }
    if (charCode == 68 || charCode == 39) { // D, arrow_right
        return 'right';
    }
    if (charCode == 32 || charCode == 69 || charCode == 82) { // space, E, R
        return 'interact';
    } else {
        return 'unknown';
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('viewport');

    var settings = {
        canvas: canvas,

        fps: 60,
        speed: 3,

        rows: 4,
        bricks_in_row: 11,
        balls: 3,
        score_color: colors.black,

        angular_dampening: 0.8,

        platform_width: 200,
        platform_height: 20,
        platform_color: colors.dark,
        platform_side_color: colors.purple,
        platform_center_ratio: 0.7, // % of platform = elastic collision
        platform_speed: 5,

        ball_radius: 17,
        ball_color: colors.red,
        ball_speed: 6,

        brick_color: colors.green,

        score_per_brick: 50,

        background_color: colors.white,
        background_border: colors.dark,
        background_linewidth: 5,

        circle_radius: 50,
        circle_color: colors.blue
    };

    var game = new ArkanoidGame(settings);
    game.setUpLevel();
    game.launch();

    var keydownHandler = function (e) {
        e.preventDefault();
        this.handleKeyDown(getActionFor(e.which), e.type);
    };

    document.addEventListener("keydown", keydownHandler.bind(game));
    document.addEventListener("keyup", keydownHandler.bind(game));
    //canvas.addEventListener("click", keydownHandler.bind(game));
});
