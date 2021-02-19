import React from "react";
import { useUsers } from "../../../controllers/users/hooks";
import { IIndexedUser } from "../../../shared/interfaces/user";
import { ParticleContainer } from "../../../components/canvas";

export const Content: React.FC<{}> = () => {
    const elements: IIndexedUser[] = /*useUsers()*/ new Array(500)
        .fill(0)
        .map((e) => ({
            description: "asdas",
            id: Math.random() * 1000000 + "",
            name: "asldkjals",
            picture: "alskdj",
            skills: "alskdj",
            tg: "laskdj",
        }));

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
