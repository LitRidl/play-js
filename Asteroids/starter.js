var colors = {
    'red': 0xF15A5A,
    'yellow': 0xF0C419,
    'green': 0x4EBA6F,
    'blue': 0x2D95BF,
    'purple': 0x955BA5,
    'dark': 0x333333,
    'white': 0xFFFFFF,
    'black': 0x000000
};

var camera, controls, scene, renderer;
var asteroid1;

var setUpScene = function () {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    // world
    for (var i = 0; i < 500; i++) {
        var mesh = asteroid1;

        mesh.position.x = 0; //(Math.random() - 0.5) * 1000;
        mesh.position.y = 0; //(Math.random() - 0.5) * 1000;
        mesh.position.z = 0; //(Math.random() - 0.5) * 1000;

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
            color: 0xAAAAAA,
            shading: THREE.SmoothShading,
            map: THREE.ImageUtils.loadTexture("./images/asteroid_texture.png", {}, function () {}),
            bumpMap: THREE.ImageUtils.loadTexture("./images/asteroid_normals.png", {}, function () {}),
            bumpScale: 0.9
        }));
        asteroid1.scale.set(10, 10, 10);

        setUpScene();
        gameLoop();
    });
});
