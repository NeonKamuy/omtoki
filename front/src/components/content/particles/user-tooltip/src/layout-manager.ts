import { IAAltLayout } from "./interfaces";

export default class TooltipLayoutManager {
    public static setAltLayout(args: IAAltLayout): void {
        switch (args.key) {
            case "top":
                return this.setTopAltLayout(args);
            case "bottom":
                return this.setBottomAltLayout(args);
            case "left":
                return this.setLeftAltLayout(args);
            case "right":
                return this.setRightAltLayout(args);
            case "leftTop":
                return this.setLeftTopAltLayout(args);
            case "leftBottom":
                return this.setLeftBottomAltLayout(args);
            case "rightTop":
                return this.setRightTopAltLayout(args);
            case "rightBottom":
                return this.setRightBottomAltLayout(args);
            default:
                return;
        }
    }

    private static setTopAltLayout(args: IAAltLayout): void {
        const { container, boundExcessions } = args;
        container.style.top = container.getBoundingClientRect().top + boundExcessions.top + 5 + "px";
    }

    private static setBottomAltLayout(args: IAAltLayout): void {
        const { container, boundExcessions } = args;
        container.style.top = container.getBoundingClientRect().top - boundExcessions.bottom - 5 + "px";
    }

    private static setLeftAltLayout(args: IAAltLayout): void {
        const { container, boundExcessions } = args;
        container.style.left = container.getBoundingClientRect().left + boundExcessions.left + 5 + "px";
    }

    private static setRightAltLayout(args: IAAltLayout): void {
        const { container, boundExcessions } = args;
        container.style.left = container.getBoundingClientRect().left - boundExcessions.right - 5 + "px";
    }

    private static setLeftTopAltLayout(args: IAAltLayout): void {
        this.setLeftAltLayout(args);
        this.setTopAltLayout(args);
    }

    private static setLeftBottomAltLayout(args: IAAltLayout): void {
        this.setLeftAltLayout(args);
        this.setBottomAltLayout(args);
    }

    private static setRightTopAltLayout(args: IAAltLayout): void {
        this.setRightAltLayout(args);
        this.setTopAltLayout(args);
    }

    private static setRightBottomAltLayout(args: IAAltLayout): void {
        this.setRightAltLayout(args);
        this.setBottomAltLayout(args);
    }
}
