import { createHyperspace } from "./hyperspace";
import { Slider } from "../components/tools";
export function initHyperspace() {
    let canvas = document.getElementById("renderCanvas");
    let hyperspace = createHyperspace(canvas);
    document.addEventListener("loadingProgress", e => {
        let progression = e.detail;
        document.querySelector("#loading .text").innerHTML = progression + "%"; // on affiche la progression du chargement en %
        document.getElementById("bar").style.width = progression + "%"; // on met à jour la progressBar 
    });
    document.addEventListener("loadingComplete", () => {
        document.getElementById("renderCanvas").style.opacity = "1";
        document.getElementById("menu").classList.remove("hiddenMenu");
        document.getElementById("setters").classList.remove("hiddenSetters");
    });
    document.addEventListener("update", () => {
        document.getElementById("fps").innerHTML = Math.round(hyperspace.engine.getFps()) + " FPS";
    });
    document.getElementById("free").addEventListener("click", () => hyperspace.scene.activeCamera = hyperspace.camera1);
    document.getElementById("freed").addEventListener("click", () => hyperspace.scene.activeCamera = hyperspace.camera2);
    document.getElementById("all").addEventListener("click", () => hyperspace.canvas.requestFullscreen()); /// Fullscreen sans interface
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
    document.getElementById("engage").addEventListener("click", () => hyperspace.toggleFTL());
    new Slider("speed", document.getElementById("speed"), 1, 20, hyperspace.speedFactor, (val) => {
        hyperspace.speedFactor = val;
    });
    let fovSlider = new Slider("fov", document.getElementById("fov"), 150, 314, hyperspace.fovMax * 100, (val) => {
        hyperspace.fovMax = val / 100;
    });
    new Slider("trans", document.getElementById("trans"), 1, 20, hyperspace.acceleration * 10, (val) => {
        hyperspace.acceleration = val / 10;
    });
    document.getElementById("tscreen").addEventListener("click", () => hyperspace.takeScreenShot());
    document.onkeydown = e => {
        if (e.keyCode == 72) { /// H
            e.preventDefault();
            hyperspace.toggleFTL();
        }
        if (e.keyCode == 75) { /// K
            e.preventDefault();
            document.getElementById("fps").classList.toggle("hiddenFPS");
        }
        if (e.keyCode == 83) { /// S
            e.preventDefault();
            hyperspace.takeScreenShot();
        }
        if (e.keyCode == 107 || e.keyCode == 109)
            e.preventDefault(); /// + || - (utile si max ou min atteint)
        if (e.keyCode === 107 && hyperspace.fovMax < 3.14) { /// +
            fovSlider.increment();
            hyperspace.fovMax = fovSlider.getValue() / 100;
        }
        if (e.keyCode === 109 && hyperspace.fovMax > 1.5) { /// -
            fovSlider.decrement();
            hyperspace.fovMax = fovSlider.getValue() / 100;
        }
    };
}
