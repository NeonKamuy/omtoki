import Particle from "./index";
import ParticlesCanvas from "../canvas/index";
import { __SETTINGS__ } from "../settings";
import { IParticlesMove } from "./interfaces";
import { IMouseStatus } from "../canvas/interfaces";
import { IIndexedUser } from "../../../../shared/interfaces/user";
import { ICoordinates } from "../interfaces";

export default class ParticlesManager {
    private readonly __canvas: ParticlesCanvas;
    private __particles: Particle[] = [];
    private __move: IParticlesMove;

    constructor(canvas: ParticlesCanvas, elements: IIndexedUser[]) {
        this.__canvas = canvas;
        this.__move = {
            enabled: true,
            speed: __SETTINGS__.PARTICLE.MOVE.speed,
        };
        this.__particles = elements.map((e) => new Particle({ canvas, data: e }));
    }

    public setNewElements(elements: IIndexedUser[]) {
        this.__particles = elements.map((e) => new Particle({ canvas: this.__canvas, data: e }));
    }

    public draw() {
        this.__particles.forEach((e) => e.draw());
    }

    public prepareNextFrame() {
        let cursorIsPointer: ICoordinates | false = false;

        for (let i = 0; i < this.__particles.length; i++) {
            const particle = this.__particles[i];

            const { enableMove } = this.mouseInteract(particle, this.__canvas.mouse.coordinates);

            // move the particle
            if (!enableMove) {
                !cursorIsPointer && (cursorIsPointer = { x: particle.x, y: particle.y });
                continue;
            }

            const ms = this.__move.speed / 2;
            particle.x += particle.vx * ms;
            particle.y += particle.vy * ms;

            const new_pos = {
                x_left: -particle.radius,
                x_right: this.__canvas.width + particle.radius,
                y_top: -particle.radius,
                y_bottom: this.__canvas.height + particle.radius,
            };

            if (particle.x - particle.radius > this.__canvas.width) {
                particle.x = new_pos.x_left;
                particle.y = Math.random() * this.__canvas.height;
            } else if (particle.x + particle.radius < 0) {
                particle.x = new_pos.x_right;
                particle.y = Math.random() * this.__canvas.height;
            }

            if (particle.y - particle.radius > this.__canvas.height) {
                particle.y = new_pos.y_top;
                particle.x = Math.random() * this.__canvas.width;
            } else if (particle.y + particle.radius < 0) {
                particle.y = new_pos.y_bottom;
                particle.x = Math.random() * this.__canvas.width;
            }
        }

        const { eventOn, eventOff } = __SETTINGS__.TOOLTIP;
        this.__canvas.pointerCursor(
            !!cursorIsPointer,
            new CustomEvent(cursorIsPointer ? eventOn : eventOff, { detail: cursorIsPointer })
        );
    }

    private mouseInteract(particle: Particle, mouseCoordinates: IMouseStatus["coordinates"]): { enableMove: boolean } {
        const response = { enableMove: true };
        if (!mouseCoordinates) return response;

        const isHovered = particle.isHovered(mouseCoordinates);

        particle.radius = isHovered ? particle.defaultRadius * 2 : particle.defaultRadius;
        response.enableMove = !isHovered;

        return response;
    }
}
