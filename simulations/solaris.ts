/// <reference path="babylon.d.ts" />
/// <reference path="../ts/babylon.gui.d.ts" />

import { Astre, AstreData } from "./astre.js";
import { isDefined, rand } from "./tools.js";

interface dataFile {
    "diameterScalingFactor": number,
    "distanceScalingFactor": number,
    "timeSpeedFactor": number,
    "firstTarget": string,
    "startDate": {
        "day": number,
        "month": number,
        "year": number
    },
    "diametreConversionFactor": number,
    "distanceConversionFactor": number,
    "astres": AstreData[],
    "belts": BeltData[]
}

interface BeltData {
    "id": string,
    "yDivergence": number,
    "nb": number,
    "size": number,
    "position": {
        "nearest": number,
        "farthest": number
    },
    "parentId": string,
    "textureType": string
}

export class Solaris {
    quality: string; // définit le nombre de polygones et la qualité des effets
    SCENE_SIZE = 500000; /// Définit la taille de la skybox et les nbDaysPerMonths des caméras

    audio: HTMLAudioElement; // petite musique d'ambiance

    engine: BABYLON.Engine; // le moteur babylonjs
    canvas: HTMLCanvasElement; // le canvas de rendu
    scene: BABYLON.Scene; // la scène contenant le système

    assetsManager: BABYLON.AssetsManager; // l'outil pour charger les textures et affichier la progress bar
    UI: BABYLON.GUI.AdvancedDynamicTexture; // gestionnaire des labels des astres
    pipeline: BABYLON.DefaultRenderingPipeline; // gestionnaire des fx (pas les godrays)

    // données de la simulation
    astresData: AstreData[]; // données des astres
    beltsData: any[]; // données des ceintures d'astéroides
    astres: Astre[] = []; // liste des astres

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
    zooming = false; // Flag pour zoomer sur les astres
    changement = false; // Flag pour se déplacer vers un autre astre
    targeting = false; // Flag pour lock la caméra pendant les déplacements

    //#endregion

    currentTarget: Astre;
    firstTarget: string; // premier astre ciblé par la caméra au lancement

    //#region Flag pour togglers

    areOrbitsEnabled: boolean = false;
    areAsteroidsEnabled: boolean = true;
    areGodraysEnabled: boolean = true;
    areLabelsEnabled: boolean = true;

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

        window.addEventListener("wheel", () => this.zooming = false);
        window.addEventListener("mousemove", () => this.targeting = false); // si l'utilisateur drag (souris)
        window.addEventListener("touchmove", () => this.targeting = false); // si l'utilisateur drag (doigt)

        BABYLON.ArcRotateCamera.prototype.targetNode = undefined; // point d'attache des caméras de cible lors des déplacements
        BABYLON.VolumetricLightScatteringPostProcess.prototype.light = undefined; // un godrays est associé à une lumière
        BABYLON.Camera.prototype.godraysList = []; // une caméra a accès aux godrays qui lui sont attachés
    }

    loadConfiguration(path: string) { // load json configuration file
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

        return this.scene;
    }

    initAssetsManager(): BABYLON.AssetsManager {
        let assetsManager = new BABYLON.AssetsManager(this.scene); // Va contenir tous les matériaux
        assetsManager.useDefaultLoadingScreen = false;
        assetsManager.onProgress = (remaining: number, total: number) => {
            let fulfilled = Math.round(((total - remaining) / total) * 100)
            let progressEvent = new CustomEvent("loadingProgress", { detail: fulfilled });
            document.dispatchEvent(progressEvent);
        }
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
        this.pipeline.fxaaEnabled = false; // fxaa désactivé par défaut
        this.pipeline.imageProcessing.contrast = 1.2;

        return this.pipeline;
    }

    initAudio(path: string, autoplay: boolean = true, loop: boolean = true): HTMLAudioElement {
        this.audio = new Audio(path);
        this.audio.autoplay = autoplay;
        this.audio.loop = loop;
        this.audio.load();
        return this.audio;
    }

    initSkybox(): BABYLON.Mesh {
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 1, this.scene);
        skybox.scaling = skybox.scaling.scale(this.SCENE_SIZE);
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
        let map: { [key: number]: boolean } = {};
        document.addEventListener("keydown", e => {
            map[e.keyCode] = true;
            let camera = this.scene.activeCamera;
            if (camera instanceof BABYLON.FreeCamera) {
                if (map[32]) camera.cameraDirection.y += this.freeCameraSpeed; // SPAAAAAACE !!!!!!!!!!
                if (map[16]) camera.cameraDirection.y -= this.freeCameraSpeed; // SHIFT
                if (map[90] || map[87]) { // Z // W
                    let dx = Math.sin(camera.rotation.y);
                    let dy = -Math.sin(camera.rotation.x);
                    let dz = Math.cos(camera.rotation.y);
                    camera.cameraDirection.x += dx * this.freeCameraSpeed;
                    camera.cameraDirection.y += dy * this.freeCameraSpeed;
                    camera.cameraDirection.z += dz * this.freeCameraSpeed;
                }
                if (map[83]) { // S
                    let dx = Math.sin(camera.rotation.y);
                    let dy = Math.sin(camera.rotation.x);
                    let dz = Math.cos(camera.rotation.y);
                    camera.cameraDirection.x -= dx * this.freeCameraSpeed;
                    camera.cameraDirection.y += dy * this.freeCameraSpeed;
                    camera.cameraDirection.z -= dz * this.freeCameraSpeed;
                }
                if (map[68]) { // D
                    let dx = Math.cos(camera.rotation.y);
                    let dz = Math.sin(camera.rotation.y);
                    camera.cameraDirection.x += dx * this.freeCameraSpeed;
                    camera.cameraDirection.z -= dz * this.freeCameraSpeed;
                }
                if (map[81] || map[65]) { // Q // A
                    let dx = Math.cos(camera.rotation.y);
                    let dz = Math.sin(camera.rotation.y);
                    camera.cameraDirection.x -= dx * this.freeCameraSpeed;
                    camera.cameraDirection.z += dz * this.freeCameraSpeed;
                }
            }

            if (map[70]) this.toggleFXAA(); // [F]
            if (map[71]) this.toggleGodrays(); // [G]
            if (map[72]) this.toggleAsteroidBelts(); // [H]
            if (map[73]) document.getElementById("infos").classList.toggle("hiddenInfos"); // Toggle Information pannel [I]
            if (map[75]) document.getElementById("fps").classList.toggle("hiddenFPS"); // Toggle FPS [K]
            if (map[77]) this.toggleSound(); // [M]
            if (map[78]) this.toggleLabels(); // [N]
            if (map[79]) this.toggleOrbits(); // [O]
            if (map[80]) this.takeScreenshot(); // [P]
            if (map[84]) document.getElementById("dateSelectorContainer").classList.toggle("hiddenDateSelector"); // Toggle time travel pannel [T]

            if (map[67]) this.zooming = true; /// Zoom sur l'astre courant [C]
        });
        document.addEventListener("keyup", e => map[e.keyCode] = false); // Lorsque l'on relache une touche
        return map;
    }

    initAstres() {
        for (let astreData of this.astresData) this.createAstre(astreData); // Générations des astres selon la tables des données
    }

    initBelts() {
        for (let beltData of this.beltsData) this.createBelt(beltData); // on crée une ceinture d'astéroides
    }

    //#region Caméras

    addCamera(name: string, type: string): BABYLON.FreeCamera | BABYLON.ArcRotateCamera | BABYLON.AnaglyphFreeCamera | BABYLON.AnaglyphArcRotateCamera | BABYLON.VRDeviceOrientationFreeCamera {
        let newCamera: BABYLON.FreeCamera | BABYLON.ArcRotateCamera | BABYLON.AnaglyphFreeCamera | BABYLON.AnaglyphArcRotateCamera | BABYLON.VRDeviceOrientationFreeCamera;
        switch (type) {
            case "target":
                newCamera = new BABYLON.ArcRotateCamera(name, .3, Math.PI / 4, 400 * this.diameterScalingFactor, BABYLON.Vector3.Zero(), this.scene);
                newCamera.upperRadiusLimit = (this.SCENE_SIZE / 15) * this.diameterScalingFactor; // Dézoom Max pour rester dans la skybox
                newCamera.targetNode = BABYLON.Mesh.CreatePlane(`${name}TargetNode`, 1e-100, this.scene);
                this.targetCameras.push(newCamera);
                break;
            case "targetAnaglyph":
                newCamera = new BABYLON.AnaglyphArcRotateCamera(name, .3, Math.PI / 4, 400 * this.diameterScalingFactor, BABYLON.Vector3.Zero(), .33, this.scene);
                newCamera.upperRadiusLimit = (this.SCENE_SIZE / 15) * this.diameterScalingFactor;
                newCamera.targetNode = BABYLON.Mesh.CreatePlane(`${name}TargetNode`, 1e-100, this.scene);
                this.targetCameras.push(newCamera);
                break;
            case "free":
                newCamera = new BABYLON.FreeCamera(name, new BABYLON.Vector3(500, 0, 0).scale(this.diameterScalingFactor), this.scene);
                this.freeCameras.push(newCamera);
                break;
            case "freeAnaglyph":
                newCamera = new BABYLON.AnaglyphFreeCamera(name, new BABYLON.Vector3(500, 0, 0).scale(this.diameterScalingFactor), .033, this.scene);
                this.freeCameras.push(newCamera);
                break;
            case "freeVR":
                newCamera = new BABYLON.VRDeviceOrientationFreeCamera(name, new BABYLON.Vector3(500, 0, 0).scale(this.diameterScalingFactor), this.scene);
                this.freeCameras.push(newCamera);
                break;
        }
        newCamera.maxZ = this.SCENE_SIZE; // Horizon assez loin pour voir skybox
        return newCamera;
    }

    switchTo(newCamera: BABYLON.FreeCamera | BABYLON.ArcRotateCamera) { /// fonction permettant de switch de caméra facilement
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

    createAstre(astreData: AstreData) {
        let astre = new Astre(astreData, isDefined(astreData.parentId) ? this.getAstreById(astreData.parentId) : undefined, this.astres.length, this.quality, this.assetsManager, this.scene);
        astre.setDiameterScale(this.diameterScalingFactor);
        astre.setDistanceScale(this.distanceScalingFactor);
        this.astres.push(astre);

        if (astreData.godrays) { // si l'astre est une étoile
            let light = new BABYLON.PointLight(`lightOf${astre.id}`, BABYLON.Vector3.Zero(), this.scene); // création d'une lumière
            light.parent = astre.mesh; // attachement de la lumière à l'astre

            for (let camera of this.scene.cameras) {
                let godrays = new BABYLON.VolumetricLightScatteringPostProcess(`godraysOf${astre.id}${camera.id}`, 1.0, camera, astre.mesh, this.quality == "high" ? 75 : 50, BABYLON.Texture.BILINEAR_SAMPLINGMODE, this.engine, false); // création du VLS
                godrays.exposure = isDefined(astreData.exposure) ? astreData.exposure : .18; // réglage de l'intensité
                godrays.decay = isDefined(astreData.decay) ? astreData.decay : .97; // réglage de la couronne stellaire
                godrays.light = light;
                camera.godraysList.push(godrays); // on push tout dans un array
                for (let _godrays of camera.godraysList) { // on empèche les conflits entre godrays i.e ils s'éclairent pas entre eux
                    //godrays.excludedMeshes.push(_godrays.mesh);
                    _godrays.light.excludedMeshes.push(godrays.mesh); // ils s'éclairent pas entre eux
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
            listElm.innerHTML = `<img src="../data/icons/${astreData.icon}"/><p>${astreData.id}</p>`
            document.getElementById("astra-list").appendChild(listElm);
            listElm.addEventListener("click", () => this.goTo(astre)); // gère le click sur le sélecteur d'astre
        }
    }
    createBelt(beltData: BeltData) {
        let asteroid = BABYLON.Mesh.CreateSphere("asteroid", 1, 1, this.scene);

        let ceintureAsteroids = new BABYLON.SolidParticleSystem(beltData.id, this.scene, { updatable: false });
        ceintureAsteroids.addShape(asteroid, beltData.nb, {
            positionFunction: (particle: BABYLON.SolidParticle, i: number) => {
                particle.position.x = rand(beltData.position.nearest, beltData.position.farthest) * Math.sin(Math.PI * 2 / beltData.nb * i);
                particle.position.y = rand(-1, 1) * beltData.yDivergence;
                particle.position.z = rand(beltData.position.nearest, beltData.position.farthest) * Math.cos(Math.PI * 2 / beltData.nb * i);
                if (!isDefined(beltData.parentId)) particle.position = particle.position.scale(this.distanceScalingFactor);

                particle.scale.x = (Math.random() * 2 + 0.8);
                particle.scale.y = (Math.random() + 0.8);
                particle.scale.z = (Math.random() * 2 + 0.8);
                particle.scale = particle.scale.scale(beltData.size * (isDefined(beltData.parentId) ? 1 : this.diameterScalingFactor));

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
        mesh.freezeNormals();
        asteroid.dispose();
    }

    //#endregion

    takeScreenshot(precision: number = 2) {
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

    endTravel() {
        this.changement = false;
        for (let camera of this.targetCameras) {
            camera.setTarget(this.currentTarget.mesh);
            camera.lowerRadiusLimit = this.currentTarget.data.diametre * this.diameterScalingFactor + 1;
        }
    }

    goTo(newTarget: Astre) {
        for (let camera of this.targetCameras) {
            camera.targetNode.position = this.currentTarget.mesh.getAbsolutePosition();
            camera.lowerRadiusLimit = 0;
            camera.setTarget(camera.targetNode);
        }

        this.currentTarget.orbitMesh.color = BABYLON.Color3.White(); // l'orbite redevient blanche
        newTarget.orbitMesh.color = BABYLON.Color3.Yellow(); // l'orbite devient jaune

        if (this.areLabelsEnabled) {
            for (let astre of this.astres) {
                if (astre != newTarget && (!isDefined(astre.parent) || (isDefined(astre.parent) && astre.parent == newTarget.parent) || astre.parent == newTarget)) this.UI.addControl(astre.label); // si astre parent, on affiche l'étiquette
                else this.UI.removeControl(astre.label);
            }
        }

        let event = new CustomEvent("targetChange", { detail: newTarget.data });
        document.dispatchEvent(event);

        this.destinationRadius = (newTarget.data.diametre * 2 + 1) * this.diameterScalingFactor; // distance d'approche de l'astre currentTarget
        this.zooming = true;
        this.targeting = true;
        this.changement = true; // ENGAGE !

        this.currentTarget = newTarget; // on change la cible
    }

    updateCameraPositions() {
        if (this.scene.activeCamera instanceof BABYLON.ArcRotateCamera) {
            if (BABYLON.Vector3.DistanceSquared(this.scene.activeCamera.target, this.currentTarget.mesh.absolutePosition) < .1 && (Math.abs(this.scene.activeCamera.radius - this.destinationRadius) < .1 || !this.zooming)) {
                this.endTravel();
            } else {
                for (let camera of this.targetCameras) {
                    camera.targetNode.position = camera.targetNode.position.add(this.currentTarget.mesh.absolutePosition.subtract(camera.targetNode.position).scale(.1 * this.transitionSpeedFactor));
                    if (this.targeting) camera.setTarget(camera.targetNode);
                }
            }
        } else if (this.scene.activeCamera instanceof BABYLON.FreeCamera) {
            if (BABYLON.Vector3.DistanceSquared(this.scene.activeCamera.position, this.currentTarget.mesh.absolutePosition) < this.destinationRadius ** 2) {
                this.endTravel();
            } else {
                for (let camera of this.freeCameras) {
                    camera.position = camera.position.add(this.currentTarget.mesh.absolutePosition.subtract(camera.position).scale(.1 * this.transitionSpeedFactor));
                }
            }
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

        if (this.changement) { /// Mise à jour de la position des caméras lors du changement de cible
            this.updateCameraPositions();
        } else {
            this.updateAstres();
            this.updateClock();
        }

        /// Gestion dynamique de la précision du zoom roulette
        for (let camera of this.targetCameras) {
            camera.wheelPrecision = this.precisionFactor * 100 / camera.radius;
            camera.pinchPrecision = camera.wheelPrecision;
        }

        if (this.zooming) {
            for (let camera of this.targetCameras) {
                camera.radius -= (camera.radius - this.destinationRadius) * this.transitionSpeedFactor / 10;
            }
        }
    }

    start() {
        this.assetsManager.load();
    }
}