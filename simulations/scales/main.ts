import { Solaris } from "../solaris.js";
import { Slider, mod, intFormat, isDefined, loadJSON } from "../components/tools.js";
import { AstreData } from "../components/astreData.js";

export function initScales(pathToData: string, quality = "high") {
    let canvas = document.getElementById("renderCanvas");

    let engine = new BABYLON.Engine(<HTMLCanvasElement>canvas, true);
    window.addEventListener("resize", () => engine.resize());

    let system = new Solaris(engine, quality);

    system.loadConfiguration(pathToData);

    let scene = system.initScene();

    system.initAssetsManager(); // Va contenir tous les matériaux

    system.initUI(); // gestion des labels des astres

    system.initAudio("../data/sounds/ambient.mp3"); // Musique d'ambiance

    let camAstras = system.addCamera("orbitalCamera", "target");
    let camAstrasd = system.addCamera("orbitalCameraAnaglyph", "targetAnaglyph");

    system.switchTo(camAstras); // camAstras est la caméra active à l'initialisation

    system.initPipeline();

    let skybox = system.initSkybox();

    system.initKeyboard();

    let astres = system.initAstres();

    // injection de pointlight dans le moteur
    for (let astre of astres) {
        if (!astre.data.godrays) {
            let position = astre.mesh.absolutePosition;
            let light = new BABYLON.PointLight(`lightOf${astre.id}`, position.add(new BABYLON.Vector3(0, 0, -100)), scene);
            light.includedOnlyMeshes = [astre.mesh, astre.atmosphereMesh];
        } else {
            scene.getLightByID(`lightOf${astre.id}`).includedOnlyMeshes = [astre.mesh];
        }
    }
    for (let camera of scene.cameras) {
        for (let godrays of camera.godraysList) {
            godrays.light.includedOnlyMeshes = [godrays.mesh];
            godrays.dispose(camera);
        }
    }
    for (let camera of system.targetCameras) {
        camera.upperRadiusLimit = 500000;
        camera.maxZ = 10000000;
    }
    skybox.scaling.scaleInPlace(4);

    system.start();

    //#region Interactive DOM

    document.getElementById("date").remove();
    document.getElementById("free").remove();
    document.getElementById("freed").remove();
    document.getElementById("freevr").remove();
    document.getElementById("speed").remove();

    const lang = document.documentElement.lang;
    const TEXT: { [lang: string]: { [key: string]: string; }; } = loadJSON("../data/lang/language.support.json");
    document.querySelector("#setters h2").innerHTML = TEXT[lang].st;
    document.querySelector("#setters h3:nth-child(1)").innerHTML = TEXT[lang].wp;
    document.querySelector("#setters h3:nth-child(3)").innerHTML = TEXT[lang].fs;
    //document.querySelector("#setters h3:nth-child(5)").remove();
    //document.querySelector("#setters h3:nth-child(7)").innerHTML = TEXT[lang].mt;
    //document.querySelector("#setters h3:nth-child(9)").innerHTML = TEXT[lang].trs;
    //document.querySelector("#setters h3:nth-child(11)").innerHTML = TEXT[lang].ctr;

    document.addEventListener("loadingProgress", e => {
        let progression = (<CustomEvent>e).detail;
        document.querySelector("#loading .text").innerHTML = progression + "%"; // on affiche la progression du chargement en %
        document.getElementById("bar").style.width = progression + "%"; // on met à jour la progressBar 
    });

    document.addEventListener("loadingComplete", () => {
        document.getElementById("titre").remove(); // BabylonJS logo
        document.getElementById("loading").remove(); // BabylonJS logo
        document.getElementById("visite").remove(); // BabylonJS logo
        document.getElementById("menu").classList.toggle("hiddenMenu"); // On affiche le menu
        document.getElementById("date-container").classList.toggle("hiddenDateContainer");
        if (window.innerWidth > 600) {
            document.getElementById("infos").classList.remove("hiddenInfos");
            document.getElementById("setters").classList.remove("hiddenSetters");
        }
        document.getElementById("toolbar").style.display = "block"; /// On affiche la toolbar
        canvas.style.opacity = "1"; /// On affiche le canvas 
    });

    document.addEventListener("targetChange", e => {
        let data: AstreData = (<CustomEvent>e).detail;
        document.getElementById("name").innerHTML = data.id; // le nom
        document.getElementById("diameter").innerHTML = intFormat(isDefined(data.realdiameter) ? data.realdiameter : data.diametre * system.diametreConversionFactor) + "km"; // le diamètre
        document.getElementById("distance").innerHTML = intFormat(isDefined(data.realdistance) ? data.realdistance : data.distance * system.distanceConversionFactor) + "km"; // la distance
        document.getElementById("bio").innerHTML = data.description.replace(/\./g, "<span class='point'>.</span>"); // la description (la police utilisée a pas de point mdr)
    });

    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("tick", () => document.getElementById("fps").innerHTML = Math.round(system.engine.getFps()) + " FPS"); // Affichage des FPS

    //#region Camera Menu

    document.getElementById("plan").addEventListener("click", () => system.switchTo(camAstras)); // Swicth sur la caméra planétaire
    document.getElementById("pland").addEventListener("click", () => system.switchTo(camAstrasd)); // Switch sur la caméra planétaire anaglyphe

    //#endregion

    //#region QuickAction Bar

    document.getElementById("tscreen").addEventListener("click", () => system.takeScreenshot()); // Screenshot avec la caméra active
    document.getElementById("tfxaa").addEventListener("click", () => system.toggleFXAA()); // Toggle FXAA
    document.getElementById("tgodrays").addEventListener("click", () => system.toggleGodrays()); // Toggle Godrays
    document.getElementById("tlabel").addEventListener("click", () => system.toggleLabels()); // Toggle Labels
    document.getElementById("tzoom").addEventListener("click", () => system.zooming = true);
    document.getElementById("tsound").addEventListener("click", () => system.toggleSound()); // Toggle sound

    //#endregion

    //#region Toggle events

    document.addEventListener("toggleGodrays", () => {
        if (!system.areGodraysEnabled) {
            document.getElementById("tgodrays").setAttribute("title", TEXT[lang].eg);
            document.getElementById("tgodrays").setAttribute("src", "../../toolbar/nogodrays.png");
        } else {
            document.getElementById("tgodrays").setAttribute("title", TEXT[lang].dg);
            document.getElementById("tgodrays").setAttribute("src", "../../toolbar/godrays.png");
        }
    });
    document.addEventListener("toggleLabels", () => {
        if (system.areLabelsEnabled) {
            document.getElementById("tlabel").setAttribute("src", "../../toolbar/noname.png");
            document.getElementById("tlabel").setAttribute("title", TEXT[lang].el);
        } else {
            document.getElementById("tlabel").setAttribute("src", "../../toolbar/name.png");
            document.getElementById("tlabel").setAttribute("title", TEXT[lang].dl);
        }
    });
    document.addEventListener("toggleSound", () => {
        if (system.audio.volume == 1) {
            document.getElementById("tsound").setAttribute("src", "../../toolbar/nomute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].mute);
        } else {
            document.getElementById("tsound").setAttribute("src", "../../toolbar/mute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].nomute);
        }
    });
    document.addEventListener("toggleFXAA", () => {
        if (system.pipeline.samples > 1) {
            document.getElementById("tfxaa").setAttribute("src", "../../toolbar/antialiasing.png");
            document.getElementById("tfxaa").setAttribute("title", TEXT[lang].dfxaa);
        } else {
            document.getElementById("tfxaa").setAttribute("src", "../../toolbar/noantialiasing.png");
            document.getElementById("tfxaa").setAttribute("title", TEXT[lang].efxaa);
        }
    });

    //#endregion

    //#region Fullscreen Menu

    document.getElementById("all").addEventListener("click", () => system.canvas.requestFullscreen()); /// Fullscreen sans interface

    document.getElementById("not-all").addEventListener("click", () => { /// Fullscreen avec interface
        document.querySelector("body").requestFullscreen();
        document.getElementById("not-all").style.display = "none";
        document.getElementById("full-exit").style.display = "block";
    });

    document.getElementById("full-exit").addEventListener("click", () => { /// Exit Fullscreen
        document.getElementById("not-all").style.display = "block";
        document.getElementById("full-exit").style.display = "none";
        document.exitFullscreen();
    });

    document.getElementById("settings").addEventListener("click", () => document.getElementById("setters").classList.toggle("hiddenSetters"));
    document.getElementById("binfos").addEventListener("click", () => document.getElementById("infos").classList.toggle("hiddenInfos"));

    //#endregion

    //#region Panneau d'informations

    document.getElementById("previous").addEventListener("click", () => { // si click sur le bouton astre précédent
        system.goTo(system.astres[mod(system.currentTarget.index - 1, system.astres.length)]);
        system.targeting = false;
    });

    document.getElementById("next").addEventListener("click", () => { // si click sur le bouton astre suivant
        system.goTo(system.astres[mod(system.currentTarget.index + 1, system.astres.length)]);
        system.targeting = false;
    });

    //#endregion

    //#region Sliders

    /// Slider gérant la précision du zoom de la roulette de la caméra planétaire
    new Slider("preci", document.getElementById("precision"), 1, 50, system.precisionFactor, (val: number) => {
        system.precisionFactor = val;
    });

    /// Slider gérant la sensibilité de la souris des caméras     
    new Slider("cameraSensibility", document.getElementById("sensifree"), 1, 20, 5, (val: number) => {
        for (let camera of system.targetCameras) {
            camera.angularSensibilityX = 10000 / val;
            camera.angularSensibilityY = 10000 / val;
        }
        for (let camera of system.freeCameras) camera.angularSensibility = 10000 / val;
    });

    /// Slider gérant la vitesse du temps 
    new Slider("timeSpeed", document.getElementById("time"), 0, 100, 1, (val: number) => {
        system.timeUnit = val ** system.powerTime * system.timeSpeedFactor;
    });

    /// Slider gérant les vitesses de voyage astre à astre  
    new Slider("transitionSpeed", document.getElementById("transispeed"), 1, 20, system.transitionSpeedFactor * 10, (val: number) => {
        system.transitionSpeedFactor = val / 10;
    });

    /// Slider gérant le contraste des Textures   
    new Slider("contrast", document.getElementById("contrast"), 0, 30, system.pipeline.imageProcessing.contrast * 10, (val: number) => {
        system.pipeline.imageProcessing.contrast = val / 10;
    });

    //#endregion

    //#endregion

    return system;
}