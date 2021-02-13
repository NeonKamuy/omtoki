import Particle from "./index";
import ParticlesCanvas from "../canvas/index";
import { __SETTINGS__ } from "../settings";
import { IParticlesMove } from "./interfaces";
import { IMouseStatus } from "../canvas/interfaces";
import { IIndexedUser } from "../../../../shared/interfaces/user";
import { ICoordinates } from "../interfaces";

export default class ParticlesManager {
    private static __lastHoveredParticle: Particle["id"] | null = null;
    private readonly __canvas: ParticlesCanvas;
    private __move: IParticlesMove;

    private __particleById: Record<string, Particle | undefined> = {};
    private __particles: Particle[] = [];

    constructor(canvas: ParticlesCanvas, elements: IIndexedUser[]) {
        this.__canvas = canvas;
        this.__move = {
            enabled: true,
            speed: __SETTINGS__.PARTICLE.MOVE.speed,
        };

        this.__particles = elements.map((e) => {
            const particle = new Particle({ canvas, data: e });
            this.__particleById[particle.id] = particle;
            return particle;
        });
    }

    public setNewElements(elements: IIndexedUser[]) {
        this.__particles = elements.map((e) => new Particle({ canvas: this.__canvas, data: e }));
    }

    public draw() {
        this.__particles.forEach((e) => e.draw());
    }

    public prepareNextFrame() {
        let hoveredParticle: Particle | false = false;

        for (let i = 0; i < this.__particles.length; i++) {
            const particle = this.__particles[i];

            const { enableMove } = this.mouseInteract(particle, this.__canvas.mouse.coordinates, !!hoveredParticle);

            // move the particle
            if (!enableMove) {
                !hoveredParticle && (hoveredParticle = particle);
                continue;
            }

            // If particle out of horisontal bounds, then change direction to opposite
            if (particle.x + particle.radius >= this.__canvas.width || particle.x - particle.radius <= 0) {
                particle.vx = -particle.vx;
            }

            // If particle out of vertical bounds, then change direction to opposite
            if (particle.y + particle.radius >= this.__canvas.height || particle.y - particle.radius <= 0) {
                particle.vy = -particle.vy;
            }

            const ms = this.__move.speed / 2;
            particle.x += particle.vx * ms;
            particle.y += particle.vy * ms;
        }

        const { eventOn, eventOff } = __SETTINGS__.TOOLTIP;
        this.__canvas.pointerCursor(
            !!hoveredParticle,
            new CustomEvent(hoveredParticle ? eventOn : eventOff, { detail: hoveredParticle })
        );
    }

    private mouseInteract(
        particle: Particle,
        mouseCoordinates: IMouseStatus["coordinates"],
        otherIsHovered: boolean
    ): { enableMove: boolean } {
        const response = { enableMove: true };

        // If cursor is out of bounds or some other particle is hovered, do nothing
        if (!mouseCoordinates || otherIsHovered) return response;

        // If some particle was hovered during previous frame,
        // then get it and check, if it is hovered again.
        //
        // This is needed because other particle with same bounds
        // can be rendered before particle which was hovered last
        // and so we will change the bubbled object, which we don't want to do
        const lastId = ParticlesManager.__lastHoveredParticle;
        const last = lastId && this.__particleById[lastId];

        if (last) {
            // If same particle is hovered again, then
            const lastIsHovered = last.isHovered(mouseCoordinates);

            // if this particle is not the same, ignore it
            if (lastIsHovered && particle.id !== lastId) {
                return response;
            }
            // else if this particle is the same, don't move it 
            else if (lastIsHovered && particle.id === lastId) {
                return { enableMove: false };
            }
        }

        // Now, if last particle is not hovered again, process new particle below
        const isHovered = particle.isHovered(mouseCoordinates);

        if(isHovered) ParticlesManager.__lastHoveredParticle = particle.id;

        particle.radius = isHovered ? particle.defaultRadius * 2 : particle.defaultRadius;
        response.enableMove = !isHovered;

        return response;
    }
}
