import React from "react";
import { __SETTINGS__ } from "../settings";
import { useUserTooltip } from "./hooks/w-ref-user-tooltip";

export const UserTooltip: React.FC<{}> = React.memo(() => {
    const [setTooltipDivRef] = useUserTooltip();

    return (
        <>
            <div style={tooltipDivStyle} ref={setTooltipDivRef}></div>
        </>
    );
});

const tooltipDivStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
    position: "absolute",
    display: "none",
    width: 200,
    backgroundColor: "black",
    color: "white",
    padding: 5,
    borderRadius: 10,
};
