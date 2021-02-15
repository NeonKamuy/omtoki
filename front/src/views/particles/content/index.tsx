import React from "react";
import { useUsers } from "../../../hooks/users";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { ParticleContainer } from "./canvas";

export const Content: React.FC<{}> = () => {
    // const elements: IIndexedUser[] = useUsers();
    const elements = new Array(1000).fill(0).map(e => ({name: "name", description:"desc", id: Math.random() * 55555555 + ""}));

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
