import * as React from "react";
import { useEffect } from "react";
import { IIndexedUser } from "../../../../shared/interfaces/user";
import { useParticles } from "./lib/hooks/w-ref-particles";
import { __SETTINGS__ } from "./settings";
import { useUserTooltip } from "./lib/user-tooltip/hooks/user-tooltip";
import "./lib/user-tooltip/layouts/layouts.scss";
import { AccountButtonContainer } from "../add-account/button-container";

export const ParticleContainer = React.memo(
    (props: { elements: IIndexedUser[] }) => {
        const { elements } = props;

        const [setUserTooltipContainerRef] = useUserTooltip();
        const [setParticlesContainerRef, handleElementsChange] = useParticles(
            new Array(1000).fill({
                name: "Магумамбед Вальфрендович",
                description: "Senior Java разработчик да и в целом очень умный хрен",
            })
        );

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
                <AccountButtonContainer />
                <div ref={setUserTooltipContainerRef} />
            </div>
        );
    }
);
