import React, { useCallback, useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { IIndexedUser } from "../../shared/interfaces/user";
import { ParticleContainer } from "./particles";
import { useParticlesManager } from "./particles/hooks/w-ref-particles";
import { useUserTooltip } from "./particles/user-tooltip/hooks/user-tooltip";
import "./particles/user-tooltip/layouts/layouts.scss";

export const Content: React.FC<{}> = () => {
  const [setParticlesContainerRef, handleElementsChange] = useParticlesManager(
    new Array(1000).fill({
      name: "Магумамбед Вальфрендович",
      description: "Senior Java разработчик",
    })
  );

  const [setUserTooltipContainerRef] = useUserTooltip();

  const elements: IIndexedUser[] = useUsers();

  useEffect(() => {
    handleElementsChange(elements);
  }, [elements]);

  const handleContainerRef = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    setParticlesContainerRef(element);
    setUserTooltipContainerRef(element);
  }, []);

  return <ParticleContainer setContainerRef={handleContainerRef} />;
};
