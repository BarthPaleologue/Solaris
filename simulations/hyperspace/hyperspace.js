/// <reference path="../../ts/babylonjs-2.5.d.ts" />
/// <reference path="../../ts/jquery.d.ts" />
/// <reference path="../../ts/jquery-ui.d.ts" />
/// <reference path="../../js/global.js" />

function createHyperSpace() {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var assetsManager = new BABYLON.AssetsManager(scene);

    var hyperspace = false;
    $("#engage").click(e => hyperspace = !hyperspace);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {

        $("#all").on("click", e => {
            $("#full-exit").fadeIn();
            $("#all,#not-all").fadeOut();
            screenfull.toggle($("body")[0]);
        });

        $("#not-all").on("click", e => {
            screenfull.toggle(canvas);
        });

        $("#full-exit").on("click", e => {
            $("#full-exit").fadeOut();
            $("#all,#not-all").fadeIn();
            screenfull.exit();
        });

    } else { /// Si mobile
        $("#views,#fullscreen,#settings").remove();
        $("#exit,#engage").css("width", "49.7%");
        $("#menu li ul").css("width", "50%");
    }

    function createMat(name, object, textureUrl, textureType, alpha, scene) {
        var material = new BABYLON.StandardMaterial(name, scene);
        if (textureType == "diffuse") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = task => {
                material.diffuseTexture = task.texture;
                material.diffuseTexture.hasAlpha = alpha;
            }
        } else if (textureType == "emissive") {
            var textureTask = assetsManager.addTextureTask("image task", textureUrl);
            textureTask.onSuccess = task => material.emissiveTexture = task.texture;
        }
        object.material = material;
    }

    var camfree = new BABYLON.FreeCamera("camfree1", new BABYLON.Vector3(-4500, 0, 0), scene);
    camfree.rotation.y = Math.PI / 2;
    camfree.checkCollisions = true;
    camfree.keysUp.push(90); // Z 		 
    camfree.keysLeft.push(81); // Q
    camfree.keysDown.push(83); // S 
    camfree.keysRight.push(68); // D
    scene.activecamfree = camfree;
    camfree.minZ = .0001
    camfree.angularSensibility = 1e100;
    camfree.attachControl(canvas);

    var camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(-4500, 0, 0), 0.033, scene);
    camfreed.rotation.y = Math.PI / 2;
    camfreed.checkCollisions = true;
    camfreed.keysUp.push(90); // Z 		 
    camfreed.keysLeft.push(81); // Q
    camfreed.keysDown.push(83); // S 
    camfreed.keysRight.push(68); // D
    camfreed.minZ = .0001;
    camfreed.angularSensibility = 1e100;

    var skybox = new BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox5/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;
    skybox.rotation.y = .8;

    $("#loading .text").html("Loading");
    $(".point").html("...");
    document.getElementById("bar").style.width = "100%";

    var isEnabledSkybox = true;
    $("#disable").on("click", function(e) {
        if (isEnabledSkybox) {
            skybox.setEnabled(0);
            $(this).html("Activer SkyBox");
            isEnabledSkybox = !isEnabledSkybox;
        } else {
            skybox.setEnabled(1);
            $(this).html("Désactiver SkyBox");
            isEnabledSkybox = !isEnabledSkybox;
        }
    });

    var myPositionFunction = (particle, i, s) => {
        particle.position.x = getRandomInt(-5000, -3000);
        particle.position.y = getRandomInt(-70, 70);
        particle.position.z = getRandomInt(-100, 100);

        var rand = Math.random();
        scaleX = rand * 2 + 0.8;
        scaleY = rand * 2 + 0.8;
        scaleZ = rand * 2 + 0.8;
        particle.scale.x = scaleX;
        particle.scale.y = scaleY / 5;
        particle.scale.z = scaleZ / 5;

        particle.rotation.x = getRandom(-4, 4);
    };

    var star = BABYLON.MeshBuilder.CreateGround("star", { size: 1, subdivisions: 1 });
    star.rotation.x = Math.PI / 2;

    setTimeout(() => {
        var stars1 = new BABYLON.SolidParticleSystem('stars', scene);
        stars1.addShape(star, 300000, { positionFunction: myPositionFunction });
        var mesh = stars1.buildMesh();
        var mat = new BABYLON.StandardMaterial("mat1", scene);
        mat.emissiveTexture = new BABYLON.Texture("data/high/flare4.png", scene);
        mat.opacityTexture = new BABYLON.Texture("data/high/flare4.png", scene);
        mat.opacityTexture.getAlphaFromRGB = true;
        mat.emissiveColor = new BABYLON.Color3.White();
        mat.backFaceCulling = false;
        mesh.material = mat;
        stars1.setParticles();
    }, 1000);

    setTimeout(() => {
        $("#free").on("click", e => {
            scene.activeCamera = camfree;
            camfree.attachControl(canvas);
        });
        $("#freed").on("click", e => {
            scene.activeCamera = camfreed;
            camfreed.attachControl(canvas);
        });

        var coeffspeed = 1;
        var freehandle = $("#freehandle");
        var freeslider = createSlider($("#speed"), freehandle, coeffspeed, 1, 20, (e, ui) => {
            coeffspeed = ui.value;
            freehandle.text(ui.value);
        });

        var fovmax = 3.05;
        var fovhandle = $("#fovhandle");
        var fovslider = createSlider($("#fov"), fovhandle, fovmax * 100, 150, 314, (e, ui) => {
            fovmax = ui.value / 100;
            fovhandle.text(ui.value);
        });

        var transcoeff = .5;
        var transhandle = $("#transhandle");
        var transslider = createSlider($("#trans"), transhandle, transcoeff * 10, 1, 20, (e, ui) => {
            transcoeff = ui.value / 10;
            transhandle.text(ui.value);
        });

        var speed = 0.1 / 100;
        camfree.speed = 0;
        camfreed.speed = 0;
        camfree.fov = 0.4;
        camfreed.fov = 0.4;

        $("#tscreen").on("click", e => BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1.1 }));

        document.onkeydown = e => {
            if (e.keyCode == 72) { /// H
                e.preventDefault();
                $("#engage").trigger("click"); /// Toggle HyperSpace
            }
            if (e.keyCode == 75) { /// K
                e.preventDefault();
                $("#fps").fadeToggle(100); /// Toggle FPS
            }
            if (e.keyCode == 83) { /// S
                e.preventDefault();
                $("#tscreen").trigger("click"); /// Screenshot
            }
            if (e.keyCode == 70) { /// F
                e.preventDefault();
                $("#tfxaa").trigger("click"); /// FXAA
            }
            if (e.keyCode == 107 || e.keyCode == 109) e.preventDefault(); /// + || - (utile si max ou min atteint)
            if (e.keyCode === 107 && fovmax < 3.14) { /// +
                e.preventDefault();
                fovslider.slider("value", parseInt(fovhandle.text()) + 1);
                fovhandle.text(parseInt(fovhandle.text()) + 1);
                fovmax = parseInt(fovhandle.text()) / 100;
            }
            if (e.keyCode === 109 && fovmax > 1.5) { /// -
                e.preventDefault();
                fovslider.slider("value", parseInt(fovhandle.text()) - 1);
                fovhandle.text(parseInt(fovhandle.text()) - 1);
                fovmax = parseInt(fovhandle.text()) / 100;
            }
        }
        $("#fps").fadeOut(1);

        scene.registerBeforeRender(() => {
            if (camfree.position.x > -3500) {
                camfree.position.x = -5000;
                if (skybox.position.x >= -4500) skybox.position.x -= 1500;
                else skybox.position.x = 0;
            }
            if (camfreed.position.x > -3500) camfreed.position.x = -5000;
            if (hyperspace) {
                if (speed < 0.2) speed += 0.0005 * transcoeff;
                if (camfree.fov < fovmax) camfree.fov += 0.008 * transcoeff;
                if (camfreed.fov < fovmax) camfreed.fov += 0.008 * transcoeff;
                if (camfree.fov > fovmax) camfree.fov -= 0.008 * transcoeff;
                if (camfreed.fov > fovmax) camfreed.fov -= 0.008 * transcoeff;
            } else {
                if (speed > 0.1 / 100) speed -= 0.003 * transcoeff;
                if (speed <= 0) speed += 0.001;
                if (camfree.fov > 0.4) camfree.fov -= 0.1 * transcoeff;
                if (camfreed.fov > 0.4) camfreed.fov -= 0.1 * transcoeff;
            }
            camfree.position.x += speed * coeffspeed;
            camfreed.position.x += speed * coeffspeed;

            $("#fps").html(Math.round(engine.getFps()) + " FPS");
        });

        assetsManager.onFinish = tasks => {
            $("#menu").animate({ "top": "0px" }, 1500);
            $("#setters").slideDown();
            $("#toolbar").fadeIn();
            canvas.style.opacity = 1;
            engine.runRenderLoop(() => scene.render());
        }

        $("#titre, #loading").fadeOut(() => setTimeout(() => assetsManager.load(), 100));
    }, 3000);
    return scene;
}

var TEXT;
var req = $.getScript("../language.support.json", data => {
    let str = JSON.stringify(eval('(' + data + ')'));
    TEXT = JSON.parse(str);
});

if ($("#settings p").text() == "Paramètres") var lang = "fr";
else var lang = "en";

$("#fullscreen").hover(e => $("#screen-list").slideToggle(100));

$("#views").hover(e => $("#cam-list").slideToggle(100));

$("#settings").on("click", e => $("#setters").slideToggle());
$("#full-exit").fadeOut();
$("#info").remove();