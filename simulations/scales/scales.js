/// <reference path="../../ts/babylonjs-2.5.d.ts" />
/// <reference path="../../ts/jquery.d.ts" />
/// <reference path="../../ts/jquery-ui.d.ts" />


$.getScript("../babylon.gui.js");
$.getScript("https://code.jquery.com/pep/0.4.3/pep.js");

////////////////////////////// SCALES_ALGORITHM v2.0 ////////////////////////////////////////////////////////////

function createScales(quality) {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var assetsManager = new BABYLON.AssetsManager(scene);

    var godraysTab = [];

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var camAstras = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 3, -Math.PI / 2, 10, scene.getMeshByID(firstTarget), scene);
    camAstras.maxZ = 10000000;
    camAstras.upperRadiusLimit = 10000000 / 10;

    var camAstrasd = new BABYLON.AnaglyphArcRotateCamera("ArcRotateCamera", -Math.PI / 3, -Math.PI / 2, 10, scene.getMeshByID(firstTarget), 0.33, scene);
    camAstrasd.maxZ = 10000000;
    camAstrasd.upperRadiusLimit = 10000000 / 10;

    var camfree = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, 0), scene);
    camfree.maxZ = 100000000;

    var camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(0, 2, 0), 0.033, scene);
    camfreed.maxZ = 100000000;

    scene.activeCamera = camAstras;
    camAstras.attachControl(canvas);

    var pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", false, scene, [camAstras, camAstrasd, camfree, camfreed]); /// name, hdrEnabled, scene, cameras
    pipeline.bloomEnabled = true;
    pipeline.bloomWeight = 1;
    pipeline.imageProcessing.toneMappingEnabled = false;
    pipeline.fxaa = new BABYLON.FxaaPostProcess('fxaa', 1, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true);
    pipeline.fxaaEnabled = false;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#all").on("click", e => {
        $("#full-exit,#all,#not-all").fadeToggle(10);
        screenfull.toggle($("body")[0]);
    });

    $("#not-all").on("click", e => screenfull.toggle(canvas));

    $("#full-exit").on("click", e => {
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

    function createMat(name, object, textureUrl, textureType, alpha, scene) {
        let material = new BABYLON.StandardMaterial(name, scene);
        if (textureType == "diffuse") {
            let textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = (task) => {
                material.diffuseTexture = task.texture;
                material.diffuseTexture.hasAlpha = alpha;
                if (alpha) material.opacityTexture = task.texture;
                engine.loadingUIText = object.id + TEXT[lang].ca;
            }
        } else if (textureType == "emissive") {
            let textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = (task) => {
                material.emissiveTexture = task.texture;
                engine.loadingUIText = object.id + TEXT[lang].ca;
            }
        } else if (textureType == "ambient") {
            let textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = (task) => {
                material.ambientTexture = task.texture;
                material.ambientTexture.hasAlpha = alpha;
                engine.loadingUIText = object.id + TEXT[lang].ca;
            }
        } else if (textureType == "opacity") {
            let textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = (task) => {
                material.opacityTexture = task.texture;
                material.opacityTexture.getAlphaFromRGB = alpha;
                engine.loadingUIText = object.id + TEXT[lang].ca;
            }
        }
        material.specularColor = new BABYLON.Color3.Black();
        object.material = material;
    }

    function getIndexOf(astre) {
        for (let i in astres) {
            if (scene.getMeshByID(astre).id == astres[i].name) return parseInt(i);
        }
    }

    function addRingsTo(astre, texture, size, angleX, angleZ, alpha, scene) {
        let rings = new BABYLON.Mesh.CreateGround("ringsOf" + astre, size * scale, size * scale, 2, scene);
        createMat("ringMatOf" + astre, rings, texture, "diffuse", true, scene);
        rings.material.specularColor = new BABYLON.Color3(1, 1, 1);
        rings.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        rings.material.backFaceCulling = false;
        rings.rotation.z = astres[getIndexOf(astre)].angularSelf * Math.PI / 180 + Math.PI;
        rings.position = scene.getMeshByID(astre).position;
        rings.visibility = alpha;
    }

    function createAtmosphereTo(astre, texture, opacity, scene) {
        let diametre = astres[getIndexOf(astre)].rayon * 1.001 * scale;
        let clouds = new BABYLON.Mesh.CreateSphere("atmosphereOf" + astre, 64, diametre, scene);
        let cloudMat = new BABYLON.StandardMaterial("cloudMatOf" + astre, scene);
        cloudMat.opacityTexture = new BABYLON.Texture(texture, scene);
        cloudMat.opacityTexture.getAlphaFromRGB = true;

        cloudMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        cloudMat.reflectionFresnelParameters.bias = 0.1;

        cloudMat.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        cloudMat.emissiveFresnelParameters.bias = 0.7;
        cloudMat.emissiveFresnelParameters.power = 4;
        cloudMat.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        cloudMat.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

        cloudMat.opacityFresnelParameters = new BABYLON.FresnelParameters();
        cloudMat.opacityFresnelParameters.power = opacity;
        cloudMat.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        cloudMat.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        cloudMat.specularColor = new BABYLON.Color3.Black();

        clouds.material = cloudMat;
        clouds.parent = scene.getMeshByID(astre);
        scene.getLightByID("lightOf" + astre).includedOnlyMeshes.push(clouds);
    }

    /*var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var labelTab = [];

    function addLabel(mesh, i) {
        let label = new BABYLON.GUI.Rectangle("Label" + mesh.id);
        label.thickness = 0;
        label.linkOffsetY = -10;
        label.fontSize = 18;
        label.height = "30px";
        label.width = "100px";

        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);
        label.top = "10%";
        label.zIndex = 5;
        label.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        let text = new BABYLON.GUI.TextBlock();
        text.text = mesh.id;
        text.color = "white";
        label.addControl(text);
        labelTab.push([label, parent, mesh]);
    }*/

    // Générations des astres selon la tables des données
    var distance = 0;
    for (let i in astres) setTimeout(() => {
        let astre = new BABYLON.Mesh.CreateSphere(astres[i].name, 32, astres[i].rayon, scene);
        astre.rotation.z = astres[i].angularSelf * Math.PI / 180 + Math.PI;
        astre.rotate(BABYLON.Axis.Y, Math.random() * 1000, BABYLON.Space.LOCAL);
        astre.position.y = astres[i].rayon / 2;
        //addLabel(astre, i);
        if (astres[i].parent != null) astre.parent = scene.getMeshByID(astres[i].parent);
        createMat(astres[i].name + "Material", scene.getMeshByID(astres[i].name), "../data/" + astres[i].texture, astres[i].textureType, astres[i].textureAlpha, scene);

        if (astres[i].textureType == "diffuse") {
            var light = new BABYLON.PointLight("lightOf" + astres[i].name, new BABYLON.Vector3(-100, astre.position.y, astre.position.z),
                scene);
            light.includedOnlyMeshes.push(astre);
        } else if (astres[i].textureType == "emissive") {
            let godrays = new BABYLON.VolumetricLightScatteringPostProcess('godraysOf' + astres[i].name, 1, camAstras, astre, 50, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
            godrays.exposure = .1;
            godrays.decay = .95;
            godrays.isPickable = false;
            camAstras.detachPostProcess(godrays);
            godraysTab.push([astre, godrays]);
        }
        if (isDefined(astres[i].rings)) addRingsTo(astres[i].name, "../data/" + astres[i].rings.texture, astres[i].rings.size, 0, -astres[i].angularSelf * Math.PI / 180, astres[i].rings.alpha, scene);
        if (isDefined(astres[i].atm)) createAtmosphereTo(astres[i].name, "../data/" + astres[i].atm.texture, astres[i].atm.opacity, scene);

        distance += astres[i].rayon + 3;
        if (isDefined(astres[i].rings)) distance += astres[i].rings.size / 2; /// si anneaux...
        astre.position.z = -distance;
        if (isDefined(astres[i].rings)) distance += astres[i].rings.size / 2; /// ...on ajoute un peu de chaque côté

        $("#loading .text").html(Math.round((parseInt(i) + 1) / (astres.length) * 100) + "%");
        $(".point").html("");
        document.getElementById("bar").style.width = Math.round((parseInt(i) + 1) / (astres.length) * 100) + "%";
    }, i * 200);


    setTimeout(() => {
        var skybox = new BABYLON.Mesh.CreateBox("skyBox", 10000000, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox2/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.isPickable = false;

        var centerView = new BABYLON.Mesh.CreateSphere("centerView", 1, 0.000000000000000001, scene);

        $("#tscreen").on("click", e => new BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1 }));

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
        $("#tgodrays").click(e => {
            console.log(camAstras.position);
            areGodraysEnabled = !areGodraysEnabled;
            if (!areGodraysEnabled) {
                disableAllGodrays();
                $("#tgodrays").attr("src", "../../toolbar/nogodrays.png");
                $("#tgodrays").attr("title", TEXT[lang].eg);
            } else {
                goTo(cible);
                $("#tgodrays").attr("src", "../../toolbar/godrays.png");
                $("#tgodrays").attr("title", TEXT[lang].dg);
            }
        });

        function swithTo(newCamera) {
            scene.activeCamera.detachControl(canvas);
            newCamera.attachControl(canvas);
            scene.activeCamera = newCamera;
            zoomOn = true;
        }

        $("#free").on("click", e => {
            swithTo(camfree);
            $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
        });
        $("#freed").on("click", e => {
            swithTo(camfreed);
            $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
        });
        $("#plan").on("click", e => swithTo(camAstras));
        $("#pland").on("click", e => swithTo(camAstrasd));

        var SPEED = 100 * scale * freeSpeedCoeff; /// Vitesse des caméras libres

        var map = {};
        $(document).keydown(e => {
            map[e.keyCode] = e.type == 'keydown';
            if (scene.activeCamera == camfree || scene.activeCamera == camfreed) {
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
            if (map[67]) { /// C
                e.preventDefault();
                $("#tzoom").trigger("click"); /// Zoom sur l'astre courant
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
        $(document).keyup(e => map[e.keyCode] = false);

        var transispeed = .5;

        var precihandle = $("#precihandle");
        var precislider = createSlider($("#precision"), precihandle, 5, 1, 50, (e, ui) => {
            camAstras.wheelPrecision = ui.value;
            precihandle.text(ui.value);
        });

        var freehandle = $("#freehandle");
        var speedslider = createSlider($("#speed"), freehandle, SPEED / scale / freeSpeedCoeff, 1, 200, (e, ui) => {
            SPEED = ui.value * scale * freeSpeedCoeff;
            SPEED = ui.value * scale * freeSpeedCoeff;
            freehandle.text(ui.value);
        });

        var sensihandle = $("#sensihandle");
        var sensislider = createSlider($("#sensifree"), sensihandle, 5, 1, 20, (e, ui) => {
            camfree.angularSensibility = 10000 / ui.value;
            camfreed.angularSensibility = 10000 / ui.value;
            sensihandle.text(ui.value);
        });

        var transihandle = $("#transihandle");
        var transislider = createSlider($("#transispeed"), transihandle, transispeed * 10, 1, 20, (e, ui) => {
            transispeed = ui.value / 10;
            transihandle.text(ui.value);
        });

        pipeline.imageProcessing.contrast = 1.5;
        var contrasthandle = $("#contrasthandle");
        var contrastSlider = createSlider($("#contrast"), contrasthandle, pipeline.imageProcessing.contrast * 10, 0, 30, (e, ui) => {
            pipeline.imageProcessing.contrast = ui.value / 10;
            contrasthandle.text(ui.value);
        });


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
        }, BABYLON.PointerEventTypes.POINTERPICK, false);


        $("#astra-list div").click(function(e) {
            var mesh = $(this).attr("id");
            mesh = scene.getMeshByID(mesh);
            goTo(mesh);
        });

        $("#previous").click(e => {
            e.preventDefault();
            if (indexOfCible - 1 >= 0) goTo(scene.getMeshByID(astres[indexOfCible - 1].name));
            else goTo(scene.getMeshByID(astres[astres.length - 1].name));
        });

        $("#next").click(e => {
            e.preventDefault();
            if (indexOfCible + 1 <= astres.length - 1) goTo(scene.getMeshByID(astres[indexOfCible + 1].name));
            else goTo(scene.getMeshByID(astres[0].name));
        });

        var endLock = true;
        var cible = scene.getMeshByID(firstTarget);
        var changement = false;
        var r;
        var indexOfCible = getIndexOf(firstTarget);
        var zoomOn = false;
        $("#tzoom").click(e => zoomOn = true);
        var canZoom = true;

        function getGodraysIndex(astre) {
            for (let i in godraysTab) {
                if (scene.getMeshByID(astre) == godraysTab[i][0]) return parseInt(i);
            }
        }

        function disableAllGodrays() {
            for (let i in godraysTab) {
                camAstras.detachPostProcess(godraysTab[i][1]);
                camAstrasd.detachPostProcess(godraysTab[i][1]);
                camfree.detachPostProcess(godraysTab[i][1]);
                camfreed.detachPostProcess(godraysTab[i][1]);
            }
        }

        function enableGodray(index) {
            camAstras.attachPostProcess(godraysTab[index][1]);
            camAstrasd.attachPostProcess(godraysTab[index][1]);
            camfree.attachPostProcess(godraysTab[index][1]);
            camfreed.attachPostProcess(godraysTab[index][1]);
        }

        function goTo(target) {
            cible.isPickable = true;
            cible = target;
            indexOfCible = getIndexOf(cible.id);
            r = astres[indexOfCible].rayon * 2.3 + 1;
            camAstras.setTarget(centerView);
            camAstrasd.setTarget(centerView);
            camAstras.lowerRadiusLimit = 0;
            camAstrasd.lowerRadiusLimit = 0;
            canZoom = true;
            changement = true;

            disableAllGodrays();
            if (areGodraysEnabled) {
                if (astres[indexOfCible].textureType == "emissive") enableGodray(getGodraysIndex(astres[indexOfCible].name));
                if (indexOfCible < astres.length - 1 && astres[indexOfCible + 1].textureType == "emissive") enableGodray(getGodraysIndex(astres[indexOfCible + 1].name));
                if (indexOfCible > 0 && astres[indexOfCible - 1].textureType == "emissive") enableGodray(getGodraysIndex(astres[indexOfCible - 1].name));
            }
            $("#name").html(astres[indexOfCible].name);
            $("#diameter").html(new Intl.NumberFormat().format(Math.ceil(astres[indexOfCible].rayon * 12756)) + "km");
            $("#distance").html(astres[indexOfCible].distance);
            $("#class").html(astres[indexOfCible].class);
        }

        scene.beforeRender = () => {
            camAstras.wheelPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstras.pinchPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstrasd.wheelPrecision = 1 / camAstrasd.radius * 200 * parseInt(precihandle.html()) / 2;
            camAstrasd.pinchPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;

            if (changement) {
                centerView.position.y += (cible.position.y - centerView.position.y) * transispeed / 10;
                centerView.position.z += (cible.position.z - centerView.position.z) * transispeed / 10;

                camAstras.setTarget(centerView.position);
                camAstrasd.setTarget(centerView.position);

                if ($("#fps").is(":visible")) $("#fps").html(Math.round(engine.getFps()) + " FPS"); /// Affichage des FPS en temps réel


                let minus = astres[indexOfCible].rayon;
                if (Math.abs(cible.position.z - camfree.position.z - minus) > 1) {
                    camfree.position.x += (cible.position.x - camfree.position.x - minus) / 10 * transispeed;
                    camfree.position.y += (cible.position.y - camfree.position.y + minus / 10) / 10 * transispeed;
                    camfree.position.z += (cible.position.z - camfree.position.z - minus) / 10 * transispeed;
                    camfree.setTarget(cible.position);
                } else if (scene.activeCamera == camfree) endLock = false;

                if (Math.abs(cible.position.z - camfreed.position.z - minus) > 1) {
                    camfreed.position.x += (cible.position.x - camfreed.position.x - minus) / 10 * transispeed;
                    camfreed.position.y += (cible.position.y - camfreed.position.y + minus / 10) / 10 * transispeed;
                    camfreed.position.z += (cible.position.z - camfreed.position.z - minus) / 10 * transispeed;
                    camfreed.setTarget(cible.position);
                } else if (scene.activeCamera == camfreed) endLock = false;

                if (Math.abs(cible.position.z - centerView.position.z) < astres[indexOfCible].rayon / 100) {
                    if (Math.abs(camAstras.radius - r) < 1 && canZoom) endLock = false;
                    else if (!canZoom) endLock = false;
                } else if (canZoom) {
                    camAstras.radius -= ((camAstras.radius - r) / 20) * transispeed;
                    camAstrasd.radius -= ((camAstrasd.radius - r) / 20) * transispeed;
                }

                if (!endLock) {
                    camAstras.setTarget(cible.position);
                    camAstrasd.setTarget(cible.position);
                    camAstras.lowerRadiusLimit = r - .01;
                    camAstrasd.lowerRadiusLimit = r - .01;
                    changement = false;
                    endLock = true;
                    canZoom = true;
                }

            } else {
                camAstras.setTarget(cible.position);
                camAstrasd.setTarget(cible.position);
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
        }

        assetsManager.onFinish = (tasks) => {
            $("#titre, #loading, #visite").fadeOut();
            scene.executeWhenReady(() => { /// Quand la scène est prête
                $("#menu").animate({ "top": "0px" }, 500); /// On affiche le menu
                if (!mobile) $("#infos, #setters").slideDown(); /// On déploie les panneaux
                $("#toolbar").fadeIn(); /// On affiche la toolbar
                $(canvas).css("opacity", 1); /// On affiche le canvas
                goTo(cible); /// On focus la caméra sur le bon astre
                engine.runRenderLoop(() => scene.render()); /// On rend la scène sur le canvas
            });
        }
        assetsManager.load();
    }, astres.length * 200);
    return scene;
}

function initializeSettings() {
    $("#setters h2").text(TEXT[lang].st);
    $("#setters h3:nth-child(1)").text(TEXT[lang].wp);
    $("#setters h3:nth-child(3)").text(TEXT[lang].fs);
    $("#setters h3:nth-child(5)").text(TEXT[lang].s);
    $("#setters h3:nth-child(7)").text(TEXT[lang].trs);
    $("#setters h3:nth-child(9)").text(TEXT[lang].ctr);
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

$("#fullscreen").hover(e => $("#screen-list").slideToggle(100));

$("#views").hover(e => $("#cam-list").slideToggle(100));

$("#settings").on("click", e => $("#setters").slideToggle(100));

$("#binfos").on("click", e => $("#infos").slideToggle(100));

$('#infos,#setters').draggable();
$("#full-exit").fadeOut();
$("#fps").fadeOut();
$("#info").remove();

///// Copyright © 2015 Projet Solaris - N° de dépôt 764IS3 ////////////////////////////////////////////////////////////////////////////