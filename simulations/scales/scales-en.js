/// <reference path="../../ts/babylonjs-2.5.d.ts" />
/// <reference path="../../ts/jquery.d.ts" />
/// <reference path="../../ts/jquery-ui.d.ts" />

function createScales(quality) {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var assetsManager = new BABYLON.AssetsManager(scene);

    ///////////////// Compteurs

    var nbclickd, nbclick, nbclickc;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {

        document.getElementById("all").addEventListener("click", function() {
            $("#full-exit").fadeIn();
            $("#all,#not-all").fadeOut();
            screenfull.toggle($("body")[0]);
        });

        document.getElementById("not-all").addEventListener("click", function() {
            screenfull.toggle(canvas);
        });

        document.getElementById("full-exit").addEventListener("click", function() {
            $("#full-exit").fadeOut();
            $("#all,#not-all").fadeIn();
            screenfull.exit();
        });

    } else {
        $("#controles,#views,#fullscreen,#settings").remove();
        $("#exit,#astras").css("width", "49.7%");
        $("#menu li ul").css("width", "50%");
    }

    function createMat(name, object, textureUrl, textureType, alpha, scene) {
        var material = new BABYLON.StandardMaterial(name, scene);
        if (textureType == "diffuse") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = function(task) {
                material.diffuseTexture = task.texture;
                material.diffuseTexture.hasAlpha = alpha;
                if (alpha) material.opacityTexture = task.texture;
            }
        } else if (textureType == "emissive") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = function(task) {
                material.emissiveTexture = task.texture;
            }
        } else if (textureType == "ambient") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = function(task) {
                material.ambientTexture = task.texture;
                material.ambientTexture.hasAlpha = alpha;
            }
        } else if (textureType == "opacity") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = function(task) {
                material.opacityTexture = task.texture;
                material.opacityTexture.getAlphaFromRGB = alpha;
            }
        }
        material.specularColor = new BABYLON.Color3.Black();
        object.material = material;
    }

    function getIndexOf(astre) {
        for (let i = 0; i < astres.length; i++) {
            if (scene.getMeshByID(astre).id == astres[i].name) return i;
        }
    }

    function addRingsTo(astre, texture, size, angleX, angleZ, alpha, scene) {
        var rings = new BABYLON.Mesh.CreateGround("ringsOf" + astre, size * scale, size * scale, 2, scene);
        createMat("ringMatOf" + astre, rings, texture, "diffuse", true, scene);
        rings.material.specularColor = new BABYLON.Color3(1, 1, 1);
        rings.material.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        rings.material.backFaceCulling = false;
        rings.rotation.z = astres[getIndexOf(astre)].angularSelf * Math.PI / 180 + Math.PI;
        rings.parent = scene.getMeshByID(astre + "-centerorbit");
        rings.position.x = astres[getIndexOf(astre)].distance * distanceCoeff;
        rings.visibility = alpha;
        console.log("Rings of " + astre + " have been created");
    }

    function createAtmosphereTo(astre, texture, opacity, scene) {
        var diametre = 0;
        diametre = astres[getIndexOf(astre)].diametre * 1.001 * scale;
        var clouds = new BABYLON.Mesh.CreateSphere("atmosphereOf" + astre, 64, diametre, scene);
        var cloudMat = new BABYLON.StandardMaterial("cloudMatOf" + astre, scene);
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
        if (opacity == 0) clouds.scaling = new BABYLON.Vector3(.001, .001, .001);

    }

    var lightrings = new BABYLON.PointLight("lightrings", new BABYLON.Vector3(0, 0, 0), scene);
    lightrings.intensity = 0.4;

    var lightrings2 = new BABYLON.PointLight("lightrings2", new BABYLON.Vector3(0, 0, 0), scene);
    lightrings2.intensity = 0.2;



    // Générations des astres selon la tables des données
    var distance = 0;
    for (let i = 0; i < astres.length; i++) {
        setTimeout(() => {
            let astre = new BABYLON.Mesh.CreateSphere(astres[i].name, 128, astres[i].rayon, scene);
            astre.rotation.z = astres[i].angularSelf * Math.PI / 180 + Math.PI;
            astre.position.y = astres[i].rayon / 2;
            if (astres[i].parent != null) astre.parent = scene.getMeshByID(astres[i].parent);
            createMat(astres[i].name + "Material", scene.getMeshByID(astres[i].name), "../data/" + astres[i].texture, astres[i].textureType, astres[i].textureAlpha, scene);
            distance += astres[i].rayon * 1.5 + 5;
            astre.position.z = -distance;
            if (astres[i].textureType == "diffuse") {
                var light = new BABYLON.PointLight("lightOf" + astres[i].name, new BABYLON.Vector3(-100, astre.position.y, astre.position.z),
                    scene);
                light.setEnabled(false);
                light.includedOnlyMeshes.push(astre);
                light.setEnabled(true);
            }
            lightrings.excludedMeshes.push(astre);
            lightrings2.excludedMeshes.push(astre);
            $("#loading .text").html(Math.round((i + 1) / (astres.length) * 100) + "%");
            $(".point").html("");
            document.getElementById("bar").style.width = Math.round((i + 1) / (astres.length) * 100) + "%";
        }, i * 200);
    }

    setTimeout(() => {



        addRingsTo("Saturn", "../data/rings.png", 20, 0, -26.73 * Math.PI / 180, 0.5, scene);
        var rings = scene.getMeshByID("ringsOfSaturn");

        addRingsTo("Uranus", "../data/uranus_rings.png", 8, -97.8 * Math.PI / 180, 0, 0.5, scene);
        var urarings = scene.getMeshByID("ringsOfUranus");

        rings.position = scene.getMeshByID("Saturn").position;
        urarings.position = scene.getMeshByID("Uranus").position;


        lightrings.position = new BABYLON.Vector3(scene.getMeshByID("Saturn").position.x, 15, scene.getMeshByID("Saturn").position.z);
        lightrings.includedOnlyMeshes.push(rings);
        lightrings2.position = new BABYLON.Vector3(scene.getMeshByID("Uranus").position.x, 0, -10);
        lightrings2.includedOnlyMeshes.push(urarings);
        var skybox = new BABYLON.Mesh.CreateBox("skyBox", 10000000, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox2/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;

        var clouds = new BABYLON.Mesh.CreateSphere("clouds", 32, 1.01, scene);
        clouds.material = new BABYLON.StandardMaterial("CloudMat", scene);
        clouds.position = scene.getMeshByID("The Earth").position;

        clouds.material.opacityTexture = new BABYLON.Texture("../data/clouds4.jpg", scene);
        clouds.material.opacityTexture.getAlphaFromRGB = true;
        clouds.material.backFaceCulling = false;

        clouds.material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        clouds.material.reflectionFresnelParameters.bias = 0.1;

        clouds.material.opacityFresnelParameters = new BABYLON.FresnelParameters();
        clouds.material.opacityFresnelParameters.power = 0.4;
        clouds.material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        clouds.material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        scene.getLightByID("lightOfThe Earth").includedOnlyMeshes.push(clouds);

        var centerView = new BABYLON.Mesh.CreateSphere("centerView", 1, 0.000000000000000001, scene);

        var camAstras = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, scene.getMeshByID("The Moon"), scene);
        camAstras.angularSensibilityX = 2000;
        camAstras.setPosition(new BABYLON.Vector3(-2.5, 0.6, -4.4));
        camAstras.angularSensibilityY = 2000;
        camAstras.lowerRadiusLimit = 1.5;
        camAstras.maxZ = 10000000;
        camAstras.upperRadiusLimit = 10000000 / 10;
        scene.activeCamera = camAstras;
        camAstras.attachControl(canvas);

        var camAstrasd = new BABYLON.AnaglyphArcRotateCamera("ArcRotateCamera", 0.000001, 0.000001, 200, (0, 10, 0), 0.33, scene);
        camAstrasd.angularSensibilityX = 2000;
        camAstrasd.angularSensibilityY = 2000;
        camAstrasd.maxZ = 10000000;
        camAstrasd.upperRadiusLimit = 10000000 / 10;
        camAstrasd.checkCollisions = true;

        var camfree = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2, 0), scene);
        camfree.keysUp.push(90); // Z 		 
        camfree.keysLeft.push(81); // Q
        camfree.keysDown.push(83); // S 
        camfree.keysRight.push(68); // D
        camfree.maxZ = 100000000;

        var camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(0, 2, 0), 0.033, scene);
        camfreed.keysUp.push(90); // Z 		 
        camfreed.keysLeft.push(81); // Q
        camfreed.keysDown.push(83); // S 
        camfreed.keysRight.push(68); // D	
        camfreed.maxZ = 100000000;

        $("#tzoom").click(function(e) {
            e.preventDefault();
            goTo(cible);
        });

        $("#tscreen").on("click", function() {
            new BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1.1 });
        });


        var fxaa = new BABYLON.FxaaPostProcess('fxaa', 1, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true);

        nbclickd = 0;
        $("#fxaa, #tfxaa").click(function() {
            nbclickd++;
            if (nbclickd == 1) {
                $("#fxaa").html("Disbale FXAA");
                $("#tfxaa").attr("src", "../../toolbar/antialiasing.png");
                $("#tfxaa").attr("title", "Disbale Antialiasing");
                camAstras.attachPostProcess(fxaa);
                camAstrasd.attachPostProcess(fxaa);
                camfree.attachPostProcess(fxaa);
                camfreed.attachPostProcess(fxaa);
            } else if (nbclickd == 2) {
                $("#fxaa").html("Enable FXAA");
                $("#tfxaa").attr("src", "../../toolbar/noantialiasing.png");
                $("#tfxaa").attr("title", "Enable Antialiasing");
                camAstras.detachPostProcess(fxaa);
                camAstrasd.detachPostProcess(fxaa);
                camfree.detachPostProcess(fxaa);
                camfreed.detachPostProcess(fxaa);
                nbclickd = 0;
            }
        });

        $("#free").on("click", function(e) {
            e.preventDefault();
            scene.activeCamera = camfree;
            camfree.attachControl(canvas);
            $("#zqsd").fadeIn(1000, function() {
                setTimeout(function() {
                    $("#zqsd").fadeOut(1000)
                }, 1500)
            });
        });
        $("#freed").on("click", function(e) {
            e.preventDefault();
            scene.activeCamera = camfreed;
            camfreed.attachControl(canvas);
            $("#zqsd").fadeIn(1000, function() {
                setTimeout(function() {
                    $("#zqsd").fadeOut(1000)
                }, 1500)
            });
        });
        $("#plan").on("click", function() {
            scene.activeCamera = camAstras;
            camAstras.attachControl(canvas);
        });
        $("#pland").on("click", function() {
            scene.activeCamera = camAstrasd;
            camAstrasd.attachControl(canvas);
            camAstrasd.setTarget(camAstras.target);
        });

        document.onkeydown = function(e) {
            if (e.keyCode == 32) {
                camfree.cameraDirection.y += camfree.speed / 20;
                camfreed.cameraDirection.y += camfreed.speed / 20;
            }
            if (e.keyCode == 16) {
                camfree.cameraDirection.y -= camfree.speed / 20;
                camfreed.cameraDirection.y -= camfreed.speed / 20;
            }
        };

        var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1, camAstras, scene.getMeshByID("The Sun"), 75, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
        godrays.exposure = 0.2;
        godrays.decay = 0.95;
        godrays._volumetricLightScatteringRTT.renderParticles = true;
        camAstrasd.attachPostProcess(godrays);
        camfree.attachPostProcess(godrays);
        camfreed.attachPostProcess(godrays);

        var transispeed = 20;

        var precihandle = $("#precihandle");
        $("#precision").slider({
            create: function() {
                precihandle.text(2);
            },
            range: "min",
            min: 0.001,
            max: 50.00,
            value: 1.0000,
            slide: function(event, ui) {
                camAstras.wheelPrecision = ui.value;
                precihandle.text(Math.ceil(ui.value));
            }
        });

        var freehandle = $("#freehandle");
        $("#speed").slider({
            create: function() {
                freehandle.text(10);
            },
            range: "min",
            min: 1,
            max: 200,
            value: 1,
            slide: function(event, ui) {
                camfree.speed = ui.value;
                camfreed.speed = ui.value;
                freehandle.text(ui.value);
            }
        });
        var sensihandle = $("#sensihandle");
        $("#sensifree").slider({
            create: function() {
                sensihandle.text(5);
            },
            range: "min",
            min: 1,
            max: 20,
            value: 5,
            slide: function(event, ui) {
                camfree.angularSensibility = 10000 / ui.value;
                camfreed.angularSensibility = 10000 / ui.value;
                sensihandle.text(ui.value);
            }
        });

        var transihandle = $("#transihandle");
        $("#transispeed").slider({
            create: function() {
                transihandle.text(1);
            },
            range: "min",
            min: 1,
            max: 10,
            value: 1,
            slide: function(event, ui) {
                transispeed = ui.value * 20;
                transihandle.text(ui.value);
            }
        });

        skybox.isPickable = false;

        scene.onPointerObservable.add(function(pointerInfo, eventState) {
            target = pointerInfo.pickInfo.pickedMesh;
            goTo(target);
        }, BABYLON.PointerEventTypes.POINTERPICK, false);

        $("#astra-list div").click(function(e) {
            var mesh = $(this).attr("id");
            mesh = scene.getMeshByID(mesh);
            goTo(mesh);
        });

        $("#previous").click(function(e) {
            e.preventDefault();
            if (indexOfCible - 1 >= 0) goTo(scene.getMeshByID(astres[indexOfCible - 1].name));
            else goTo(scene.getMeshByID(astres[astres.length - 1].name));
        });

        $("#next").click(function(e) {
            e.preventDefault();
            if (indexOfCible + 1 <= astres.length - 1) goTo(scene.getMeshByID(astres[indexOfCible + 1].name));
            else goTo(scene.getMeshByID(astres[0].name));
        });

        var z = 0;
        var marge = 0.001;
        var pos1 = true;
        var pos2 = true;
        var pos5 = true;
        var cible = scene.getMeshByID("The Moon");
        var changement = false;
        var r;
        var indexOfCible = getIndexOf("The Moon");

        function goTo(target) {
            cible.isPickable = true;
            cible = target;
            indexOfCible = getIndexOf(cible.id);
            camAstras.setTarget(centerView);
            camAstrasd.setTarget(centerView);
            changement = true;
            if (target == scene.getMeshByID("The Sun") || target == scene.getMeshByID("Altair") || target == scene.getMeshByID("Pollux") || target == scene.getMeshByID("Arcturus") || target == scene.getMeshByID("Aldebaran") || target == scene.getMeshByID("Rigel") || target == scene.getMeshByID("Antares") || target == scene.getMeshByID("Betelgeuse") | target == scene.getMeshByID("UY Scutti")) godrays.mesh = target;
        }


        scene.beforeRender = function() {
            camAstras.wheelPrecision = 1 / camAstras.radius * 200 * parseInt(precihandle.html()) / 2;
            if (changement) {
                var leftX = cible.absolutePosition.x - centerView.position.x;
                var leftY = cible.absolutePosition.y - centerView.position.y;
                var leftZ = cible.absolutePosition.z - centerView.position.z;
                var leftR = camAstras.radius - r;
                var leftRd = camAstrasd.radius - r;

                centerView.position.x += leftX / 10 * transispeed / 50;
                centerView.position.y += leftY / 10 * transispeed / 50;
                centerView.position.z += leftZ / 10 * transispeed / 50;

                var minus;
                for (i = 0; i < astres.length; i++) {
                    if (cible == scene.getMeshByID(astres[i].name)) minus = astres[i].rayon;
                    if (cible == clouds) {
                        minus = 1;
                    }
                }

                var leftFreeX = cible.absolutePosition.x - camfree.position.x;
                var leftFreeY = cible.absolutePosition.y - camfree.position.y;
                var leftFreeZ = cible.absolutePosition.z - camfree.position.z;

                camfree.position.x += leftFreeX / 10 * transispeed / 10 - minus;
                camfree.position.y += leftFreeY / 10 * transispeed / 10 + minus;
                camfree.position.z += leftFreeZ / 10 * transispeed / 10;

                if (leftX <= marge) {
                    z++;
                }

                if (leftZ <= marge) {
                    z++;
                }

                if (Math.abs(leftR) <= 0.001 && Math.abs(leftRd) <= 0.001) {
                    pos5 = false;
                } else {
                    camAstras.radius -= leftR / 10 * transispeed / 50;
                    camAstrasd.radius -= leftRd / 10 * transispeed / 50;
                }

                document.addEventListener("mousewheel", function(e) {
                    if (pos5 && changement) pos5 = false;
                    if (changement) z = 10;
                });

                if (z >= 2) {
                    if (!pos5) {
                        changement = false;
                        if (cible == scene.getMeshByID("clouds")) camAstras.setTarget(scene.getMeshByID("The Earth"));
                        else camAstras.setTarget(cible);
                        camAstrasd.setTarget(cible);
                        cible.isPickable = false;
                        z = 0;
                        pos5 = true;
                    }
                }
            }

            for (i = 0; i < astres.length; i++) {
                if (cible == scene.getMeshByID(astres[i].name)) {
                    camAstras.lowerRadiusLimit = astres[i].rayon + 1;
                    r = astres[i].rayon + 1;
                    r *= 1.7;
                    if (i > 11 && i < 14) camAstras.wheelPrecision = 0.5;
                    else if (i > 14 && i < 16) camAstras.wheelPrecision = 0.1;
                    else if (i > 16) camAstras.wheelPrecision = 0.01;
                    $("#name").html(astres[i].name);
                    $("#diameter").html(new Intl.NumberFormat().format(Math.ceil(astres[i].rayon * 12756)) + "km");
                    $("#distance").html(astres[i].distance);
                    $("#class").html(astres[i].class);
                    //$("#bio").html(astres[i].description);
                } else if (cible == clouds) cible = scene.getMeshByID("The Earth");
            }
            clouds.rotation.y -= 0.0001;
        }

        assetsManager.onFinish = function(tasks) {
            $("#menu").animate({ "top": "0px" }, 1500);
            $("#infos").slideDown();
            $("#toolbar").fadeIn();
            canvas.style.opacity = 1;
            engine.runRenderLoop(function() {
                scene.render();
            });
        }

        $("#titre, #loading, #visite").fadeOut(function() {
            setTimeout(function() {
                assetsManager.load();
            }, 100);
        });
    }, astres.length * 200);
    return scene;
}

$("#astras").hover(function() {
    $("#astra-list").slideToggle(100);
});

$("#fullscreen").hover(function() {
    $("#screen-list").slideToggle(100);
});

$("#views").hover(function() {
    $("#cam-list").slideToggle(100);
});

$("#settings").on("click", function() {
    $("#setters").slideToggle(100);
});

$("#binfos").on("click", function() {
    $("#infos").slideToggle(100);
});

$("#info").remove();

///// Copyright © 2015 Projet Solaris - N° de dépôt 764IS3 ////////////////////////////////////////////////////////////////////////////