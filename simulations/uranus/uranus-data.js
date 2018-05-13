const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 10000;

const firstTarget = "Uranus";

const diametreFormule = 1 / (scale / 2000 * 51000);
const distanceFormule = 1 / (scale / 2000 * 51000);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Soleil",
        icon: "Soleil.png",
        diametre: 2000 * 1391400 / 30 / 140000 * scale,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
        textureAlpha: false,
        positionDebut: 0,
        godrays: true,
        isPickable: false,
        angularOrbit: 2.4845,
        angularSelf: 26.73,
        coeffrevolution: 0.0323,
        coeffrotation: 0,
        annee: 1000000000000 * 365.25,
        satellites: 62,
        rotation: "10&nbsp;heures&nbsp;14&nbsp;minutes",
        revolution: "29&nbsp;ans&nbsp;167&nbsp;jours",
        description: "Saturne est la seconde plus grande planète de notre système solaire<br/>Elle se distingue de toutes les autres par la présence de ses immenses anneaux de roches et de glaces"
    },
    {
        name: "Uranus",
        icon: "Uranus.png",
        diametre: 2000 * 51000 / 51000 * scale,
        distance: 2000 * 2869000000 / 1000 / 51000 * scale,
        realdistance: 2869000000,
        texture: "uranus.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: getRandom(0, 1000),
        atm: {
            opacity: .4,
            texture: "black.png"
        },
        angularSelf: 97.8,
        angularOrbit: 0.7725,
        rings: {
            texture: "uranus_rings.png",
            size: 3900 * scale,
            alpha: 0.7
        },
        coeffrevolution: 0.228,
        coeffrotation: 1.3914728682,
        annee: 84 * 365.25 + 7,
        satellites: 5,
        rotation: "17&nbsp;heures&nbsp;12&nbsp;minutes",
        revolution: "84&nbsp;ans&nbsp;7&nbsp;jours",
        description: "Uranus est l'avant dernière planète de notre sytème solaire<span class='point'>.</span> Sa particularité est son axe de rotation, qui donne l'impression que Uranus de rouler sur son orbite<span class='point'>.</span> Ses anneaux sont donc inclinés de la même manière<span class='point'>.</span>"
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
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 1.41,
        satellites: 0,
        rotation: "1,41 jours&nbsp;(synchrone)",
        revolution: "1,41&nbsp;jours&nbsp;(synchrone)",
        description: "Satellite d'Uranus ayant la particularité de posséder un plan orbital perpendiculaire au plan du système solaire<span class='point'>.</span> Miranda est le satellite le plus petit et le plus proche d'Uranus<span class='point'>.</span>"
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
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 2.52,
        satellites: 0,
        rotation: "2,52 jours&nbsp;(synchrone)",
        revolution: "2,52&nbsp;jours&nbsp;(synchrone)",
        description: "Satellite d'Uranus ayant la particularité de posséder un plan orbital perpendiculaire au plan du système solaire<span class='point'>.</span> Ariel est la plus brillante des lunes d'Uranus<span class='point'>.</span>"
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
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 4.144,
        satellites: 0,
        rotation: "4,144 jours&nbsp;(synchrone)",
        revolution: "4,144&nbsp;jours&nbsp;(synchrone)",
        description: "Satellite d'Uranus ayant la particularité de posséder un plan orbital perpendiculaire au plan du système solaire, de plus, Umbriel possède un noyau rocheux<span class='point'>.</span>"
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
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 8.7,
        satellites: 0,
        rotation: "8,7 jours&nbsp;(synchrone)",
        revolution: "8,7&nbsp;jours&nbsp;(synchrone)",
        description: "Satellite d'Uranus ayant la particularité de posséder un plan orbital perpendiculaire au plan du système solaire<span class='point'>.</span> Titania est d'ailleurs le satellite le plus grand d'Uranus<span class='point'>.</span>"
    },
    {
        name: "Obéron",
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
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 13.46,
        satellites: 0,
        rotation: "13,46 jours&nbsp;(synchrone)",
        revolution: "13,46&nbsp;jours&nbsp;(synchrone)",
        description: "Satellite d'Uranus ayant la particularité de posséder un plan orbital perpendiculaire au plan du système solaire<span class='point'>.</span> Obéron est le satellite le plus éloigné d'Uranus<span class='point'>.</span>"
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