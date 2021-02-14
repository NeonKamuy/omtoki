import { ICursorMode } from "../particle/interfaces";
import { IMouseStatus } from "./interfaces";
import { isMobile } from "react-device-detect";

export default class CursorListener {
    private readonly __target: HTMLElement;
    private __cursorMode: ICursorMode;
    private __openingTouch = false;

    private __status: IMouseStatus | null = null;

    constructor(targetElement: HTMLElement) {
        this.__target = targetElement;

        if (isMobile) {
            this.__cursorMode = "touch";
            this.__target.ontouchstart = (e) => this.handleTouch(e);
        } else {
            this.__cursorMode = "mouse";
            this.__target.onmousemove = (e) => this.handleMouseMove(e);
            this.__target.onmousedown = (e) => this.handleMouseDown(e);
            this.__target.onmouseup = (e) => this.handleMouseUp(e);
            this.__target.onmouseleave = (e) => this.handleMouseLeave(e);
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
        this.__status = {
            isMouseDown: false,
            coordinates: { x, y },
        };
    }

    private handleMouseDown(e: MouseEvent) {
        if (!this.__status) return;
        this.__status.isMouseDown = true;
    }

    private handleMouseUp(e: MouseEvent) {
        if (!this.__status) return;
        this.__status.isMouseDown = false;
    }

    private handleMouseLeave(e: MouseEvent) {
        this.__status = null;
    }

    public get status() {
        return this.__status;
    }

    public get mode(): ICursorMode {
        return this.__cursorMode;
    }
}