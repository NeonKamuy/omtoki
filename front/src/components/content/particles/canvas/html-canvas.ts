import { IIndexedUser } from "../../../../shared/interfaces/user";
import { ICoordinates } from "../interfaces";
import { IMouseStatus } from "./interfaces";
import MouseListener from "./mouse/mouse";
import TouchListener from "./mouse/touch";

export default class HTMLCanvas {
    protected readonly __container: HTMLElement;
    protected readonly __canvas: HTMLCanvasElement;
    protected readonly __context: CanvasRenderingContext2D;
    private __cursorStatus = false;
    protected __mouse: MouseListener;
    protected __touch: TouchListener;

    constructor(container: HTMLElement) {
        this.__container = container;

        this.__canvas = document.createElement("canvas");
        this.__context = this.__canvas.getContext(
            "2d"
        ) as CanvasRenderingContext2D;

        this.__canvas.style.width = "100%";
        this.__canvas.style.height = "100%";

        this.resizeCanvas(true);

        this.__mouse = new MouseListener(this.__canvas);
        this.__touch = new TouchListener(this.__canvas);
    }

    public paint() {
        this.__context.fillRect(0, 0, this.width, this.height);
    }

    public clear() {
        this.__context.clearRect(0, 0, this.width, this.height);
    }

    public pointerCursor(status: boolean, customEvent?: CustomEvent) {
        if(customEvent){
            document.dispatchEvent(customEvent);
        }

        if(status === this.__cursorStatus) return;
        this.__cursorStatus = status;
        this.__container.style.cursor = status ? "pointer" : "default";
    }

    private resizeCanvas(setListener = false) {
        this.__canvas.width = this.width;
        this.__canvas.height = this.height;

        setListener && (this.__container.onresize = () => this.resizeCanvas());
    }

    public get width() { return this.__container.offsetWidth; }
    public get height() { return this.__container.offsetHeight; }
    public get context() { return this.__context; }
    public get mouse() { return this.__mouse; }
    public get touch() { return this.__touch; }
    public get cursorStatus() { return this.__cursorStatus; }
}
