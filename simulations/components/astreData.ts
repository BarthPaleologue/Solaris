import { Atmosphere } from "./atmosphereData";
import { Rings } from "./ringsData";

export interface AstreData {
    "id": string,
    "icon": string,
    "diametre": number,
    "realdiameter": number,
    "distance": number,
    "realdistance": number,
    "parentId": string,
    "textureFileName": string,
    "textureType": string,
    "specular": string,
    "emissive": string,
    "godrays": boolean,
    "exposure": number,
    "decay": number,
    "pulsar": boolean,
    "isPickable": boolean,
    "initialOrbitalPosition": number,
    "initialRotation": number,
    "atm": Atmosphere,
    "angularOrbit": number,
    "angularSelf": number,
    "rings": Rings,
    "dayDuration": number,
    "yearDuration": number,
    "satellites": string,
    "rotation": string,
    "revolution": string,
    "description": string;
}