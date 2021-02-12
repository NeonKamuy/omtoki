import React, { useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { IIndexedUser } from "../../shared/interfaces/user";
import { ParticleContainer } from "../particles";
import { useParticlesManager } from "../particles/hooks/w-ref-particles";

export const Content: React.FC<{}> = () => {
    const [setContainerRef, handleElementsChange] = useParticlesManager(new Array(500).fill(0));
    const elements: IIndexedUser[] = useUsers();

    useEffect(() => {
        handleElementsChange(elements);
    }, [elements]);

    return <ParticleContainer setContainerRef={setContainerRef} />;
};
