import React, { useCallback, useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { IIndexedUser } from "../../shared/interfaces/user";
import { ParticleContainer } from "./particles";
import { useParticles } from "./particles/hooks/w-ref-particles";
import { useUserTooltip } from "./particles/user-tooltip/hooks/user-tooltip";
import "./particles/user-tooltip/layouts/layouts.scss";

export const Content: React.FC<{}> = () => {
    const elements: IIndexedUser[] = useUsers();

    return (
        <div>
            <ParticleContainer elements={elements} />
        </div>
    );
};
