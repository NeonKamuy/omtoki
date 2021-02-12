import { ICoordinates } from "../interfaces";

export interface IMouseStatus {
    coordinates: ICoordinates | null;      // if null, mouse isn't inside area
    isMouseDown: boolean;
}
