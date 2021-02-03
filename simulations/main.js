import { Solaris } from "./solaris.js";
import { Slider, mod, intFormat, isDefined, loadJSON } from "./tools.js";
export function initSolaris(pathToData, quality = "high") {
    let canvas = document.getElementById("renderCanvas");
    let engine = new BABYLON.Engine(canvas, true);
    window.addEventListener("resize", () => engine.resize());
    let system = new Solaris(engine, quality);
    system.loadConfiguration(pathToData);
    system.initScene();
    system.initAssetsManager(); // Va contenir tous les matériaux
    system.initUI(); // gestion des labels des astres
    system.initAudio("../data/sounds/ambient.mp3"); // Musique d'ambiance
    let camAstras = system.addCamera("orbitalCamera", "target");
    let camAstrasd = system.addCamera("orbitalCameraAnaglyph", "targetAnaglyph");
    let camfree = system.addCamera("freeCamera", "free");
    let camfreed = system.addCamera("freeCameraAnaglyph", "freeAnaglyph");
    let camfreeVR = system.addCamera("freeCameraVR", "freeVR");
    system.switchTo(camAstras); // camAstras est la caméra active à l'initialisation
    system.initPipeline();
    system.initSkybox();
    system.initKeyboard();
    system.initAstres();
    system.initBelts();
    system.start();
    //#region Interactive DOM
    const lang = document.documentElement.lang;
    const TEXT = loadJSON("../data/lang/language.support.json");
    document.querySelector("#setters h2").innerHTML = TEXT[lang].st;
    document.querySelector("#setters h3:nth-child(1)").innerHTML = TEXT[lang].wp;
    document.querySelector("#setters h3:nth-child(3)").innerHTML = TEXT[lang].fs;
    document.querySelector("#setters h3:nth-child(5)").innerHTML = TEXT[lang].s;
    document.querySelector("#setters h3:nth-child(7)").innerHTML = TEXT[lang].mt;
    document.querySelector("#setters h3:nth-child(9)").innerHTML = TEXT[lang].trs;
    document.querySelector("#setters h3:nth-child(11)").innerHTML = TEXT[lang].ctr;
    document.addEventListener("loadingProgress", e => {
        let progression = e.detail;
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
        let data = e.detail;
        document.getElementById("name").innerHTML = data.id; // le nom
        document.getElementById("diameter").innerHTML = intFormat(isDefined(data.realdiameter) ? data.realdiameter : data.diametre * system.diametreConversionFactor) + "km"; // le diamètre
        document.getElementById("distance").innerHTML = intFormat(isDefined(data.realdistance) ? data.realdistance : data.distance * system.distanceConversionFactor) + "km"; // la distance
        document.getElementById("parent").innerHTML = !isDefined(data.parentId) ? TEXT[lang].bt : TEXT[lang].nt + data.parentId; // si pas d'astre parent
        document.getElementById("satellites").innerHTML = data.satellites; // les satellites
        document.getElementById("rotation").innerHTML = data.rotation.replace(/\./g, "<span class='point'>.</span>"); // la durée d'une rotation
        document.getElementById("revolution").innerHTML = data.revolution.replace(/\./g, "<span class='point'>.</span>"); // la durée d'une révolution
        document.getElementById("bio").innerHTML = data.description.replace(/\./g, "<span class='point'>.</span>"); // la description (la police utilisée a pas de point mdr)
    });
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("tick", () => document.getElementById("fps").innerHTML = Math.round(system.engine.getFps()) + " FPS"); // Affichage des FPS
    //#region Camera Menu
    document.getElementById("free").addEventListener("click", () => system.switchTo(camfree)); // Switch sur la caméra libre
    document.getElementById("freed").addEventListener("click", () => system.switchTo(camfreed)); // Switch sur la caméra libre anaglyphe
    document.getElementById("freevr").addEventListener("click", () => system.switchTo(camfreeVR)); // Switch sur la caméra libre VR
    document.getElementById("plan").addEventListener("click", () => system.switchTo(camAstras)); // Swicth sur la caméra planétaire
    document.getElementById("pland").addEventListener("click", () => system.switchTo(camAstrasd)); // Switch sur la caméra planétaire anaglyphe
    //#endregion
    //#region QuickAction Bar
    document.getElementById("tscreen").addEventListener("click", () => system.takeScreenshot()); // Screenshot avec la caméra active
    document.getElementById("torbit").addEventListener("click", () => system.toggleOrbits()); // Toggle Orbits
    document.getElementById("tasteroids").addEventListener("click", () => system.toggleAsteroidBelts()); // Toggle Asteroids
    document.getElementById("tfxaa").addEventListener("click", () => system.toggleFXAA()); // Toggle FXAA
    document.getElementById("tgodrays").addEventListener("click", () => system.toggleGodrays()); // Toggle Godrays
    document.getElementById("tlabel").addEventListener("click", () => system.toggleLabels()); // Toggle Labels
    document.getElementById("tzoom").addEventListener("click", () => system.zooming = true);
    document.getElementById("tsound").addEventListener("click", () => system.toggleSound()); // Toggle sound
    //#endregion
    //#region Toggle events
    document.addEventListener("toggleOrbits", () => {
        if (system.areOrbitsEnabled) {
            document.getElementById("torbit").setAttribute("src", "../../toolbar/hideorbit.png");
            document.getElementById("torbit").setAttribute("title", TEXT[lang].do);
        }
        else {
            document.getElementById("torbit").setAttribute("src", "../../toolbar/showorbit.png");
            document.getElementById("torbit").setAttribute("title", TEXT[lang].eo);
        }
    });
    document.addEventListener("toggleAsteroidBelts", () => {
        if (system.areAsteroidsEnabled) {
            document.getElementById("tasteroids").setAttribute("src", "../../toolbar/hideasteroids.png");
            document.getElementById("tasteroids").setAttribute("title", TEXT[lang].ea);
        }
        else {
            document.getElementById("tasteroids").setAttribute("src", "../../toolbar/asteroids.png");
            document.getElementById("tasteroids").setAttribute("title", TEXT[lang].da);
        }
    });
    document.addEventListener("toggleGodrays", () => {
        if (!system.areGodraysEnabled) {
            document.getElementById("tgodrays").setAttribute("title", TEXT[lang].eg);
            document.getElementById("tgodrays").setAttribute("src", "../../toolbar/nogodrays.png");
        }
        else {
            document.getElementById("tgodrays").setAttribute("title", TEXT[lang].dg);
            document.getElementById("tgodrays").setAttribute("src", "../../toolbar/godrays.png");
        }
    });
    document.addEventListener("toggleLabels", () => {
        if (system.areLabelsEnabled) {
            document.getElementById("tlabel").setAttribute("src", "../../toolbar/noname.png");
            document.getElementById("tlabel").setAttribute("title", TEXT[lang].el);
        }
        else {
            document.getElementById("tlabel").setAttribute("src", "../../toolbar/name.png");
            document.getElementById("tlabel").setAttribute("title", TEXT[lang].dl);
        }
    });
    document.addEventListener("toggleSound", () => {
        if (system.audio.volume == 1) {
            document.getElementById("tsound").setAttribute("src", "../../toolbar/nomute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].mute);
        }
        else {
            document.getElementById("tsound").setAttribute("src", "../../toolbar/mute.png");
            document.getElementById("tsound").setAttribute("title", TEXT[lang].nomute);
        }
    });
    document.addEventListener("toggleFXAA", () => {
        if (system.pipeline.samples > 1) {
            document.getElementById("tfxaa").setAttribute("src", "../../toolbar/antialiasing.png");
            document.getElementById("tfxaa").setAttribute("title", TEXT[lang].dfxaa);
        }
        else {
            document.getElementById("tfxaa").setAttribute("src", "../../toolbar/noantialiasing.png");
            document.getElementById("tfxaa").setAttribute("title", TEXT[lang].efxaa);
        }
    });
    //#endregion
    //#region Fullscreen Menu
    document.getElementById("all").addEventListener("click", () => system.canvas.requestFullscreen()); /// Fullscreen sans interface
    document.getElementById("not-all").addEventListener("click", () => {
        document.querySelector("body").requestFullscreen();
        document.getElementById("not-all").style.display = "none";
        document.getElementById("full-exit").style.display = "block";
    });
    document.getElementById("full-exit").addEventListener("click", () => {
        document.getElementById("not-all").style.display = "block";
        document.getElementById("full-exit").style.display = "none";
        document.exitFullscreen();
    });
    document.getElementById("settings").addEventListener("click", () => document.getElementById("setters").classList.toggle("hiddenSetters"));
    document.getElementById("binfos").addEventListener("click", () => document.getElementById("infos").classList.toggle("hiddenInfos"));
    //#endregion
    //#region Panneau d'informations
    document.getElementById("previous").addEventListener("click", () => {
        system.goTo(system.astres[mod(system.currentTarget.index - 1, system.astres.length)]);
    });
    document.getElementById("next").addEventListener("click", () => {
        system.goTo(system.astres[mod(system.currentTarget.index + 1, system.astres.length)]);
    });
    //#endregion
    //#region Sliders
    /// Slider gérant la précision du zoom de la roulette de la caméra planétaire
    new Slider("preci", document.getElementById("precision"), 1, 50, system.precisionFactor, (val) => {
        system.precisionFactor = val;
    });
    /// Slider gérant la vitesse de la caméra en mode libre 
    new Slider("speed", document.getElementById("speed"), 1, 100, 50, (val) => {
        system.freeCameraSpeed = Math.pow((val * 0.001), 2) * system.distanceScalingFactor;
    });
    /// Slider gérant la sensibilité de la souris des caméras     
    new Slider("cameraSensibility", document.getElementById("sensifree"), 1, 20, 5, (val) => {
        for (let camera of system.targetCameras) {
            camera.angularSensibilityX = 10000 / val;
            camera.angularSensibilityY = 10000 / val;
        }
        for (let camera of system.freeCameras)
            camera.angularSensibility = 10000 / val;
    });
    /// Slider gérant la vitesse du temps 
    let timeSlider = new Slider("timeSpeed", document.getElementById("time"), 0, 100, 1, (val) => {
        system.timeUnit = Math.pow(val, system.powerTime) * system.timeSpeedFactor;
    });
    /// Slider gérant les vitesses de voyage astre à astre  
    new Slider("transitionSpeed", document.getElementById("transispeed"), 1, 20, system.transitionSpeedFactor * 10, (val) => {
        system.transitionSpeedFactor = val / 10;
    });
    /// Slider gérant le contraste des Textures   
    new Slider("contrast", document.getElementById("contrast"), 0, 30, system.pipeline.imageProcessing.contrast * 10, (val) => {
        system.pipeline.imageProcessing.contrast = val / 10;
    });
    document.onkeydown = e => {
        if (e.keyCode == 107 || e.keyCode == 109)
            e.preventDefault(); /// + || - 
        if (e.keyCode == 107 && system.timeUnit < Math.pow(100, system.powerTime) * system.timeSpeedFactor) { /// +
            timeSlider.increment();
            system.timeUnit = Math.pow(timeSlider.getValue(), system.powerTime) * system.timeSpeedFactor;
        }
        if (e.keyCode == 109 && system.timeUnit > 0) { /// -
            timeSlider.decrement();
            system.timeUnit = Math.pow(timeSlider.getValue(), system.powerTime) * system.timeSpeedFactor;
        }
    };
    //#endregion
    //#region Saut temporel
    // Initialisation de la date
    document.getElementById("jour").innerHTML = String(system.currentDay);
    document.getElementById("mois").innerHTML = String(system.currentMonth);
    document.getElementById("year").innerHTML = String(system.currentYear);
    document.addEventListener("dateChange", e => {
        let newDate = e.detail;
        document.getElementById("jour").innerHTML = String(newDate.day);
        document.getElementById("mois").innerHTML = String(newDate.month);
        document.getElementById("year").innerHTML = String(newDate.year);
    });
    document.getElementById("date").addEventListener("click", () => {
        document.getElementById("dateSelectorContainer").classList.toggle("hiddenDateSelector"); // l'interface de voyage temporel s'ouvre
    });
    document.getElementById("closeDateSelector").addEventListener("click", () => {
        document.getElementById("dateSelectorContainer").classList.toggle("hiddenDateSelector"); // l'interface de voyage temporel s'ouvre
    });
    document.getElementById("changeDateButton").addEventListener("click", () => {
        let oldDate = new Date(document.getElementById("date").textContent.replace(/\//g, "-")); // remplace les / par des tirets
        let newDate = new Date(document.getElementById("dateSelector").value);
        document.getElementById("mois").innerHTML = String(newDate.getMonth() + 1);
        document.getElementById("jour").innerHTML = String(newDate.getDate());
        document.getElementById("year").innerHTML = String(newDate.getFullYear());
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let nbDays = (newDate.getTime() - oldDate.getTime()) / oneDay; // calcul la différence temporelle en jours
        system.timeJump(nbDays);
        document.getElementById("dateSelectorContainer").classList.toggle("hiddenDateSelector"); // l'interface de voyage temporel s'ouvre
    });
    //#endregion
    //#endregion
    return system;
}
