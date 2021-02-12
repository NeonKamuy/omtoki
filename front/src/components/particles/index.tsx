import * as React from "react";

export const ParticleContainer = React.memo((props: { setContainerRef: (node: HTMLElement | null) => void }) => {
    const { setContainerRef } = props;

    // Use Code Below In Parent Component
    //
    // const elements: any[] = `CODE_TO_RECEIVE_ELEMENTS`;
    // const [setContainerRef, handleElementsChange] = useParticlesManager(elements);
    //
    // Then Provide ContainerRef Here

    return (
        <div style={outerDivStyle}>
            <div style={innerDivStyle} ref={setContainerRef}></div>
        </div>
    );
});

const outerDivStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
    display: "flex",
    flexFlow: "column",
    height: "100%",
};

const innerDivStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
    flexGrow: 1,
};
