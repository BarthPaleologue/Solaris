const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 10000;

const firstTarget = "Mars";

const diametreFormule = 1 / (6794 / 256);
const distanceFormule = 1 / 2280;

const freeSpeedCoeff = .05;

const beginNavIndex = 1;

const astres = [{
        name: "Soleil",
        icon: "Soleil.png",
        diametre: 700,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
        positionDebut: getRandom(0, 1000),
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
        rotation: "24&nbsp;heures&nbsp;36&nbsp;minutes",
        revolution: "686&nbsp;jours",
        description: "Surnommée \"La Planète Rouge\", Mars est la dernière planète tellurique de notre système solaire<span class='point'>.</span> Mars a presque entièrement perdu son atmosphère du fait de l'absence de champ magnétique, mais les scientifiques pensent que Mars a pu abriter de l'eau liquide et donc potentiellement de la vie à une époque lointaine<span class='point'>.</span>"
    },
];

const belts = [];