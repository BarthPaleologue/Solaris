const scale = 1;

const distanceCoeff = 1;

const firstTarget = "Iapetus";

var freeSpeedCoeff = .01;

const beginNavIndex = 0; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Iapetus",
        rayon: 0.114,
        realSize: 1494,
        texture: "japet.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "1 427 000 000km",
        class: "Satellite",
        angularSelf: 0
    }, {
        name: "The Moon",
        rayon: 0.273,
        realSize: 3483,
        texture: "moon.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "150 000 000km",
        class: "Satellite",
        angularSelf: 6.687
    },
    {
        name: "Mercury",
        rayon: 0.382,
        realSize: 4873,
        texture: "mercure.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "57 910 000km",
        class: "Planète Tellurique",
        angularSelf: 0
    },
    {
        name: "Mars",
        rayon: 0.532,
        realSize: 6786,
        texture: "mars.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "227 900 000km",
        class: "Planète Tellurique",
        angularSelf: 25.19,
        atm: {
            texture: "black.png",
            opacity: .2
        }
    },
    {
        name: "The Earth",
        rayon: 1,
        realSize: 12756,
        texture: "earth.png",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "149 600 000km",
        class: "Planète Tellurique",
        angularSelf: 23.43,
        atm: {
            texture: "clouds4.jpg",
            opacity: .4,
        }
    },
    {
        name: "Neptune",
        rayon: 3.883,
        realSize: 49500,
        texture: "neptune.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "4 498 000 000km",
        class: "Planète Gazeuse",
        angularSelf: 29.58,
        atm: {
            texture: "black.png",
            opacity: .4
        }
    },
    {
        name: "Saturn",
        rayon: 9,
        realSize: 120000,
        texture: "saturn.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "1 429 000 000km",
        class: "Planète Gazeuse",
        angularSelf: 26.73,
        rings: {
            texture: "rings.png",
            size: 20,
            alpha: 0.5,
            emissive: 0,
        },
        atm: {
            texture: "black.png",
            opacity: .4
        }
    },
    {
        name: "Jupiter",
        rayon: 11,
        realSize: 140000,
        texture: "jupiter.jpg",
        textureType: "diffuse",
        textureAlpha: false,
        distance: "778 500 000km",
        class: "Planète Gazeuse",
        angularSelf: 3.12,
        atm: {
            texture: "black.png",
            opacity: .4
        }
    },
    {
        name: "The Sun",
        rayon: 109,
        realSize: 1391400,
        texture: "sun.jpg",
        textureType: "emissive",
        textureAlpha: false,
        distance: "0km",
        class: "Etoile de type G",
        angularSelf: 7.25
    },
    {
        name: "Altair",
        rayon: 1.83 * 109,
        realSize: 1391400,
        texture: "altair.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "16,7 light-years",
        class: "Etoile de type A",
        angularSelf: 0
    },
    {
        name: "Pollux",
        rayon: 8 * 109,
        texture: "pollux.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "34 light-years",
        class: "Etoile de type K",
        angularSelf: 0
    },
    {
        name: "Arcturus",
        rayon: 25.7 * 109,
        texture: "arcturus.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "36,7 light-years",
        class: "Etoile de type K",
        angularSelf: 0
    },
    {
        name: "Aldebaran",
        rayon: 44.2 * 109,
        texture: "aldebaran.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "65 light-years",
        class: "Etoile de type K",
        angularSelf: 0
    },
    {
        name: "Rigel",
        rayon: 78 * 109,
        texture: "rigel.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "863 light-years",
        class: "Etoile de type B",
        angularSelf: 0
    },
    {
        name: "R Doradus",
        rayon: 370 * 109,
        texture: "sun.jpg",
        textureType: "emissive",
        textureAlpha: false,
        distance: "178 light-years",
        angularSelf: 0
    },
    {
        name: "V382 Carinae",
        rayon: 747 * 109,
        texture: "pollux.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "5090 light-years",
        angularSelf: 0

    },
    {
        name: "Betelgeuse",
        rayon: 1180 * 109,
        texture: "betelgeuse.jpg",
        textureType: "emissive",
        textureAlpha: false,
        distance: "640 light-years",
        class: "Etoile de type M",
        angularSelf: 0
    },
    {
        name: "UY Scutti",
        rayon: 1708 * 109,
        texture: "uyscutti.png",
        textureType: "emissive",
        textureAlpha: false,
        distance: "9500 light-years",
        class: "Etoile de type M",
        angularSelf: 0
    },
];