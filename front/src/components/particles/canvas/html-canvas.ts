import { IMouseStatus } from "./interfaces";

export default class HTMLCanvas {
    protected readonly __container: HTMLElement;
    protected readonly __canvas: HTMLCanvasElement;
    protected readonly __context: CanvasRenderingContext2D;
    private __cursorStatus = false;
    protected __mouse: IMouseStatus = {
        coordinates: null,
        isMouseDown: false,
    };

    constructor(container: HTMLElement) {
        this.__container = container;

        this.__canvas = document.createElement("canvas");
        this.__context = this.__canvas.getContext(
            "2d"
        ) as CanvasRenderingContext2D;

        this.__canvas.style.width = "100%";
        this.__canvas.style.height = "100%";

        this.resizeCanvas(true);
        this.watchMouse();
    }

    public paint() {
        this.__context.fillRect(0, 0, this.width, this.height);
    }

    public clear() {
        this.__context.clearRect(0, 0, this.width, this.height);
    }

    public pointerCursor(status: boolean) {
        if(status === this.__cursorStatus) return;
        this.__cursorStatus = status;
        this.__container.style.cursor = status ? "pointer" : "default";
    }

    private resizeCanvas(setListener = false) {
        this.__canvas.width = this.width;
        this.__canvas.height = this.height;

        setListener && (this.__container.onresize = () => this.resizeCanvas());
    }

    private watchMouse() {
        this.__container.onmousemove = (e) => this.handleMouseMove(e);
        this.__container.onmousedown = (e) => this.handleMouseDown(e);
        this.__container.onmouseup = (e) => this.handleMouseUp(e);
        this.__container.onmouseleave = () =>
            (this.__mouse = { coordinates: null, isMouseDown: false });
    }

    private handleMouseMove(e: MouseEvent) {
        const { offsetX: x, offsetY: y } = e;
        this.__mouse = {
            isMouseDown: false,
            coordinates: { x, y },
        };
    }

    private handleMouseDown(e: MouseEvent) {
        if(!this.__mouse.coordinates) return;
        this.__mouse.isMouseDown = true;
    }

    private handleMouseUp(e: MouseEvent) {
        this.__mouse.isMouseDown = false;
    }


    public get width() { return this.__container.offsetWidth; }
    public get height() { return this.__container.offsetHeight; }
    public get context() { return this.__context; }
    public get mouse() {return this.__mouse;}
}
