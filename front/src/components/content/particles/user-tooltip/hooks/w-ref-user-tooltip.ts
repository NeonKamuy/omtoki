import { useCallback, useRef, useState } from "react";
import { ICoordinates } from "../../interfaces";
import { __SETTINGS__ } from "../../settings";
import * as randomName from "random-name";

// This Hook Allows You To Use The Node After It Is Assigned To Ref
export function useUserTooltip() {
    const [isActive, setIsActive] = useState<ICoordinates | null>(null);
    const isActiveRef = useRef(isActive);
    isActiveRef.current = isActive;

    const ref = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback((div) => {
        if(!div) return;

        document.addEventListener(__SETTINGS__.TOOLTIP.eventOn, (event: any) => {
            if (isActiveRef.current) return;
            
            const { detail: coords } = event as CustomEvent<ICoordinates>;
            setIsActive(coords);

            div.style.left = coords.x + 20 + "px";
            div.style.top = coords.y + "px";
            div.style.display = "block";

            div.innerHTML = `
                <b>Имя:</b> ${randomName.first()} </br>
                <b>Фамилия:</b> ${randomName.last()} </br>
            `;
        });

        document.addEventListener(__SETTINGS__.TOOLTIP.eventOff, (event: any) => {
            setIsActive(null);

            div.style.display = "none";
        });

        // Save a reference to the node
        ref.current = div;
    }, []);

    return [setRef];
}
