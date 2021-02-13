import { ICursorMode } from "../particle/interfaces";
import HTMLCanvas from "./html-canvas";
import { IMouseStatus } from "./interfaces";

export default class CursorListener {
    private readonly __target: HTMLElement;
    private __openingTouch = false;

    private __cursorMode: ICursorMode = "mouse";
    private __status: IMouseStatus | null = null;

    constructor(targetElement: HTMLElement) {
        this.__target = targetElement;

        this.__target.onmousemove = (e) => this.handleMouseMove(e);
        this.__target.onmousedown = (e) => this.handleMouseDown(e);
        this.__target.onmouseup = (e) => this.handleMouseUp(e);
        this.__target.onmouseleave = (e) => this.handleMouseLeave(e);

        this.__target.ontouchstart = (e) => this.handleTouch(e);
    }

    private handleTouch(e: TouchEvent) {
        this.__cursorMode = "touch";

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
        if (this.__cursorMode !== "mouse") return;

        const { offsetX: x, offsetY: y } = e;
        this.__status = {
            isMouseDown: false,
            coordinates: { x, y },
        };
    }

    private handleMouseDown(e: MouseEvent) {
        if (!this.__status || this.__cursorMode !== "mouse") return;
        this.__status.isMouseDown = true;
    }

    private handleMouseUp(e: MouseEvent) {
        if (!this.__status || this.__cursorMode !== "mouse") return;
        this.__status.isMouseDown = false;
    }

    private handleMouseLeave(e: MouseEvent) {
        if(this.__cursorMode !== "mouse") return;
        this.__status = null;
    }

    public get status() {
        return this.__status;
    }

    public get mode(): ICursorMode {
        return this.__cursorMode ? "touch" : "mouse";
    }
}
