import { ICursor } from "../particle/interfaces";
import CursorListener from "./cursor-listener";

export default class HTMLCanvas {
    protected readonly __container: HTMLElement;
    protected readonly __canvas: HTMLCanvasElement;
    protected readonly __context: CanvasRenderingContext2D;
    private __cursorStatus = false;
    protected __cursor: CursorListener;

    constructor(container: HTMLElement) {
        this.__container = container;

        this.__canvas = document.createElement("canvas");
        this.__context = this.__canvas.getContext(
            "2d"
        ) as CanvasRenderingContext2D;

        this.__canvas.style.width = "100%";
        this.__canvas.style.height = "100%";

        this.resizeCanvas(true);

        this.__cursor = new CursorListener(this.__canvas);
    }

    public paint() {
        this.__context.fillRect(0, 0, this.width, this.height);
    }

    public clear() {
        this.__context.clearRect(0, 0, this.width, this.height);
    }

    public pointerCursor(status: boolean, customEvent?: CustomEvent) {
        if (customEvent) {
            document.dispatchEvent(customEvent);
        }

        if (status === this.__cursorStatus) return;
        this.__cursorStatus = status;
        this.__container.style.cursor = status ? "pointer" : "default";
    }

    private resizeCanvas(setListener = false) {
        this.__canvas.width = this.width;
        this.__canvas.height = this.height;

        setListener && (this.__container.onresize = () => this.resizeCanvas());
    }

    public get width() {
        return this.__container.offsetWidth;
    }
    public get height() {
        return this.__container.offsetHeight;
    }
    public get context() {
        return this.__context;
    }
    public get cursorStatus() {
        return this.__cursorStatus;
    }
    public get cursor(): ICursor | null {
        const coordinates = this.__cursor.status?.coordinates;
        if (!coordinates) return null;

        const mode = this.__cursor.mode;
        return { coordinates, mode };
    }
}
