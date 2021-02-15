import React from "react";
import { useUsers } from "../../../controllers/users/hooks";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { ParticleContainer } from "../../../components/canvas";

export const Content: React.FC<{}> = () => {
    // const elements: IIndexedUser[] = useUsers();
    const elements = new Array(1000).fill(0).map(e => ({name: "Магумамбед Вальфрендович", description:"PHP / JS / Python", id: Math.random() * 55555555 + ""}));

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
