import React, { useEffect, useRef, useState } from "react";
import Particle from "../../particle";
import { __SETTINGS__ } from "../../settings";
import { UserTooltipLayouts } from "../layouts/layouts";
import { useTooltip } from "./tooltip";

export function useUserTooltip() {
  const { show, hide, setContainerRef } = useTooltip();
  const [listeners, setListeners] = useState<any[]>([]);
  const listenersRef = useRef(listeners);
  listenersRef.current = listeners;

  useEffect(() => {
    document.removeEventListener(
      __SETTINGS__.TOOLTIP.eventOn,
      listenersRef.current[0]
    );
    document.removeEventListener(
      __SETTINGS__.TOOLTIP.eventOff,
      listenersRef.current[1]
    );

    const eventOnListener = (event: any) => {
      const { detail: particle } = event as CustomEvent<Particle>;

      show({
        coordinates: { left: particle.x, top: particle.y },
        layouts: UserTooltipLayouts.get(particle),
      });
    };

    const eventOffListener = () => {
      hide();
    };

    document.addEventListener(__SETTINGS__.TOOLTIP.eventOn, eventOnListener);
    document.addEventListener(__SETTINGS__.TOOLTIP.eventOff, eventOffListener);

    setListeners([eventOnListener, eventOffListener]);
  }, [show, hide]);

  return [setContainerRef];
}
