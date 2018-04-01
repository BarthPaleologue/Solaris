/// <reference path="../ts/babylonjs-2.5.d.ts" />
/// <reference path="../ts/jquery.d.ts" />
/// <reference path="../ts/jquery-ui.d.ts" />

document.addEventListener('contextmenu', e => e.preventDefault());

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

$(window).on("resize", e => engine.resize());

var debug = false;
if (!debug) console.error = () => {};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function intFormat(number) {
    return new Intl.NumberFormat().format(Math.round(number))
}

function randomBoolean(x = 2) {
    return getRandomInt(1, x) == 1;
}

function getRandomFromSeed(seed) {
    return ((seed * 9301 + 49297) % 233280) / 233280;
}

function isDefined(variable) {
    return variable != undefined;
}

function createSlider(element, handle, basevalue = 0, min = 0, max = 10, slide = () => {}) {
    let slider = element.slider({
        create: () => handle.text(basevalue),
        range: "min",
        min: min,
        max: max,
        value: basevalue,
        slide: slide
    });
    return slider;
}

function createBelt(name, nb, nearest, farthest, yDivergence, size, parent, texture, scene) {
    function VertexFunction(particle, vertex, i) {
        vertex.x *= (Math.random() + 1);
        vertex.y *= (Math.random() + 1);
        vertex.z *= (Math.random() + 1);
    };

    function astreroidPosition(particle, i, s) {
        particle.position.x = getRandomInt(nearest, farthest) * Math.sin(Math.PI * 2 / nb * i);
        particle.position.y = getRandomInt(yDivergence, -yDivergence);
        particle.position.z = getRandomInt(nearest, farthest) * Math.cos(Math.PI * 2 / nb * i);

        particle.scale.x = (Math.random() * 2 + 0.8) * size;
        particle.scale.y = (Math.random() + 0.8) * size;
        particle.scale.z = (Math.random() * 2 + 0.8) * size;

        particle.rotation.x = getRandomInt(0, 1000);
        particle.rotation.y = getRandomInt(0, 1000);
        particle.rotation.z = getRandomInt(0, 1000);
    };

    var asteroid = BABYLON.MeshBuilder.CreateSphere("s", { diameter: 1.5 * scale, segments: 1 }, scene);

    var ceintureAsteroids = new BABYLON.SolidParticleSystem(name, scene);
    ceintureAsteroids.addShape(asteroid, nb, { positionFunction: astreroidPosition, vertexFunction: VertexFunction });
    var mesh = ceintureAsteroids.buildMesh();

    var mat = new BABYLON.StandardMaterial("mat", scene);
    if (texture == "diffuse") {
        mat.diffuseTexture = new BABYLON.Texture("../data/rock.jpg", scene);
        mat.diffuseTexture.uScale = 5;
        mat.diffuseTexture.vScale = 5;
    } else if (texture == "emissive") {
        mat.emissiveTexture = new BABYLON.Texture("../data/rock.jpg", scene);
        mat.emissiveTexture.uScale = 5;
        mat.emissiveTexture.vScale = 5;
        mat.disableLighting = true;
    }
    mat.specularColor = new BABYLON.Color3.Black();
    mat.backFaceCulling = false;
    mat.freeze();
    mesh.material = mat;
    mesh.freezeNormals();
    asteroid.dispose();
}