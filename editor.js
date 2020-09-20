let currentSelector;

document.getElementById("iconPicker").addEventListener("blur", () => {
    document.getElementById("iconPicker").classList.add("hiddenPicker");
});

for (let elm of document.querySelectorAll("#iconPicker .icon")) {
    elm.addEventListener("click", () => {
        document.getElementById("iconPicker").classList.add("hiddenPicker");
        currentSelector.src = elm.src;
    });
}

for (let elm of document.querySelectorAll("#surfacePicker .surface")) {
    elm.addEventListener("click", () => {
        document.getElementById("surfacePicker").classList.add("hiddenPicker");
        currentSelector.src = elm.src;
    });
}

for (let elm of document.querySelectorAll("#maskPicker .mask")) {
    elm.addEventListener("click", () => {
        document.getElementById("maskPicker").classList.add("hiddenPicker");
        currentSelector.src = elm.src;
    });
}

function addAstre() {
    let uniqueID = Date.now();

    let systemContainer = document.createElement("div");
    systemContainer.classList.add("systemContainer");

    let astreContainer = document.createElement("div");
    astreContainer.classList.add("astreContainer");

    let titleHeader = document.createElement("h3");
    titleHeader.innerHTML = "Nouvel astre";
    astreContainer.appendChild(titleHeader);

    let nameInputContainer = document.createElement("div");
    nameInputContainer.classList.add("nameInput");
    nameInputContainer.innerHTML += "<p>Nom : </p>";
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("value", "Nouvel astre");
    nameInput.addEventListener("input", () => titleHeader.innerHTML = nameInput.value);
    nameInputContainer.appendChild(nameInput);
    astreContainer.appendChild(nameInputContainer);

    let iconInputContainer = document.createElement("div");
    iconInputContainer.classList.add("iconInput");
    iconInputContainer.innerHTML += "<p>Icône : </p>";
    let iconInput = document.createElement("img");
    iconInput.classList.add("iconInput");
    iconInput.setAttribute("height", "50");
    iconInput.setAttribute("src", "data/dotdotdot.png");
    iconInput.addEventListener("click", e => {
        currentSelector = iconInput;
        let picker = document.getElementById("iconPicker");
        picker.classList.remove("hiddenPicker");
        picker.style.top = e.target.getBoundingClientRect().top + 50 + "px";
        picker.style.left = e.target.offsetLeft + "px";
    });
    iconInputContainer.appendChild(iconInput);
    astreContainer.appendChild(iconInputContainer);

    let surfaceInputContainer = document.createElement("div");
    surfaceInputContainer.classList.add("surfaceInput");
    surfaceInputContainer.innerHTML += "<p>Texture : </p>";
    let surfaceInput = document.createElement("img");
    surfaceInput.classList.add("surfaceInput");
    surfaceInput.setAttribute("height", "50");
    surfaceInput.setAttribute("src", "data/dotdotdot.png");
    surfaceInput.addEventListener("click", e => {
        currentSelector = surfaceInput;
        let picker = document.getElementById("surfacePicker");
        picker.classList.remove("hiddenPicker");
        picker.style.top = e.target.getBoundingClientRect().top + 50 + "px";
        picker.style.left = e.target.offsetLeft + "px";
    });
    surfaceInputContainer.appendChild(surfaceInput);
    astreContainer.appendChild(surfaceInputContainer);

    let diameterInput = document.createElement("div");
    diameterInput.classList.add("diameterInput");
    diameterInput.innerHTML = `<p>Diamètre : </p><input type="text" placeholder="Diamètre..." /><p>unités de diamètre</p>`;
    astreContainer.appendChild(diameterInput);

    let distanceInput = document.createElement("div");
    distanceInput.classList.add("distanceInput");
    distanceInput.innerHTML = `<p>Distance : </p><input type="text" placeholder="Distance... " /><p>unités de distance</p>`;
    astreContainer.appendChild(distanceInput);

    let dayInput = document.createElement("div");
    dayInput.classList.add("dayInput");
    dayInput.innerHTML = `<p>Durée d'une journée : </p><input type="text" value="1" /><p>jours terrestres</p>`;
    astreContainer.appendChild(dayInput);

    let yearInput = document.createElement("div");
    yearInput.classList.add("yearInput");
    yearInput.innerHTML = `<p>Durée d'une année : </p><input type="text" value="1" /><p>jours terrestres</p>`;
    astreContainer.appendChild(yearInput);

    let parentInput = document.createElement("div");
    parentInput.classList.add("parentInput");
    parentInput.innerHTML = `<p>Parent : </p>
                    <select class="parentSelect">
                        <option>Aucun</option>
                        <option>Test1</option>
                        <option>Test2</option>
                    </select>`;
    astreContainer.appendChild(parentInput);

    let orbitalInclinationInput = document.createElement("div");
    orbitalInclinationInput.classList.add("orbitalInclinationInput");
    orbitalInclinationInput.innerHTML = `<p>Inclinaison de l'orbite : </p><input type="text" value="0" /><p>degrés</p>`;
    astreContainer.appendChild(orbitalInclinationInput);

    let selfInclinationInput = document.createElement("div");
    selfInclinationInput.classList.add("selfInclinationInput");
    selfInclinationInput.innerHTML = `<p>Inclinaison de l'axe de rotation : </p><input type="text" value="0" /><p>degrés</p>`;
    astreContainer.appendChild(selfInclinationInput);

    let initialOrbitalPositionInput = document.createElement("div");
    initialOrbitalPositionInput.classList.add("initialOrbitalPositionInput");
    initialOrbitalPositionInput.innerHTML = `<p>Position orbitale initiale : </p><input type="text" value="0" /><p>degrés</p>`;
    astreContainer.appendChild(initialOrbitalPositionInput);

    let atmInputContainer = document.createElement("div");
    atmInputContainer.classList.add("atmInput");
    atmInputContainer.innerHTML += "<p>Atmosphère : </p>";
    let atmInput = document.createElement("input");
    atmInput.setAttribute("type", "checkbox");
    atmInput.setAttribute("id", `${uniqueID}AtmCheckbox`);
    atmInput.classList.add("css-checkbox");

    let atmLabel = document.createElement("label");
    atmLabel.setAttribute("for", `${uniqueID}AtmCheckbox`);
    atmLabel.classList.add("css-label");
    atmInputContainer.appendChild(atmInput);
    atmInputContainer.appendChild(atmLabel);
    astreContainer.appendChild(atmInputContainer);

    let atmContainer = document.createElement("div");
    atmContainer.classList.add("atmContainer");
    atmContainer.innerHTML = `<div><p>Opacité : </p><input type="text" value="1" /></div>`;
    let maskInputContainer = document.createElement("div");
    maskInputContainer.innerHTML += "<p>Masque : </p>";
    let maskInput = document.createElement("img");
    maskInput.setAttribute("height", "50");
    maskInput.setAttribute("src", "data/dotdotdot.png");
    maskInput.addEventListener("click", e => {
        currentSelector = maskInput;
        let picker = document.getElementById("maskPicker");
        picker.classList.remove("hiddenPicker");
        picker.style.top = e.target.getBoundingClientRect().top + 50 + "px";
        picker.style.left = e.target.offsetLeft + "px";
    });
    maskInputContainer.appendChild(maskInput);
    atmContainer.appendChild(maskInputContainer);
    astreContainer.appendChild(atmContainer);

    atmInput.addEventListener("click", () => atmContainer.classList.toggle("visible"));

    let ringInputContainer = document.createElement("div");
    ringInputContainer.classList.add("ringInput");
    ringInputContainer.innerHTML += "<p>Anneaux : </p>";
    let ringInput = document.createElement("input");
    ringInput.setAttribute("type", "checkbox");
    ringInput.setAttribute("id", `${uniqueID}RingCheckbox`);
    ringInput.classList.add("css-checkbox");
    let ringLabel = document.createElement("label");
    ringLabel.setAttribute("for", `${uniqueID}RingCheckbox`);
    ringLabel.classList.add("css-label");
    ringInputContainer.appendChild(ringInput);
    ringInputContainer.appendChild(ringLabel);
    astreContainer.appendChild(ringInputContainer);

    let ringContainer = document.createElement("div");
    ringContainer.classList.add("ringContainer");
    ringContainer.innerHTML = `<div><p>Opacité : </p><input type="text" placeholder="Opacité... " /></div>`;
    let ringTextureContainer = document.createElement("div");
    ringTextureContainer.innerHTML += "<p>Texture : </p>";
    let ringTextureInput = document.createElement("img");
    ringTextureInput.setAttribute("height", "50");
    ringTextureInput.setAttribute("src", "data/dotdotdot.png");
    ringTextureInput.addEventListener("click", e => {
        currentSelector = ringTextureInput;
        let picker = document.getElementById("ringPicker");
        picker.classList.remove("hiddenPicker");
        picker.style.top = e.target.getBoundingClientRect().top + 50 + "px";
        picker.style.left = e.target.offsetLeft + "px";
    });
    ringTextureContainer.appendChild(ringTextureInput);
    ringContainer.appendChild(ringTextureContainer);
    ringContainer.innerHTML += `<div><p>Diamètre : </p><input type="text" placeholder="Diamètre..." /><p>en unités de diamètre</p></div>`
    astreContainer.appendChild(ringContainer);

    ringInput.addEventListener("click", () => ringContainer.classList.toggle("visible"));

    let isStarInput = document.createElement("div");
    isStarInput.classList.add("isStarInput");
    isStarInput.innerHTML = `<p>Est une étoile : </p><input type="checkbox" id="isStar" class="css-checkbox" /><label for="isStar" class="css-label"></label>`;
    astreContainer.appendChild(isStarInput);

    let isPulsarInput = document.createElement("div");
    isPulsarInput.classList.add("isPulsarInput");
    isPulsarInput.innerHTML = `<p>Est un pulsar : </p><input type="checkbox" id="isPulsar" class="css-checkbox" /><label for="isPulsar" class="css-label"></label>`;
    astreContainer.appendChild(isPulsarInput);

    let descriptionInput = document.createElement("div");
    descriptionInput.classList.add("descriptionInput");
    descriptionInput.innerHTML = "<p>Description : </p><br/><textarea></textarea>";
    astreContainer.appendChild(descriptionInput);

    systemContainer.appendChild(astreContainer);

    document.getElementById("astraSettings").appendChild(systemContainer);
}

document.getElementById("addButton").addEventListener("click", addAstre);