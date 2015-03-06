var colors = {
    'red': 0xF15A5A,
    'yellow': 0xF0C419,
    'green': 0x4EBA6F,
    'blue': 0x2D95BF,
    'purple': 0x955BA5,
    'dark': 0x333333,
    'white': 0xFFFFFF,
    'black': 0x000000,
    'gray': 0xAAAAAA
};

// x is red, y is green, z is blue
var buildAxes = function (length) {
    var buildAxis = function (src, dst, colorHex, dashed) {
        var geom = new THREE.Geometry(),
            mat;

        if (dashed) {
            mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
        } else {
            mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
        }

        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

        var axis = new THREE.Line(geom, mat, THREE.LinePieces);

        return axis;

    };
    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

    return axes;
};

var camera, controls, scene, renderer;
var asteroid1;

var setUpScene = function () {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 0;

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    scene = new THREE.Scene();

    scene.add(buildAxes(100));

    scene.fog = new THREE.FogExp2(0x0A0A0A, 0.002);

    // world
    for (var i = 0; i < 500; i++) {
        var mesh = asteroid1.clone();

        asteroid1.scale.set(10 + (Math.random() - 0.5) * 8,
                            10 + (Math.random() - 0.5) * 8,
                            10 + (Math.random() - 0.5) * 8);

        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 5;
        mesh.position.z = Math.random() * 100;

        //mesh.rotation.

        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;

        scene.add(mesh);
    }

    // lights
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    scene.add(light);

    light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.render(scene, camera);
    }, false);
};

var gameLoop = function () {
    requestAnimationFrame(gameLoop);
    controls.update();
};

document.addEventListener("DOMContentLoaded", function () {

    var loader = new THREE.JSONLoader();

    loader.load("./models/asteroid2.js", function (geometry, materials) {
        asteroid1 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: colors.gray,
            shading: THREE.SmoothShading,
            map: THREE.ImageUtils.loadTexture("./images/asteroid_texture.png", {}, function () {}),
            bumpMap: THREE.ImageUtils.loadTexture("./images/asteroid_normals.png", {}, function () {}),
            bumpScale: 0.9
        }));

        setUpScene();
        gameLoop();
    });
});
