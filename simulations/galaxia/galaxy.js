/// <reference path="../../ts/babylonjs-2.5.d.ts" />
/// <reference path="../../ts/jquery.d.ts" />
/// <reference path="../../ts/jquery-ui.d.ts" />
/// <reference path="../../js/global.js" />

function createGalaxy(nb) {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var assetsManager = new BABYLON.AssetsManager(scene);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent)) {

        $("#all").on("click", e => {
            $("#full-exit,#all,#not-all").fadeToggle();
            screenfull.toggle($("body")[0]);
        });

        $("#not-all").on("click", e => screenfull.toggle(canvas));

        $("#full-exit").on("click", e => {
            $("#full-exit,#all,#not-all").fadeToggle();
            screenfull.exit();
        });
        $("#full-exit").fadeOut(1);

    } else {
        $("#views,#fullscreen,#settings").fadeOut(1);
        $("#exit,#astras").css("width", "49.7%");
        $("#menu li ul").css("width", "50%");
    }

    var origin = new BABYLON.Mesh.CreateSphere("origin", 1, 1e-100, scene);
    origin.visibility = 0;

    const nbstars = nb;

    var camAstras = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0.000001, 0.000001, 600 * (nbstars / 32000), origin, scene);
    camAstras.angularSensibilityX = 2000;
    camAstras.angularSensibilityY = 2000;
    camAstras.maxZ = 10000000;
    camAstras.wheelPrecision = 0.1000;
    camAstras.lowerRadiusLimit = 100 * (nbstars / 32000);
    camAstras.upperRadiusLimit = 30000;
    scene.activeCamera = camAstras;
    camAstras.attachControl(canvas);

    var camAstrasd = new BABYLON.AnaglyphArcRotateCamera("ArcRotateCamera", 0.000001, 0.000001, 600 * (nbstars / 32000), origin, 0.33, scene);
    camAstrasd.angularSensibilityX = 2000;
    camAstrasd.angularSensibilityY = 2000;
    camAstrasd.maxZ = 10000000;
    camAstrasd.wheelPrecision = 0.1000;
    camAstrasd.lowerRadiusLimit = 100 * (nbstars / 32000);
    camAstrasd.upperRadiusLimit = 30000;
    camAstrasd.maxZ = 10000000;

    var camfree = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 70, 0), scene);
    camfree.checkCollisions = true;
    camfree.keysUp.push(90); // Z 		 
    camfree.keysLeft.push(81); // Q
    camfree.keysDown.push(83); // S 
    camfree.keysRight.push(68); // D
    camfree.maxZ = 100000000;

    var camfreed = new BABYLON.AnaglyphFreeCamera("camfreed", new BABYLON.Vector3(70, 70, 0), 0.033, scene);
    camfreed.checkCollisions = true;
    camfreed.keysUp.push(90); // Z 		 
    camfreed.keysLeft.push(81); // Q
    camfreed.keysDown.push(83); // S 
    camfreed.keysRight.push(68); // D	
    camfreed.maxZ = 100000000;

    var pipeline = new BABYLON.DefaultRenderingPipeline(
        "pipeline", // The name of the pipeline
        false, /// HDR
        scene, // The scene instance
        [camAstras, camAstrasd, camfree, camfreed] // The list of cameras to be attached to
    );
    pipeline.bloomEnabled = true;
    pipeline.imageProcessing.toneMappingEnabled = true;

    var numArms = 5; /// Nombre de bras
    var armSeparationDistance = (2 * Math.PI) / numArms; /// division du cercle trigonométrique en numArms parties
    var armlength = 10; /// Longueur des bras
    var armOffsetMax = 3 * armlength; /// Largeur max des bras
    var rotationFactor = .05; /// Rotation des bras
    var largeCoeff = 3; /// Multiplicateur de largeur des bras
    var dispersion = 5; /// Eloignement des étoiles par rapport aux bras
    var density = (2 * nbstars) / 32000; /// densité de la galaxie en fonction du nombre d'étoiles

    $("#genere, #trandom").on("click", e => { /// Génération Aléatoire
        numArms = getRandomInt(4, 7);
        armslider.slider("value", numArms);
        armshandle.text(numArms);
        armSeparationDistance = 2 * Math.PI / numArms;

        largeCoeff = getRandom(.9, 1.4);
        largeslider.slider("value", largeCoeff * 10);
        largehandle.text(Math.round(largeCoeff * 10));

        armlength = largeCoeff * 5;
        if (armlength < 8) armlength = 8;
        longueurslider.slider("value", armlength);
        longueurhandle.text(Math.round(armlength));

        rotationFactor = getRandomInt(80, 150) / 2000;
        enrouslider.slider("value", rotationFactor * 2000);
        enrouhandle.text(rotationFactor * 2000);

        density = (10 * (nbstars / 32000)) / getRandomInt(5, 8);
        densityslider.slider("value", (1 / density) * 10);
        denshandle.text(Math.round((1 / density) * 10));

        dispersion = getRandomInt(2, 6);
        dispslider.slider("value", dispersion);
        disphandle.text(dispersion);

        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    var blue = []; /// étoiles bleues
    var yellow = []; /// étoiles jaunes
    var cloud = []; /// nuages de gaz

    function InitializeStars(array) {
        for (let i = 0; i < nbstars; i++) {

            var distance = Math.pow(getRandom(1, armlength), 2); /// Initialisation de la distance au centre

            var armOffset = Math.pow((getRandom(-armOffsetMax, armOffsetMax)) / distance, 2) * largeCoeff; /// Définition du décalage en fonction de la distance

            var rotation = distance * rotationFactor; /// Rotation plus forte à mesure que l'on s'éloigne du centre

            var angle = Math.round(getRandom(0, 2 * Math.PI) / armSeparationDistance) * armSeparationDistance + armOffset + rotation; /// Séparation des bras + ajout du facteur de rotation

            var starX = Math.cos(angle) * distance + getRandom(0, Math.sqrt(Math.abs(armOffset))); /// Trigonométrie de base
            var starZ = Math.sin(angle) * distance + getRandom(0, Math.sqrt(Math.abs(armOffset))); /// Idem
            var starY = getRandom(-10, 10) / (distance); /// Hauteur pseudo aléatoire
            if (Math.abs(starY) > 4) starY = 0; /// Si trop élevée, est envoyée au milieu de la galaxie
            if (distance < 40 && probability(70)) starY = 1e100; /// On jette la moitié du bulbe à la poubelle

            if (array == blue || array == yellow) {
                starX += getRandom(-dispersion, dispersion);
                starY += getRandom(-dispersion, dispersion) / 2;
                starZ += getRandom(-dispersion, dispersion);
            } else {
                starY += getRandom(-5, 5) / 3;
            }
            array[i] = [starX, starY, starZ];
        }
    }

    InitializeStars(blue);
    InitializeStars(yellow);
    InitializeStars(cloud);

    const starTexture = new BABYLON.Texture("data/flare6.jpg", scene);

    var blue_stars = new BABYLON.ParticleSystem("blue_stars", Math.round(nbstars / 2), scene);
    blue_stars.particleTexture = starTexture;
    blue_stars.emitter = origin;
    blue_stars.updateFunction = particles => {
        for (let i in particles) {
            var particle = particles[i];
            particle.position.x = blue[i][0] * density;
            particle.position.y = blue[i][1] * density;
            particle.position.z = blue[i][2] * density;
        }
    }
    blue_stars.color1 = new BABYLON.Color4(0.1, 0.8, 1.0, 1);
    blue_stars.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1);
    blue_stars.minSize = 1;
    blue_stars.maxSize = 2;
    blue_stars.updateSpeed = 1;
    blue_stars.start();

    var yellow_stars = new BABYLON.ParticleSystem("yellow_stars", Math.round(nbstars / 2), scene);
    yellow_stars.particleTexture = starTexture;
    yellow_stars.emitter = origin;
    yellow_stars.updateFunction = particles => {
        for (let i in particles) {
            var particle = particles[i];
            particle.position.x = yellow[i][0] * density;
            particle.position.y = yellow[i][1] * density;
            particle.position.z = yellow[i][2] * density;
        }
    }
    yellow_stars.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1);
    yellow_stars.color2 = new BABYLON.Color4(253 / 256, 184 / 256, 19 / 256, 1);
    yellow_stars.minSize = 1;
    yellow_stars.maxSize = 2;
    yellow_stars.updateSpeed = 1;
    yellow_stars.start();

    var nuages = new BABYLON.ParticleSystem("clouds", Math.round((nbstars / 4)), scene);
    nuages.particleTexture = new BABYLON.Texture("data/cloud.jpg", scene);
    nuages.emitter = origin;
    nuages.updateFunction = particles => {
        for (let i in particles) {
            var particle = particles[i];
            particle.position.x = cloud[i][0] * density;
            particle.position.y = cloud[i][1] * density;
            particle.position.z = cloud[i][2] * density;
        }
    }
    nuages.color1 = new BABYLON.Color4(70 / 256, 66 / 256, 122 / 256, .1);
    nuages.color2 = new BABYLON.Color4(63 / 256, 34 / 256, 4 / 256, .1);
    nuages.minSize = 8 * (nbstars / 32000);
    nuages.maxSize = 10 * (nbstars / 32000);
    nuages.updateSpeed = 1;
    nuages.start();

    var skybox = new BABYLON.Mesh.CreateBox("skyBox", 100000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../data/skybox2/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skybox.isPickable = false;

    setTimeout(() => {
        blue_stars.stop();
        yellow_stars.stop();
        nuages.stop();
        blue_stars.updateSpeed = 0;
        yellow_stars.updateSpeed = 0;
        nuages.updateSpeed = 0;
    }, 8000);

    $(".text").html("100%");
    $("#bar").css("width", "100%");
    $("#fps").fadeOut(1);

    $("#tscreen").on("click", e => {
        scene.render();
        BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, { precision: 1 });
    });

    function switchTo(newCamera) { /// fonction permettant de switch de caméra facilement
        scene.activeCamera.detachControl(canvas);
        newCamera.attachControl(canvas);
        scene.activeCamera = newCamera;
        zoomOn = true;
    }

    $("#free").on("click", e => {
        switchTo(camfree);
        $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
    });
    $("#freed").on("click", e => {
        switchTo(camfreed);
        $("#zqsd").fadeIn(1000, () => setTimeout(() => $("#zqsd").fadeOut(1000), 1500));
    });
    $("#plan").on("click", e => {
        switchTo(camAstras);
        camAstras.attachControl(canvas);
    });
    $("#pland").on("click", e => {
        switchTo(camAstrasd);
        camAstrasd.radius = camAstras.radius;
        camAstrasd.position = camAstras.position;
    });

    document.onkeydown = e => {
        if (e.keyCode == 32) { /// SPACEBAR
            e.preventDefault();
            camfree.cameraDirection.y += camfree.speed / 20;
            camfreed.cameraDirection.y += camfreed.speed / 20;
        }
        if (e.keyCode == 16) { /// SHIFT
            e.preventDefault();
            camfree.cameraDirection.y -= camfree.speed / 20;
            camfreed.cameraDirection.y -= camfreed.speed / 20;
        }
        if (e.keyCode == 71) { /// G
            e.preventDefault();
            $("#trandom").trigger("click");
        }
        if (e.keyCode == 75) { /// K
            e.preventDefault();
            $("#fps").fadeToggle(100); /// Toggle FPS
        }
    };

    var precihandle = $("#precihandle");
    var precislider = createSlider($("#precision"), precihandle, 7, 1, 50, (e, ui) => {
        camAstras.wheelPrecision = ui.value / 10;
        precihandle.text(Math.ceil(ui.value));
    });

    var freehandle = $("#freehandle");
    var freeslider = createSlider($("#speed"), freehandle, 10, 1, 50, (e, ui) => {
        camfree.speed = ui.value;
        camfreed.speed = ui.value;
        freehandle.text(ui.value);
    });

    var sensihandle = $("#sensihandle");
    var sensislider = createSlider($("#sensifree"), sensihandle, 5, 1, 20, (e, ui) => {
        camfree.angularSensibility = 10000 / ui.value;
        camfreed.angularSensibility = 10000 / ui.value;
        camAstras.angularSensibilityX = 10000 / ui.value;
        camAstras.angularSensibilityY = 10000 / ui.value;
        camAstrasd.angularSensibilityX = 10000 / ui.value;
        camAstrasd.angularSensibilityY = 10000 / ui.value;
        sensihandle.text(ui.value);
    });

    var armshandle = $("#armshandle");
    var armslider = createSlider($("#arms"), armshandle, numArms, 2, 10, (e, ui) => {
        numArms = ui.value;
        armSeparationDistance = 2 * Math.PI / numArms;
        armshandle.text(ui.value);
        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    var denshandle = $("#denshandle");
    var densityslider = createSlider($("#denstar"), denshandle, Math.round(10 / density), 1, 30, (e, ui) => {
        density = 10 / ui.value;
        denshandle.text(ui.value);
    });

    var enrouhandle = $("#enrouhandle");
    var enrouslider = createSlider($("#enroulement"), enrouhandle, rotationFactor * 2000, 1, 300, (e, ui) => {
        rotationFactor = ui.value / 2000;
        enrouhandle.text(ui.value);
        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    var largehandle = $("#largehandle");
    var largeslider = createSlider($("#largeur"), largehandle, largeCoeff * 10, 1, 70, (e, ui) => {
        largeCoeff = ui.value / 10;
        largehandle.text(ui.value);
        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    var longueurhandle = $("#longueurhandle");
    var longueurslider = createSlider($("#longueur"), longueurhandle, armlength, 6, 16, (e, ui) => {
        armlength = ui.value;
        longueurhandle.text(ui.value);
        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    var disphandle = $("#disphandle");
    var dispslider = createSlider($("#disp"), disphandle, dispersion, 0, 10, (e, ui) => {
        dispersion = ui.value;
        disphandle.text(ui.value);
        InitializeStars(blue);
        InitializeStars(yellow);
        InitializeStars(cloud);
    });

    assetsManager.onFinish = tasks => {
        $("#menu").animate({ "top": "0px" }, 1500);
        $("#toolbar").fadeIn();
        $("#setters").slideDown();
        canvas.style.opacity = 1;
        engine.runRenderLoop(() => {
            $("#fps").html(Math.round(engine.getFps()) + " FPS");
            scene.render();
        });
    }

    $("#titre, #loading, #visite").fadeOut(() => setTimeout(() => assetsManager.load(), 100));
    return scene;
}

$("#fullscreen").hover(e => $("#screen-list").slideToggle(100));
$("#views").hover(e => $("#cam-list").slideToggle(100));
$("#settings").on("click", e => $("#setters").slideToggle(100));
$("#info").remove();