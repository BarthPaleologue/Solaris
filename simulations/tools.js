/// <reference path="../ts/babylon3.d.ts" />
export let mobile = /iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent);
export function setupAudio(path, autoplay = true, loop = true) {
    let audio = new Audio(path);
    audio.autoplay = autoplay;
    audio.loop = loop;
    audio.load();
    return audio;
}
export function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
export function rand(min, max) {
    return Math.random() * (max - min) + min;
}
export function intFormat(number) {
    return new Intl.NumberFormat().format(Math.round(number));
}
export function randBool(x = 2) {
    return randInt(1, x) == 1;
}
export function probability(p = 50) {
    return randInt(0, 100) <= p;
}
export function randFromSeed(seed) {
    return ((seed * 9301 + 49297) % 233280) / 233280;
}
export function isDefined(variable) {
    return variable != undefined;
}
export function toRadians(degrees) {
    return (degrees / 180) * Math.PI;
}
export function mod(n, m) {
    return ((n % m) + m) % m;
}
export function loadJSON(filePath) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType("application/json");
    }
    xmlhttp.send();
    if (xmlhttp.status == 200)
        return JSON.parse(xmlhttp.responseText);
    else
        return JSON.parse("{'status':'Error while loading json file'}");
}
export class Slider {
    constructor(_id, _parent, _min, _max, _baseValue, _slide = (val) => { }) {
        this.id = _id;
        this.parent = _parent;
        this.min = _min;
        this.max = _max;
        this.baseValue = _baseValue;
        this.slide = _slide;
        let container = document.createElement("div");
        container.setAttribute("id", `${this.id}SliderContainer`);
        container.setAttribute("class", "range-slider");
        this.container = container;
        let handle = document.createElement("span");
        handle.setAttribute("id", `${this.id}SliderHandle`);
        handle.setAttribute("class", "rs-label");
        handle.innerHTML = String(this.baseValue);
        this.handle = handle;
        container.appendChild(handle);
        let slider = document.createElement("input");
        slider.setAttribute("id", `${this.id}Slider`);
        slider.setAttribute("class", "rs-range");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", String(this.min));
        slider.setAttribute("max", String(this.max));
        slider.setAttribute("value", String(this.baseValue));
        this.slider = slider;
        container.appendChild(slider);
        this.parent.appendChild(container);
        slider.addEventListener("input", () => this.update());
        this.update();
    }
    increment() {
        this.slider.value = String(this.getValue() + 1);
        this.update();
    }
    decrement() {
        this.slider.value = String(this.getValue() - 1);
        this.update();
    }
    getValue() {
        return parseInt(this.slider.value);
    }
    setValue(value) {
        this.slider.value = String(value);
        this.update();
    }
    update() {
        this.handle.innerHTML = this.slider.value;
        let handlePosition = ((this.getValue() - this.min) / (this.max - this.min));
        this.handle.style.marginLeft = handlePosition * (this.slider.offsetWidth - 50) - this.handle.offsetWidth / 2 + "px";
        this.slide(this.slider.value);
    }
    remove() {
        this.container.remove();
    }
}
