const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 10000;

const firstTarget = "Mars";

const diametreFormule = 1 / (6794 / 256);
const distanceFormule = 1 / 2280;

const freeSpeedCoeff = .05;

const beginNavIndex = 1;

const astres = [{
        name: "Sun",
        icon: "Soleil.png",
        diametre: 700,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
        positionDebut: Math.random() * 10000,
        godrays: true,
        isPickable: false,
        angularOrbit: 0,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1,
        satellites: 0,
        rotation: "",
        revolution: "",
        description: ""
    },
    {
        name: "Mars",
        icon: "Mars-life.png",
        diametre: 256,
        distance: 100000,
        texture: "mars2.jpg",
        textureType: "diffuse",
        specular: "mars2_specular.png",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .4,
            texture: "clouds4.jpg"
        },
        angularOrbit: 1.8506,
        angularSelf: 25.19,
        coeffrotation: 0.972899729,
        annee: 686,
        satellites: 2,
        rotation: "24&nbsp;hours&nbsp;36&nbsp;minutes",
        revolution: "686&nbsp;days",
        description: "Also called \"The red planet\", Mars is the last telluric planet of our solar system<span class='point'>.</span> Mars has almost completely lost its atmosphere because of the lack of magnetic field, but scientists think there was water and perhaps even life on it<span class='point'>.</span>"
    },
];

const belts = [];