import Particle from "./index";
import ParticlesCanvas from "../canvas/index";
import { __SETTINGS__ } from "../../settings";
import { ICursor, IParticlesMove } from "./interfaces";
import { IIndexedUser } from "../../../../shared/interfaces/user";

export default class ParticlesManager {
    private __lastHoveredParticle: Particle["id"] | null = null;
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
        this.__particles = elements.map(
            (e) => new Particle({ canvas: this.__canvas, data: e })
        );
    }

    public draw() {
        this.__particles.forEach((e) => e.draw());
    }

    public prepareNextFrame() {
        let hoveredParticle: Particle | null = null;
        const { cursor } = this.__canvas;

        const lastIsHovered =
            cursor &&
            this.__particleById[
                this.__lastHoveredParticle ?? ""
            ]?.isCursorInteracted(cursor, null);

        const moveParticle = (particle: Particle) => {
            this.moveParticle(particle);
            particle.pulse();
            particle.unbubble();
        };

        for (let i = 0; i < this.__particles.length; i++) {
            const particle = this.__particles[i];

            if (lastIsHovered) {
                if (particle.id === this.__lastHoveredParticle) {
                    hoveredParticle = particle;
                } else {
                    moveParticle(particle);
                }
            } else {
                const { isHovered } = this.mouseInteract(
                    particle,
                    cursor,
                    hoveredParticle
                );

                if (!isHovered) {
                    moveParticle(particle);
                } else {
                    // if some other particle was marked as hovered while preparing this frame
                    // unmark it and move
                    hoveredParticle && moveParticle(hoveredParticle);
                    hoveredParticle = particle;
                }
            }
        }

        if (hoveredParticle) {
            hoveredParticle.bubble();
            this.__lastHoveredParticle = hoveredParticle.id;
        } else {
            this.__lastHoveredParticle = null;
        }

        const { eventOn, eventOff } = __SETTINGS__.TOOLTIP;
        this.__canvas.pointerCursor(
            !!hoveredParticle,
            new CustomEvent(hoveredParticle ? eventOn : eventOff, {
                detail: hoveredParticle,
            })
        );
    }

    private mouseInteract(
        particle: Particle,
        cursor: ICursor | null,
        otherHovered: Particle | null
    ): { isHovered: boolean } {
        // If cursor is out of bounds, do nothing
        if (!cursor) return { isHovered: false };

        const isHovered = particle.isCursorInteracted(cursor, otherHovered);

        return { isHovered };
    }

    private moveParticle(particle: Particle) {
        // If particle out of horisontal bounds, then change direction to opposite
        if (
            particle.x + particle.radius >= this.__canvas.width ||
            particle.x - particle.radius <= 0
        ) {
            particle.vx = -particle.vx;
        }

        // If particle out of vertical bounds, then change direction to opposite
        if (
            particle.y + particle.radius >= this.__canvas.height ||
            particle.y - particle.radius <= 0
        ) {
            particle.vy = -particle.vy;
        }

        const ms = this.__move.speed / 2;
        particle.x += particle.vx * ms;
        particle.y += particle.vy * ms;
    }
}
