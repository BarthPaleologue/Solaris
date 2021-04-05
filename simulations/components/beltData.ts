export interface BeltData {
    "id": string,
    "yDivergence": number,
    "nb": number,
    "size": number,
    "position": {
        "nearest": number,
        "farthest": number;
    },
    "parentId": string,
    "textureType": string;
}