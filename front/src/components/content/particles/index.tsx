import { relative } from "path";
import * as React from "react";
import { __SETTINGS__ } from "./settings";
import { useUserTooltip } from "./user-tooltip/hooks/user-tooltip";

export const ParticleContainer = React.memo((props: { setContainerRef: (node: HTMLElement | null) => void }) => {
    useUserTooltip();

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                height: "100vh",
                width: "100vw",
            }}
            ref={props.setContainerRef}
        ></div>
    );
});
