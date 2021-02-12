import { IIndexedUser } from '../../../../shared/interfaces/user';
import ParticlesCanvas from '../canvas/index';
import { IMouseStatus } from '../canvas/interfaces';
import { ICoordinates } from '../interfaces';
import { __SETTINGS__ } from '../settings';

export default class Particle {
    private readonly __canvas: ParticlesCanvas;
    private readonly __data: any;

    private __rgbaColor: Record<'r' | 'g' | 'b' | 'a', number>;
    private __coordinates: ICoordinates;
    private __velocity: ICoordinates;

    public radius = __SETTINGS__.PARTICLE.RADIUS;
    public readonly defaultRadius = __SETTINGS__.PARTICLE.RADIUS;

    constructor(args: { canvas: ParticlesCanvas; data: IIndexedUser }) {
        const { canvas, data } = args;
        this.__canvas = canvas;
        this.__data = data;
        this.__rgbaColor = this.getRandomRGBA();
        this.__coordinates = this.getRandomCoordinates();
        this.__velocity = this.getVelocity();
    }

    public isHovered(mouse: IMouseStatus["coordinates"]): boolean {
        if(!mouse) return false;

        const {x, y} = mouse;
        const minX = this.x - this.radius;
        const minY = this.y - this.radius;
        const maxX = this.x + this.radius;
        const maxY = this.y + this.radius;

        return x > minX && y > minY && x < maxX && y < maxY;
    }

    public draw(): void {
        // prettier-ignore
        var color_value = `rgba(${this.__rgbaColor.r}, ${this.__rgbaColor.g}, ${this.__rgbaColor.b}, ${this.__rgbaColor.a})`;

        this.__canvas.context.fillStyle = color_value;
        this.__canvas.context.beginPath();
        this.__canvas.context.arc(
            this.__coordinates.x,
            this.__coordinates.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.__canvas.context.closePath();

        this.__canvas.context.fill();
    }

    private getRandomCoordinates(): ICoordinates {
        const x = Math.random() * this.__canvas.width;
        const y = Math.random() * this.__canvas.height;
        return {x, y}
    }

    private getRandomRGBA() {
        return {
            r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
            g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
            b: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
            a: 1,
        };
    }

    private getVelocity(): ICoordinates {
        const move = __SETTINGS__.PARTICLE.MOVE;
        const vBaseByDirection = __SETTINGS__.PARTICLE.BASE_VELOCITY_BY_DIRECTION;
        const vBase = vBaseByDirection[move.direction]  ?? vBaseByDirection['none'];

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

        return {x, y}
    }


    public get x() { return this.__coordinates.x; }
    public set x(x) { this.__coordinates.x = x; }
    public get y() { return this.__coordinates.y; }
    public set y(y) { this.__coordinates.y = y; }
    public get vx() { return this.__velocity.x; }
    public get vy() { return this.__velocity.y; }
}
