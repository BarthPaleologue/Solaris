function randSphere(scale = 1) {
    let theta = Math.random() * Math.PI;
    let phi = Math.random() * 2 * Math.PI;

    let x = Math.cos(theta) * Math.sin(phi);
    let y = Math.sin(theta) * Math.sin(phi);
    let z = Math.cos(phi);

    return [x * scale, y * scale, z * scale];
}



export class StarfieldPostprocess extends BABYLON.PostProcess {

    starPositions: number[] = [];
    starRadiuses: number[] = [];

    constructor(name: string, nbStars: number, camera: BABYLON.Camera) {
        super(name, "../shaders/starfield", [
            "cameraPosition",

            "projection",
            "view",

            "cameraNear",
            "cameraFar",

            "starData",
        ], [
            "textureSampler",
            "depthSampler"
        ], 1, camera);

        for (let i = 0; i < nbStars; i++) {
            let radius = 500 + Math.random() * 100;
            this.starPositions = this.starPositions.concat(randSphere(10).concat([radius]));
        }

        let depthRenderer = camera.getScene().enableDepthRenderer();
        let depthMap = depthRenderer.getDepthMap();
        camera.getScene().customRenderTargets.push(depthMap);

        this.onBeforeRender = (effect: BABYLON.Effect) => {
            effect.setFloatArray4("starData", new Float32Array(this.starPositions));

            effect.setFloat("cameraNear", camera.minZ);
            effect.setFloat("cameraFar", camera.maxZ);
            effect.setVector3("cameraPosition", camera.position);
            effect.setMatrix("view", camera.getViewMatrix());
            effect.setMatrix("projection", camera.getProjectionMatrix());

            effect.setTexture("depthSampler", depthMap);
        };
    }
}