/// <reference path="../../babylon.d.ts" />

import { setupAudio, Slider, rand, randInt, randBool, loadJSON } from "../../components/tools";

const lang = document.documentElement.lang;
const TEXT: { [lang: string]: { [key: string]: string; }; } = loadJSON("../data/lang/language.support.json");

function randomStarColor() {
    if (randBool(50)) return new BABYLON.Color4(rand(.1, .2), rand(.5, .8), 1, 1);
    else return new BABYLON.Color4(rand(.7, 253 / 255), rand(.8, 184 / 255), 1, 1);
}

class Galaxy {
    scene: BABYLON.Scene;

    nbStars: number;
    nbArms: number;
    armLength: number; /// Longueur des bras
    armOffsetMax: number; /// Largeur max des bras
    rotationFactor: number; /// Rotation des bras
    largeCoeff: number; /// Multiplicateur de largeur des bras
    dispersion: number; /// Eloignement des étoiles par rapport aux bras
    density: number; /// densité de la galaxie en fonction du nombre d'étoiles
    starsPositions: Array<BABYLON.Vector3>;
    gazCloudsPositions: Array<BABYLON.Vector3>;
    // @ts-ignore
    stars: BABYLON.PointsCloudSystem;
    gazClouds: BABYLON.ParticleSystem;
    constructor(_scene: BABYLON.Scene, _nbStars: number, _nbArms = 5, _armLength = 10, _armOffsetMax = 30, _rotationFactor = .05, _largeCoeff = 3, _dispersion = 5) {
        this.scene = _scene;
        this.nbStars = _nbStars;
        this.nbArms = _nbArms;
        this.armLength = _armLength;
        this.armOffsetMax = _armOffsetMax;
        this.rotationFactor = _rotationFactor;
        this.largeCoeff = _largeCoeff;
        this.dispersion = _dispersion;
        this.density = 2 * this.nbStars / 32000;

        this.starsPositions = this.initPositions("stars");
        this.gazCloudsPositions = this.initPositions("gazClouds");

        // @ts-ignore
        this.stars = new BABYLON.PointsCloudSystem("stars", 1, this.scene);
        this.stars.addPoints(this.nbStars, (particle: BABYLON.Particle, i: number) => {
            particle.position = this.starsPositions[i];
            particle.color = randomStarColor();
        });
        this.stars.updateParticle = (particle: any) => particle.position = this.starsPositions[particle.idx];
        this.stars.buildMeshAsync();

        this.gazClouds = new BABYLON.ParticleSystem("gazClouds", Math.round(this.nbStars / 4), this.scene);
        this.gazClouds.particleTexture = new BABYLON.Texture("../data/textures/particles/gazCloud.jpg", this.scene);
        this.gazClouds.updateFunction = (particles: BABYLON.Particle[]) => {
            for (let i in particles) particles[i].position = this.gazCloudsPositions[i];
        };
        this.gazClouds.color1 = new BABYLON.Color4(70 / 256, 66 / 256, 122 / 256, .1);
        this.gazClouds.color2 = new BABYLON.Color4(rand(55, 120) / 256, 34 / 256, rand(4, 100) / 256, .1);
        this.gazClouds.minSize = 8 * (this.nbStars / 32000);
        this.gazClouds.maxSize = 10 * (this.nbStars / 32000);
        this.gazClouds.updateSpeed = 10;

        this.gazClouds.start();
        //this.stars.setParticles();
    }
    initPositions(type: string): Array<BABYLON.Vector3> {
        let positions = new Array<BABYLON.Vector3>(this.nbStars);
        for (let i = 0; i < this.nbStars; i++) {

            let angularDifference = (2 * Math.PI) / this.nbArms;

            let distance = rand(1, this.armLength) ** 2; /// Initialisation de la distance au centre

            let armOffset = ((rand(-1, 1) * this.armOffsetMax / distance) ** 2) * this.largeCoeff; /// Définition du décalage en fonction de la distance

            let rotation = distance * this.rotationFactor; /// Rotation plus forte à mesure que l'on s'éloigne du centre

            let angle = Math.round(rand(0, 2 * Math.PI) / angularDifference) * angularDifference + armOffset + rotation; /// Séparation des bras + ajout du facteur de rotation

            let starX = Math.cos(angle) * distance + rand(0, Math.sqrt(Math.abs(armOffset))); /// Trigonométrie de base
            let starZ = Math.sin(angle) * distance + rand(0, Math.sqrt(Math.abs(armOffset))); /// Idem
            let starY = 10 * rand(-1, 1) / (distance); /// Hauteur aléatoire

            if (type == "stars") {
                starX += rand(-1, 1) * this.dispersion;
                starY += rand(-1, 1) * this.dispersion / 2;
                starZ += rand(-1, 1) * this.dispersion;
            } else {
                starY += rand(-5, 5) / 3;
            }
            positions[i] = new BABYLON.Vector3(starX, starY, starZ).scale(5);
        }
        console.log(this.density);
        return positions;
    }
    update() {
        this.starsPositions = this.initPositions("stars");
        this.gazCloudsPositions = this.initPositions("gazClouds");
        this.stars.setParticles();
    }
}

export function createGalaxy(nb: number) {
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(<HTMLCanvasElement>canvas, true);
    window.addEventListener("resize", () => engine.resize());
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    const audio = setupAudio("../data/sounds/ambient.mp3");

    let assetsManager = new BABYLON.AssetsManager(scene);

    const nbstars = nb;

    let galaxy = new Galaxy(scene, nbstars);

    let skybox = BABYLON.Mesh.CreateBox("skyBox", 100000, scene);

    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/textures/skyboxes/2/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;

    //#region Cameras

    let camAstras = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0.000001, 0.000001, 600 * (nbstars / 32000), BABYLON.Vector3.Zero(), scene);
    camAstras.angularSensibilityX = 2000;
    camAstras.angularSensibilityY = 2000;
    camAstras.maxZ = 10000000;
    camAstras.wheelPrecision = 2;
    camAstras.lowerRadiusLimit = 100 * (nbstars / 32000);
    camAstras.upperRadiusLimit = 30000;
    scene.activeCamera = camAstras;
    camAstras.attachControl(canvas);

    let camAstrasd = new BABYLON.AnaglyphArcRotateCamera("ArcRotateCamera", 0.000001, 0.000001, 600 * (nbstars / 32000), BABYLON.Vector3.Zero(), 0.33, scene);
    camAstrasd.angularSensibilityX = 2000;
    camAstrasd.angularSensibilityY = 2000;
    camAstrasd.maxZ = 10000000;
    camAstrasd.wheelPrecision = 2;
    camAstrasd.lowerRadiusLimit = 100 * (nbstars / 32000);
    camAstrasd.upperRadiusLimit = 30000;
    camAstrasd.maxZ = 10000000;

    let camfree = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 70, 0), scene);
    camfree.checkCollisions = true;
    camfree.keysUp.push(90); // Z 		 
    camfree.keysLeft.push(81); // Q
    camfree.keysDown.push(83); // S 
    camfree.keysRight.push(68); // D
    camfree.maxZ = 100000000;

    let camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(70, 70, 0), 0.033, scene);
    camfreed.checkCollisions = true;
    camfreed.keysUp.push(90); // Z 		 
    camfreed.keysLeft.push(81); // Q
    camfreed.keysDown.push(83); // S 
    camfreed.keysRight.push(68); // D	
    camfreed.maxZ = 100000000;

    let pipeline = new BABYLON.DefaultRenderingPipeline(
        "pipeline", // The name of the pipeline
        true, /// HDR
        scene, // The scene instance
        scene.cameras // The list of cameras to be attached to
    );
    pipeline.bloomEnabled = false;

    function switchTo(newCamera: BABYLON.Camera) { /// fonction permettant de switch de caméra facilement
        scene.activeCamera.detachControl(canvas);
        newCamera.attachControl(canvas);
        scene.activeCamera = newCamera;
        if (newCamera instanceof BABYLON.FreeCamera) {
            document.getElementById("zqsd").classList.toggle("visibleZQSD");
            setTimeout(() => document.getElementById("zqsd").classList.toggle("visibleZQSD"), 3000);
        }
    }

    document.getElementById("free").addEventListener("click", () => switchTo(camfree)); // Switch sur la caméra libre
    document.getElementById("freed").addEventListener("click", () => switchTo(camfreed)); // Switch sur la caméra libre anaglyphe
    document.getElementById("plan").addEventListener("click", () => switchTo(camAstras)); // Swicth sur la caméra planétaire
    document.getElementById("pland").addEventListener("click", () => switchTo(camAstrasd)); // Switch sur la caméra planétaire anaglyphe

    //#endregion


    document.onkeydown = e => {
        if (e.keyCode == 32) { /// SPACEBAR
            e.preventDefault();
            camfree.cameraDirection.y += camfree.speed / 20;
            camfreed.cameraDirection.y += camfreed.speed / 20;
        }
        if (e.keyCode == 16) { /// SHIFT
            e.preventDefault();
            camfree.cameraDirection.y -= camfree.speed / 20;
            camfreed.cameraDirection.y -= camfreed.speed / 20;
        }
        if (e.keyCode == 71) { /// G
            e.preventDefault();
            generateRandomGalaxy();
        }
        if (e.keyCode == 75) { /// K
            e.preventDefault();
            document.getElementById("fps").classList.toggle("hiddenFPS"); /// Toggle FPS
        }
        if (e.keyCode == 77) { /// M
            e.preventDefault();
            toggleSound(audio.volume == 1);
        }
    };

    new Slider("precision", document.getElementById("precision"), 1, 50, 20, (val: number) => {
        camAstras.wheelPrecision = val / 10;
        camAstrasd.wheelPrecision = val / 10;
    });

    new Slider("speed", document.getElementById("speed"), 1, 50, 10, (val: number) => {
        camfree.speed = val;
        camfreed.speed = val;
    });

    new Slider("sensibility", document.getElementById("sensifree"), 1, 20, 5, (val: number) => {
        camfree.angularSensibility = 10000 / val;
        camfreed.angularSensibility = 10000 / val;
        camAstras.angularSensibilityX = 10000 / val;
        camAstras.angularSensibilityY = 10000 / val;
        camAstrasd.angularSensibilityX = 10000 / val;
        camAstrasd.angularSensibilityY = 10000 / val;
    });

    let armslider = new Slider("nbArms", document.getElementById("arms"), 2, 10, galaxy.nbArms, (val: number) => {
        galaxy.nbArms = val;
        galaxy.update();
    });

    let densityslider = new Slider("density", document.getElementById("denstar"), 1, 30, Math.round(10 / galaxy.density), (val: number) => {
        galaxy.density = 10 / val;
        galaxy.update();
    });

    let enrouslider = new Slider("enroulement", document.getElementById("enroulement"), 1, 300, galaxy.rotationFactor * 2000, (val: number) => {
        galaxy.rotationFactor = val / 2000;
        galaxy.update();
    });

    let largeslider = new Slider("largeur", document.getElementById("largeur"), 1, 70, galaxy.largeCoeff * 10, (val: number) => {
        galaxy.largeCoeff = val / 10;
        galaxy.update();
    });

    let longueurslider = new Slider("length", document.getElementById("longueur"), 6, 16, galaxy.armLength, (val: number) => {
        galaxy.armLength = val;
        galaxy.update();
    });

    let dispslider = new Slider("dispersion", document.getElementById("disp"), 0, 10, galaxy.dispersion, (val: number) => {
        galaxy.dispersion = val;
        galaxy.update();
    });

    function generateRandomGalaxy() {
        armslider.setValue(randInt(4, 7));
        largeslider.setValue(rand(9, 14));
        longueurslider.setValue(rand(7, 9));
        enrouslider.setValue(randInt(80, 180));
        densityslider.setValue(randInt(2, 7) / (nbstars / 32000));
        dispslider.setValue(randInt(2, 6));
    }

    assetsManager.onProgress = (remaining: number, total: number) => {
        let progression = (total - remaining) / total;
        document.getElementById("bar").style.width = String(progression) + "%";
        document.querySelector(".text").innerHTML = String(progression);
    };

    assetsManager.onFinish = () => {
        document.getElementById("menu").classList.toggle("hiddenMenu"); // On affiche le menu
        document.getElementById("toolbar").style.display = "block";
        document.getElementById("setters").classList.toggle("hiddenSetters");
        canvas.style.zIndex = "1";
        canvas.style.opacity = "1";
        engine.runRenderLoop(() => {
            document.getElementById("fps").innerHTML = Math.round(engine.getFps()) + " FPS";
            scene.render();
        });
    };

    assetsManager.load();

    document.getElementById("all").addEventListener("click", () => canvas.requestFullscreen()); /// Fullscreen sans interface

    document.getElementById("not-all").addEventListener("click", () => { /// Fullscreen avec interface
        document.querySelector("body").requestFullscreen();
        document.getElementById("not-all").style.display = "none";
        document.getElementById("full-exit").style.display = "block";
    });

    document.getElementById("full-exit").addEventListener("click", () => { /// Exit Fullscreen
        document.getElementById("not-all").style.display = "block";
        document.getElementById("full-exit").style.display = "none";
        document.exitFullscreen();
    });

    document.getElementById("settings").addEventListener("click", () => document.getElementById("setters").classList.toggle("hiddenSetters"));

    document.getElementById("tscreen").addEventListener("click", () => {
        scene.render(); // le screenshot ne contient pas la galaxie sans ça... étrange
        BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, {
            precision: 2
        });
    });
    document.getElementById("trandom").addEventListener("click", generateRandomGalaxy);

    document.getElementById("tsound").addEventListener("click", () => toggleSound(audio.volume == 1));
    function toggleSound(state: boolean) {
        if (state) {
            for (let i = 0; i <= 100; i++) setTimeout(() => audio.volume = 1 - i / 100, i * 20); // the sound fades out
            document.getElementById("tsound").setAttribute("src", "../../toolbar/nomute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].mute);
        } else {
            for (let i = 0; i <= 100; i++) setTimeout(() => audio.volume = i / 100, i * 20); // the sound fades in
            document.getElementById("tsound").setAttribute("src", "../../toolbar/mute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].nomute);
        }
    }
}