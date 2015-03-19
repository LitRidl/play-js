function SpawnOutside() {
    var x_sz = 2500, x_mid = x_sz / 2,
        z_sz = 2500, z_mid = z_sz / 2;

    var rando = Math.round(Math.random() * 1);
    var x = ((Math.random() * x_sz) - x_mid);
    var z = ((Math.random() * z_sz) - z_mid);
    if (rando == 1) {
        if (x > 0) {
            x = height + 100;
        }
        else {
            x = -height - 100;
        }
    }
    else {
        if (z > 0) {
            z = width + 100;
        }
        else {
            z = -width - 100;
        }
    }
    return { 'x': x, 'z': z };
}

function SpawnInsideEdge() {
    var x_sz = 2500, x_mid = x_sz / 2,
        z_sz = 2500, z_mid = z_sz / 2;

    var rando = Math.round(Math.random() * 1);
    var x = ((Math.random() * x_sz) - x_mid);
    var z = ((Math.random() * z_sz) - z_mid);
    if (rando == 1) {
        if (x > 0) {
            x = height - 100;
        }
        else {
            x = -height + 100;
        }
    }
    else {
        if (z > 0) {
            z = width - 100;
        }
        else {
            z = -width + 100;
        }
    }
    return { 'x': x, 'z': z };
}
function SpawnInside() {
    var x_sz = 2500, x_mid = x_sz / 2,
        z_sz = 2500, z_mid = z_sz / 2;

    var x = ((Math.random() * x_sz) - x_mid);
    var z = ((Math.random() * z_sz) - z_mid);
    return { 'x': x, 'z': z };
}
