import React, { useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { IIndexedUser } from "../../shared/interfaces/user";
import { ParticleContainer } from "./particles";
import { useParticlesManager } from "./particles/hooks/w-ref-particles";
import "./particles/user-tooltip/layouts/layouts.scss"

export const Content: React.FC<{}> = () => {
    const [setContainerRef, handleElementsChange] = useParticlesManager(new Array(1000).fill({name: "Магумамбед Вальфрендович", description: "Senior Java разработчик"}));
    const elements: IIndexedUser[] = useUsers();

    useEffect(() => {
        handleElementsChange(elements);
    }, [elements]);

    return <ParticleContainer setContainerRef={setContainerRef} />;
};
