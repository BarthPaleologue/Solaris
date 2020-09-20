/// <reference path="../../ts/babylonjs-2.5.d.ts" />
/// <reference path="../../ts/jquery.d.ts" />
/// <reference path="../../ts/jquery-ui.d.ts" />
/// <reference path="../tools.js" />

import { rand, randInt, engine, canvas, createSlider } from "../tools";

let TEXT;
$.getJSON("../language.support.json", data => TEXT = data);

let lang = "en"
if ($("#settings p").text() == "Paramètres") lang = "fr";

$("#fullscreen").hover(() => $("#screen-list").slideToggle(100));
$("#views").hover(() => $("#cam-list").slideToggle(100));
$("#settings").on("click", () => $("#setters").slideToggle());
$("#full-exit").fadeOut();
$("#info").remove();

export function createHyperSpace() {

    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let assetsManager = new BABYLON.AssetsManager(scene);

    let hyperspace = false;
    $("#engage").on("click", () => hyperspace = !hyperspace);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {

        $("#all").on("click", () => $("canvas")[0].requestFullscreen()); /// Fullscreen sans interface

        $("#not-all").on("click", () => { /// Fullscreen avec interface
            $("body")[0].requestFullscreen();
            $("#full-exit, #not-all").fadeToggle(10);
        });

        $("#full-exit").on("click", () => { /// Exit Fullscreen
            $("#full-exit, #not-all").fadeToggle(10);
            document.exitFullscreen();
        });

    } else { /// Si mobile
        $("#views,#fullscreen,#settings").remove();
        $("#exit,#engage").css("width", "49.7%");
        $("#menu li ul").css("width", "50%");
    }

    let camfree = new BABYLON.FreeCamera("camfree", new BABYLON.Vector3(-5000, 0, 0), scene);
    camfree.rotation.y = Math.PI / 2;
    camfree.minZ = .0001;
    scene.activecamfree = camfree;

    let camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(-5000, 0, 0), 0.033, scene);
    camfreed.rotation.y = Math.PI / 2;
    camfreed.minZ = .0001;

    let skybox = new BABYLON.Mesh.CreateBox("skyBox", 10000, scene);

    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox2/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skybox.rotation.y = .8;

    $("#loading .text").html(TEXT[lang].ln);
    $(".point").html("...");
    document.getElementById("bar").style.width = "100%";

    let isEnabledSkybox = true;
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

    function myPositionFunction(particle, i, s) {
        particle.position.x = randInt(-5000, -3000);
        particle.position.y = randInt(-70, 70);
        particle.position.z = randInt(-100, 100);

        particle.scale = new BABYLON.Vector3(2, 2, 2).scale(Math.random()).add(new BABYLON.Vector3(.8, .8, .8));
        //particle.scale.y /= 5;
        //particle.scale.z /= 5;

        particle.rotation.z = rand(-Math.PI / 2, Math.PI / 2);
        particle.rotation.x = rand(-Math.PI / 2, Math.PI / 2);
    }

    let star = BABYLON.MeshBuilder.CreateGround("star", { size: 1, subdivisions: 1 });
    star.rotation.z = Math.PI / 2;

    let starField;
    setTimeout(() => {
        starField = new BABYLON.SolidParticleSystem('stars', scene);
        starField.addShape(star, 100000, { positionFunction: myPositionFunction });
        let mesh = starField.buildMesh();
        let mat = new BABYLON.StandardMaterial("mat1", scene);
        mat.emissiveTexture = new BABYLON.Texture("../data/particles/star5.png", scene);
        mat.opacityTexture = new BABYLON.Texture("../data/particles/star5.png", scene);
        mat.opacityTexture.getAlphaFromRGB = true;
        mat.emissiveColor = new BABYLON.Color3.Blue();
        mat.backFaceCulling = false;
        mesh.material = mat;
        starField.setParticles();
    }, 1000);

    setTimeout(() => {
        $("#free").on("click", e => scene.activeCamera = camfree);
        $("#freed").on("click", e => scene.activeCamera = camfreed);

        let coeffspeed = 1;
        let freehandle = $("#freehandle");
        createSlider($("#speed"), freehandle, coeffspeed, 1, 20, (e, ui) => {
            coeffspeed = ui.value;
            freehandle.text(ui.value);
        });

        let fovmax = 3.05;
        let fovhandle = $("#fovhandle");
        let fovslider = createSlider($("#fov"), fovhandle, fovmax * 100, 150, 314, (e, ui) => {
            fovmax = ui.value / 100;
            fovhandle.text(ui.value);
        });

        let transcoeff = .5;
        let transhandle = $("#transhandle");
        createSlider($("#trans"), transhandle, transcoeff * 10, 1, 20, (e, ui) => {
            transcoeff = ui.value / 10;
            transhandle.text(ui.value);
        });

        let speed = 1e-4;
        camfree.speed = 0;
        camfreed.speed = 0;
        camfree.fov = 0.4;
        camfreed.fov = 0.4;

        $("#tscreen").on("click", () => BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1.1 }));

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
            if (camfree.position.x > -3500) camfree.position.x = -5000;
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
    }, 2000);
    return scene;
}