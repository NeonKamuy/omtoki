import { ICoordinates } from "../interfaces";

export interface IParticlesMove {
    enabled: boolean;
    speed: number;
}

export interface IArea {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export interface ICursor {
    coordinates: ICoordinates;
    mode: ICursorMode;
}

export type ICursorMode = "mouse" | "touch";
