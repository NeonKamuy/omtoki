import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Tooltip from "../src";
import { IAAppearTooltip } from "../src/interfaces";

export function useTooltip() {
    const tooltipRef = useRef<Tooltip | null>(null);
    const [tooltip, setTooltip] = useState<Tooltip | null>(tooltipRef.current);
    tooltipRef.current = tooltip;

    const setContainerRef = useCallback((node: HTMLElement | null) => {
        if (!node) return;
        setTooltip(new Tooltip(node));
    }, []);

    const response = useMemo(() => {
        if (!tooltip)
            return { show: emptyFunc, hide: emptyFunc } as {
                show: (args: IAAppearTooltip) => void;
                hide: () => void;
            };

        return {
            show: tooltip.appear.bind(tooltip),
            hide: tooltip.disappear.bind(tooltip),
        };
    }, [tooltip]);

    return { setContainerRef, ...response };
}

const emptyFunc = () => {};
