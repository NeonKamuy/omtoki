import React from "react";
import { useUsers } from "../../../hooks/users";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { ParticleContainer } from "./canvas";

export const Content: React.FC<{}> = () => {
    const elements: IIndexedUser[] = useUsers();

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
