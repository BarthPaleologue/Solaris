import { AstreData } from "./astreData";
import { BeltData } from "./beltData";

export interface dataFile {
    "diameterScalingFactor": number,
    "distanceScalingFactor": number,
    "timeSpeedFactor": number,
    "firstTarget": string,
    "startDate": {
        "day": number,
        "month": number,
        "year": number;
    },
    "diametreConversionFactor": number,
    "distanceConversionFactor": number,
    "astres": AstreData[],
    "belts": BeltData[];
}