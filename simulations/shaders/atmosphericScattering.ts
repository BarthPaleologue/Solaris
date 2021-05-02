export interface AtmosphereSettings {
    planetRadius: number,
    atmosphereRadius: number,
    falloffFactor: number,
    intensity: number,
    scatteringStrength: number,
    densityModifier: number,
    redWaveLength: number,
    greenWaveLength: number,
    blueWaveLength: number,
}

export class AtmosphericScatteringPostProcess extends BABYLON.PostProcess {

    settings: AtmosphereSettings;
    camera: BABYLON.Camera;
    sun: BABYLON.Mesh | BABYLON.PointLight;
    planet: BABYLON.Mesh;

    constructor(name: string, planet: BABYLON.Mesh, planetRadius: number, atmosphereRadius: number, sun: BABYLON.Mesh | BABYLON.PointLight, camera: BABYLON.Camera, scene: BABYLON.Scene) {
        super(name, "../shaders/atmosphericScattering", [
            "sunPosition",
            "cameraPosition",

            "projection",
            "view",

            "cameraNear",
            "cameraFar",

            "planetPosition",
            "planetRadius",
            "atmosphereRadius",

            "falloffFactor",
            "sunIntensity",
            "scatteringStrength",
            "densityModifier",

            "redWaveLength",
            "greenWaveLength",
            "blueWaveLength"
        ], [
            "textureSampler",
            "depthSampler",
        ], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), true);

        this.settings = {
            planetRadius: planetRadius,
            atmosphereRadius: atmosphereRadius,
            falloffFactor: 15,
            intensity: 15,
            scatteringStrength: 1,
            densityModifier: 1,
            redWaveLength: 700,
            greenWaveLength: 530,
            blueWaveLength: 440,
        };

        this.camera = camera;
        this.sun = sun;
        this.planet = planet;

        this.setCamera(this.camera);

        let depthRenderer = new BABYLON.DepthRenderer(scene);
        scene.customRenderTargets.push(depthRenderer.getDepthMap());
        let depthMap = depthRenderer.getDepthMap();

        this.onApply = (effect: BABYLON.Effect) => {

            effect.setTexture("depthSampler", depthMap);

            effect.setVector3("sunPosition", this.sun.getAbsolutePosition());
            effect.setVector3("cameraPosition", this.camera.position);

            effect.setVector3("planetPosition", this.planet.absolutePosition);

            effect.setMatrix("projection", this.camera.getProjectionMatrix());
            effect.setMatrix("view", this.camera.getViewMatrix());

            effect.setFloat("cameraNear", camera.minZ);
            effect.setFloat("cameraFar", camera.maxZ);

            effect.setFloat("planetRadius", this.settings.planetRadius);
            effect.setFloat("atmosphereRadius", this.settings.atmosphereRadius);

            effect.setFloat("falloffFactor", this.settings.falloffFactor);
            effect.setFloat("sunIntensity", this.settings.intensity);
            effect.setFloat("scatteringStrength", this.settings.scatteringStrength);
            effect.setFloat("densityModifier", this.settings.densityModifier);

            effect.setFloat("redWaveLength", this.settings.redWaveLength);
            effect.setFloat("greenWaveLength", this.settings.greenWaveLength);
            effect.setFloat("blueWaveLength", this.settings.blueWaveLength);
        };
    }

    setCamera(camera: BABYLON.Camera) {
        this.camera.detachPostProcess(this);
        this.camera = camera;
        camera.attachPostProcess(this);
    }
}