import * as React from "react";
import { useEffect } from "react";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { useParticles } from "./lib/hooks/w-ref-particles";
import { __SETTINGS__ } from "./settings";
import { useUserTooltip } from "./lib/user-tooltip/hooks/user-tooltip";
import "./lib/user-tooltip/layouts/layouts.scss";

export const ParticleContainer = React.memo(
    (props: { elements: IIndexedUser[] }) => {
        const [setUserTooltipContainerRef] = useUserTooltip();
        const [setParticlesContainerRef, handleElementsChange] = useParticles(
            new Array(1000).fill({
                name: "Магумамбед Вальфрендович",
                description: "Senior Java разработчик",
            })
        );

        const { elements } = props;
        useEffect(() => {
            handleElementsChange(elements);
        }, [elements]);

        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    height: "100vh",
                    width: "100vw",
                }}
                ref={setParticlesContainerRef}
            >
                <div ref={setUserTooltipContainerRef} />
            </div>
        );
    }
);
