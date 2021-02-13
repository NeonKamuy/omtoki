export interface IAAppearTooltip {
    coordinates: { left: number; top: number };
    layouts: ITooltipLayouts;
}
/***********************/

export interface IAAltLayout extends IAAppearTooltip {
    key: keyof ITooltipLayouts;
    container: HTMLDivElement;
    boundExcessions: IBoundExcessions;
}
/************************/

/**
 * Tooltip layout for different positions
 * if default layout is out of bounds, alternative is used
 *
 * e.g. if default layout exceeds left bound, then left layout is used */
export interface ITooltipLayouts {
    default: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    leftTop?: string;
    leftBottom?: string;
    rightTop?: string;
    rightBottom?: string;
}

/** Number of pixels container exceeds bounds in specified direction */
export interface IBoundExcessions {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

/** X-axis and Y-axis excessions direction */
export interface IExcessionDirections {
    xAxis: "left" | "right" | null;
    yAxis: "top" | "bottom" | null;
}
