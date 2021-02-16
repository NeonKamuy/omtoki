import { ICursorMode } from "../particle/interfaces";
import { IMouseStatus } from "./interfaces";
import { isMobile } from "react-device-detect";

export default class CursorListener {
    private readonly __target: HTMLElement;
    private __cursorMode: ICursorMode;
    private __openingTouch = false;
    private __lastInteraction: Date | null = null;

    private __status: IMouseStatus | null = null;

    constructor(targetElement: HTMLElement) {
        this.__target = targetElement;

        if (isMobile) {
            this.__cursorMode = "touch";
            this.__target.ontouchstart = (e) => this.handleTouch(e);
        } else {
            this.__cursorMode = "mouse";
            this.__target.onmousemove = (e) => this.handleMouseMove(e);
            this.__target.onmouseleave = (e) => this.handleMouseLeave();
        }
    }

    private handleTouch(e: TouchEvent) {
        if (!this.__openingTouch) {
            this.__openingTouch = true;
            const { clientX: x, clientY: y } = e.touches[0];
            this.__status = { coordinates: { x, y }, isMouseDown: false };
        } else {
            this.__openingTouch = false;
            this.__status = null;
        }
    }

    private handleMouseMove(e: MouseEvent) {
        const { offsetX: x, offsetY: y } = e;

        this.__lastInteraction = new Date();
        this.__status = {
            isMouseDown: false,
            coordinates: { x, y },
        };
    }

    private handleMouseLeave() {
        this.__lastInteraction = null;

        setTimeout(() => {  // Smoothier mouseleave, thrembling guard 
            if (this.__lastInteraction !== null) return;
            this.__status = null;
        }, 100);
    }

    public get status() {
        return this.__status;
    }

    public get mode(): ICursorMode {
        return this.__cursorMode;
    }
}
