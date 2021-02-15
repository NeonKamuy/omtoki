import Utils from "../../../../../shared/utils";
import { __SETTINGS__ } from "../../canvas/settings";
import Particle from "../../canvas/lib/particle";
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

                <div class="user-tooltip-left-column">
                
                    <div class="user-tooltip-left-top-row">
                        <div class="user-tooltip-picture"></div>
                    </div>
                
                    <div class="user-tooltip-left-bottom-row">
                    </div>
                
                </div>


                <div class="user-tooltip-right-column">
                    <div class="user-tooltip-right-top-row">
                        <span class="user-tooltip-text-content">
                        ${this.prepareStr(particle.data.name, __SETTINGS__.MAX_USER_TOOLTIP_NAME)}
                        </span>
                    </div>

                    <div class="user-tooltip-right-bottom-row">
                        <span class="user-tooltip-text-content">
                            ${this.prepareStr(particle.data.description, __SETTINGS__.MAX_USER_TOOLTIP_DESC)}
                        </span>
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
