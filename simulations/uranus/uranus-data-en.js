const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 10000;

const firstTarget = "Uranus";

const diametreFormule = 1 / (scale / 2000 * 51000);
const distanceFormule = 1 / (scale / 2000 * 51000);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Sun",
        icon: "Soleil.png",
        diametre: 2000 * 1391400 / 22 / 140000 * scale,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
        textureAlpha: false,
        positionDebut: 0,
        godrays: true,
        isPickable: false,
        angularOrbit: 2.4845,
        angularSelf: 26.73,
        coeffrotation: 0,
        annee: 1000000000000 * 365.25,
        satellites: 62,
        rotation: "10&nbsp;heures&nbsp;14&nbsp;minutes",
        revolution: "29&nbsp;ans&nbsp;167&nbsp;jours",
        description: ""
    },
    {
        name: "Uranus",
        icon: "Uranus.png",
        diametre: 2000 * 51000 / 51000 * scale,
        distance: 2000 * 2869000000 / 750 / 51000 * scale,
        realdistance: 2869000000,
        texture: "uranus.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: getRandom(0, 1000),
        atm: {
            opacity: 0.4,
            texture: "black.png"
        },
        angularSelf: 97.8,
        angularOrbit: 0.7725,
        rings: {
            texture: "uranus_rings.png",
            size: 3900,
            alpha: 0.7
        },
        coeffrotation: 1.3914728682,
        annee: 84 * 365.25 + 7,
        satellites: 5,
        rotation: "17&nbsp;hours&nbsp;12&nbsp;minutes",
        revolution: "84&nbsp;years&nbsp;7&nbsp;days",
        description: "Uranus is the last but one planet of our solar system<span class='point'>.</span> It has an axial tilt of about 90°, which gives the impression it is rolling on its own orbit<span class='point'>.</span>"
    },
    {
        name: "Miranda",
        icon: "Miranda.png",
        diametre: 2000 * 480 / 51000 * scale,
        distance: 2000 * 129872 / 51000 * scale,
        realdistance: 129872,
        texture: "miranda.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Uranus",
        angularOrbit: 97.8 + 4.338,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.41,
        satellites: 0,
        rotation: "1,41 days&nbsp;(synchronous)",
        revolution: "1,41&nbsp;days&nbsp;(synchronous)",
        description: "Miranda is Uranus' smallest satellite<span class='point'>.</span> It's also a very low density satellite<span class='point'>.</span>"
    },
    {
        name: "Ariel",
        icon: "Ariel.png",
        diametre: 2000 * 1162 / 51000 * scale,
        distance: 2000 * 190900 / 51000 * scale,
        realdistance: 190900,
        texture: "ariel.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.260,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 2.52,
        satellites: 0,
        rotation: "2,52 days&nbsp;(synchronous)",
        revolution: "2,52&nbsp;days&nbsp;(synchronous)",
        description: "Ariel is Uranus' brightest satellite<span class='point'>.</span> Its core is made of rock and its mantle of ice<span class='point'>.</span>"
    },
    {
        name: "Umbriel",
        icon: "Umbriel.png",
        diametre: 2000 * 1169 / 51000 * scale,
        distance: 2000 * 266300 / 51000 * scale,
        realdistance: 266300,
        texture: "umbriel.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.128,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 4.144,
        satellites: 0,
        rotation: "4,144 days&nbsp;(synchronous)",
        revolution: "4,144&nbsp;days&nbsp;(synchronous)",
        description: "Like Ariel, Titania and Oberon, Umbriel has a rocky core and an icy mantle<span class='point'>.</span> Oberon excepted, Umbriel's surface is the most damaged celestial body of the Uranian system, due to asteroid collisions<span class='point'>.</span>"
    },
    {
        name: "Titania",
        icon: "Titania.png",
        diametre: 2000 * 788 / 51000 * scale,
        distance: 2000 * 436300 / 51000 * scale,
        realdistance: 436300,
        texture: "titania.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.340,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 8.7,
        satellites: 0,
        rotation: "8,7 days&nbsp;(synchronous)",
        revolution: "8,7&nbsp;days&nbsp;(synchronous)",
        description: "Titania is Uranus' biggest satellite<span class='point'>.</span> It probably has a very thin atmosphere made of CO2<span class='point'>.</span>"
    },
    {
        name: "Oberon",
        icon: "Oberon.png",
        diametre: 2000 * 761 / 51000 * scale,
        distance: 2000 * 583000 / 51000 * scale,
        realdistance: 583519,
        texture: "oberon.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.058,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 13.46,
        satellites: 0,
        rotation: "13,46 days&nbsp;(synchronous)",
        revolution: "13,46&nbsp;days&nbsp;(synchronous)",
        description: "Oberon is Uranus' furthest satellite<span class='point'>.</span> It is also the most damaged one, with the hugest amount of impact craters in its surface<span class='point'>.</span>"
    },
];

const belts = [{
    name: "rings",
    yDivergence: 2000 * 30 / 140000 * scale,
    nb: 40000,
    size: 0.5,
    position: {
        nearest: 2000 * 41837 / 51000 * scale,
        farthest: 2000 * 51000 / 51000 * scale,
    },
    parent: "Uranus",
    texture: "diffuse"
}];