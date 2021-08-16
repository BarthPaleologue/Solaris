import { isDefined } from "./tools";
export class PlanetMaterial {
    constructor(id, mesh, planetData, assetsManager, scene) {
        this.time = 0;
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
        diffuseTextureTask.onSuccess = (task) => {
            this.diffuseTexture = task.texture;
        };
        if (isDefined(planetData.atm) && isDefined(planetData.atm.textureFileName)) {
            this.hasClouds = true;
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/${planetData.atm.textureFileName}`);
            textureTask.onSuccess = (task) => {
                this.cloudTexture = task.texture;
            };
        }
        else {
            this.hasClouds = false;
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task) => {
                this.cloudTexture = task.texture;
            };
        }
        if (isDefined(planetData.emissive)) {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/surfaces/${planetData.emissive}`);
            textureTask.onSuccess = (task) => {
                this.emissiveTexture = task.texture;
            };
        }
        else {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task) => {
                this.emissiveTexture = task.texture;
            };
        }
        if (isDefined(planetData.specular)) {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/specular/${planetData.specular}`);
            textureTask.onSuccess = (task) => {
                this.specularTexture = task.texture;
            };
        }
        else {
            let textureTask = assetsManager.addTextureTask(id, `../data/textures/atmospheres/black.png`);
            textureTask.onSuccess = (task) => {
                this.specularTexture = task.texture;
            };
        }
    }
    update(sunPosition, planetPosition, cameraPosition, clock) {
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
