import { AstreData } from "./astreData";
import { isDefined } from "./tools";

export class PlanetMaterial {
    planetMesh: BABYLON.Mesh;
    material: BABYLON.ShaderMaterial;

    diffuseTexture: BABYLON.Texture;
    emissiveTexture: BABYLON.Texture;
    cloudTexture: BABYLON.Texture;
    specularTexture: BABYLON.Texture;

    hasClouds: boolean;

    time = 0;

    constructor(id: string, mesh: BABYLON.Mesh, planetData: AstreData, assetsManager: BABYLON.AssetsManager, scene: BABYLON.Scene) {

        this.planetMesh = mesh;
        this.material = new BABYLON.ShaderMaterial(id, scene, "../shaders/planetMaterial", {
            attributes: [
                "position", "normal", "uv"
            ],
            uniforms: [
                "world", "worldView", "worldViewProjection", "view", "projection",
                "sunPosition", "planetPosition",
                "cameraPosition", "time"

            ],
            samplers: [
                "diffuseTexture", "cloudTexture", "emissiveTexture", "specularTexture"
            ]
        });
        mesh.material = this.material;

        let diffuseTextureTask = assetsManager.addTextureTask(id, `../data/textures/surfaces/${planetData.textureFileName}`);
        diffuseTextureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
            this.diffuseTexture = task.texture;
        };


        if (isDefined(planetData.atm) && isDefined(planetData.atm.textureFileName)) {
            this.hasClouds = true;
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/${planetData.atm.textureFileName}`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.cloudTexture = task.texture;
            };
        } else {
            this.hasClouds = false;
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.cloudTexture = task.texture;
            };
        }

        if (isDefined(planetData.emissive)) {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/surfaces/${planetData.emissive}`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.emissiveTexture = task.texture;
            };
        } else {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.emissiveTexture = task.texture;
            };
        }

        if (isDefined(planetData.specular)) {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/specular/${planetData.specular}`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.specularTexture = task.texture;
            };
        } else {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.specularTexture = task.texture;
            };
        }
    }

    update(sunPosition: BABYLON.Vector3, planetPosition: BABYLON.Vector3, cameraPosition: BABYLON.Vector3, clock: number) {
        this.material.setFloat("time", clock);

        this.material.setVector3("sunPosition", sunPosition);
        this.material.setVector3("planetPosition", planetPosition);

        this.material.setVector3("cameraPosition", cameraPosition);

        this.material.setTexture("diffuseTexture", this.diffuseTexture);
        this.material.setTexture("cloudTexture", this.cloudTexture);
        this.material.setTexture("emissiveTexture", this.emissiveTexture);
        this.material.setTexture("specularTexture", this.specularTexture);
    }
}