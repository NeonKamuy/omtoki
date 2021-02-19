import React from "react";
import { useUsers } from "../../../controllers/users/hooks";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { ParticleContainer } from "../../../components/canvas";

export const Content: React.FC<{}> = () => {
    const elements = useUsers();

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
