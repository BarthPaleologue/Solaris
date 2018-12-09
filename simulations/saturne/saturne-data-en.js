const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 100000;

const firstTarget = "Saturn";

const diametreFormule = 1 / (scale / 2000 * 120536);
const distanceFormule = 1 / (scale / 2000 * 120536);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Sun",
        icon: "Soleil.png",
        diametre: 10900 / 5 * scale,
        distance: 0,
        texture: "sun2.jpg",
        textureType: "emissive",
        positionDebut: 0,
        parent: null,
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
        name: "Saturn",
        icon: "Saturne.png",
        diametre: 2000 * scale,
        distance: 100000 * scale,
        realdistance: 1427000000,
        texture: "saturn.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Sun",
        atm: {
            opacity: .4,
            texture: "black.png"
        },
        angularOrbit: 2.4845,
        angularSelf: 26.73,
        rings: {
            texture: "rings.png",
            size: 5000 * scale,
            alpha: 0.5
        },
        coeffrotation: 2.338762215,
        annee: 29 * 365.25 + 167,
        satellites: 62,
        rotation: "10&nbsp;hours&nbsp;14&nbsp;minutes",
        revolution: "29&nbsp;years&nbsp;167&nbsp;days",
        description: "Saturn is the second biggest planet of our solar system<span class='point'>.</span> Because of its rings made of ice and rock, Saturn is considered as the most beautiful planet we know<span class='point'>.</span>"
    },
    {
        name: "Mimas",
        icon: "Mimas.png",
        diametre: 2000 * 198 / 120536 * scale,
        distance: 2000 * 185520 / 120536 * scale,
        texture: "mimas.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 1.566 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 0.942,
        satellites: 0,
        rotation: "0<span class='point'>.</span>942 days&nbsp;(synchronous)",
        revolution: "0<span class='point'>.</span>942&nbsp;days&nbsp;(synchronous)",
        description: "Mimas is Saturn's nearest and smallest spherical satellite<span class='point'>.</span> On its surface, Mimas has a huge crater of 130km of diameter called the Hershel's crater after the astronomer who discovered it in 1789<span class='point'>.</span>"
    },
    {
        name: "Enceladus",
        icon: "Encelade.png",
        diametre: 2000 * 500 / 120536 * scale,
        distance: 2000 * 238020 / 120536 * scale,
        texture: "encelade.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.019 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.37,
        satellites: 0,
        rotation: "1<span class='point'>.</span>37 days&nbsp;(synchronous)",
        revolution: "1<span class='point'>.</span>37&nbsp;days&nbsp;(synchronous)",
        description: "Like Europa and Callisto, Enceladus is a frozen satellite with a subsurface ocean<span class='point'>.</span> Moreover, Enceladus has 101 geysers shooting out ice and vapour<span class='point'>.</span>"
    },
    {
        name: "Tethys",
        icon: "Tethys.png",
        diametre: 2000 * 1056 / 120536 * scale,
        distance: 2000 * 294660 / 120536 * scale,
        texture: "tethys.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.168 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.88,
        satellites: 0,
        rotation: "1<span class='point'>.</span>88 days&nbsp;(synchronous)",
        revolution: "1<span class='point'>.</span>88&nbsp;days&nbsp;(synchronous)",
        description: "Tethys has a low density, which gives us a hint on what it is made of : ice<span class='point'>.</span>"
    },
    {
        name: "Dione",
        icon: "Dione.png",
        diametre: 2000 * 1118 / 120536 * scale,
        distance: 2000 * 377400 / 120536 * scale,
        texture: "dione.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.002 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 2.737,
        satellites: 0,
        rotation: "2<span class='point'>.</span>737 days&nbsp;(synchronous)",
        revolution: "2<span class='point'>.</span>737&nbsp;days&nbsp;(synchronous)",
        description: "Dione is a high-density satellite, which proves that there is not only ice but also rock in it<span class='point'>.</span>"
    },
    {
        name: "Rhea",
        icon: "Rhea.png",
        diametre: 2000 * 1529 / 120536 * scale,
        distance: 2000 * 527040 / 120536 * scale,
        texture: "rhea.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.331 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 4.518,
        satellites: 0,
        rotation: "4<span class='point'>.</span>518 days&nbsp;(synchronous)",
        revolution: "4<span class='point'>.</span>518&nbsp;days&nbsp;(synchronous)",
        description: "Rhea is Saturn's second biggest satellite<span class='point'>.</span> In the past, it had a lot of active frozen volcanoes<span class='point'>.</span>"
    },
    {
        name: "Titan",
        icon: "Titan.png",
        diametre: 2000 * 5151 / 120536 * scale,
        distance: 2000 * 1221830 / 120536 * scale,
        texture: "titan.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        atm: {
            opacity: .2,
            texture: "black.png"
        },
        angularOrbit: 0.280 + 26,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 15.95,
        satellites: 0,
        rotation: "15<span class='point'>.</span>95 days&nbsp;(synchronous)",
        revolution: "15<span class='point'>.</span>95&nbsp;days&nbsp;(synchronous)",
        description: "The most famous satellite of Saturn<span class='point'>.</span> It has oceans and rivers on its surface which are not made of water but of liquid methane instead<span class='point'>.</span> Moreover, Titan is the only satellite which has an atmosphere<span class='point'>.</span>"
    },
    {
        name: "Iapetus",
        icon: "Japet.png",
        diametre: 2000 * 1494 / 120536 * scale,
        distance: 2000 * 3561300 / 120536 * scale,
        texture: "japet.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 7.489 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 79.33,
        satellites: 0,
        rotation: "79<span class='point'>.</span>33 days&nbsp;(synchronous)",
        revolution: "79<span class='point'>.</span>33&nbsp;days&nbsp;(synchronous)",
        description: "Iapetus is the only satellite of the solar system which has two hemispheres made of two different colors : one is white and the other is black<span class='point'>.</span> Moreover, Iapetus has a large equatorial crest<span class='point'>.</span>"
    }
];

const belts = [{
    name: "rings",
    yDivergence: 10 * scale,
    nb: 40000,
    size: 1,
    position: {
        nearest: 1500 * scale,
        farthest: 2500 * scale
    },
    parent: "Saturn",
    texture: "diffuse"
}];