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

var meshes = [
    {
        g: new THREE.CylinderGeometry(0, 10, 30, 4, 1),
        m: new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            map: THREE.ImageUtils.loadTexture("./images/marble.jpg", {}, function(){})
        })
    },
    {
        g: new THREE.TorusGeometry(10, 5, 16, 32),
        m: new THREE.MeshPhongMaterial({ color: colors.green, shading: THREE.SmoothShading, shininess: 60 })
    },
    {
        g: new THREE.TorusKnotGeometry(15, 5, 64, 8),
        m: new THREE.MeshPhongMaterial({ color: colors.purple,
            shading: THREE.SmoothShading,
            shininess: 60,
            map: THREE.ImageUtils.loadTexture("./images/marble.jpg", {}, function(){})
        })
    },
    {
        g: new THREE.SphereGeometry(20, 64, 64),
        m: new THREE.MeshLambertMaterial({ color: colors.red, shading: THREE.SmoothShading})
    },
    {
        g: new THREE.ParametricGeometry(function (u, v) {
            var r = 50;
            var x = Math.sin(u) * r;
            var z = Math.sin(v / 2) * 2 * r;
            var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
            return new THREE.Vector3(x, y, z);
        }, 120, 120),
        m: new THREE.MeshLambertMaterial({
            color: colors.blue,
            shading: THREE.SmoothShading,
            map: THREE.ImageUtils.loadTexture("./images/friz.png", {}, function(){}),
            bumpScale: 0.45
        })
    }
];

meshes[4].m.side = THREE.DoubleSide;

// var loader = new THREE.JSONLoader();
// var pumpkin, teapot;

// loader.load("./models/pumpkin.js", function(geometry, materials) {
//     pumpkin = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
//     pumpkin.scale.set(.3, .3, .3);
// });

// loader.load("./models/teapot.js", function(geometry, materials) {
//     teapot = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: colors.green, shading: THREE.SmoothShading, shininess: 60 }));
//     teapot.scale.set(4, 4, 4);
// });

var createRandomMesh = function () {
    var choice = Math.floor(Math.random() * meshes.length);

    var geometry = meshes[choice].g; // new THREE.CylinderGeometry(0, 10, 30, 4, 1);
    var material = meshes[choice].m; // new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading });

    return new THREE.Mesh(geometry, material);
};

var setUpScene = function () {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    // world
    for (var i = 0; i < 500; i++) {
        var mesh = createRandomMesh();

        mesh.position.x = (Math.random() - 0.5) * 1000;
        mesh.position.y = (Math.random() - 0.5) * 1000;
        mesh.position.z = (Math.random() - 0.5) * 1000;

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
    setUpScene();
    gameLoop();
});
