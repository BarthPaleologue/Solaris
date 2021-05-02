/// <reference path="../babylon.d.ts" />
/// <reference path="../../ts/babylon.gui.d.ts" />

import { toRadians, isDefined } from "./tools.js";
import { AstreData } from "./astreData";
import { AtmosphericScatteringPostProcess } from "../shaders/atmosphericScattering.js";

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

    atmPostPross: AtmosphericScatteringPostProcess | null = null;

    constructor(astreData: AstreData, parent: Astre, index: number, quality: string, assetsManager: BABYLON.AssetsManager, scene: BABYLON.Scene) {
        this.data = astreData;
        this.id = astreData.id;
        this.index = index;
        this.parent = parent;
        this.scene = scene;

        let nbSegments = quality == "low" ? 16 : 32;

        this.mesh = BABYLON.Mesh.CreateSphere(astreData.id, nbSegments, astreData.diametre, scene); // création de l'objet astre
        this.mesh.rotation.z = Math.PI; // sinon les astres ont la tête à l'envers mdr
        if (isDefined(astreData.initialRotation)) this.mesh.rotate(BABYLON.Axis.Y, astreData.initialRotation, BABYLON.Space.LOCAL);
        if (isDefined(astreData.isPickable)) this.mesh.isPickable = astreData.isPickable; /// Astre clickable sauf contre indication

        let material = Astre.addMaterialTo(`${astreData.id}Material`, this.mesh, `../data/textures/surfaces/${astreData.textureFileName}`, astreData.textureType, assetsManager); // création du matériel pour l'astre
        if (isDefined(astreData.specular)) material.specularTexture = new BABYLON.Texture(`../data/textures/specular/${astreData.specular}`, scene); // si texture de reflet en plus
        if (isDefined(astreData.emissive)) material.emissiveTexture = new BABYLON.Texture(`../data/textures/surfaces/${astreData.emissive}`, scene); // si texture d'émission en plus
        else material.emissiveColor = BABYLON.Color3.White().scale(.04); /// Ambient light

        this.centerNode = BABYLON.Mesh.CreateSphere(`${astreData.id}-center`, 1, 1e-100, scene); // on crée un autre point d'attache au centre de l'astre pour les satellites
        this.centerNode.rotation.z = toRadians(astreData.angularSelf);
        this.centerNode.position.x = astreData.distance;
        this.centerNode.isPickable = false;

        this.orbitalNode = BABYLON.Mesh.CreateSphere(`${astreData.id}-centerorbit`, 1, 1e-100, scene); // on crée un point d'attache orbital
        this.orbitalNode.rotation.z = toRadians(astreData.angularOrbit); // prend l'inclinaison de l'orbite
        this.orbitalNode.rotate(BABYLON.Axis.Y, toRadians(astreData.initialOrbitalPosition), BABYLON.Space.LOCAL); // on initialise la position orbitale des astres au 1er janvier 2020

        this.mesh.parent = this.centerNode; // mesh sur point d'attache propre
        this.centerNode.parent = this.orbitalNode; // point d'attache propre sur point d'attache orbital
        if (isDefined(astreData.parentId)) this.orbitalNode.parent = this.parent.centerNode; // point d'attache orbital sur point d'attache propre du parent si il existe

        this.addOrbit(); // on génère un cercle orbital

        if (isDefined(astreData.rings)) this.addRings(assetsManager); // on ajoute des anneaux si besoin
        if (isDefined(astreData.atm)) this.addAtmosphere(assetsManager); // on ajoute une atmosphère si besoin
        if (astreData.pulsar) this.addPulsarEffect(); // si souhaité, l'astre devient un pulsar
    }

    static addMaterialTo(id: string, mesh: BABYLON.Mesh, textureFileName: string, textureType: string, assetsManager: BABYLON.AssetsManager, alpha = false): BABYLON.StandardMaterial { // créer un matériel pour un objet en une ligne
        let material = new BABYLON.StandardMaterial(id, mesh.getScene());

        let textureTask = assetsManager.addTextureTask(id, textureFileName);
        switch (textureType) {
            case "diffuse":
                textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                    material.diffuseTexture = task.texture;
                    material.diffuseTexture.hasAlpha = alpha;
                    if (alpha) material.opacityTexture = task.texture;
                };
                break;
            case "emissive":
                textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                    material.emissiveTexture = task.texture;
                };
                break;
            case "ambient":
                textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                    material.ambientTexture = task.texture;
                    material.ambientTexture.hasAlpha = alpha;
                };
                break;
            case "opacity":
                textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                    material.opacityTexture = task.texture;
                    material.opacityTexture.getAlphaFromRGB = alpha;
                };
                break;
        }
        material.specularColor = BABYLON.Color3.Black();
        mesh.material = material;
        return material;
    }
    addRings(assetsManager: BABYLON.AssetsManager) { // ajouter des anneaux à un astre
        let rings = BABYLON.Mesh.CreateGround(`ringsOf${this.id}`, this.data.rings.size, this.data.rings.size, 2, this.mesh.getScene());
        rings.visibility = this.data.rings.alpha;
        rings.parent = this.centerNode;

        let material = Astre.addMaterialTo(`ringMatOf${this.id}`, rings, `../data/textures/rings/${this.data.rings.textureFileName}`, "diffuse", assetsManager, true);
        material.emissiveColor = BABYLON.Color3.White().scale(.6);
        material.backFaceCulling = false;

        this.ringMesh = rings;
    }
    addAtmosphere(assetsManager: BABYLON.AssetsManager) { // ajouter une atmosphère à un astre




        if (this.data.atm.textureFileName == "clouds4.jpg") {

            let epsilon = 1e-3;

            let diametre = this.data.diametre + epsilon; // diamètre légèrement supérieur

            let planetRadius = (diametre / 2) + 10 * epsilon;
            let atmRadius = (diametre / 2) + 100 * epsilon;

            //@ts-ignore
            this.atmPostPross = new AtmosphericScatteringPostProcess(`atmScat${this.id}`, this.mesh, planetRadius, atmRadius, this.scene.getMeshByID("Soleil")!, this.scene.activeCamera, this.scene);


            let clouds = BABYLON.Mesh.CreateSphere(`atmosphereOf${this.id}`, 32, diametre, this.mesh.getScene());

            let cloudMat = new BABYLON.StandardMaterial(`cloudMatOf${this.id}`, this.mesh.getScene());
            let textureTask = assetsManager.addTextureTask(this.id, `../data/textures/atmospheres/${this.data.atm.textureFileName}`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                cloudMat.opacityTexture = task.texture;
                if (isDefined(this.data.atm.color)) cloudMat.diffuseColor = BABYLON.Color3.FromArray(this.data.atm.color).scale(1 / 255);
                cloudMat.opacityTexture.getAlphaFromRGB = true;
            };

            clouds.material = cloudMat; // on applique la matériel
            clouds.parent = this.mesh; // on attache l'atmosphère à son astre
            this.atmosphereMesh = clouds;
        } else {
            //@ts-ignore
            this.atmPostPross = new AtmosphericScatteringPostProcess(`atmScat${this.id}`, this.mesh, this.data.diametre / 2, (this.data.diametre / 2) * 1.3, this.scene.getMeshByID("Soleil")!, this.scene.activeCamera, this.scene);

        }
    }

    addPulsarEffect(emitRate = 20000) { // créer un jet d'émission aux pôles d'un astre tel un pulsar
        let particleSystem = new BABYLON.ParticleSystem(`particlesOf${this.id}`, 100000, this.mesh.getScene());
        particleSystem.particleTexture = new BABYLON.Texture("../data/textures/particles/flare.png", this.mesh.getScene());
        particleSystem.emitter = this.mesh; // objet émétteur
        //particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0).scale(.2); // Définition de
        //particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0).scale(.2); // la zone d'apparition
        particleSystem.color1 = new BABYLON.Color4(.7, .8, 1, 1); // Définition
        particleSystem.color2 = new BABYLON.Color4(.2, .5, 1, 1); // des couleurs
        particleSystem.minSize = .5; // taille des
        particleSystem.maxSize = .5; // particules
        particleSystem.emitRate = emitRate; // Nb de particules émises par secondes
        particleSystem.direction1 = new BABYLON.Vector3(0, 100, 0); // Emission pôle nord
        particleSystem.direction2 = new BABYLON.Vector3(0, -100, 0); // Emission pôle sud
        particleSystem.updateSpeed = .008;
        particleSystem.start();
    }

    addOrbit() { // créer une orbite
        let steps = 360; // nb segments
        let step = Math.PI * 2 / steps; // écart radian entre chaque segment
        let path: BABYLON.Vector3[] = []; // liste des segments

        for (let i = 0; i < Math.PI * 2; i += step) path.push(new BABYLON.Vector3(Math.sin(i), 0, Math.cos(i)).scale(this.data.distance)); // génère les segments

        let lines = BABYLON.Mesh.CreateLines(`orbitTorusOf${this.id}`, path, this.mesh.getScene());
        lines.rotation.z = toRadians(this.data.angularOrbit);
        lines.color = BABYLON.Color3.White();
        lines.isPickable = false;
        lines.setEnabled(false);
        if (isDefined(this.data.parentId)) lines.parent = this.parent.centerNode;

        this.orbitMesh = lines;
    }

    addLabel(UI: BABYLON.GUI.AdvancedDynamicTexture): BABYLON.GUI.Rectangle {
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

        UI.addControl(label);
        label.linkWithMesh(this.mesh);

        let text = new BABYLON.GUI.TextBlock();
        text.text = this.id;
        text.color = "white";
        label.addControl(text);
        this.label = label;
        return label;
    }

    setDiameterScale(diameterScalingFactor: number) {
        this.mesh.scaling = this.mesh.scaling.scale(diameterScalingFactor);
        if (isDefined(this.data.rings)) this.ringMesh.scaling = this.ringMesh.scaling.scale(diameterScalingFactor);
        if (this.atmPostPross != null) {
            this.atmPostPross.settings.atmosphereRadius *= diameterScalingFactor;
            this.atmPostPross.settings.planetRadius *= diameterScalingFactor;
        }
    }

    setDistanceScale(distanceScalingFactor: number) {
        this.centerNode.position.x *= distanceScalingFactor;
        this.orbitMesh.scaling = this.orbitMesh.scaling.scale(distanceScalingFactor);
    }

    updateRotation(timeUnit: number) {
        if (this.data.dayDuration != 0) { /// Si n'est pas un satellite synchrnone
            if (this.data.pulsar) this.mesh.rotate(BABYLON.Axis.Y, timeUnit / this.data.dayDuration, BABYLON.Space.WORLD); // rotation des pulsars
            else this.mesh.rotate(BABYLON.Axis.Y, timeUnit / this.data.dayDuration, BABYLON.Space.LOCAL); // rotation des planètes sur elles-mêmes
            if (this.data.yearDuration != 0) this.centerNode.rotate(BABYLON.Axis.Y, - timeUnit / this.data.yearDuration, BABYLON.Space.WORLD); // Saisons aussi
        }
        //if (isDefined(this.data.atm)) this.atmosphereMesh.rotation.y += .2 * timeUnit;
    }

    updateOrbitalPosition(timeUnit: number) { // Rotation autour du parent
        if (this.data.yearDuration != 0) this.orbitalNode.rotate(BABYLON.Axis.Y, -timeUnit / this.data.yearDuration, BABYLON.Space.LOCAL);
    }
}