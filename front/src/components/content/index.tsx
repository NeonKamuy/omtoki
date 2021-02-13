import React, { useCallback, useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { IIndexedUser } from "../../shared/interfaces/user";
import { ParticleContainer } from "./particles";

export const Content: React.FC<{}> = () => {
    const elements: IIndexedUser[] = useUsers();

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
