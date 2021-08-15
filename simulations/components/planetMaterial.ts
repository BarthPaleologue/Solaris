import { AstreData } from "./astreData";
import { isDefined } from "./tools";

export class PlanetMaterial {
    planetMesh: BABYLON.Mesh;
    material: BABYLON.ShaderMaterial;
    diffuseTexture: BABYLON.Texture;
    emissiveTexture: BABYLON.Texture;
    cloudTexture: BABYLON.Texture;

    hasClouds: boolean;

    constructor(id: string, mesh: BABYLON.Mesh, planetData: AstreData, assetsManager: BABYLON.AssetsManager, scene: BABYLON.Scene) {

        //console.log(planetData.textureFileName);

        this.planetMesh = mesh;
        this.material = new BABYLON.ShaderMaterial(id, scene, "../shaders/planetMaterial", {
            attributes: [
                "position", "normal", "uv"
            ],
            uniforms: [
                "world", "worldView", "worldViewProjection", "view", "projection",
                "sunPosition", "planetPosition",

            ],
            samplers: [
                "diffuseTexture", "cloudTexture"
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
            this.cloudTexture = new BABYLON.Texture(`../data/textures/atmospheres/black.png`, scene);
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task: BABYLON.TextureAssetTask) => {
                this.cloudTexture = task.texture;
            };
        }
    }

    update(sunPosition: BABYLON.Vector3, planetPosition: BABYLON.Vector3) {
        this.material.setVector3("sunPosition", sunPosition);
        this.material.setVector3("planetPosition", planetPosition);

        this.material.setTexture("diffuseTexture", this.diffuseTexture);
        this.material.setTexture("cloudTexture", this.cloudTexture);
    }
}