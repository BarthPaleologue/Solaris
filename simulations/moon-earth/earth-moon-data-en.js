const scale = 1;

const timeQuotient = 10000;

const distanceCoeff = 1 / 232.54;

const diametreFormule = 1 / (12756 / 100);

const distanceFormule = 1 / (149600000 / 100);

const freeSpeedCoeff = .05;

const firstTarget = "The Earth";

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Sun",
        icon: "Soleil.png",
        diametre: 1090 * scale,
        distance: 0 * scale,
        textureType: "emissive",
        texture: "sun2.jpg",
        positionDebut: Math.random() * 10000,
        godrays: true,
        isPickable: false,
        angularOrbit: 0,
        angularSelf: 7.25,
        coeffrotation: 1 / 27,
        annee: 1000,
        satellites: "Toutes les planètes du système solaire",
        rotation: "27&nbsp;jours",
        revolution: "Négligable",
        description: "Le Soleil est l'étoile de notre système solaire, il se situe en son centre et toutes les planètes orbitent autour de lui"
    },
    {
        name: "The Earth",
        icon: "Terre.png",
        diametre: 100 * scale,
        distance: 50000 * scale,
        realdistance: 149600000,
        textureType: "diffuse",
        texture: "earth.jpg",
        emissive: "night2.jpg",
        specular: "specular.jpg",
        positionDebut: getRandom(0, 1000),
        atm: {
            opacity: 0.4,
            texture: "clouds4.jpg"
        },
        angularOrbit: 0,
        angularSelf: 23.43,
        coeffrevolution: 1,
        coeffrotation: 1,
        annee: 365.25,
        satellites: 1,
        rotation: "23&nbsp;hours&nbsp;56&nbsp;minutes",
        revolution: "365<span class='point'>.</span>25&nbsp;days",
        description: "The Earth is the only planet of the solar system with liquid water on its surface<span class='point'>.</span> It is also the only planet of the solar system which has ever hosted life and an intelligent civilization - as far as we know<span class='point'>.</span>"
    },
    {
        name: "The Moon",
        icon: "Lune.png",
        diametre: 27.3 * scale,
        distance: 3010 * scale,
        realdistance: 384000,
        textureType: "diffuse",
        texture: "moon.jpg",
        positionDebut: getRandom(0, 1000),
        parent: "The Earth",
        angularOrbit: 5.145,
        angularSelf: 6.687,
        coeffrevolution: 0,
        coeffrotation: 0,
        initialRotation: Math.PI,
        annee: 29.5,
        satellites: 0,
        rotation: "29,5&nbsp;days&nbsp;(synchronous)",
        revolution: "29,5&nbsp;days",
        rotation: "29<span class='point'>.</span>5&nbsp;days&nbsp;(synchronous)",
        revolution: "29<span class='point'>.</span>5&nbsp;days&nbsp;(synchronous)",
        description: "The Moon is the only companion of the Earth<span class='point'>.</span> It was formed after the Earth collided with a protoplanet during the solar system's genesis : a part of the debris is said to have formed the Moon<span class='point'>.</span> The Moon is also responsible for the tides on Earth<span class='point'>.</span> Moreover, the Moon's attraction power is slowing down the Earth's rotation speed on itself<span class='point'>.</span> The Moon is the only celestial body Humanity has ever set foot on, except the Earth, of course<span class='point'>.</span>"
    }
];

const belts = [];