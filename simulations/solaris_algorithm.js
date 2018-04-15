/// <reference path="../ts/babylonjs-2.5.d.ts" />
/// <reference path="../ts/jquery.d.ts" />
/// <reference path="../ts/jquery-ui.d.ts" />
/// <reference path="solaris/solaris-data.js" />
/// <reference path="../js/global.js" />

//////////////////////////// Some dependencies /////////////////////////////////////////////////////////////////

$.getScript("../babylon.gui.js");
$.getScript("../../js/screenfull.js");
$.getScript("https://code.jquery.com/pep/0.4.3/pep.js");
$.getScript("http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js");

////////////////////////////// SOLARIS_ALGORITHM v1.5.0 ////////////////////////////////////////////////////////

function createScene(quality = "high") {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const SCENE_SIZE = 500000; /// Définit la taille de la skybox et les limites des caméras
    const MAIN_DELAY = 75; /// Délai en ms entre le chargement de chaque astre

    var assetsManager = new BABYLON.AssetsManager(scene);

    var godraysTab = [];

    ///////////////// Caméras

    var camAstras = new BABYLON.ArcRotateCamera("camAstras", .3, 1.5, 400 * scale, new BABYLON.Vector3.Zero(), scene);
    camAstras.maxZ = SCENE_SIZE; // Horizon assez loin pour voir skybox
    camAstras.upperRadiusLimit = SCENE_SIZE / 15 * scale; // Dézoom Max pour rester dans la skybox
    camAstras.upperBetaLimit = 3.14; // Règle le problème de la rotation verticale aux pôles

    var camAstrasd = new BABYLON.AnaglyphArcRotateCamera("camAstrasd", .3, 1.5, 400 * scale, new BABYLON.Vector3.Zero(), .33, scene);
    camAstrasd.maxZ = SCENE_SIZE;
    camAstrasd.upperRadiusLimit = SCENE_SIZE / 15 * scale;
    camAstrasd.upperBetaLimit = 3.14;

    var camfree = new BABYLON.FreeCamera("camfree", new BABYLON.Vector3(70 * scale, 70 * scale, 0), scene);
    camfree.maxZ = SCENE_SIZE;
    camfree.minZ = .01; // permet d'approcher un astre de plus prêt avant d'overlap

    var camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(70 * scale, 70 * scale, 0), .033, scene);
    camfreed.maxZ = SCENE_SIZE;

    var camfreeVR = new BABYLON.VRDeviceOrientationFreeCamera("camfreeVR", new BABYLON.Vector3(70 * scale, 70 * scale, 0), scene);
    camfreeVR.maxZ = SCENE_SIZE;

    scene.activeCamera = camAstras; // camAstras est la caméra active
    camAstras.attachControl(canvas); // on l'attache au canvas

    var pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", false, scene, [camAstras, camAstrasd, camfree, camfreed, camfreeVR]); /// name, hdrEnabled, scene, cameras
    pipeline.bloomEnabled = true;
    pipeline.bloomWeight = 1;
    pipeline.imageProcessing.toneMappingEnabled = false; // un effet graphique sur les couleurs
    pipeline.fxaa = new BABYLON.FxaaPostProcess('fxaa', 1, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true);
    pipeline.fxaaEnabled = false; // fxaa désactivé par défaut

    var skybox = new BABYLON.Mesh.CreateBox("skyBox", SCENE_SIZE, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox5/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3.White();
    skyboxMaterial.specularColor = new BABYLON.Color3.Black();
    skybox.material = skyboxMaterial;
    skybox.material.freeze();
    skybox.infiniteDistance = true;
    skybox.isPickable = false;

    var centerView = new BABYLON.Mesh.CreateSphere("centerView", 1, 1e-100, scene); // point d'attache des caméras lors d'un changement d'astre

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#all").on("click", e => { /// Fullscreen
        $("#full-exit,#all,#not-all").fadeToggle(10);
        screenfull.toggle($("body")[0]);
    });

    $("#not-all").on("click", e => screenfull.toggle(canvas)); /// Fullscreen avec interface

    $("#full-exit").on("click", e => { /// Exit Fullscreen
        $("#full-exit,#all,#not-all").fadeToggle(10);
        screenfull.exit();
    });

    var mobile = false;
    if (/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {
        $("#binfos,#views,#fullscreen,#settings").fadeOut(10);
        $("#exit,#astras").css("width", "49.7%");
        $("#menu li ul").css("width", "50%");
        mobile = true;
    }

    //// Zoom sur l'astre cible        
    var zoomOn = false;
    $("#tzoom").on("click", e => zoomOn = true);

    var SPEED = 100 * scale * freeSpeedCoeff; /// Vitesse des caméras libres

    var map = {};
    $(document).keydown(e => {
        map[e.keyCode] = e.type == 'keydown';
        if (scene.activeCamera == camfree || scene.activeCamera == camfreed || scene.activeCamera == camfreeVR) {
            if (map[32]) { // SPAAAAAACE !!!!!!!!!!
                e.preventDefault();
                scene.activeCamera.cameraDirection.y += SPEED / 20;
                scene.activeCamera.cameraDirection.y += SPEED / 20;
            }
            if (map[16]) { // SHIFT
                e.preventDefault();
                scene.activeCamera.cameraDirection.y -= SPEED / 20;
                scene.activeCamera.cameraDirection.y -= SPEED / 20;
            }
            if (map[90] || map[87]) { // Z // W
                e.preventDefault();
                let posX = Math.sin(scene.activeCamera.rotation.y);
                let posZ = Math.cos(scene.activeCamera.rotation.y);
                let posY = -Math.sin(scene.activeCamera.rotation.x);
                scene.activeCamera.cameraDirection.x += posX * SPEED;
                scene.activeCamera.cameraDirection.z += posZ * SPEED;
                scene.activeCamera.cameraDirection.y += posY * SPEED;
            }
            if (map[83]) { // S
                e.preventDefault();
                let posX = Math.sin(scene.activeCamera.rotation.y);
                let posZ = Math.cos(scene.activeCamera.rotation.y);
                let posY = Math.sin(scene.activeCamera.rotation.x);
                scene.activeCamera.cameraDirection.x -= posX * SPEED;
                scene.activeCamera.cameraDirection.z -= posZ * SPEED;
                scene.activeCamera.cameraDirection.y += posY * SPEED;
            }
            if (map[68]) { // D
                e.preventDefault();
                let posX = Math.cos(scene.activeCamera.rotation.y);
                let posZ = Math.sin(scene.activeCamera.rotation.y);
                scene.activeCamera.cameraDirection.x += posX * SPEED;
                scene.activeCamera.cameraDirection.z -= posZ * SPEED;
            }
            if (map[81] || map[65]) { // Q // A
                e.preventDefault();
                let posX = Math.cos(scene.activeCamera.rotation.y);
                let posZ = Math.sin(scene.activeCamera.rotation.y);
                scene.activeCamera.cameraDirection.x -= posX * SPEED;
                scene.activeCamera.cameraDirection.z += posZ * SPEED;
            }
        }
        if (map[80]) { // P
            e.preventDefault();
            $("#tscreen").trigger("click"); /// Take a ScreenShot
        }
        if (map[79]) { // O
            e.preventDefault();
            $("#torbit").trigger("click"); /// Toggle Orbits
        }
        if (map[72]) { /// H
            e.preventDefault();
            $("#tasteroids").trigger("click"); /// Toggle Asteroid belts
        }
        if (map[67]) { /// C
            e.preventDefault();
            zoomOn = true; /// Zoom sur l'astre courant
        }
        if (map[71]) { /// G
            e.preventDefault();
            $("#tgodrays").trigger("click"); /// Toggle Godrays
        }
        if (map[70]) { /// F
            e.preventDefault();
            $("#tfxaa").trigger("click"); /// Toggle FXAA
        }
        if (map[122]) { /// F11
            e.preventDefault();
            $("#all").trigger("click"); /// Fullscreen
        }
        if (map[27]) { /// ESC
            e.preventDefault();
            $("#full-exit").trigger("click"); /// ESC Fullscreen
        }
        if (map[78]) { /// N
            e.preventDefault();
            $("#tlabel").trigger("click"); /// Toggle labels
        }
        if (map[75]) { /// K
            e.preventDefault();
            $("#fps").fadeToggle(100); /// Toggle FPS
        }
    });
    $(document).keyup(e => map[e.keyCode] = false); // Lorsque l'on relache une touche

    function getIndexOf(astre) { // récupérer l'index d'un astre
        for (let i in astres) {
            if (scene.getMeshByID(astre).id == astres[i].name) return parseInt(i);
        }
    }

    function createMat(name, object, textureUrl, textureType, alpha, scene) { // créer un matériel pour un objet en une ligne
        let material = new BABYLON.StandardMaterial(name, scene);
        let textureTask = assetsManager.addTextureTask(object.id, textureUrl);
        if (textureType == "diffuse") textureTask.onSuccess = task => {
            material.diffuseTexture = task.texture;
            material.diffuseTexture.hasAlpha = alpha;
            if (alpha) material.opacityTexture = task.texture;
            engine.loadingUIText = object.id + TEXT[lang].ca;
        }
        else if (textureType == "emissive") textureTask.onSuccess = task => {
            material.emissiveTexture = task.texture;
            engine.loadingUIText = object.id + TEXT[lang].ca;
        }
        else if (textureType == "ambient") textureTask.onSuccess = task => {
            material.ambientTexture = task.texture;
            material.ambientTexture.hasAlpha = alpha;
            engine.loadingUIText = object.id + TEXT[lang].ca;
        }
        else if (textureType == "opacity") textureTask.onSuccess = task => {
            material.opacityTexture = task.texture;
            material.opacityTexture.getAlphaFromRGB = alpha;
            engine.loadingUIText = object.id + TEXT[lang].ca;
        }
        else if (textureType == "emissiveColor") material.emissiveColor = textureUrl;
        material.specularColor = new BABYLON.Color3.Black();
        object.material = material;
    }

    function addRingsTo(astre, texture, size, angleX, angleZ, alpha, scene) { // ajouter des anneaux à un astre
        let rings = new BABYLON.Mesh.CreateGround("ringsOf" + astre, size * scale, size * scale, 2, scene);
        createMat("ringMatOf" + astre, rings, "../data/rings/" + texture, "diffuse", true, scene);
        rings.material.specularColor = new BABYLON.Color3(1, 1, 1);
        rings.material.emissiveColor = new BABYLON.Color3(.6, .6, .6);
        rings.material.backFaceCulling = false;
        rings.rotation.z = astres[getIndexOf(astre)].angularSelf * Math.PI / 180 + Math.PI;
        rings.parent = scene.getMeshByID(astre + "-centerorbit");
        rings.position.x = astres[getIndexOf(astre)].distance;
        rings.visibility = alpha;
    }

    function addAtmosphereTo(astre, texture, opacity, scene) { // ajouter une atmosphère à un astre
        let diametre = astres[getIndexOf(astre)].diametre * 1.005; // diamètre légèrement supérieur
        let clouds = new BABYLON.Mesh.CreateSphere("atmosphereOf" + astre, 32, diametre, scene);
        let cloudMat = new BABYLON.StandardMaterial("cloudMatOf" + astre, scene);
        cloudMat.opacityTexture = new BABYLON.Texture("../data/atm/" + texture, scene);
        cloudMat.opacityTexture.getAlphaFromRGB = true;
        //cloudMat.backFaceCulling = false;

        cloudMat.opacityFresnelParameters = new BABYLON.FresnelParameters(); // Fresnel (effet d'opacité sur les bords de l'astre)
        cloudMat.opacityFresnelParameters.power = opacity;
        cloudMat.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        cloudMat.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        cloudMat.freeze(); // on gèle le matériel pour économiser des ressources

        clouds.material = cloudMat; // on applique la matériel
        clouds.parent = scene.getMeshByID(astre); // on attache l'atmosphère à son astre
    }

    function createPulsar(astre, emitRate = 20000) { // créer un jet d'émission aux pôles d'un astre tel un pulsar
        let particleSystem = new BABYLON.ParticleSystem("particlesOf" + astre.id, 100000, scene);
        particleSystem.particleTexture = new BABYLON.Texture("../data/particles/flare.png", scene);
        particleSystem.emitter = astre; // objet émétteur
        particleSystem.minEmitBox = new BABYLON.Vector3(-.2, 0, 0); // Définition de
        particleSystem.maxEmitBox = new BABYLON.Vector3(.2, 0, 0); // la zone d'apparition
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

    function createCircle(radius, rz, name, parent) { // créer une orbite
        let steps = 360; // nb segments
        let pi2 = Math.PI * 2; // cercle trigo
        let step = pi2 / steps; // écart radian entre chaque segment
        let path = []; // tableau de segments

        for (let i = 0; i < pi2; i += step) path.push(new BABYLON.Vector3(radius * Math.sin(i), 0, radius * Math.cos(i))); // génère les segments

        let lines = new BABYLON.Mesh.CreateLines("orbitTorusOf" + name, path, scene);
        lines.color = new BABYLON.Color3.White();
        lines.rotation.z = rz;
        lines.isPickable = false;
        if (isDefined(parent)) lines.parent = parent;
        lines.setEnabled(0);
        return lines;
    }

    /// Labels
    var UI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var labelTab = [];

    function addLabel(mesh, parent) {
        let label = new BABYLON.GUI.Rectangle("Label" + mesh.id);
        label.thickness = 0;
        label.linkOffsetY = -10;
        if (!isDefined(parent)) {
            label.fontSize = 18;
            label.height = "30px";
            label.width = "100px";
        } else {
            label.fontSize = 14;
            label.height = "15px";
            label.width = "70px";
        }
        UI.addControl(label);
        label.linkWithMesh(mesh);

        let text = new BABYLON.GUI.TextBlock();
        text.text = mesh.id;
        text.color = "white";
        label.addControl(text);
        labelTab.push([label, parent, mesh]);
    }

    // Générations des astres selon la tables des données
    for (let i in astres) setTimeout(() => {
        let astre = new BABYLON.Mesh.CreateSphere(astres[i].name, 32, astres[i].diametre, scene); // création de l'objet astre
        astre.position.x = astres[i].distance; // positionnement de l'astre
        astre.rotation.z = astres[i].angularSelf * Math.PI / 180 + Math.PI; // inclinaison de l'astre
        addLabel(astre, astres[i].parent); // ajout d'une étiquette à l'astre
        createMat(astres[i].name + "Material", scene.getMeshByID(astres[i].name), "../data/" + astres[i].texture, astres[i].textureType, false, scene); // création du matériel pour l'astre
        if (isDefined(astres[i].specular)) astre.material.specularTexture = new BABYLON.Texture("../data/specular/" + astres[i].specular, scene); // si texture de reflet en plus
        if (isDefined(astres[i].emissive)) { // si texture d'émission en plus
            astre.material.emissiveTexture = new BABYLON.Texture("../data/" + astres[i].emissive, scene);
            astre.material.emissiveTexture.level = .5; // pas trop fort quand même
        } else astre.material.emissiveColor = new BABYLON.Color3(.07, .07, .07); /// Ambient light
        if (isDefined(astres[i].isPickable)) astre.isPickable = astres[i].isPickable; /// Astre clickable sauf contre indication
        if (astres[i].godrays) { // si l'astre est une étoile
            let light = new BABYLON.PointLight("luxOf" + astres[i].name, new BABYLON.Vector3.Zero(), scene); // création d'une lumière
            light.parent = astre; // attachement de la lumière à l'astre
            let godrays = new BABYLON.VolumetricLightScatteringPostProcess('godraysOf' + astres[i].name, 1, camAstras, astre, 75, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false); // création du VLS
            godrays.exposure = .2; // réglage de l'intensité
            godrays.decay = .95; // réglage de la couronne stellaire
            godrays.isPickable = false; // ne peut être pris pour cible
            camAstrasd.attachPostProcess(godrays); // on attache
            camAstras.attachPostProcess(godrays); // le VLS
            camfree.attachPostProcess(godrays); // sur toutes
            camfreed.attachPostProcess(godrays); // les
            camfreeVR.attachPostProcess(godrays); // caméras
            godraysTab.push([astre, light, godrays]); // on push tout dans un array
            for (let j in godraysTab) { // on empèche les conflits entre godrays
                godraysTab[j][1].excludedMeshes.push(astre);
                light.excludedMeshes.push(godraysTab[j][0]);
            }
        }
        if (astres[i].pulsar) createPulsar(astre); // si souhaité, l'astre devient un pulsar
        else astre.rotate(BABYLON.Axis.Y, astres[i].positionDebut, BABYLON.Space.LOCAL); // sinon on donne une rotation random pour l'astre (saisons)

        let centreorbit = new BABYLON.Mesh.CreateSphere(astres[i].name + "-centerorbit", 1, 1e-100, scene); // on crée un point d'attache orbital
        centreorbit.rotation.z = (astres[i].angularOrbit) * Math.PI / 180; // prend l'inclinaison de l'orbite
        centreorbit.rotate(BABYLON.Axis.Y, astres[i].positionDebut, BABYLON.Space.LOCAL); // est tourné de manière aléatoire pour mélanger les astres

        astre.parent = centreorbit; // on attache l'astre sur l'attache orbitale

        let centerastre = new BABYLON.Mesh.CreateSphere(astres[i].name + "-center", 1, 1e-100, scene); // on crée un autre point d'attache au centre de l'astre pour les satellites
        centerastre.parent = centreorbit; // on superpose le point d'attache et l'astre

        if (isDefined(astres[i].parent)) scene.getMeshByID(astres[i].name + "-centerorbit").parent = scene.getMeshByID(astres[i].parent + "-center"); // si l'astre a un parent, on lie son attache orbitale à l'attache astrale du parent

        createCircle(astres[i].distance, astres[i].angularOrbit * Math.PI / 180, astres[i].name, scene.getMeshByID(astres[i].parent + "-center")); // on génère un cercle orbital

        if (isDefined(astres[i].rings)) addRingsTo(astres[i].name, astres[i].rings.texture, astres[i].rings.size, 0, astres[i].angularSelf * Math.PI / 180, astres[i].rings.alpha, scene); // on ajoute des anneaux si besoin
        if (isDefined(astres[i].atm)) addAtmosphereTo(astres[i].name, astres[i].atm.texture, astres[i].atm.opacity, scene); // on ajoute une atmosphère si besoin

        if (i >= beginNavIndex) { // si l'astre est navigable
            if (!isDefined(astres[i].parent)) $("#astra-list").append("<div id='" + astres[i].name + "' class='planete'><img src='../data/icons/" + astres[i].icon + "'/><p>" + astres[i].name + "</p></div>"); // si c'est une planète
            else $("#astra-list").append("<div id='" + astres[i].name + "' class='satellite'><img src='../data/icons/" + astres[i].icon + "'/><p>" + astres[i].name + "</p></div>"); // si c'est un satellite
        }

        $("#loading .text").html(Math.round(((parseInt(i) + 1) / (astres.length + belts.length)) * 100) + "%"); // on affiche la progression du chargement en %
        $(".point").html(""); // on supprime les ...
        document.getElementById("bar").style.width = Math.round(((parseInt(i) + 1) / (astres.length + belts.length)) * 100) + "%"; // on met à jour la progressBar
    }, MAIN_DELAY * i); // délai multiplié par l'index


    for (let i in belts) setTimeout(() => {
        createBelt(belts[i].name, belts[i].nb, belts[i].position.nearest, belts[i].position.farthest, belts[i].yDivergence, belts[i].size, belts[i].parent, belts[i].texture, scene); // on crée une ceinture d'astéroides
        if (belts[i].parent != null) scene.getMeshByID(belts[i].name).parent = scene.getMeshByID(belts[i].parent); // on attache au parent si il existe
        $("#loading .text").html(Math.round(((astres.length + parseInt(i) + 1) / (astres.length + belts.length)) * 100) + "%"); // on affiche la progression du chargement en %
        document.getElementById("bar").style.width = Math.round(((astres.length + parseInt(i) + 1) / (astres.length + belts.length)) * 100) + "%"; // on met à jour la progressBar
    }, (astres.length + parseInt(i)) * MAIN_DELAY);

    setTimeout(() => {
        for (let i in labelTab) labelTab[i][0].onPointerUpObservable.add((pointerInfo, eventState) => { // on attache un event click sur les étiquettes
            if (astres[getIndexOf(labelTab[i][2].id)].isPickable || !isDefined(astres[getIndexOf(labelTab[i][2].id)].isPickable)) goTo(labelTab[i][2]);
        });

        /// Toggle Orbits
        var areOrbitsEnabled = false;
        $("#torbit").click(e => {
            if (!areOrbitsEnabled) {
                $("#torbit").attr("src", "../../toolbar/hideorbit.png");
                $("#torbit").attr("title", TEXT[lang].do);
                for (let i in astres) scene.getMeshByID("orbitTorusOf" + astres[i].name).setEnabled(1);
            } else {
                $("#torbit").attr("src", "../../toolbar/showorbit.png");
                $("#torbit").attr("title", TEXT[lang].eo);
                for (let i in astres) scene.getMeshByID("orbitTorusOf" + astres[i].name).setEnabled(0);
            }
            areOrbitsEnabled = !areOrbitsEnabled;
        });

        /// Toggle Asteroids
        var areAsteroidsEnabled = true;
        $("#tasteroids").click(e => {
            if (areAsteroidsEnabled) {
                $("#tasteroids").attr("src", "../../toolbar/hideasteroids.png");
                $("#tasteroids").attr("title", TEXT[lang].ea);
                for (let i in belts) scene.getMeshByID(belts[i].name).visibility = 0;
            } else {
                $("#tasteroids").attr("src", "../../toolbar/asteroids.png");
                $("#tasteroids").attr("title", TEXT[lang].da);
                for (let i in belts) scene.getMeshByID(belts[i].name).visibility = 1;
            }
            areAsteroidsEnabled = !areAsteroidsEnabled;
        });

        /// Toggle FXAA
        $("#tfxaa").click(e => {
            if (!pipeline.fxaaEnabled) {
                $("#tfxaa").attr("src", "../../toolbar/antialiasing.png");
                $("#tfxaa").attr("title", TEXT[lang].dfxaa);
            } else {
                $("#tfxaa").attr("src", "../../toolbar/noantialiasing.png");
                $("#tfxaa").attr("title", TEXT[lang].efxaa);
            }
            pipeline.fxaaEnabled = !pipeline.fxaaEnabled;
        });

        /// Toggle Godrays
        var areGodraysEnabled = true;
        $("#tgodrays").on("click", e => {
            if (areGodraysEnabled) {
                for (let i in godraysTab) {
                    quality = "low";
                    camAstras.detachPostProcess(godraysTab[i][2]);
                    camAstrasd.detachPostProcess(godraysTab[i][2]);
                    camfree.detachPostProcess(godraysTab[i][2]);
                    camfreed.detachPostProcess(godraysTab[i][2]);
                    camfreeVR.detachPostProcess(godraysTab[i][2]);
                }
                $("#tgodrays").attr("title", TEXT[lang].eg);
                $("#tgodrays").attr("src", "../../toolbar/nogodrays.png");
            } else {
                for (let i in godraysTab) {
                    quality = "high"
                    camAstras.attachPostProcess(godraysTab[i][2]);
                    camAstrasd.attachPostProcess(godraysTab[i][2]);
                    camfree.attachPostProcess(godraysTab[i][2]);
                    camfreed.attachPostProcess(godraysTab[i][2]);
                    camfreeVR.attachPostProcess(godraysTab[i][2]);
                }
                $("#tgodrays").attr("title", TEXT[lang].dg);
                $("#tgodrays").attr("src", "../../toolbar/godrays.png");
            }
            areGodraysEnabled = !areGodraysEnabled;
        });
        if (quality == "low") $("#tgodrays").trigger("click");

        /// Toggle Labels
        var areLabelsEnabled = true;
        $("#tlabel").on("click", e => {
            if (areLabelsEnabled) {
                for (let i in labelTab) UI.removeControl(labelTab[i][0]);
                $("#tlabel").attr("src", "../../toolbar/noname.png");
                $("#tlabel").attr("title", TEXT[lang].el);
            } else {
                for (let i in labelTab) {
                    if (labelTab[i][1] == cible.id || (labelTab[i][2] != cible && labelTab[i][1] == null) || (labelTab[i][1] == astres[indexOfCible].parent && labelTab[i][1] != null && labelTab[i][2] != cible)) UI.addControl(labelTab[i][0]);
                }
                $("#tlabel").attr("src", "../../toolbar/name.png");
                $("#tlabel").attr("title", TEXT[lang].dl);
            }
            areLabelsEnabled = !areLabelsEnabled;
        });

        $("#tscreen").on("click", e => BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1 })); // Screenshot avec la caméra active

        function switchTo(newCamera) { /// fonction permettant de switch de caméra facilement
            scene.activeCamera.detachControl(canvas);
            newCamera.attachControl(canvas);
            scene.activeCamera = newCamera;
            zoomOn = true;
        }

        $("#free").on("click", e => { // Switch sur la caméra libre
            switchTo(camfree);
            $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
        });
        $("#freed").on("click", e => { // Switch sur la caméra libre anaglyphe
            switchTo(camfreed);
            $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
        });
        $("#freevr").on("click", e => { // Switch sur la caméra libre VR
            switchTo(camfreeVR);
            $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
        });
        $("#plan").on("click", e => switchTo(camAstras)); // Swicth sur la caméra planétaire
        $("#pland").on("click", e => switchTo(camAstrasd)); // Switch sur la caméra planétaire anaglyphe

        /// Slider gérant la précision du zoom de la roulette de la caméra planétaire   
        var modiCam = .5 * scale;
        var precihandle = $("#precihandle");
        var preciSlider = createSlider($("#precision"), precihandle, 5, 1, 50, (e, ui) => {
            precihandle.text(ui.value);
            modiCam = ui.value / 10 * scale;
        });

        /// Slider gérant la vitesse de la caméra en mode libre        
        var freehandle = $("#freehandle");
        var speedSlider = createSlider($("#speed"), freehandle, SPEED / scale / freeSpeedCoeff, 1, 200, (e, ui) => {
            SPEED = ui.value * scale * freeSpeedCoeff;
            SPEED = ui.value * scale * freeSpeedCoeff;
            freehandle.text(ui.value);
        });

        /// Slider gérant la sensibilité de la souris des caméras        
        var sensihandle = $("#sensihandle");
        var sensiSlider = createSlider($("#sensifree"), sensihandle, 5, 1, 20, (e, ui) => {
            camfree.angularSensibility = 10000 / ui.value;
            camfreed.angularSensibility = 10000 / ui.value;
            camfreeVR.angularSensibility = 10000 / ui.value;
            camAstras.angularSensibilityY = 10000 / ui.value;
            camAstras.angularSensibilityX = 10000 / ui.value;
            camAstrasd.angularSensibilityX = 10000 / ui.value;
            camAstrasd.angularSensibilityY = 10000 / ui.value;
            sensihandle.text(ui.value);
        });

        /// Slider gérant la vitesse du temps 
        var modiTime = 1 / timeQuotient;
        var powerTime = 2;
        var timehandle = $("#timehandle");
        var timeSlider = createSlider($("#time"), timehandle, modiTime * timeQuotient, 0, 100, (e, ui) => {
            modiTime = Math.pow(ui.value, powerTime) / timeQuotient;
            timehandle.text(ui.value);
        });

        /// Slider gérant les vitesses de voyage astre à astre  
        var transispeed = .5;
        var transihandle = $("#transihandle");
        var transiSlider = createSlider($("#transispeed"), transihandle, transispeed * 10, 1, 20, (e, ui) => {
            transispeed = ui.value / 10;
            transihandle.text(ui.value);
        });

        /// Slider gérant le contraste des Textures   
        pipeline.imageProcessing.contrast = 1.5;
        var contrasthandle = $("#contrasthandle");
        var contrastSlider = createSlider($("#contrast"), contrasthandle, pipeline.imageProcessing.contrast * 10, 0, 30, (e, ui) => {
            pipeline.imageProcessing.contrast = ui.value / 10;
            contrasthandle.text(ui.value);
        });

        document.onkeydown = e => { // gestion de la vitesse du temps avec les touches + et -
            if (e.keyCode == 107 || e.keyCode == 109) e.preventDefault(); /// + || - (utile si max ou min atteint)
            if (e.keyCode === 107 && modiTime < Math.pow(100, powerTime) / timeQuotient) { /// +
                timeSlider.slider("value", parseInt(timehandle.text()) + 1);
                timehandle.text(parseInt(timehandle.text()) + 1);
                modiTime = Math.pow(parseInt(timehandle.text()), powerTime) / timeQuotient;
            }
            if (e.keyCode === 109 && modiTime > 0) { /// -
                timeSlider.slider("value", parseInt(timehandle.text()) - 1);
                timehandle.text(parseInt(timehandle.text()) - 1);
                modiTime = Math.pow(parseInt(timehandle.text()), powerTime) / timeQuotient;
            }
        }

        scene.onPointerObservable.add((pointerInfo, eventState) => { /// Click sur un astre
            let target = pointerInfo.pickInfo.pickedMesh;
            if (target == scene.getMeshByID("atmosphereOf" + cible.id)) return false; /// Si click sur l'atmosphère de l'astre courant : rien
            if (target == scene.getMeshByID("ringsOf" + cible.id)) return false; /// Si click sur les anneaux de l'astre courant : rien
            else if (target.id.substring(0, 7) == "ringsOf") { /// Si click sur les anneaux d'un autre astre
                target = scene.getMeshByID(target.id.substring(7)); /// On récupère le nom de l'astre
                goTo(target); /// On enclenche !
            } else if (target.id.substring(0, 12) == "atmosphereOf") { /// Si click sur l'atmosphère d'un autre astre
                target = scene.getMeshByID(target.id.substring(12)); /// On récupère le nom de l'astre
                goTo(target); /// On enclenche !
            } else if (target != cible) goTo(target); /// Si de manière générale on click sur un autre astre, on enclenche !
            else zoomOn = true; /// Sinon on zoom sur l'astre courant
        }, BABYLON.PointerEventTypes.POINTERPICK);

        $("#previous").click(e => { // si click sur le bouton astre précédent
            if (indexOfCible - 1 >= beginNavIndex) goTo(scene.getMeshByID(astres[indexOfCible - 1].name));
            else goTo(scene.getMeshByID(astres[astres.length - 1].name)); // si il n'y a pas d'astre précédent navigable : va sur le dernier astre navigable
        });

        $("#next").click(e => { // si click sur le bouton astre suivant
            if (indexOfCible + 1 <= astres.length - 1) goTo(scene.getMeshByID(astres[indexOfCible + 1].name));
            else goTo(scene.getMeshByID(astres[beginNavIndex].name)); // si il n'y a pas d'astre suivant, va au premier astre navigable
        });

        $("#astra-list div").click(function(e) { // gère le click sur le sélecteur d'astre
            let mesh = scene.getMeshByID($(this).attr("id")); /// $(this) nécessite une fonction normale (donc pas de fonction fléchée malheureusement)
            if (mesh != cible) goTo(mesh);
            else zoomOn = true;
        });

        var changement = false;
        var endLock = true;
        var canZoom = true;
        var cible = scene.getMeshByID(firstTarget);
        var indexOfCible = getIndexOf(firstTarget);
        var r = astres[indexOfCible].diametre * 2;

        function goTo(target) {
            modiTime = 0;

            scene.getMeshByID("orbitTorusOf" + astres[indexOfCible].name).color = BABYLON.Color3.White(); // l'orbite redevient blanche
            UI.addControl(labelTab[indexOfCible][0]); // on fait réapparaître l'étiquette
            cible.isPickable = true; // on rend la cible clickable à nouveau

            cible = target; // on change la cible
            cible.isPickable = false; // on rend la nouvelle cible inclickable
            indexOfCible = getIndexOf(cible.id); // on redéfinit l'index avec la nouvelle cible
            UI.removeControl(labelTab[indexOfCible][0]); // on fait disparaître l'étiquette
            scene.getMeshByID("orbitTorusOf" + astres[indexOfCible].name).color = BABYLON.Color3.Yellow(); // l'orbite devient jaune

            for (let i in labelTab) {
                if ((labelTab[i][1] == cible.id || (labelTab[i][1] == astres[indexOfCible].parent && labelTab[i][1] != null && labelTab[i][2].id != cible.id)) && areLabelsEnabled) UI.addControl(labelTab[i][0]); // si astre parent, on affiche l'étiquette
                else if (labelTab[i][1] != null) UI.removeControl(labelTab[i][0]); // si satellite, étiquette désactivée pour éclaircir l'espace clickable
                if (!areLabelsEnabled) UI.removeControl(labelTab[i][0]); // si désactivés, on supprime tous les labels
            }

            ////// Remplissage du panneau Infos
            $("#name").html(astres[indexOfCible].name); // le nom
            $("#diameter").html(intFormat(astres[indexOfCible].diametre / diametreFormule / scale) + "km"); // le diamètre
            if (isDefined(astres[indexOfCible].realdistance)) $("#distance").html(intFormat(astres[indexOfCible].realdistance) + "km"); // la vraie distance
            else $("#distance").html(intFormat(astres[indexOfCible].distance / distanceFormule * distanceCoeff / scale) + "km"); // sinon on calcule
            if (!isDefined(astres[indexOfCible].parent)) $("#parent").html(TEXT[lang].bt); // si pas d'astre parent
            else $("#parent").html(TEXT[lang].nt + astres[indexOfCible].parent); // si astre parent
            $("#satellites").html(astres[indexOfCible].satellites); // les satellites
            $("#rotation").html(astres[indexOfCible].rotation); // la durée d'une rotation
            $("#revolution").html(astres[indexOfCible].revolution); // la durée d'une révolution
            $("#bio").html(astres[indexOfCible].description); // la description
            camAstras.lowerRadiusLimit = 0; // désactivation de la 
            camAstrasd.lowerRadiusLimit = 0; // limite de radius
            camAstras.setTarget(centerView.position); // Caméra attaché au
            camAstrasd.setTarget(centerView.position); // centerview mobile
            r = astres[indexOfCible].diametre * 2 + 1; // distance d'approche de l'astre cible
            if (!changement) changement = true; // ENGAGE !
        }

        var ticksdays = 0;
        var date = new Date();
        var days = date.getDate();
        var mois = date.getMonth() + 1;
        var year = date.getFullYear();
        var limite;
        var day = Math.PI * 2;
        $("#jour").html(days);
        $("#mois").html(mois);
        $("#year").html(year);


        function backToTheFuture(distance) { /// Prise en compte du bond temporel
            for (let i in astres) {
                scene.getMeshByID(astres[i].name + "-centerorbit").rotate(BABYLON.Axis.Y, ((-distance) / (astres[i].annee)) * Math.PI * 2, BABYLON.Space.LOCAL);
                scene.getMeshByID(astres[i].name).rotate(BABYLON.Axis.Y, ((-distance) / (astres[i].annee)) * Math.PI * 2, BABYLON.Space.WORLD);
                if (isDefined(astres[i].rings)) scene.getMeshByID("ringsOf" + astres[i].name).rotate(BABYLON.Axis.Y, -((distance) / (astres[i].annee)) * Math.PI * 2, BABYLON.Space.WORLD);
                if (isDefined(astres[i].parent)) {
                    scene.getMeshByID(astres[i].name + "-centerorbit").rotate(BABYLON.Axis.Y, -distance / astres[getIndexOf(astres[i].parent)].annee * Math.PI * 2, BABYLON.Space.WORLD);
                    scene.getMeshByID("orbitTorusOf" + astres[i].name).rotate(BABYLON.Axis.Y, -distance / astres[getIndexOf(astres[i].parent)].annee * Math.PI * 2, BABYLON.Space.WORLD);
                }
            }
        }
        var newDate = null;
        var oldDate = new Date();
        $("#datepicker").datepicker({
            dateFormat: "mm/dd/yy",
            onSelect: date => newDate = new Date(date)
        });
        $("#datesetter").dialog({
            autoOpen: false,
            dialogClass: "no-close",
            buttons: [{
                    text: TEXT[lang].cncl,
                    click: function() {
                        newDate = new Date($("#datepicker").val());
                        $(this).dialog("close");
                    }
                },
                {
                    text: TEXT[lang].dne,
                    click: function() {
                        newDate = new Date($("#datepicker").val());
                        $(this).dialog("close");
                        oldDate = new Date($("#mois").text() + "/" + $("#jour").text() + "/" + $("#year").text());
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var diff = Math.round((newDate.getTime() - oldDate.getTime()) / oneDay);
                        $("#mois").html(newDate.getMonth() + 1);
                        $("#jour").html(newDate.getDate());
                        $("#year").html(newDate.getFullYear());
                        backToTheFuture(diff);
                    }
                }
            ]
        });
        $("#date").click(e => { // on click sur la date
            $("#datesetter").dialog("open"); // l'interface de voyage temporel s'ouvre
            $("#datepicker").val($("#mois").text() + "/" + $("#jour").text() + "/" + $("#year").text()); // on règle le champ sur la date courante
        });

        scene.beforeRender = () => {
            for (let i in godraysTab) { /// Activation/Désactivation dynamique des Godrays
                if (scene.activeCamera.isInFrustum(godraysTab[i][0]) && areGodraysEnabled && quality != "low") scene.activeCamera.attachPostProcess(godraysTab[i][2]); // si dans champ de vision, on active
                else scene.activeCamera.detachPostProcess(godraysTab[i][2]); // sinon on déactive
            }
            if ($("#fps").is(":visible")) $("#fps").html(Math.round(engine.getFps()) + " FPS"); /// Affichage des FPS en temps réel, seulement lorsqu'ils sont visibles

            /// Gestion dynamique de la précision du zoom roulette
            camAstras.wheelPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstras.pinchPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstrasd.wheelPrecision = 1 / camAstrasd.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstrasd.pinchPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;

            if (changement) { /// Mise à jour de la position des caméras lors des changements de cibles
                centerView.position.x += (cible.absolutePosition.x - centerView.position.x) * transispeed / 10;
                centerView.position.y += (cible.absolutePosition.y - centerView.position.y) * transispeed / 10;
                centerView.position.z += (cible.absolutePosition.z - centerView.position.z) * transispeed / 10;

                camAstras.setTarget(centerView.position);
                camAstrasd.setTarget(centerView.position);

                let minus = astres[indexOfCible].diametre * 2;
                if (Math.abs(cible.absolutePosition.x - camfree.position.x - minus) > 1) {
                    camfree.position.x += (cible.absolutePosition.x - camfree.position.x - minus) / 10 * transispeed;
                    camfree.position.y += (cible.absolutePosition.y - camfree.position.y + minus / 10) / 10 * transispeed;
                    camfree.position.z += (cible.absolutePosition.z - camfree.position.z - minus) / 10 * transispeed;
                    camfree.setTarget(cible.absolutePosition);
                } else if (scene.activeCamera == camfree) endLock = false;

                if (Math.abs(cible.absolutePosition.x - camfreed.position.x - minus) > 1) {
                    camfreed.position.x += (cible.absolutePosition.x - camfreed.position.x - minus) / 10 * transispeed;
                    camfreed.position.y += (cible.absolutePosition.y - camfreed.position.y + minus / 10) / 10 * transispeed;
                    camfreed.position.z += (cible.absolutePosition.z - camfreed.position.z - minus) / 10 * transispeed;
                    camfreed.setTarget(cible.absolutePosition);
                } else if (scene.activeCamera == camfreed) endLock = false;

                if (Math.abs(cible.absolutePosition.x - camfreeVR.position.x - minus) > 1) {
                    camfreeVR.position.x += (cible.absolutePosition.x - camfreeVR.position.x - minus) / 10 * transispeed;
                    camfreeVR.position.y += (cible.absolutePosition.y - camfreeVR.position.y + minus / 10) / 10 * transispeed;
                    camfreeVR.position.z += (cible.absolutePosition.z - camfreeVR.position.z - minus) / 10 * transispeed;
                    camfreeVR.setTarget(cible.absolutePosition);
                } else if (scene.activeCamera == camfreeVR) endLock = false;

                if (Math.abs(cible.absolutePosition.x - centerView.position.x) < .005) {
                    if (Math.abs(camAstras.radius - r) < 10 && canZoom) endLock = false;
                    else if (!canZoom) endLock = false;
                } else if (canZoom) {
                    camAstras.radius -= (camAstras.radius - r) / 10 * transispeed / 2;
                    camAstrasd.radius -= (camAstrasd.radius - r) / 10 * transispeed / 2;
                }

                if (!endLock) {
                    camAstras.setTarget(cible.absolutePosition);
                    camAstrasd.setTarget(cible.absolutePosition);
                    camAstras.lowerRadiusLimit = astres[indexOfCible].diametre + 1;
                    camAstrasd.lowerRadiusLimit = astres[indexOfCible].diametre + 1;
                    changement = false;
                    endLock = true;
                    canZoom = true;
                    modiTime = Math.pow(parseInt(timehandle.html()), powerTime) / timeQuotient;
                }
            } else {
                camAstras.setTarget(cible.absolutePosition);
                camAstrasd.setTarget(cible.absolutePosition);
            }

            $(window).on('wheel gestureend', e => { /// Si l'utilisateur scroll ou pince
                if (endLock && changement) canZoom = false;
                if (zoomOn) zoomOn = false;
            });

            if (zoomOn) { /// Zoom sur l'astre courant
                let leftR = camAstras.radius - r;
                let leftRd = camAstras.radius - r;
                if (camAstras.radius > leftR + .1) camAstras.radius -= leftR / 10;
                if (camAstrasd.radius > leftRd + .1) camAstrasd.radius -= leftRd / 10;
                if (leftRd <= r + .1 && leftR <= r + .1) zoomOn = false;
            }

            for (let i in astres) {
                if (!isDefined(astres[i].pulsar)) { /// Si n'est pas un pulsar
                    if (Math.abs(astres[i].coeffrotation) > 0) { /// Si n'est pas un satellite synchrnone
                        scene.getMeshByID(astres[i].name).rotate(BABYLON.Axis.Y, modiTime * astres[i].coeffrotation, BABYLON.Space.LOCAL); /// Rotation des planètes sur elles-mêmes
                        scene.getMeshByID(astres[i].name).rotate(BABYLON.Axis.Y, -modiTime / astres[i].annee, BABYLON.Space.WORLD); /// Saisons (décalage de l'axe de rotation sur 1 année)
                    }
                    if (isDefined(astres[i].rings)) scene.getMeshByID("ringsOf" + astres[i].name).rotate(BABYLON.Axis.Y, -modiTime / astres[i].annee, BABYLON.Space.WORLD);
                    if (isDefined(astres[i].parent)) {
                        scene.getMeshByID(astres[i].name + "-centerorbit").rotate(BABYLON.Axis.Y, -modiTime / astres[getIndexOf(astres[i].parent)].annee, BABYLON.Space.WORLD);
                        scene.getMeshByID("orbitTorusOf" + astres[i].name).rotate(BABYLON.Axis.Y, -modiTime / astres[getIndexOf(astres[i].parent)].annee, BABYLON.Space.WORLD);
                    }
                    scene.getMeshByID(astres[i].name + "-centerorbit").rotate(BABYLON.Axis.Y, -modiTime / astres[i].annee, BABYLON.Space.LOCAL); /// Rotation autour du parent
                } else scene.getMeshByID(astres[i].name).rotation.y -= astres[i].coeffrotation / timeQuotient;
                scene.getMeshByID(astres[i].name + "-center").position = scene.getMeshByID(astres[i].name).position;
                if (isDefined(astres[i].atm)) scene.getMeshByID("atmosphereOf" + astres[i].name).rotation.y += .2 * modiTime;
            }

            ticksdays += modiTime;
            days = parseInt($("#jour").html());
            mois = parseInt($("#mois").html());
            year = parseInt($("#year").html());

            if (ticksdays >= day) {
                days += Math.round(ticksdays / day);
                ticksdays = 0;
                if (mois == 1 || mois == 3 || mois == 5 || mois == 7 || mois == 8 || mois == 10 || mois == 12) limite = 31;
                else if (mois == 2 && year % 4 == 0) limite = 29;
                else if (mois == 2 && year % 4 != 0) limite = 28;
                else limite = 30;

                if (days - 1 >= limite) {
                    mois += Math.round((days) / limite);
                    days = 1;
                }

                if (mois >= 13) {
                    year += Math.round(mois / 12);
                    mois = 1;
                }

                $("#jour").html(days);
                $("#mois").html(mois);
                $("#year").html(year);
            }
        }

        assetsManager.onFinish = tasks => { /// Quand les assets sont prêts
            $("#titre, #loading, #visite").fadeOut(); /// On supprime le GUI de loading
            $("#info").remove();
            $("#loading .text").text(TEXT[lang].ln); /// On display un Lancement
            $("#loading .point").text("..."); /// +...
            scene.executeWhenReady(() => { /// Quand la scène est prête
                $("#menu").animate({ "top": "0px" }, 500); /// On affiche le menu
                if (!mobile) $("#infos, #setters").slideDown(); /// On déploie les panneaux
                $("#toolbar").fadeIn(); /// On affiche la toolbar
                $(canvas).css("opacity", 1); /// On affiche le canvas
                goTo(cible); /// On focus la caméra sur le bon astre

                engine.runRenderLoop(() => scene.render()); /// On rend la scène sur le canvas
            });
        }
        assetsManager.load(); // on charge les assets
    }, ((astres.length + belts.length) * MAIN_DELAY)); // après le chargement des astres et des ceintures
    return scene;
}

function initializeSettings() {
    $("#setters h2").text(TEXT[lang].st);
    $("#setters h3:nth-child(1)").text(TEXT[lang].wp);
    $("#setters h3:nth-child(3)").text(TEXT[lang].fs);
    $("#setters h3:nth-child(5)").text(TEXT[lang].s);
    $("#setters h3:nth-child(7)").text(TEXT[lang].mt);
    $("#setters h3:nth-child(9)").text(TEXT[lang].trs);
    $("#setters h3:nth-child(11)").text(TEXT[lang].ctr);
}

var TEXT;
var req = $.getScript("../language.support.json", data => {
    let str = JSON.stringify(eval('(' + data + ')'));
    TEXT = JSON.parse(str);
    initializeSettings();
});

if ($("#settings p").text() == "Paramètres") var lang = "fr";
else var lang = "en";

$("#astras").hover(e => $("#astra-list").slideToggle(100));

$("#fullscreen").hover(e => $("#screen-list").fadeToggle(100));

$("#views").hover(e => $("#cam-list").fadeToggle(100));

$("#settings").on("click", e => $("#setters").slideToggle(100));

$("#binfos").on("click", e => $("#infos").slideToggle(100));

$('#infos,#setters').draggable();
$("#full-exit").fadeOut();
$("#fps").fadeOut();