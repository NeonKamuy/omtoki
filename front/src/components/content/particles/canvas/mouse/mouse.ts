import { IMouseStatus } from "../interfaces";

export default class MouseListener {
    private readonly __target: HTMLElement;
    private __mouse: IMouseStatus | null = null;
    
    constructor(targetElement: HTMLElement) {
        this.__target = targetElement;

        this.__target.onmousemove = (e) => this.handleMouseMove(e);
        this.__target.onmousedown = (e) => this.handleMouseDown(e);
        this.__target.onmouseup = (e) => this.handleMouseUp(e);
        this.__target.onmouseleave = (e) =>
            this.handleMouseLeave(e);
    }

    private handleMouseMove(e: MouseEvent) {
        const { offsetX: x, offsetY: y } = e;
        this.__mouse = {
            isMouseDown: false,
            coordinates: { x, y },
        };
    }

    private handleMouseDown(e: MouseEvent) {
        if(!this.__mouse) return;
        this.__mouse.isMouseDown = true;
    }

    private handleMouseUp(e: MouseEvent) {
        if(!this.__mouse) return;
        this.__mouse.isMouseDown = false;
    }

    private handleMouseLeave(e: MouseEvent) {
        this.__mouse = null;
    }

    public get mouse() { return this.__mouse; }
}