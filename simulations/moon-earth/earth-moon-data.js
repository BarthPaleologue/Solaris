const scale = 1;

const timeQuotient = 10000;

const distanceCoeff = 1 / 232.54;

const diametreFormule = 1 / (12756 / 100);

const distanceFormule = 1 / (149600000 / 100);

const freeSpeedCoeff = .05;

const firstTarget = "La Terre";

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Soleil",
        icon: "Soleil.png",
        diametre: 1090 * scale,
        distance: 0 * scale,
        textureType: "emissive",
        texture: "sun2.jpg",
        positionDebut: Math.random() * 10000,
        godrays: true,
        isPickable: false,
        angularOrbit: 0,
        angularSelf: 7.25,
        coeffrotation: 1 / 27,
        annee: 1000,
        satellites: "Toutes les planètes du système solaire",
        rotation: "27&nbsp;jours",
        revolution: "Négligable",
        description: "Le Soleil est l'étoile de notre système solaire, il se situe en son centre et toutes les planètes orbitent autour de lui"
    },
    {
        name: "La Terre",
        icon: "Terre.png",
        diametre: 100 * scale,
        distance: 50000 * scale,
        realdistance: 149600000,
        textureType: "diffuse",
        texture: "earth.jpg",
        emissive: "night2.jpg",
        specular: "specular.jpg",
        positionDebut: getRandom(0, 1000),
        atm: {
            opacity: 0.4,
            texture: "clouds4.jpg"
        },
        angularOrbit: 0,
        angularSelf: 23.43,
        coeffrevolution: 1,
        coeffrotation: 1,
        annee: 365.25,
        satellites: 1,
        rotation: "23&nbsp;heures&nbsp;56&nbsp;minutes",
        revolution: "365,25&nbsp;jours",
        description: "La Terre est le seul astre de notre système solaire possédant de l'eau liquide à sa surface<span class='point'>.</span> La Terre est égalment la seule planète du système solaire à avoir vu se développer la vie et une civilisation intelligente<span class='point'>.</span>"
    },
    {
        name: "Lune",
        icon: "Lune.png",
        diametre: 27.3 * scale,
        distance: 3010 * scale,
        realdistance: 384000,
        textureType: "diffuse",
        texture: "moon.jpg",
        positionDebut: getRandom(0, 1000),
        parent: "La Terre",
        angularOrbit: 5.145,
        angularSelf: 6.687,
        coeffrevolution: 0,
        coeffrotation: 0,
        initialRotation: Math.PI,
        annee: 29.5,
        satellites: 0,
        rotation: "29,5&nbsp;jours&nbsp;(synchrone)",
        revolution: "29,5&nbsp;jours&nbsp;(synchrone)",
        description: "La Lune est le compagnon inséparable de la Terre<span class='point'>.</span> La Lune s'est formée, dit-on, de l'impact d'une planète avec la Terre lors de la formation du système solaire, une partie des débris auraient alors formé la Lune<span class='point'>.</span> Le Satellite de la Terre est responsable des marées et du ralentissement de la vitesse de rotation de la Terre sur elle même<span class='point'>.</span> La Lune est seul astre à ce jour à avoir été foulé par l'Homme avec la Terre bien sûr<span class='point'>.</span>"
    }
];

const belts = [];