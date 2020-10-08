/// <reference path="../babylon.d.ts" />

import { rand, randInt } from "../tools";

function setStarPosition(particle: BABYLON.SolidParticle, i: number) {
    particle.position.z = randInt(0, 300);
    let theta = rand(0, 6.28)
    particle.position.y = Math.cos(theta) * rand(10, 100);
    particle.position.x = Math.sin(theta) * rand(10, 100);

    particle.scale = new BABYLON.Vector3(2, 2, 2).scale(Math.random()).add(new BABYLON.Vector3(.8, .8, .8));

    particle.rotation.z = rand(-Math.PI / 2, Math.PI / 2);
    particle.rotation.x = rand(-Math.PI / 2, Math.PI / 2);
}

class Hyperspace {

    canvas: HTMLElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    assetsManager: BABYLON.AssetsManager;
    isFTL = false;

    camera1: BABYLON.FreeCamera;
    camera2: BABYLON.AnaglyphFreeCamera;

    starField1: BABYLON.Mesh;
    starField2: BABYLON.Mesh;

    speed = 0.0001;
    speedFactor = 1.0;
    fovMax = 3.0;
    acceleration = 0.5;

    loadingCompleteEvent = new CustomEvent("loadingComplete");
    updateEvent = new CustomEvent("update");

    constructor(canvas: HTMLElement) {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(<HTMLCanvasElement>this.canvas, true);
        window.addEventListener("resize", () => this.engine.resize());
    }
    init() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        this.scene.executeWhenReady(() => { /// Quand la scène est prête
            document.dispatchEvent(this.loadingCompleteEvent);
            this.engine.runRenderLoop(() => this.scene.render()); /// On rend la scène sur le canvas
        });
        this.scene.registerBeforeRender(() => {
            this.update();
        });

        this.assetsManager = new BABYLON.AssetsManager(this.scene);
        this.assetsManager.useDefaultLoadingScreen = false;
        this.assetsManager.onProgress = (remaining: number, total: number) => {
            let fulfilled = Math.round(((total - remaining) / total) * 100);
            let progressEvent = new CustomEvent("loadingProgress", { detail: fulfilled });
            document.dispatchEvent(progressEvent);
        }

        this.camera1 = new BABYLON.FreeCamera("camera1", BABYLON.Vector3.Zero(), this.scene);
        this.camera1.fov = 0.4
        this.camera1.minZ = .001;
        this.scene.activeCamera = this.camera1;

        this.camera2 = new BABYLON.AnaglyphFreeCamera("camera2", BABYLON.Vector3.Zero(), 0.033, this.scene);
        this.camera2.fov = 0.4;
        this.camera2.minZ = .001;

        let star = BABYLON.MeshBuilder.CreateGround("star", { width: 1, height: 1, subdivisions: 1 }, this.scene);
        star.rotation.x = Math.PI / 2;

        let mat = new BABYLON.StandardMaterial("mat1", this.scene);
        let textureTask = this.assetsManager.addTextureTask("starTextureTask", "../data/textures/particles/star5.png");
        textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
            mat.emissiveTexture = task.texture;
            mat.opacityTexture = task.texture;
            mat.opacityTexture.getAlphaFromRGB = true;
        }
        mat.emissiveColor = BABYLON.Color3.Blue();
        mat.backFaceCulling = false;

        let field1 = new BABYLON.SolidParticleSystem('stars', this.scene);
        field1.addShape(star, 10000, { positionFunction: setStarPosition });
        this.starField1 = field1.buildMesh();
        this.starField1.material = mat;
        field1.setParticles();

        let field2 = new BABYLON.SolidParticleSystem('stars2', this.scene);
        field2.addShape(star, 10000, { positionFunction: setStarPosition });
        this.starField2 = field2.buildMesh();
        this.starField2.material = mat;
        field2.setParticles();
        this.starField2.position.z = 300;

        this.assetsManager.load();
    }
    toggleFTL() {
        this.isFTL = !this.isFTL;
    }
    takeScreenShot() {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(this.engine, this.scene.activeCamera, { precision: 1.1 })
    }
    update() {
        if (this.isFTL) {
            if (this.speed < 0.2) this.speed += 0.0005 * this.acceleration;

            this.camera1.fov += (this.fovMax - this.camera1.fov) * this.acceleration / 100;
            this.camera2.fov += (this.fovMax - this.camera2.fov) * this.acceleration / 100;

            this.camera1.rotation.z += .0001;
            this.camera2.rotation.z += .0001;
        } else {
            if (this.speed > 0.0001) this.speed -= 0.003 * this.acceleration;
            if (this.speed <= 0) this.speed += 0.001;
            if (this.camera1.fov > 0.4) this.camera1.fov -= 0.1 * this.acceleration;
            if (this.camera2.fov > 0.4) this.camera2.fov -= 0.1 * this.acceleration;
        }

        this.starField1.position.z -= this.speed * this.speedFactor;
        this.starField2.position.z -= this.speed * this.speedFactor;

        if (this.starField1.position.z < - 450) this.starField1.position.z = 150;
        if (this.starField2.position.z < - 450) this.starField2.position.z = 150;

        document.dispatchEvent(this.updateEvent);
    }
}

export function createHyperspace(canvas: HTMLElement) {
    let hyperspace = new Hyperspace(canvas);

    hyperspace.init();

    return hyperspace;
}