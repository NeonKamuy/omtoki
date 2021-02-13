import { IAAppearTooltip, IBoundExcessions, IExcessionDirections, ITooltipLayouts } from "./interfaces";
import TooltipLayoutManager from "./layout-manager";

export default class Tooltip {
    private readonly __container: HTMLDivElement;

    constructor() {
        this.__container = document.createElement("div");
        this.initTooltipContainer();
    }

    public disappear() {
        this.__container.style.display = "none";
    }

    public appear(args: IAAppearTooltip) {
        const {
            layouts,
            coordinates: { left, top },
        } = args;

        this.__container.style.left = `${left}px`;
        this.__container.style.top = `${top}px`;
        this.__container.innerHTML = layouts.default;
        this.__container.style.display = "block";

        const { key, layout: preferredLayout, boundExcessions } = this.getPreferredLayout(layouts);
        if (preferredLayout) {
            this.__container.innerHTML = preferredLayout;
        } else {
            /** If corresponding layout not found, prepare alternative layout */
            TooltipLayoutManager.setAltLayout({
                key,
                ...args,
                boundExcessions,
                container: this.__container,
            });
        }
    }

    private getPreferredLayout(
        layouts: ITooltipLayouts
    ): { key: keyof ITooltipLayouts; layout: string | null; boundExcessions: IBoundExcessions } {
        const boundExcessions = this.exceedsBounds();
        const { yAxis, xAxis } = this.getExcessionDirections(boundExcessions);

        const key = ((xAxis ?? "") + (xAxis ? this.capitalize(yAxis ?? "") : yAxis)) as keyof ITooltipLayouts;
        let layout = layouts[key.length ? key : "default"];

        return { key, layout: layout ?? null, boundExcessions };
    }

    private getExcessionDirections(excessions: IBoundExcessions): IExcessionDirections {
        const { left, right, top, bottom } = excessions;

        const excessionDirections: IExcessionDirections = {
            xAxis: left ? "left" : right ? "right" : null,
            yAxis: top ? "top" : bottom ? "bottom" : null,
        };

        return excessionDirections;
    }

    private exceedsBounds(): IBoundExcessions {
        const innerHeight = window.innerHeight;
        const innerWidth = window.innerWidth;
        const containerCoords = this.__container.getBoundingClientRect();
        const { left, top, right, bottom } = containerCoords;

        const leftDelta = left - 0;
        const rightDelta = innerWidth - right;
        const topDelta = top - 0;
        const bottomDelta = innerHeight - bottom;

        const excessions = {
            left: leftDelta > 0 ? 0 : -leftDelta,
            right: rightDelta > 0 ? 0 : -rightDelta,
            top: topDelta > 0 ? 0 : -topDelta,
            bottom: bottomDelta > 0 ? 0 : -bottomDelta,
        };

        return excessions;
    }

    private initTooltipContainer() {
        document.body.appendChild(this.__container);
        this.__container.style.cssText = `
            display: none;
            position: absolute;
            z-index: 1000;
            width: max-content;
        `;
    }

    private capitalize(s: string): string {
        if (!s.length) return s;
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}
