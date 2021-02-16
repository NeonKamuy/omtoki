import { ICoordinates } from "./interfaces";

export const __SETTINGS__ = {
    MAX_FPS: 20,
    TOUCH_RADIUS: 40,
    HOVER_RADIUS: 7.5,
    MAX_USER_TOOLTIP_NAME: 24,
    MAX_USER_TOOLTIP_DESC: 85,
    PARTICLE: {
        RADIUS: 2.5,
        REACT_ON_HOVER: true,
        PULSATION: {
            maxRadius: 5,
            minRadius: 0,
            speed: 10,
        },
        ALLOWED_BGCOLORS: ["#E143FD", "#FFCC00", "#4BA468", "#EC5178", "#ADE9DF"],
        COLOR_BY_BGCOLOR: {
            "#E143FD": "white",
            "#FFCC00": "black",
            "#4BA468": "white",
            "#EC5178": "white",
            "#ADE9DF": "black",
        } as Record<string, "white" | "black">,
        MOVE: {
            direction: "none" as IVelocityDirection,
            straight: false,
            random: true,
            speed: 4,
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
    },
    TOOLTIP: {
        eventOn: "usertooltipopen",
        eventOff: "usertooltipclose"
    },
    CANVAS: {
        BGCOLOR: "#8156FB"
    }
}

type IVelocityDirection = "top" | "top-right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left" | "none";