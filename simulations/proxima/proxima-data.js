const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 10000;

const firstTarget = "Proxima B";

const diametreFormule = 1 / (6794 / 256);
const distanceFormule = 1 / 2280;

const freeSpeedCoeff = .05;

const beginNavIndex = 1;

const astres = [{
        name: "",
        icon: "Antares.png",
        diametre: 0.14 * 109,
        distance: 0,
        texture: "antares.png",
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
        name: "Proxima B",
        icon: "proximab.png",
        diametre: 1.5,
        distance: 588,
        texture: "proximab.png",
        textureType: "diffuse",
        //specular: "mars2_specular.png",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .4,
            texture: "clouds4.jpg"
        },
        angularOrbit: 0,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 11.2,
        satellites: 0,
        rotation: "24&nbsp;heures&nbsp;36&nbsp;minutes",
        revolution: "686&nbsp;jours",
        description: "Surnommée \"La Planète Rouge\", Mars est la dernière planète tellurique de notre système solaire<span class='point'>.</span> Mars a presque entièrement perdu son atmosphère du fait de l'absence de champ magnétique, mais les scientifiques pensent que Mars a pu abriter de l'eau liquide et donc potentiellement de la vie à une époque lointaine<span class='point'>.</span>"
    },
];

const belts = [];