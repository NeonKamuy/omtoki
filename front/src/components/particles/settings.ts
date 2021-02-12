import { ICoordinates } from "./interfaces";

export const __SETTINGS__ = {
    MAX_FPS: 20,
    PARTICLE: {
        RADIUS: 5,
        REACT_ON_HOVER: true,
        MOVE: {
            direction: "left" as IVelocityDirection,
            straight: false,
            random: true,
            speed: 2,
        },
        BASE_VELOCITY_BY_DIRECTION: {
            top: { x: 0, y: -1 },
            'top-right': { x: 0.5, y: -0.5 },
            right: { x: 1, y: -0 },
            'bottom-right': { x: 0.5, y: 0.5 },
            bottom: { x: 0, y: 1 },
            'bottom-left': { x: -0.5, y: 1 },
            left: { x: -1, y: 0 },
            'top-left': { x: -0.5, y: -0.5 },
            none: { x: 0, y: 0 },
        } as Record<IVelocityDirection, ICoordinates>
    }
}

type IVelocityDirection = "top" | "top-right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left" | "none";