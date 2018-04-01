const scale = 5;

const distanceCoeff = 1 / 232.54;

const timeQuotient = 10000;

const firstTarget = "The Sun";

const diametreFormule = 1 / 12756;
const distanceFormule = 1 / 149600000;

const freeSpeedCoeff = .01;

const beginNavIndex = 0;

var astres = [{
        name: "The Sun",
        icon: "Soleil.png",
        diametre: 109 * scale,
        distance: 0 * scale,
        texture: "sun.jpg",
        textureType: "emissive",
        godrays: true,
        positionDebut: Math.random() * 10000,
        angularOrbit: 0,
        angularSelf: 7.25,
        coeffrotation: 1 / 27,
        annee: 1000,
        satellites: "All planets",
        rotation: "27&nbsp;days",
        revolution: "Negligible around the barycenter",
        description: "The Sun is our solar system star, it is located in the center and all the planets orbit around it<span class='point'>.</span>"
    },
    {
        name: "Mercury",
        icon: "Mercure.png",
        diametre: 0.382 * scale,
        distance: (30 * 3) * scale,
        texture: "mercure.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        angularOrbit: 7.005,
        angularSelf: 0.0352,
        coeffrevolution: 4.2,
        coeffrotation: 1 / 58,
        annee: 88,
        satellites: 0,
        rotation: "58&nbsp;days&nbsp;and&nbsp;16&nbsp;hours",
        revolution: "88&nbsp;days (resonant 3/2)",
        description: "The closest planet to the Sun<span class='point'>.</span> Mercury rotates three times on its axis every two revolution around the Sun<span class='point'>.</span> It is called spin-orbit resonance<span class='point'>.</span>"
    },
    {
        name: "Venus",
        icon: "Venus.png",
        diametre: 0.949 * scale,
        distance: 168.19 * scale,
        texture: "venus.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .3,
            texture: "black.png"
        },
        angularOrbit: 3.39,
        angularSelf: 177.36,
        coeffrevolution: 1.175,
        coeffrotation: 0.0041037952,
        annee: 224.7,
        satellites: 0,
        rotation: "243&nbsp;days",
        revolution: "224<span class='point'>.</span>7&nbsp;days",
        description: "Venus is the hottest planet of the solar system because of its very important greenhouse effect due to a very dense atmosphere<span class='point'>.</span> In fact, it has a temperature of 490°C<span class='point'>.</span> Moreover, Venus is rotating from east to west, unlike the other planets<span class='point'>.</span> Venus is called \"Twin planet of Earth\" because of its very similar mass<span class='point'>.</span> Furthermore, Venus is located in the Sun's habitable zone<span class='point'>.</span>"
    },
    {
        name: "The Earth",
        icon: "Terre.png",
        diametre: 1 * scale,
        distance: 232.54 * scale,
        texture: "earth.jpg",
        textureType: "diffuse",
        specular: "specular.jpg",
        emissive: "night2.jpg",
        positionDebut: getRandom(0, 1000),
        atm: {
            opacity: .4,
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
        diametre: 0.273 * scale,
        distance: 15 * scale,
        realdistance: 384000,
        texture: "moon.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "The Earth",
        angularOrbit: 5.145,
        angularSelf: 6.687,
        coeffrevolution: 0,
        coeffrotation: 0,
        annee: 29.5,
        satellites: 0,
        rotation: "29<span class='point'>.</span>5&nbsp;days&nbsp;(synchronous)",
        revolution: "29<span class='point'>.</span>5&nbsp;days&nbsp;(synchronous)",
        description: "The Moon is the only companion of the Earth<span class='point'>.</span> It was formed after the Earth collided with a protoplanet during the solar system's genesis : a part of the debris is said to have formed the Moon<span class='point'>.</span> The Moon is also responsible for the tides on Earth<span class='point'>.</span> Moreover, the Moon's attraction power is slowing down the Earth's rotation speed on itself<span class='point'>.</span> The Moon is the only celestial body Humanity has ever set foot on, except the Earth, of course<span class='point'>.</span>"
    },
    {
        name: "Mars",
        icon: "Mars.png",
        diametre: 0.532 * scale,
        distance: 354.4 * scale,
        texture: "mars.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .2,
            texture: "black.png"
        },
        angularOrbit: 1.8506,
        angularSelf: 25.19,
        coeffrevolution: 0.811,
        coeffrotation: 0.972899729,
        annee: 686,
        satellites: 2,
        rotation: "24&nbsp;hours&nbsp;36&nbsp;minutes",
        revolution: "686&nbsp;days",
        description: "Also called \"The red planet\", Mars is the last telluric planet of our solar system<span class='point'>.</span> It's been a long time since Mars has lost its atmosphere, but scientists are almost sure there was water and perhaps even life on it<span class='point'>.</span>"
    },
    {
        name: "Jupiter",
        icon: "Jupiter.png",
        diametre: 11 * scale,
        distance: 1209.79 * scale,
        texture: "jupiter.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: 0.4,
            texture: "black.png"
        },
        angularOrbit: 1.304,
        angularSelf: 3.12,
        coeffrevolution: 0.043,
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
        diametre: 0.31185 * scale,
        distance: 30 * scale,
        realdistance: 421800,
        texture: "io.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.036 + 3.12,
        angularSelf: 0,
        coeffrevolution: 0,
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
        diametre: 1 * scale / (12756 / 3121.6),
        distance: 50 * scale,
        realdistance: 671100,
        texture: "europe.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.469 + 3.12,
        angularSelf: 0,
        coeffrevolution: 0,
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
        diametre: 1 * scale / (12756 / 5262.4),
        distance: 80 * scale,
        realdistance: 1070400,
        texture: "ganymede.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.21 + 3.12,
        angularSelf: 0,
        coeffrevolution: 0,
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
        diametre: 1 * scale / (12756 / 4820),
        distance: 150 * scale,
        realdistance: 1882700,
        texture: "callisto.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Jupiter",
        angularOrbit: 0.192 + 3.12,
        angularSelf: 0,
        coeffrevolution: 0,
        coeffrotation: 0,
        annee: 16.68,
        satellites: 0,
        rotation: "16<span class='point'>.</span>68 days&nbsp;(synchronous)",
        revolution: "16<span class='point'>.</span>68&nbsp;days&nbsp;(synchronous)",
        description: "Callisto is the fourth and the last Galilean satellite<span class='point'>.</span>  It seems that Callisto, like Europa, has a subsurface ocean around 100km deep under its surface and perhaps life as well<span class='point'>.</span>"
    },
    {
        name: "Saturn",
        icon: "Saturne.png",
        diametre: 9 * scale,
        distance: 2218.13 * scale,
        texture: "saturn.png",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: 0.4,
            texture: "black.png"
        },
        angularOrbit: 2.4845,
        angularSelf: 26.73,
        rings: {
            texture: "rings.png",
            size: 20,
            alpha: 0.5
        },
        coeffrevolution: 0.0323,
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
        diametre: 1 * scale / (12756 / 400),
        distance: 15 * scale,
        realdistance: 185520,
        texture: "mimas.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 1.566 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 1 * scale / (12756 / 504),
        distance: 30 * scale,
        realdistance: 238020,
        texture: "encelade.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.019 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 1 * scale / (12756 / 1060),
        distance: 45 * scale,
        realdistance: 294619,
        texture: "tethys.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.168 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 1 * scale / (12756 / 1118),
        distance: 60 * scale,
        realdistance: 377420,
        texture: "dione.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.002 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 1 * scale / (12756 / 1529),
        distance: 70 * scale,
        realdistance: 527070,
        texture: "rhea.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 0.331 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 0.404 * scale,
        distance: 100 * scale,
        realdistance: 1221870,
        texture: "titan.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        atm: {
            opacity: .2,
            texture: "black.png"
        },
        angularOrbit: 0.280 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
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
        diametre: 1 * scale / (12756 / 1460),
        distance: 120 * scale,
        realdistance: 3560840,
        texture: "japet.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturn",
        angularOrbit: 7.489 + 26.73,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 79.33,
        satellites: 0,
        rotation: "79<span class='point'>.</span>33 days&nbsp;(synchronous)",
        revolution: "79<span class='point'>.</span>33&nbsp;days&nbsp;(synchronous)",
        description: "Iapetus is the only satellite of the solar system which has two hemispheres made of two different colors : one is white and the other is black<span class='point'>.</span> Moreover, Iapetus has a large equatorial crest<span class='point'>.</span>"
    },
    {
        name: "Uranus",
        icon: "Uranus.png",
        diametre: 4.007 * scale,
        distance: 4459.59 * scale,
        texture: "uranus.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .4,
            atmtexture: "black.png"
        },
        angularSelf: 97.8,
        angularOrbit: 0.7725,
        rings: {
            texture: "uranus_rings.png",
            size: 8,
            alpha: 0.7
        },
        coeffrevolution: 0.228,
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
        diametre: 1 * scale / (12756 / 470),
        distance: 15 * scale,
        realdistance: 129872,
        texture: "miranda.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "Uranus",
        angularOrbit: 97.8 + 4.338,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 1.41,
        satellites: 0,
        rotation: "1<span class='point'>.</span>41 days&nbsp;(synchronous)",
        revolution: "1<span class='point'>.</span>41&nbsp;days&nbsp;(synchronous)",
        description: "Miranda is Uranus' smallest satellite<span class='point'>.</span> It's also a very low density satellite<span class='point'>.</span>"
    },
    {
        name: "Ariel",
        icon: "Ariel.png",
        diametre: 1 * scale / (12756 / 1160),
        distance: 30 * scale,
        realdistance: 190900,
        texture: "ariel.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.260,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 2.52,
        satellites: 0,
        rotation: "2<span class='point'>.</span>52 days&nbsp;(synchronous)",
        revolution: "2<span class='point'>.</span>52&nbsp;days&nbsp;(synchronous)",
        description: "Ariel is Uranus' brightest satellite<span class='point'>.</span> Its core is made of rock and its mantle of ice<span class='point'>.</span>"
    },
    {
        name: "Umbriel",
        icon: "Umbriel.png",
        diametre: 1 * scale / (12756 / 1169),
        distance: 45 * scale,
        realdistance: 266300,
        texture: "umbriel.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.128,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 4.144,
        satellites: 0,
        rotation: "4<span class='point'>.</span>144 days&nbsp;(synchronous)",
        revolution: "4<span class='point'>.</span>144&nbsp;days&nbsp;(synchronous)",
        description: "Like Ariel, Titania and Oberon, Umbriel has a rocky core and an icy mantle<span class='point'>.</span> Oberon excepted, Umbriel's surface is the most damaged celestial body of the Uranian system, due to asteroid collisions<span class='point'>.</span>"
    },
    {
        name: "Titania",
        icon: "Titania.png",
        diametre: 1 * scale / (12756 / 1578),
        distance: 60 * scale,
        realdistance: 436300,
        texture: "titania.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.340,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 8.7,
        satellites: 0,
        rotation: "8<span class='point'>.</span>7 days&nbsp;(synchronous)",
        revolution: "8<span class='point'>.</span>7&nbsp;days&nbsp;(synchronous)",
        description: "Titania is Uranus' biggest satellite<span class='point'>.</span> It probably has a very thin atmosphere made of CO2<span class='point'>.</span>"
    },
    {
        name: "Oberon",
        icon: "Oberon.png",
        diametre: 1 * scale / (12756 / 1523),
        distance: 75 * scale,
        realdistance: 583519,
        texture: "oberon.jpg",
        textureType: "diffuse",
        positionDebut: 0,
        parent: "Uranus",
        angularOrbit: 97.8 + 0.058,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 13.46,
        satellites: 0,
        rotation: "13<span class='point'>.</span>46 days&nbsp;(synchronous)",
        revolution: "13<span class='point'>.</span>46&nbsp;days&nbsp;(synchronous)",
        description: "Oberon is Uranus' furthest satellite<span class='point'>.</span> It is also the most damaged one, with the hugest amount of impact craters in its surface<span class='point'>.</span>"
    },
    {
        name: "Neptune",
        icon: "Neptune.png",
        diametre: 3.883 * scale,
        distance: 6988.6 * scale,
        texture: "neptune.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: .4,
            texture: "black.png"
        },
        angularOrbit: 1.7692,
        angularSelf: 29.58,
        coeffrevolution: 182,
        coeffrotation: 1.4865424431,
        annee: 164 * 365.25 + 280,
        satellites: 15,
        rotation: "16&nbsp;hours&nbsp6&nbspminutes",
        revolution: "164&nbsp;years&nbsp;280&nbsp;days",
        description: "The last and the furthest planet of our solar system, it is also the slowest : one neptunian year equates 164 Earth years<span class='point'>.</span>"
    },
    {
        name: "Proteus",
        icon: "Protee.png",
        diametre: 1 * scale / (12756 / 420),
        distance: 20 * scale,
        realdistance: 117647,
        texture: "proteus.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Neptune",
        angularOrbit: 0.026 + 29.58,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 1.122,
        satellites: 0,
        rotation: "1<span class='point'>.</span>122 days&nbsp;(synchronous)",
        revolution: "1<span class='point'>.</span>122&nbsp;days&nbsp;(synchronous)",
        description: "One of the darkest satellites of our solar system : it reflects only 10% of the Sun's light<span class='point'>.</span>"
    },
    {
        name: "Triton",
        icon: "Triton.png",
        diametre: 1 * scale / (12756 / 2706),
        distance: 60 * scale,
        realdistance: 354759,
        texture: "triton.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Neptune",
        angularOrbit: 156.865 + 29.58,
        angularSelf: 0,
        coeffrevolution: 0.001,
        coeffrotation: 0,
        annee: 5.877,
        satellites: 0,
        rotation: "5<span class='point'>.</span>877 days&nbsp;(synchronous)",
        revolution: "5<span class='point'>.</span>877&nbsp;days&nbsp;(synchronous)",
        description: "Neptune's biggest satellite, it also has a retrograd orbit<span class='point'>.</span>"
    },
];

const belts = [{
    name: "AseroidBelt",
    yDivergence: 10 * scale,
    nb: 4000,
    size: 0.2,
    position: {
        nearest: 629.53 * scale,
        farthest: 746.11 * scale
    },
    parent: null,
    texture: "diffuse"
}];