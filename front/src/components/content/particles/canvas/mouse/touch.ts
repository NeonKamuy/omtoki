import { ICoordinates } from "../../interfaces";
import HTMLCanvas from "../html-canvas";

export default class TouchListener {    
    private readonly __target: HTMLElement;
    private __touch: ICoordinates | null = null;
    
    constructor(targetElement: HTMLElement) {
        this.__target = targetElement;

        this.__target.ontouchstart = (e) => this.handleTouch(e);
        this.__target.ontouchmove = (e) => this.handleTouch(e);
        this.__target.ontouchend = (e) => this.handleTouchEnd(e);
    }

    private handleTouch(e: TouchEvent) {
        HTMLCanvas.logToHTML("Touch Occured");
        const {clientX: x, clientY: y} = e.touches[0];
        this.__touch = {x, y};
    }

    private handleTouchEnd(e: TouchEvent) {
        HTMLCanvas.logToHTML("Touch ended");
        this.__touch = null;
    }

    public get touch() { return this.__touch; }
}