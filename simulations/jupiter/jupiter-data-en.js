const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 100000;

const firstTarget = "Jupiter";

const diametreFormule = 1 / (scale / 2000 * 140000);
const distanceFormule = 1 / (scale / 2000 * 140000);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Sun",
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
            opacity: 0.4,
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
        rotation: "9&nbsp;hours&nbsp;30&nbsp;minutes",
        revolution: "11&nbsp;years&nbsp;314&nbsp;days",
        description: "Jupiter is the biggest planet of our solar system (11 times bigger than the Earth)<span class='point'>.</span> Moreover, Jupiter has an astonishing number of satellites : 69 !"
    },
    {
        name: "Io",
        icon: "Io.png",
        diametre: 2000 * 3643 / 140000 * scale,
        distance: 2000 * 421800 / 140000 * scale,
        realdistance: 421800,
        texture: "io.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.036 + 3.12,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.769,
        satellites: 0,
        rotation: "1<span class='point'>.</span>769 days&nbsp;(synchronous)",
        revolution: "1<span class='point'>.</span>769&nbsp;days&nbsp;(synchronous)",
        description: "Io is one of the four Galilean satellites (Jupiter's biggest satellites)<span class='point'>.</span> It is also the most active solar system's celestial body with more than 400 active volcanoes<br/>Their trails of smoke are visible from space !<br/>This huge activity is due to Jupiter's high tidal power<span class='point'>.</span>"
    },
    {
        name: "Europa",
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
        rotation: "3<span class='point'>.</span>55 days&nbsp;(synchronous)",
        revolution: "3<span class='point'>.</span>55&nbsp;days&nbsp;(synchronous)",
        description: "Europa is the second Galilean satellite<span class='point'>.</span> Under its ice envelope lies a subsurface ocean with perhaps life in it, but one should get there to make sure of it<span class='point'>.</span>"
    },
    {
        name: "Ganymede",
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
        rotation: "7<span class='point'>.</span>15 days&nbsp;(synchronous)",
        revolution: "7<span class='point'>.</span>15&nbsp;days&nbsp;(synchronous)",
        description: "Ganymede is the third Galilean satellite, and the biggest one<span class='point'>.</span> It is also the only one which has a magnetosphere<span class='point'>.</span>"
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
        rotation: "16<span class='point'>.</span>68 days&nbsp;(synchronous)",
        revolution: "16<span class='point'>.</span>68&nbsp;days&nbsp;(synchronous)",
        description: "Callisto is the fourth and the last Galilean satellite<span class='point'>.</span>  It seems that Callisto, like Europa, has a subsurface ocean around 100km deep under its surface and perhaps life as well<span class='point'>.</span>"
    },
];

const belts = [{
    name: "rings",
    yDivergence: 10 * scale,
    nb: 7000,
    size: 0.5,
    position: {
        nearest: 2000 * 122800 / 140000 * scale,
        farthest: 2000 * 129200 / 140000 * scale,
    },
    parent: "Jupiter",
    texture: "diffuse"
}];