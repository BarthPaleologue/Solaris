const scale = 1;

const distanceCoeff = 1;

const timeQuotient = 100;

const firstTarget = "barycenter";

const diametreFormule = 1;
const distanceFormule = 1;

const freeSpeedCoeff = .005;

const beginNavIndex = 1;

const astres = [{
    name: "barycenter",
    icon: "pulsar.png",
    diametre: .000001,
    distance: 0,
    texture: "pulsar2.jpg",
    textureType: "diffuse",
    positionDebut: 0,
    isPickable: false,
    angularOrbit: 0,
    angularSelf: 10,
    coeffrotation: 10,
    annee: 1,
    satellites: 0,
    rotation: "Quelques millisecondes",
    revolution: "Aucune",
    description: "Un pulsar est le résultat de la mort d'une étoile très massive<span class='point'>.</span> Les pulsars sont extrèmement denses et tournent sur eux même à des vitesses inimaginables, émettant un fort rayonnement magnétique par ses pôles<span class='point'>.</span>"
}, {
    name: "E1",
    icon: "pulsar.png",
    diametre: 5,
    distance: 50,
    texture: "pulsar2.jpg",
    textureType: "emissive",
    positionDebut: 0,
    godrays: true,
    pulsar: true,
    isPickable: false,
    angularOrbit: 0,
    angularSelf: 0,
    coeffrotation: 0,
    annee: 1,
    satellites: 0,
    rotation: "Quelques millisecondes",
    revolution: "Aucune",
    description: "Un pulsar est le résultat de la mort d'une étoile très massive<span class='point'>.</span> Les pulsars sont extrèmement denses et tournent sur eux même à des vitesses inimaginables, émettant un fort rayonnement magnétique par ses pôles<span class='point'>.</span>"
}, {
    name: "E2",
    icon: "pulsar.png",
    diametre: 5,
    distance: 50,
    texture: "pulsar2.jpg",
    textureType: "emissive",
    positionDebut: Math.PI,
    godrays: true,
    pulsar: true,
    isPickable: false,
    angularOrbit: 0,
    angularSelf: 0,
    coeffrotation: 0,
    annee: 1,
    satellites: 0,
    rotation: "Quelques millisecondes",
    revolution: "Aucune",
    description: "Un pulsar est le résultat de la mort d'une étoile très massive<span class='point'>.</span> Les pulsars sont extrèmement denses et tournent sur eux même à des vitesses inimaginables, émettant un fort rayonnement magnétique par ses pôles<span class='point'>.</span>"
}];

const belts = [];