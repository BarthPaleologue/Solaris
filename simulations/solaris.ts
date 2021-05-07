/// <reference path="babylon.d.ts" />
/// <reference path="../ts/babylon.gui.d.ts" />


import { isDefined, rand } from "./components/tools.js";
import { Astre } from "./components/astre";
import { dataFile } from "./components/dataFile";
import { BeltData } from "./components/beltData";
import { AstreData } from "./components/astreData";
import { Belt } from "./components/belt";
import { FreeCamera } from "babylonjs";

export class Solaris {
    quality: string; // définit le nombre de polygones et la qualité des effets
    SCENE_SIZE = 500000; /// Définit la taille de la skybox et les nbDaysPerMonths des caméras

    audio: HTMLAudioElement; // petite musique d'ambiance

    engine: BABYLON.Engine; // le moteur babylonjs
    canvas: HTMLCanvasElement; // le canvas de rendu
    scene: BABYLON.Scene; // la scène contenant le système

    keyboard: { [key: string]: boolean; } = {}; // dictionnaire de l'état du clavier

    assetsManager: BABYLON.AssetsManager; // l'outil pour charger les textures et affichier la progress bar
    UI: BABYLON.GUI.AdvancedDynamicTexture; // gestionnaire des labels des astres
    pipeline: BABYLON.DefaultRenderingPipeline; // gestionnaire des fx (pas les godrays)

    // données de la simulation
    astresData: AstreData[]; // données des astres
    beltsData: any[]; // données des ceintures d'astéroides
    astres: Astre[] = []; // liste des astres
    belts: Belt[] = []; // liste des ceintures d'astéroides

    //#region Paramètres de temps

    timeSpeedFactor: number; // vitesse du temps spécifique à la simulation
    timeUnit: number; // Unité de temps
    powerTime = 3; // augmentation cublique de la vitesse du temps avec le slider

    clock = 0; // on initialise l'horloge à 0 (elle se remet à 0 à la fin de chaque journée, un peu comme une horloge en fait)
    currentDay = 1;
    currentMonth = 1;
    currentYear = 2020;

    //#endregion

    diametreConversionFactor: number; // facteur multiplicatif pour retrouver les vraies valeurs de diamètres
    distanceConversionFactor: number; // la même pour les distances
    diameterScalingFactor: number; // Facteur d'agrandissement de tous les astres
    distanceScalingFactor: number; // Facteur d'agrandissement des distances

    //#region Cameras

    targetCameras: BABYLON.ArcRotateCamera[] = []; // Liste des caméras de ciblage
    freeCameras: BABYLON.FreeCamera[] = []; // Liste des caméras en mouvement libre
    freeCameraSpeed: number; /// Vitesse des caméras libres
    transitionSpeedFactor = .3; // vitesse des déplacements planète à planète des caméras

    //#endregion

    //#region deplacements

    destinationRadius: number; // distance de la targetcamera à l'astre currentTarget lors de la fin de transition
    precisionFactor = 5; // facteur de précision du zoom roulette

    //#endregion

    step: number = 0;
    maxStep: number = 200;
    previousTarget: Astre;
    currentTarget: Astre;
    movementVector = BABYLON.Vector3.Zero();
    firstTarget: string; // premier astre ciblé par la caméra au lancement

    //#region Flag pour togglers

    areOrbitsEnabled = false;
    areAsteroidsEnabled = true;
    areGodraysEnabled = true;
    areLabelsEnabled = true;

    //#endregion

    //#region Events

    tickEvent = new Event("tick");
    loadingCompleteEvent = new Event("loadingComplete");
    toggleOrbitsEvent = new Event("toggleOrbits");
    toggleAsteroidsBeltsEvent = new Event("toggleAsteroidBelts");
    toggleGodraysEvent = new Event("toggleGodrays");
    toggleLabelsEvent = new Event("toggleLabels");
    toggleSoundEvent = new Event("toggleSound");
    toggleFXAAEvent = new Event("toggleFXAA");

    //#endregion

    constructor(engine: BABYLON.Engine, quality = "high") {
        this.quality = quality;
        this.engine = engine;
        this.canvas = engine.getRenderingCanvas();

        BABYLON.VolumetricLightScatteringPostProcess.prototype.light = undefined; // un godrays est associé à une lumière
        BABYLON.Camera.prototype.godraysList = []; // une caméra a accès aux godrays qui lui sont attachés
    }

    loadConfiguration(path: string): dataFile { // load json configuration file
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", path, false);
        if (xmlhttp.overrideMimeType) xmlhttp.overrideMimeType("application/json");
        xmlhttp.send();

        let data: dataFile = xmlhttp.status == 200 ? JSON.parse(xmlhttp.responseText) : { "F": "ERROR" };
        this.diameterScalingFactor = data.diameterScalingFactor;
        this.distanceScalingFactor = data.distanceScalingFactor;
        this.firstTarget = data.firstTarget;
        this.timeSpeedFactor = data.timeSpeedFactor;
        this.timeUnit = this.timeSpeedFactor;
        this.diametreConversionFactor = data.diametreConversionFactor;
        this.distanceConversionFactor = data.distanceConversionFactor;
        this.astresData = data.astres;
        this.beltsData = data.belts;
        this.freeCameraSpeed = (50 * 0.001) ** 2 * this.distanceScalingFactor;

        return data;
    }

    initScene(): BABYLON.Scene { // init empty scene
        let scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // Couleur par défaut du fond de la scène

        scene.onPointerObservable.add((pointerInfo, eventState) => { /// Click sur un astre
            let target = pointerInfo.pickInfo.pickedMesh;
            if (/ringsOf/.test(target.id)) { /// Si click sur les anneaux d'un astre
                let astreTarget = this.getAstreById(target.id.substring(7)); /// On récupère le nom de l'astre
                this.goTo(astreTarget); /// On enclenche !
            } else if (/atmosphereOf/.test(target.id)) { /// Si click sur l'atmosphère d'un astre
                let astreTarget = this.getAstreById(target.id.substring(12)); /// On récupère le nom de l'astre
                this.goTo(astreTarget); /// On enclenche !
            } else this.goTo(this.getAstreById(target.id)); /// Si de manière générale on click sur un autre astre, on enclenche !
        }, BABYLON.PointerEventTypes.POINTERPICK);

        scene.executeWhenReady(() => { /// Quand la scène est prête
            document.dispatchEvent(this.loadingCompleteEvent);

            this.goTo(this.currentTarget); /// On focus la caméra sur le bon astre
            this.engine.runRenderLoop(() => scene.render()); /// On rend la scène sur le canvas
        });

        scene.beforeRender = () => this.update();
        this.scene = scene;

        let systemNode = new BABYLON.Mesh("systemNode", scene);
        let center = BABYLON.Mesh.CreateBox("centre", 1000, scene);
        let mat = new BABYLON.StandardMaterial("matmat", scene);
        mat.wireframe = true;
        mat.emissiveColor = BABYLON.Color3.White();
        center.material = mat;
        center.isPickable = false;
        center.visibility = 0;

        return this.scene;
    }

    initAssetsManager(): BABYLON.AssetsManager {
        let assetsManager = new BABYLON.AssetsManager(this.scene); // Va contenir tous les matériaux
        assetsManager.useDefaultLoadingScreen = false;
        assetsManager.onProgress = (remaining: number, total: number) => {
            let fulfilled = Math.round(((total - remaining) / total) * 100);
            let progressEvent = new CustomEvent("loadingProgress", { detail: fulfilled });
            document.dispatchEvent(progressEvent);
        };
        this.assetsManager = assetsManager;
        return this.assetsManager;
    }

    initUI(): BABYLON.GUI.AdvancedDynamicTexture {
        this.UI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // gestion des labels des astres
        return this.UI;
    }

    initPipeline(): BABYLON.DefaultRenderingPipeline {
        this.pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", false, this.scene, this.scene.cameras); /// name, hdrEnabled, scene, cameras
        this.pipeline.fxaa = new BABYLON.FxaaPostProcess('fxaa', 1, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, this.engine, false);
        this.pipeline.fxaaEnabled = true;
        //this.pipeline.
        //this.pipeline.imageProcessing.contrast = 1.2;

        return this.pipeline;
    }

    initAudio(path: string, autoplay = true, loop = true): HTMLAudioElement {
        this.audio = new Audio(path);
        this.audio.autoplay = autoplay;
        this.audio.loop = loop;
        this.audio.load();

        return this.audio;
    }

    initSkybox(): BABYLON.Mesh {
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 1, this.scene);
        skybox.scaling.scaleInPlace(this.SCENE_SIZE);
        skybox.infiniteDistance = true; // impossible d'atteindre en vol libre
        skybox.isPickable = false; // n'est pas clickable

        let skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMat", this.scene);
        skyboxMaterial.backFaceCulling = false; // Texture à l'intérieur de la skybox
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/textures/skyboxes/7/skybox", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = BABYLON.Color3.Black();
        skyboxMaterial.specularColor = BABYLON.Color3.Black();
        skyboxMaterial.reflectionTexture.level = 5;

        skybox.material = skyboxMaterial;
        skybox.material.freeze(); // économie de ressources

        return skybox;
    }

    initKeyboard(): {} {
        this.keyboard = {};
        document.addEventListener("keydown", e => {
            this.keyboard[e.key] = true;
            // appuis ponctuels
            if (this.keyboard["f"]) this.toggleFXAA(); // [F]
            if (this.keyboard["g"]) this.toggleGodrays(); // [G]
            if (this.keyboard["h"]) this.toggleAsteroidBelts(); // [H]
            if (this.keyboard["i"]) document.getElementById("infos").classList.toggle("hiddenInfos"); // Toggle Information pannel [I]
            if (this.keyboard["k"]) document.getElementById("fps").classList.toggle("hiddenFPS"); // Toggle FPS [K]
            if (this.keyboard["m"]) this.toggleSound(); // [M]
            if (this.keyboard["n"]) this.toggleLabels(); // [N]
            if (this.keyboard["o"]) this.toggleOrbits(); // [O]
            if (this.keyboard["p"]) this.takeScreenshot(); // [P]
            if (this.keyboard["t"]) document.getElementById("dateSelectorContainer").classList.toggle("hiddenDateSelector"); // Toggle time travel pannel [T]

            //if (this.keyboard["c"]) this.zooming = true; /// Zoom sur l'astre courant [C]
        });
        document.addEventListener("keyup", e => this.keyboard[e.key] = false); // Lorsque l'on relache une touche

        return this.keyboard;
    }

    listenToKeyboard() {
        // appuis longs
        let camera = this.scene.activeCamera;
        if (camera instanceof BABYLON.FreeCamera) {
            let systemNode = this.scene.getMeshByID("systemNode");
            if (this.keyboard["z"] || this.keyboard["w"]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.Z).scale(dt);
                systemNode.position.subtractInPlace(movement);
            }
            if (this.keyboard["s"]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.Z).scale(dt);
                systemNode.position.addInPlace(movement);
            }
            if (this.keyboard["d"]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.X).scale(dt);
                systemNode.position.subtractInPlace(movement);
            }
            if (this.keyboard["q"] || this.keyboard["a"]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.X).scale(dt);
                systemNode.position.addInPlace(movement);
            }
            if (this.keyboard[" "]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.Y).scale(dt);
                systemNode.position.subtractInPlace(movement);
            }
            if (this.keyboard["Shift"]) {
                let dt = this.engine.getDeltaTime();
                let movement = camera.getDirection(BABYLON.Axis.Y).scale(dt);
                systemNode.position.addInPlace(movement);
            }
        }
    }

    initAstres(): Astre[] {
        for (let astreData of this.astresData) this.astres.push(this.createAstre(astreData)); // Générations des astres selon la tables des données
        return this.astres;
    }

    initBelts(): Belt[] {
        for (let beltData of this.beltsData) this.belts.push(this.createBelt(beltData)); // on crée une ceinture d'astéroides
        return this.belts;
    }

    //#region Caméras

    addCamera(name: string, type: string): BABYLON.FreeCamera | BABYLON.ArcRotateCamera | BABYLON.AnaglyphFreeCamera | BABYLON.AnaglyphArcRotateCamera | BABYLON.VRDeviceOrientationFreeCamera {
        let newCamera: BABYLON.FreeCamera | BABYLON.ArcRotateCamera | BABYLON.AnaglyphFreeCamera | BABYLON.AnaglyphArcRotateCamera | BABYLON.VRDeviceOrientationFreeCamera;
        switch (type) {
            case "target":
                newCamera = new BABYLON.ArcRotateCamera(name, .3, Math.PI / 4, 400 * this.diameterScalingFactor, BABYLON.Vector3.Zero(), this.scene);
                newCamera.upperRadiusLimit = (this.SCENE_SIZE / 15) * this.diameterScalingFactor; // Dézoom Max pour rester dans la skybox
                newCamera.fov = (30 / 360) * Math.PI * 2;
                this.targetCameras.push(newCamera);
                break;
            case "targetAnaglyph":
                newCamera = new BABYLON.AnaglyphArcRotateCamera(name, .3, Math.PI / 4, 400 * this.diameterScalingFactor, BABYLON.Vector3.Zero(), .33, this.scene);
                newCamera.upperRadiusLimit = (this.SCENE_SIZE / 15) * this.diameterScalingFactor;
                newCamera.fov = (30 / 360) * Math.PI * 2;
                this.targetCameras.push(newCamera);
                break;
            case "free":
                newCamera = new BABYLON.FreeCamera(name, BABYLON.Vector3.Zero(), this.scene);
                this.freeCameras.push(newCamera);
                break;
            case "freeAnaglyph":
                newCamera = new BABYLON.AnaglyphFreeCamera(name, BABYLON.Vector3.Zero(), .033, this.scene);
                this.freeCameras.push(newCamera);
                break;
            case "freeVR":
                newCamera = new BABYLON.VRDeviceOrientationFreeCamera(name, BABYLON.Vector3.Zero(), this.scene);
                this.freeCameras.push(newCamera);
                break;
        }

        newCamera.maxZ = this.SCENE_SIZE; // Horizon assez loin pour voir skybox

        return newCamera;
    }

    switchTo(newCamera: BABYLON.FreeCamera | BABYLON.ArcRotateCamera): void { /// fonction permettant de switch de caméra facilement
        this.scene.activeCamera.detachControl(this.canvas);
        newCamera.attachControl(this.canvas);
        this.scene.activeCamera = newCamera;
        if (newCamera instanceof BABYLON.FreeCamera) { // afficher aide à la navigation
            document.getElementById("zqsd").classList.toggle("visibleZQSD");
            setTimeout(() => document.getElementById("zqsd").classList.toggle("visibleZQSD"), 3000);
        }
    }

    //#endregion

    //#region Mesh creation

    getAstreById(id: string): Astre {
        for (let astre of this.astres) {
            if (astre.id == id) return astre;
        }
        console.error(`Could not find ${id} in astres`);
    }

    createAstre(astreData: AstreData): Astre {
        let astre = new Astre(astreData, isDefined(astreData.parentId) ? this.getAstreById(astreData.parentId) : undefined, this.astres.length, this.quality, this.assetsManager, this.scene);
        astre.setDiameterScale(this.diameterScalingFactor);
        astre.setDistanceScale(this.distanceScalingFactor);

        if (astreData.godrays) { // si l'astre est une étoile
            let light = new BABYLON.PointLight(`lightOf${astre.id}`, BABYLON.Vector3.Zero(), this.scene); // création d'une lumière
            light.parent = astre.mesh; // attachement de la lumière à l'astre

            for (let camera of this.scene.cameras) {
                let godrays = new BABYLON.VolumetricLightScatteringPostProcess(`godraysOf${astre.id}${camera.id}`, 1.0, camera, astre.mesh, this.quality == "high" ? 100 : 50, BABYLON.Texture.BILINEAR_SAMPLINGMODE, this.engine, false); // création du VLS
                godrays.exposure = isDefined(astreData.exposure) ? astreData.exposure : 0.5; // réglage de l'intensité
                godrays.decay = isDefined(astreData.decay) ? astreData.decay : .93; // réglage de la couronne stellaire
                //godrays.light = light;
                let renderEffect = new BABYLON.PostProcessRenderEffect(this.engine, godrays.name, () => { return godrays; });
                this.pipeline.addEffect(renderEffect);
                //camera.godraysList.push(godrays); // on push tout dans un array
                for (let _godrays of camera.godraysList) { // on empèche les conflits entre godrays i.e ils s'éclairent pas entre eux
                    //godrays.excludedMeshes.push(_godrays.mesh);
                    //_godrays.light.excludedMeshes.push(godrays.mesh); // ils s'éclairent pas entre eux
                }
            }

        }

        if (astreData.id == this.firstTarget) this.currentTarget = astre;

        let label = astre.addLabel(this.UI);

        if (astre.mesh.isPickable) {
            label.onPointerUpObservable.add(() => this.goTo(astre)); // on attache un event click sur les étiquettes

            let listElm = document.createElement("li");
            listElm.setAttribute("id", astreData.id);
            listElm.setAttribute("class", isDefined(astreData.parentId) ? "satellite" : "planete");
            listElm.innerHTML = `<img src="../data/icons/${astreData.icon}"/><p>${astreData.id}</p>`;
            document.getElementById("astra-list").appendChild(listElm);
            listElm.addEventListener("click", () => this.goTo(astre)); // gère le click sur le sélecteur d'astre
        }

        return astre;
    }

    createBelt(beltData: BeltData): Belt {
        let asteroid = BABYLON.Mesh.CreateSphere("asteroid", 1, 1, this.scene);

        let ceintureAsteroids = new BABYLON.SolidParticleSystem(beltData.id, this.scene, { updatable: false });
        ceintureAsteroids.addShape(asteroid, beltData.nb, {
            positionFunction: (particle: BABYLON.SolidParticle, i: number) => {
                particle.position.x = rand(beltData.position.nearest, beltData.position.farthest) * Math.sin(Math.PI * 2 / beltData.nb * i);
                particle.position.y = rand(-1, 1) * beltData.yDivergence;
                particle.position.z = rand(beltData.position.nearest, beltData.position.farthest) * Math.cos(Math.PI * 2 / beltData.nb * i);
                if (!isDefined(beltData.parentId)) particle.position.scaleInPlace(this.distanceScalingFactor);

                particle.scale.x = (Math.random() * 2 + 0.8);
                particle.scale.y = (Math.random() + 0.8);
                particle.scale.z = (Math.random() * 2 + 0.8);
                particle.scale.scaleInPlace(beltData.size * (isDefined(beltData.parentId) ? 1 : this.diameterScalingFactor));

                particle.rotation.x = rand(0, 6.28);
                particle.rotation.y = rand(0, 6.28);
                particle.rotation.z = rand(0, 6.28);
            },
            vertexFunction: (particle: BABYLON.SolidParticle, vertex: BABYLON.Vector3) => {
                vertex.x *= Math.random() + 1;
                vertex.y *= Math.random() + 1;
                vertex.z *= Math.random() + 1;
            }
        });
        let mesh = ceintureAsteroids.buildMesh();

        let mat = new BABYLON.StandardMaterial("mat", this.scene);
        switch (beltData.textureType) {
            case "diffuse":
                mat.diffuseTexture = new BABYLON.Texture("../data/textures/surfaces/rock.jpg", this.scene);
                break;
            case "emissive":
                mat.emissiveTexture = new BABYLON.Texture("../data/textures/surfaces/rock.jpg", this.scene);
                mat.disableLighting = true;
                break;
        }
        mat.specularColor = BABYLON.Color3.Black();
        mat.freeze();
        mesh.material = mat;
        if (isDefined(beltData.parentId)) mesh.parent = this.scene.getMeshByID(beltData.parentId);
        else mesh.parent = this.scene.getMeshByID("systemNode");
        mesh.freezeNormals();
        asteroid.dispose();

        let belt = new Belt(ceintureAsteroids);

        return belt;
    }

    //#endregion

    takeScreenshot(precision = 2) {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(this.engine, this.scene.activeCamera, {
            precision: precision
        });
    }

    //#region Togglers

    toggleOrbits() {
        this.areOrbitsEnabled = !this.areOrbitsEnabled;
        for (let astre of this.astres) astre.orbitMesh.setEnabled(this.areOrbitsEnabled);
        document.dispatchEvent(this.toggleOrbitsEvent);
    }

    toggleAsteroidBelts() {
        this.areAsteroidsEnabled = !this.areAsteroidsEnabled;
        for (let belt of this.beltsData) this.scene.getMeshByID(belt.id).setEnabled(this.areAsteroidsEnabled);
        document.dispatchEvent(this.toggleAsteroidsBeltsEvent);
    }

    toggleGodrays() {
        this.areGodraysEnabled = !this.areGodraysEnabled;
        if (!this.areGodraysEnabled) {
            for (let camera of this.scene.cameras) {
                for (let godrays of camera.godraysList) godrays.excludedMeshes.push(godrays.mesh);
            }
        } else {
            for (let camera of this.scene.cameras) {
                for (let godrays of camera.godraysList) godrays.excludedMeshes.splice(godrays.excludedMeshes.indexOf(godrays.mesh));
            }
        }
        document.dispatchEvent(this.toggleGodraysEvent);
    }

    toggleLabels() {
        this.areLabelsEnabled = !this.areLabelsEnabled;
        if (!this.areLabelsEnabled) for (let astre of this.astres) this.UI.removeControl(astre.label);
        else {
            for (let astre of this.astres) {
                // si c'est pas l'astre actuel && (si pas satellite || si satellite et astre courant satellite du même astre || si satellite de l'astre courant)
                if (astre != this.currentTarget && (!isDefined(astre.parent) || (isDefined(astre.parent) && astre.parent == this.currentTarget.parent) || astre.parent == this.currentTarget)) this.UI.addControl(astre.label); // si astre parent, on affiche l'étiquette
            }
        }
        document.dispatchEvent(this.toggleLabelsEvent);
    }

    toggleSound() {
        if (this.audio.volume == 1) for (let i = 0; i < 100; i++) setTimeout(() => this.audio.volume = 1 - i / 100, i * 20); // the sound fades out
        else for (let i = 0; i < 100; i++) setTimeout(() => this.audio.volume = i / 100, i * 20); // the sound fades in
        document.dispatchEvent(this.toggleSoundEvent);
    }

    toggleFXAA() {
        this.pipeline.fxaaEnabled = !this.pipeline.fxaaEnabled;
        document.dispatchEvent(this.toggleFXAAEvent);
    }

    //#endregion

    timeJump(timeLeap: number) { /// Prise en compte du bond temporel (en jours)
        for (let astre of this.astres) {
            astre.updateRotation(2 * Math.PI * timeLeap);
            astre.updateOrbitalPosition(2 * Math.PI * timeLeap);
        }
    }

    goTo(newTarget: Astre) {

        this.currentTarget.orbitMesh.color = BABYLON.Color3.White(); // l'orbite redevient blanche
        newTarget.orbitMesh.color = BABYLON.Color3.Yellow(); // l'orbite devient jaune

        if (this.areLabelsEnabled) {
            for (let astre of this.astres) {
                if (astre != newTarget && (!isDefined(astre.parent) || (isDefined(astre.parent) && astre.parent == newTarget.parent) || astre.parent == newTarget)) this.UI.addControl(astre.label); // si astre parent, on affiche l'étiquette
                else this.UI.removeControl(astre.label);
            }
        }

        let targetChangeEvent = new CustomEvent("targetChange", { detail: newTarget.data });
        document.dispatchEvent(targetChangeEvent);

        this.previousTarget = this.currentTarget;
        this.currentTarget = newTarget; // on change la cible

        this.destinationRadius = (this.currentTarget.data.diametre * this.diameterScalingFactor) * 4 + 1; // distance d'approche de l'astre currentTarget

        this.movementVector = BABYLON.Vector3.Zero().copyFrom(this.currentTarget.mesh.getAbsolutePosition());

        this.step = 1;
    }

    updateCameraPositions() {
        let systemNode = this.scene.getMeshByID("systemNode");

        let offset = this.movementVector.scale(1 / this.maxStep);

        systemNode.position.subtractInPlace(offset);
    }

    zoom() {
        for (let camera of this.targetCameras) {
            let height = camera.radius - this.destinationRadius;
            camera.radius = this.destinationRadius + (1 - (this.step / this.maxStep)) * height;
        }
    }

    updateAstres() {
        for (let astre of this.astres) {
            astre.updateRotation(this.timeUnit);
            astre.updateOrbitalPosition(this.timeUnit);
        }
    }

    updateClock() {
        this.clock += this.timeUnit;
        if (this.clock >= Math.PI * 2) {
            this.currentDay += Math.floor(this.clock / (Math.PI * 2));
            this.clock = this.clock % Math.PI * 2;
            let nbDaysPerMonth: number;
            if ([1, 3, 5, 7, 8, 10, 12].includes(this.currentMonth)) nbDaysPerMonth = 31;
            else if (this.currentMonth == 2) {
                if (this.currentYear % 4 == 0 && this.currentYear % 100 != 0 && this.currentYear % 400 == 0) nbDaysPerMonth = 29;
                else nbDaysPerMonth = 28;
            } else nbDaysPerMonth = 30;

            if (this.currentDay > nbDaysPerMonth) {
                this.currentMonth += Math.round(this.currentDay / nbDaysPerMonth);
                this.currentDay = 1;
            }
            if (this.currentMonth > 12) {
                this.currentYear += Math.round(this.currentMonth / 12);
                this.currentMonth = 1;
            }
            let dateEvent = new CustomEvent("dateChange", {
                detail: {
                    "day": this.currentDay,
                    "month": this.currentMonth,
                    "year": this.currentYear
                }
            });
            document.dispatchEvent(dateEvent);
        }
    }

    update() {
        document.dispatchEvent(this.tickEvent);

        this.listenToKeyboard();

        if (this.step > 0) { /// Mise à jour de la position des caméras lors du changement de cible
            this.step += 1;
            this.updateCameraPositions();
            this.zoom();
            if (this.scene.activeCamera instanceof BABYLON.FreeCamera) {
                if (this.currentTarget.mesh.absolutePosition.length() < (this.currentTarget.data.diametre * this.diameterScalingFactor) * 4 + 1) {
                    this.step = this.maxStep;
                }
            }
            if (this.step == this.maxStep) {
                for (let camera of this.targetCameras) {
                    camera.lowerRadiusLimit = (this.currentTarget.data.diametre * this.diameterScalingFactor) + 1;
                }
                this.step = 0;
            }
        } else {
            this.updateAstres();
            this.updateClock();
            if (this.scene.activeCamera instanceof BABYLON.ArcRotateCamera) {
                let previousPosition = this.currentTarget.mesh.getAbsolutePosition();
                let systemNode = this.scene.getMeshByID("systemNode");
                systemNode.position.subtractInPlace(previousPosition);
            }
        }

        /// Gestion dynamique de la précision du zoom roulette
        for (let camera of this.targetCameras) {
            camera.wheelPrecision = this.precisionFactor * 100 / camera.radius;
            camera.pinchPrecision = camera.wheelPrecision;
        }
    }

    start() {
        this.assetsManager.load();
    }
}