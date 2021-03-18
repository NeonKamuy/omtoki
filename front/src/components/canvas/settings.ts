import { ICoordinates } from "./interfaces";

export const __SETTINGS__ = {
    MAX_FPS: 20,
    TOUCH_RADIUS: 20,
    HOVER_RADIUS: 10,
    MAX_USER_TOOLTIP_NAME: 24,
    MAX_USER_TOOLTIP_DESC: 85,
    PARTICLE: {
        RADIUS: 2.5,
        REACT_ON_HOVER: true,
        PULSATION: {
            maxRadius: 3.5,
            minRadius: 1.5,
            speed: 0.1,  // pixels to add per frame
            randCoeff: 0.2,
        },
        ALLOWED_BGCOLORS: ["#00EC7B", "#00DDEB", "#8C31FF", "#F36FFF", "#FFE600"],
        COLOR_BY_BGCOLOR: {
            "#E143FD": "white",
            "#FFCC00": "white",
            "#4BA468": "white",
            "#EC5178": "white",
            "#ADE9DF": "white",
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
        BGCOLOR: "#282828"
    }
}

type IVelocityDirection = "top" | "top-right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left" | "none";