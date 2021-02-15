import * as React from "react";
import { useEffect } from "react";
import { IIndexedUser } from "../../shared/interfaces/user";
import { useParticles } from "./lib/hooks/w-ref-particles";
import { __SETTINGS__ } from "./settings";
import { useUserTooltip } from "../user-tooltip/hooks/user-tooltip";
import "../user-tooltip/layouts/index.scss";
import { AccountButtonContainer } from "../add-account/button-container";

export const ParticleContainer = React.memo((props: { elements: IIndexedUser[] }) => {
    const { elements } = props;

    const [setUserTooltipContainerRef] = useUserTooltip();
    const [setParticlesContainerRef, handleElementsChange] = useParticles(elements);

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
});
