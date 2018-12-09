const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 100000;

const firstTarget = "Jupiter";

const diametreFormule = 1 / (scale / 2000 * 120536);
const distanceFormule = 1 / (scale / 2000 * 120536);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Soleil",
        icon: "Soleil.png",
        diametre: 2000 * 1391400 / 10 / 140000 * scale,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
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
        description: "Saturne est la seconde plus grande planète de notre système solaire<br/>Elle se distingue de toutes les autres par la présence de ses immenses anneaux de roches et de glaces"
    },
    {
        name: "Jupiter",
        icon: "Jupiter.png",
        diametre: 2000 * 140000 / 140000 * scale,
        distance: 2000 * 778500000 / 100 / 140000 * scale,
        realdistance: 778300000,
        texture: "jupiter.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .4,
            texture: "black.png"
        },
        rings: {
            texture: "jupiter_rings.png",
            size: 3700 * scale,
            alpha: 0.3
        },
        angularOrbit: 1.304,
        angularSelf: 3.12,
        coeffrotation: 2.4338983051,
        annee: 11 * 365.25 + 314,
        satellites: 69,
        rotation: "9&nbsp;heures&nbsp;30&nbsp;minutes",
        revolution: "11&nbsp;ans&nbsp;314&nbsp;jours",
        description: "Jupiter est la plus grande de toutes les planètes de notre système solaire (11X plus grande que la Terre)<span class='point'>.</span> Il s'agit de la première des planètes gazeuses<br/>Son apparence est dûe à la présence de différents gaz colorés et de vents supersoniques dans son atmosphère<span class='point'>.</span>"
    },
    {
        name: "Io",
        icon: "Io.png",
        diametre: 2000 * 3643 / 140000 * scale,
        distance: 2000 * 421800 / 140000 * scale,
        realdistance: 421800,
        texture: "io.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.036 + 3.12,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.769,
        satellites: 0,
        rotation: "1,769 jours&nbsp;(synchrone)",
        revolution: "1,769&nbsp;jours",
        description: "Io est un des quatre satellites Galiléens (satellites les plus gros de Jupiter)<span class='point'>.</span> Io est également l'astre le plus actif du système solaire avec 400 volcans en activité<span class='point'>.</span> Cette forte activitée est due aux puissantes forces de marées de Jupiter sur Io<span class='point'>.</span>"
    },
    {
        name: "Europe",
        icon: "Europe.png",
        diametre: 2000 * 3121.6 / 140000 * scale,
        distance: 2000 * 671100 / 140000 * scale,
        realdistance: 671100,
        texture: "europe.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.469 + 3.12,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 3.551181,
        satellites: 0,
        rotation: "3,551181 jours&nbsp;(synchrone)",
        revolution: "3,551181&nbsp;jours",
        description: "Europe est le deuxième satellite Galiléen<span class='point'>.</span> Son enveloppe de glace abrite un océan souterrain et donc peut-être de la vie<span class='point'>.</span>"
    },
    {
        name: "Ganymède",
        icon: "Ganymede.png",
        diametre: 2000 * 5262.4 / 140000 * scale,
        distance: 2000 * 1070400 / 140000 * scale,
        realdistance: 1070400,
        texture: "ganymede.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.21 + 3.12,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 7.15,
        satellites: 0,
        rotation: "7,15 jours&nbsp;(synchrone)",
        revolution: "7,15&nbsp;jours",
        description: "Ganymède est le troisième satellite Galiléen, il est le plus gros de tous les satellites du système solaire et est le seul a posséder une magnétosphère<span class='point'>.</span>"
    },
    {
        name: "Callisto",
        icon: "Callisto.png",
        diametre: 2000 * 4820 / 140000 * scale,
        distance: 2000 * 1882700 / 140000 * scale,
        realdistance: 1882700,
        texture: "callisto.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.192 + 3.12,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 16.68,
        satellites: 0,
        rotation: "16,68 jours&nbsp;(synchrone)",
        revolution: "16,6881&nbsp;jours",
        description: "Callisto est le quatrième et dernier satellite Galiléen<span class='point'>.</span> Comme Europe, Callisto possède un océan, environ 100km sous sa surface, et donc potentiellement de la vie"
    },
];

const belts = [{
    name: "rings",
    yDivergence: 2000 * 30 / 140000 * scale,
    nb: 7000,
    size: 0.5,
    position: {
        nearest: 2000 * 122800 / 140000 * scale,
        farthest: 2000 * 129200 / 140000 * scale,
    },
    parent: "Jupiter",
    texture: "diffuse"
}];