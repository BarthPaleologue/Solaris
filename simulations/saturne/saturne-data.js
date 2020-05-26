const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 100000;

const firstTarget = "Saturne";

const diametreFormule = 1 / (scale / 2000 * 120536);
const distanceFormule = 1 / (scale / 2000 * 120536);

const freeSpeedCoeff = .15;

const beginNavIndex = 1; // index de l'astre de départ pour la liste des destinations en navigation avec les flèches

const astres = [{
        name: "Soleil",
        icon: "Soleil.png",
        diametre: 10900 / 5 * scale,
        distance: 0,
        texture: "sun.jpg",
        textureType: "emissive",
        positionDebut: 0,
        godrays: true,
        exposure: 1.5,
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
        name: "Saturne",
        icon: "Saturne.png",
        diametre: 2000 * scale,
        distance: 100000 * scale,
        realdistance: 1427000000,
        texture: "saturn.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        atm: {
            opacity: 0.4,
            texture: "black.png"
        },
        rings: {
            texture: "rings.png",
            size: 5000 * scale,
            alpha: 0.5
        },
        angularOrbit: 2.4845,
        angularSelf: 26.73,
        coeffrotation: 2.338762215,
        annee: 29 * 365.25 + 167,
        satellites: 62,
        rotation: "10&nbsp;heures&nbsp;14&nbsp;minutes",
        revolution: "29&nbsp;ans&nbsp;167&nbsp;jours",
        description: "Saturne est la seconde plus grande planète de notre système solaire<br/>Elle se distingue de toutes les autres par la présence de ses immenses anneaux de roches et de glaces"
    },
    {
        name: "Mimas",
        icon: "Mimas.png",
        diametre: 2000 * 198 / 120536 * scale,
        distance: 2000 * 185520 / 120536 * scale,
        texture: "mimas.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 1.566 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 0.942,
        satellites: 0,
        rotation: "0,942 jours&nbsp;(synchrone)",
        revolution: "0,942&nbsp;jours",
        description: "Mimas est le plus petit satellite sphéroïde de Saturne, il en est également le plus proche<br/>Sa surface est marquée par un cratère géant de 130km de diamètre"
    },
    {
        name: "Encelade",
        icon: "Encelade.png",
        diametre: 2000 * 500 / 120536 * scale,
        distance: 2000 * 238020 / 120536 * scale,
        texture: "encelade.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 0.019 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.37,
        satellites: 0,
        rotation: "1,370 jours&nbsp;(synchrone)",
        revolution: "1,370&nbsp;jours",
        description: "Satellite gelé de Saturne, Encelade est pourtant très active, comme l'indique la présence de geysers d'eau carbonnée à sa surface<br/>Cela indique la présence d'un océan souterrain et pourquoi pas de la vie"
    },
    {
        name: "Téthys",
        icon: "Tethys.png",
        diametre: 2000 * 1056 / 120536 * scale,
        distance: 2000 * 294660 / 120536 * scale,
        texture: "tethys.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 0.168 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 1.88,
        satellites: 0,
        rotation: "1,88 jours&nbsp;(synchrone)",
        revolution: "1,88&nbsp;jours",
        description: "Téthys est un satellite de Saturne qui a la particularité d'avoir une densité très proche de celle de l'eau, ce qui trahit la présence de glace sur le satellite"
    },
    {
        name: "Dioné",
        icon: "Dione.png",
        diametre: 2000 * 1118 / 120536 * scale,
        distance: 2000 * 377400 / 120536 * scale,
        texture: "dione.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 0.002 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 2.737,
        satellites: 0,
        rotation: "2,737 jours&nbsp;(synchrone)",
        revolution: "2,737&nbsp;jours",
        description: "Dioné est un satellite composé essentiellment de glace, cependant, sa densité plus élevée laisse pensée que Dioné est composé également de roches de silicates"
    },
    {
        name: "Rhéa",
        icon: "Rhea.png",
        diametre: 2000 * 1529 / 120536 * scale,
        distance: 2000 * 527040 / 120536 * scale,
        texture: "rhea.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 0.331 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 4.518,
        satellites: 0,
        rotation: "4,518 jours&nbsp;(synchrone)",
        revolution: "4,518&nbsp;jours",
        description: "Seul satellite du système solaire possédant des anneaux<br/>Le phénomène est aujourd'hui inexpliqué"
    },
    {
        name: "Titan",
        icon: "Titan.png",
        diametre: 2000 * 5151 / 120536 * scale,
        distance: 2000 * 1221830 / 120536 * scale,
        texture: "titan.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        atm: {
            opacity: 0.2,
            texture: "black.png"
        },
        angularOrbit: 0.280 + 26,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 15.95,
        satellites: 0,
        rotation: "15,95 jours&nbsp;(synchrone)",
        revolution: "15,95&nbsp;jours",
        description: "Un des satellites de Saturne le plus connu, et le plus gros aussi<br/>Il a la particularité de posséder une athmosphère et d'être couvert de mers de méthane liquide à sa surface"
    },
    {
        name: "Japet",
        icon: "Japet.png",
        diametre: 2000 * 1494 / 120536 * scale,
        distance: 2000 * 3561300 / 120536 * scale,
        texture: "japet.jpg",
        textureType: "diffuse",
        positionDebut: Math.random() * 10000,
        parent: "Saturne",
        angularOrbit: 7.489 + 26.73,
        angularSelf: 0,
        coeffrotation: 0,
        annee: 79.33,
        satellites: 0,
        rotation: "79,33 jours&nbsp;(synchrone)",
        revolution: "79,338&nbsp;jours",
        description: "Satellite de Saturne possédant une coloration différente entre son hémisphère nord et son hémisphère sud<br/>De plus, Japet possède une crête équatoriale haute de 10km"
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
    parent: "Saturne",
    texture: "diffuse"
}];