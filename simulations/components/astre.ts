/// <reference path="../babylon.d.ts" />
/// <reference path="../../ts/babylon.gui.d.ts" />

import { toRadians, isDefined } from "./tools.js";
import { AstreData } from "./astreData";
import { AtmosphericScatteringPostProcess } from "../shaders/atmosphericScattering.js";
import { Solaris } from "../solaris.js";
import { PlanetMaterial } from "./planetMaterial.js";
import { StarCorona } from "../shaders/starCorona.js";

export class Astre {
    id: string;
    index: number;
    mesh: BABYLON.Mesh;
    atmosphereMesh: BABYLON.Mesh;
    ringMesh: BABYLON.Mesh;
    orbitMesh: BABYLON.LinesMesh;
    parent: Astre;
    label: BABYLON.GUI.Rectangle;
    data: AstreData;
    orbitalNode: BABYLON.Mesh;
    centerNode: BABYLON.Mesh;
    scene: BABYLON.Scene;
    solaris: Solaris;

    material: PlanetMaterial;

    atmospherePostProcesses: AtmosphericScatteringPostProcess[] = [];

    coronaPostProcesses: StarCorona[] = [];

    /**
     * Créer un nouvel astre dans le contexte d'un système Solaris
     * @param astreData Informations formattées de l'astre
     * @param parent Astre parent du nouvel astre
     * @param index Index unique de l'astre (utile pour connaître l'astre suivant)
     * @param quality Qualité du mesh et des effets
     * @param solaris Système Solaris auquel ajouter l'astre
     */
    constructor(astreData: AstreData, parent: Astre, index: number, quality: string, solaris: Solaris) {
        this.data = astreData;
        this.id = astreData.id;
        this.index = index;
        this.parent = parent;
        this.scene = solaris.scene;
        this.solaris = solaris;

        let nbSegments = quality == "low" ? 16 : 48;

        this.mesh = BABYLON.Mesh.CreateSphere(astreData.id, nbSegments, astreData.diametre, solaris.scene); // création de l'objet astre
        this.mesh.rotation.z = Math.PI; // sinon les astres ont la tête à l'envers mdr
        if (isDefined(astreData.initialRotation)) this.mesh.rotate(BABYLON.Axis.Y, astreData.initialRotation, BABYLON.Space.LOCAL);
        if (isDefined(astreData.isPickable)) this.mesh.isPickable = astreData.isPickable; /// Astre clickable sauf contre indication

        //@ts-ignore
        //let newTrail = new BABYLON.TrailMesh("test", this.mesh, this.scene, 5, 100, true);
        //newTrail.material = new BABYLON.StandardMaterial("testMat", this.scene);
        //newTrail.material.emissiveColor = BABYLON.Color3.White();


        if (!this.data.godrays) {
            this.material = new PlanetMaterial(`${astreData.id}Material`, this.mesh, this.data, solaris.assetsManager, this.scene);
        } else {
            // TODO : Créer un matériel d'étoile avec un shader
            let material = new BABYLON.StandardMaterial(`${astreData.id}Material`, this.scene);

            let emissiveTextureTask = new BABYLON.TextureAssetTask(`${astreData.id}Task`, `../data/textures/surfaces/${this.data.textureFileName}`);
            emissiveTextureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                material.emissiveTexture = task.texture;
            };
            material.emissiveTexture = new BABYLON.Texture(`../data/textures/surfaces/${this.data.textureFileName}`, this.scene);

            this.mesh.material = material;
        }

        // on crée un autre point d'attache au centre de l'astre pour les satellites
        this.centerNode = new BABYLON.Mesh(`${astreData.id}-center`, solaris.scene);
        this.centerNode.rotation.z = toRadians(astreData.angularSelf);
        this.centerNode.position.x = astreData.distance;

        // on crée un point d'attache orbital
        this.orbitalNode = new BABYLON.Mesh(`${astreData.id}-centerorbit`, solaris.scene);
        this.orbitalNode.rotation.z = toRadians(astreData.angularOrbit); // prend l'inclinaison de l'orbite
        this.orbitalNode.rotate(BABYLON.Axis.Y, toRadians(astreData.initialOrbitalPosition), BABYLON.Space.LOCAL); // on initialise la position orbitale des astres au 1er janvier 2020

        this.mesh.parent = this.centerNode; // mesh sur point d'attache propre
        this.centerNode.parent = this.orbitalNode; // point d'attache propre sur point d'attache orbital
        if (isDefined(astreData.parentId)) this.orbitalNode.parent = this.parent.centerNode; // point d'attache orbital sur point d'attache propre du parent si il existe
        else this.orbitalNode.parent = solaris.systemNode;

        this.addOrbit(); // on génère un cercle orbital

        if (isDefined(astreData.rings)) {
            // si la planète possède des anneaux
            let rings = BABYLON.Mesh.CreateGround(`ringsOf${this.id}`, this.data.rings.size, this.data.rings.size, 2, this.scene);
            rings.visibility = this.data.rings.alpha;
            rings.parent = this.centerNode;

            // TODO : créer un material pour les anneaux (non prioritaire)
            let material = new BABYLON.StandardMaterial(`ringMatOf${this.id}`, this.scene);

            let diffuseTextureTask = solaris.assetsManager.addTextureTask(`ringMatOf${this.id}`, `../data/textures/rings/${this.data.rings.textureFileName}`);
            diffuseTextureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                material.diffuseTexture = task.texture;
                material.diffuseTexture.hasAlpha = true;
                material.useAlphaFromDiffuseTexture = true;
            };

            material.specularColor = BABYLON.Color3.Black();
            material.emissiveColor = BABYLON.Color3.White().scale(0.9);

            material.backFaceCulling = false;
            rings.material = material;

            this.ringMesh = rings;
        }

        if (isDefined(astreData.atm) && quality == "high") this.addAtmosphere(); // on ajoute une atmosphère si besoin
        if (astreData.pulsar) this.addPulsarEffect(); // si souhaité, l'astre devient un pulsar
    }

    /**
     * Ajoute un postprocess d'atmosphère à l'astre suivant ses paramètres internes
     */
    addAtmosphere() {

        let diametre = this.data.diametre;

        let planetRadius = diametre / 2;

        let atmRadius = planetRadius * this.data.atm.size;

        //@ts-ignore
        for (let camera of this.solaris.targetCameras.concat(this.solaris.freeCameras)) {
            let atmPostPross = new AtmosphericScatteringPostProcess(`atmScat${this.id}${camera.id}`, this.mesh, planetRadius * 1.015, atmRadius, this.solaris.systemNode, camera, this.scene);

            if (isDefined(this.data.atm.colors)) {
                atmPostPross.settings.redWaveLength = this.data.atm.colors[0];
                atmPostPross.settings.greenWaveLength = this.data.atm.colors[1];
                atmPostPross.settings.blueWaveLength = this.data.atm.colors[2];
            }
            if (isDefined(this.data.atm.opacity)) {
                atmPostPross.settings.densityModifier = this.data.atm.opacity;
            }
            atmPostPross.settings.intensity = 15;
            atmPostPross.settings.scatteringStrength = 10;
            this.atmospherePostProcesses.push(atmPostPross);
        }
    }

    /**
     * Ajoute des jets relativistes aux pôles de l'astre
     * @param emitRate Contrôle la puissance du jet
     */
    addPulsarEffect(emitRate = 20000) { // créer un jet d'émission aux pôles d'un astre tel un pulsar
        let particleSystem = new BABYLON.ParticleSystem(`particlesOf${this.id}`, 100000, this.mesh.getScene());
        particleSystem.particleTexture = new BABYLON.Texture("../data/textures/particles/flare.png", this.mesh.getScene());
        particleSystem.emitter = this.mesh; // objet émétteur

        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 3;

        particleSystem.color1 = new BABYLON.Color4(.7, .8, 1, 1); // Définition
        particleSystem.color2 = new BABYLON.Color4(.2, .5, 1, 1); // des couleurs
        particleSystem.minSize = .5; // taille des
        particleSystem.maxSize = .5; // particules
        particleSystem.emitRate = emitRate; // Nb de particules émises par secondes
        particleSystem.direction1 = new BABYLON.Vector3(0, 100, 0); // Emission pôle nord
        particleSystem.direction2 = new BABYLON.Vector3(0, -100, 0); // Emission pôle sud
        particleSystem.updateSpeed = .05;
        particleSystem.start();
    }

    /**
     * Créer la ligne de la trajectoire orbitale de l'astre
     */
    addOrbit() { // créer une orbite
        let steps = 360; // nb segments
        let step = Math.PI * 2 / steps; // écart radian entre chaque segment
        let path: BABYLON.Vector3[] = []; // liste des segments

        for (let i = 0; i < Math.PI * 2; i += step) path.push(new BABYLON.Vector3(Math.sin(i), 0, Math.cos(i)).scale(this.data.distance)); // génère les segments

        let lines = BABYLON.Mesh.CreateLines(`orbitTorusOf${this.id}`, path, this.mesh.getScene());
        lines.rotation.z = toRadians(this.data.angularOrbit);
        lines.color = BABYLON.Color3.White();

        lines.isPickable = false;
        if (isDefined(this.data.parentId)) lines.parent = this.parent.centerNode;
        else lines.parent = this.solaris.systemNode;

        this.orbitMesh = lines;
    }

    /**
     * Ajoute l'étiquette avec le nom de l'astre clickable
     * @returns l'étiquette en question, utilisable pour créer des évênements
     */
    addLabel(): BABYLON.GUI.Rectangle {
        let label = new BABYLON.GUI.Rectangle(`Label${this.id}`);
        label.thickness = 0;
        label.linkOffsetY = -10;

        if (!isDefined(this.data.parentId)) {
            label.fontSize = 18;
            label.height = "30px";
            label.width = "100px";
        } else {
            label.fontSize = 14;
            label.height = "15px";
            label.width = "70px";
        }

        this.solaris.UI.addControl(label);
        label.linkWithMesh(this.mesh);

        let text = new BABYLON.GUI.TextBlock();
        text.text = this.id;
        text.color = "white";
        label.addControl(text);
        this.label = label;
        return label;
    }

    /**
     * Met le diamètre de l'astre à l'échelle voulue
     * @param diameterScalingFactor Facteur d'échelle des diamètres
     */
    setDiameterScale(diameterScalingFactor: number) {
        this.mesh.scaling = this.mesh.scaling.scale(diameterScalingFactor);
        if (isDefined(this.data.rings)) this.ringMesh.scaling = this.ringMesh.scaling.scale(diameterScalingFactor);

        /// Doit être revu de manière similaire à la déclaration de l'atm
        for (let atmosphere of this.atmospherePostProcesses) {
            atmosphere.settings.atmosphereRadius *= diameterScalingFactor;
            atmosphere.settings.planetRadius *= diameterScalingFactor;
        }
    }

    /**
     * Met la distance de l'astre à son astre parent à l'échelle voulue
     * @param distanceScalingFactor Facteur d'échelle des distances
     */
    setDistanceScale(distanceScalingFactor: number) {
        this.centerNode.position.x = this.data.distance * distanceScalingFactor;
        this.orbitMesh.scaling = this.orbitMesh.scaling.scale(distanceScalingFactor);
    }

    /**
     * Fait tourner l'astre sur lui-même d'une unité de temps
     * @param timeUnit Unité de temps élémentaire
     */
    updateRotation(timeUnit: number) {
        if (this.data.dayDuration != 0) { /// Si n'est pas un satellite synchrnone
            if (this.data.pulsar) this.mesh.rotate(BABYLON.Axis.Y, timeUnit / this.data.dayDuration, BABYLON.Space.WORLD); // rotation des pulsars
            else this.mesh.rotate(BABYLON.Axis.Y, timeUnit / this.data.dayDuration, BABYLON.Space.LOCAL); // rotation des planètes sur elles-mêmes
            if (this.data.yearDuration != 0) this.centerNode.rotate(BABYLON.Axis.Y, - timeUnit / this.data.yearDuration, BABYLON.Space.WORLD); // Saisons aussi
        }
    }

    /**
     * Fait tourner l'astre autour de son parent d'une unité de temps
     * @param timeUnit Unité de temps élémentaire
     */
    updateOrbitalPosition(timeUnit: number) {
        // pas de division par 0
        if (this.data.yearDuration != 0) this.orbitalNode.rotate(BABYLON.Axis.Y, -timeUnit / this.data.yearDuration, BABYLON.Space.LOCAL);
    }

    /**
     * Met à jour l'état de la planète une unité de temps plus tard
     * @param timeUnit Unité de temps élémentaire
     */
    update(timeUnit: number) {
        this.updateRotation(timeUnit);
        this.updateOrbitalPosition(timeUnit);

        if (!this.data.godrays) {
            this.material.update(this.solaris.systemNode.absolutePosition, this.mesh.absolutePosition, this.scene.activeCamera.globalPosition, this.solaris.clock);
        }
    }
}