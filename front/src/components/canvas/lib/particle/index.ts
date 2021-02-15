import { IIndexedUser, IUserBase } from "../../../../shared/interfaces/user";
import ParticlesCanvas from "../canvas/index";
import { IMouseStatus } from "../canvas/interfaces";
import { ICoordinates } from "../../interfaces";
import { __SETTINGS__ } from "../../settings";
import { IArea, ICursor } from "./interfaces";
import * as _ from "lodash";

export default class Particle {
    public readonly data: IIndexedUser;
    private readonly __canvas: ParticlesCanvas;
    public readonly id = `${Math.random() * 9999}${Date.now()}${Math.random() * 9999}`;

    private __bgColor: string;
    private __coordinates: ICoordinates;
    private __velocity: ICoordinates;

    public radius = __SETTINGS__.PARTICLE.RADIUS;
    public readonly defaultRadius = __SETTINGS__.PARTICLE.RADIUS;

    constructor(args: { canvas: ParticlesCanvas; data: IIndexedUser }) {
        const { canvas, data } = args;
        this.__canvas = canvas;
        this.data = data;
        this.__bgColor = _.sample(__SETTINGS__.PARTICLE.ALLOWED_BGCOLORS)!;
        this.__coordinates = this.getRandomCoordinates();
        this.__velocity = this.getVelocity();
    }

    /**
     * @param otherHovered If other particle was marked as hovered while processing current frame,
     * and it is closer to touch coordinates than this particle, this particle shall not be marked as hovered
     */
    public isCursorInteracted(cursor: ICursor, otherHovered: Particle | null): boolean {
        const { mode, coordinates } = cursor;
        const radius = mode === "mouse" ? __SETTINGS__.HOVER_RADIUS : __SETTINGS__.TOUCH_RADIUS;

        const interactArea = this.getArea(coordinates, radius);
        const particleCoordinates = { x: this.x, y: this.y };
        let overlap = this.overlapsArea(particleCoordinates, interactArea);

        if (overlap && otherHovered) {
            const { x: thisX, y: thisY } = this.getCoordinateDelta(this.coordinates, coordinates);
            const thisDistance = Math.sqrt(Math.pow(thisX, 2) + Math.pow(thisY, 2));

            const { x: otherX, y: otherY } = this.getCoordinateDelta(otherHovered.coordinates, coordinates);
            const otherDistance = Math.sqrt(Math.pow(otherX, 2) + Math.pow(otherY, 2));

            if (thisDistance > otherDistance) overlap = false;
        }

        return overlap;
    }

    public draw(): void {
        // prettier-ignore
        var color_value = this.__bgColor;

        this.__canvas.context.fillStyle = color_value;
        this.__canvas.context.beginPath();
        this.__canvas.context.arc(this.__coordinates.x, this.__coordinates.y, this.radius, 0, Math.PI * 2, false);
        this.__canvas.context.closePath();

        this.__canvas.context.fill();
    }

    public bubble() {
        this.radius = this.defaultRadius * 2;
    }

    public unbubble() {
        this.radius = this.defaultRadius;
    }

    private overlapsArea(coordinates: ICoordinates, area: IArea): boolean {
        const { x, y } = coordinates;
        const { minX, minY, maxX, maxY } = area;

        return x > minX && y > minY && x < maxX && y < maxY;
    }

    private getArea(coordinates: ICoordinates, radius: number): IArea {
        const { x, y } = coordinates;

        const minX = x - radius;
        const maxX = x + radius;
        const minY = y - radius;
        const maxY = y + radius;

        return { minX, minY, maxX, maxY };
    }

    private getCoordinateDelta(coord1: ICoordinates, coord2: ICoordinates): ICoordinates {
        return {
            x: Math.abs(coord1.x - coord2.x),
            y: Math.abs(coord1.y - coord2.y),
        };
    }

    private getRandomCoordinates(): ICoordinates {
        const x = Math.random() * this.__canvas.width;
        const y = Math.random() * this.__canvas.height;
        return { x, y };
    }

    private getVelocity(): ICoordinates {
        const move = __SETTINGS__.PARTICLE.MOVE;
        const vBaseByDirection = __SETTINGS__.PARTICLE.BASE_VELOCITY_BY_DIRECTION;
        const vBase = vBaseByDirection[move.direction] ?? vBaseByDirection["none"];

        let x: number, y: number;
        if (move.straight) {
            x = vBase.x;
            y = vBase.y;

            if (move.random) {
                x = x * Math.random();
                y = y * Math.random();
            }
        } else {
            x = vBase.x + Math.random() - 0.5;
            y = vBase.y + Math.random() - 0.5;
        }

        return { x, y };
    }

    public get bgColor() {
        return this.__bgColor;
    }
    public get coordinates() {
        return this.__coordinates;
    }
    public get x() {
        return this.__coordinates.x;
    }
    public set x(x) {
        this.__coordinates.x = x;
    }
    public get y() {
        return this.__coordinates.y;
    }
    public set y(y) {
        this.__coordinates.y = y;
    }
    public get vx() {
        return this.__velocity.x;
    }
    public set vx(vx) {
        this.__velocity.x = vx;
    }
    public get vy() {
        return this.__velocity.y;
    }
    public set vy(vy) {
        this.__velocity.y = vy;
    }
}
