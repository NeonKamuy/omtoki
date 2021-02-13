import { IIndexedUser } from "../../../../../shared/interfaces/user";
import ParticlesManager from "../particle/manager";
import { __SETTINGS__ } from "../../settings";
import HTMLCanvas from "./html-canvas";

export default class ParticlesCanvas extends HTMLCanvas {
    private __particles: ParticlesManager;
    
    constructor(container: HTMLElement, elements: IIndexedUser[]) {
        super(container);
        this.__particles = new ParticlesManager(this, elements);
        this.animate();
    }
    
    public getParticlesManager() {
        return this.__particles;
    }

    private animate() {
        this.__container.appendChild(this.__canvas);
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }

    private drawFrame() {
        const {lastCall, interval} = this.__animationTimings;
        window.requestAnimationFrame(this.drawFrame.bind(this));

        const now = Date.now();
        const delta = now - lastCall;
        if(delta < interval) return;
    
        this.__animationTimings.lastCall = now - (delta % interval);

        this.clear();
        this.__particles.draw();
        this.__particles.prepareNextFrame();
    }

    private __animationTimings = {
        interval: 1000/__SETTINGS__.MAX_FPS,
        lastCall: Date.now(),
    }
}
