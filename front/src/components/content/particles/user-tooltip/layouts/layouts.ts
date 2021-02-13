import Utils from "../../../../../shared/utils";
import Particle from "../../particle";
import { ITooltipLayouts } from "../src/interfaces";

export class UserTooltipLayouts {
    public static get(particle: Particle): ITooltipLayouts {
        return {
            default: this.getDefaultLayout(particle),
            bottom: this.getBottomLayout(particle),
            left: this.getLeftLayout(particle),
            leftBottom: this.getLeftBottomLayout(particle),
            leftTop: this.getLeftTopLayout(particle),
            right: this.getRightLayout(particle),
            rightBottom: this.getRightBottomLayout(particle),
            rightTop: this.getRightTopLayout(particle),
            top: this.getTopLayout(particle),
        };
    }

    private static getDefaultLayout(particle: Particle): string {
        return `
            <div class="user-tooltip-layout-default user-tooltip-container">

                <div class="user-tooltip-layout-default user-tooltip-left-column">
                
                    <div class="user-tooltip-layout-default user-tooltip-left-top-row">
                        <div class="user-tooltip-layout-default user-tooltip-picture"></div>
                    </div>
                
                    <div class="user-tooltip-layout-default user-tooltip-left-bottom-row">
                    </div>
                
                </div>


                <div class="user-tooltip-layout-default user-tooltip-right-column">
                    <div class="user-tooltip-layout-default user-tooltip-right-top-row">
                        ${this.prepareStr(particle.data.name, 24)}
                    </div>

                    <div class="user-tooltip-layout-default user-tooltip-right-bottom-row">
                            ${this.prepareStr(particle.data.description, 24)}
                    </div>
                </div>

            </div>`;
    }

    private static getTopLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getRightLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getLeftBottomLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getRightBottomLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getRightTopLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getBottomLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getLeftTopLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static getLeftLayout(particle: Particle): string | undefined {
        // Implement Yout Alternative Layout Here ...
        return undefined;
    }

    private static prepareStr(str: string, max: number): string {
        return Utils.ellipsisText(Utils.removeDoubleSpaces(str).trim(), max);
    }
}
