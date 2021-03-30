import React, { useCallback, useRef, useState } from "react";
import { IUserInfo } from "../user-tooltip/interactive/interfaces";
import { ITooltipStatus } from "./modal-form/ErrorTooltips";
import { defaultTooltipStatus } from "./modal-form/ErrorTooltips";

export function useElementRefs(): Record<
    "cardRef" | "skillRef" | "tgRef" | "photoRef",
    React.MutableRefObject<any>
> {
    const cardRef = useRef(null);
    const skillRef = useRef(null);
    const tgRef = useRef(null);
    const photoRef = useRef(null);

    return { cardRef, skillRef, tgRef, photoRef };
}

export function useUserInfo() {
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        description: "",
        name: "",
        picture: null,
    });
    const userInfoRef = useRef(userInfo);
    userInfoRef.current = userInfo;

    return { userInfo, setUserInfo, userInfoRef };
}

export function useTooltipStatus() {
    const [tooltipStatus, setTooltipStatus] = useState<ITooltipStatus>(
        defaultTooltipStatus
    );
    const tooltipTimeoutRef = useRef<number | null>(null);

    const setTooltipTimeout = useCallback((newStatus: ITooltipStatus) => {
        const currTimeout = tooltipTimeoutRef.current;
        if (currTimeout) clearTimeout(currTimeout);

        const newId = (setTimeout(() => {
            if (tooltipTimeoutRef.current !== newId) return;
            setTooltipStatus(defaultTooltipStatus);
            tooltipTimeoutRef.current = null;
        }, 5000) as any) as number;

        tooltipTimeoutRef.current = newId;
        setTooltipStatus(newStatus);
    }, []);

    const resetTooltip = useCallback(() => {
        tooltipTimeoutRef.current && clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
        setTooltipStatus(defaultTooltipStatus);
    }, []);

    return { tooltipStatus, setTooltipTimeout, resetTooltip };
}
