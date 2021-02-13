import React, { useEffect, useMemo, useState } from "react";
import Tooltip from "../src";
import { IAAppearTooltip } from "../src/interfaces";

export function useTooltip() {
    const [tooltip, setTooltip] = useState<Tooltip | null>(null);

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

    useEffect(() => {
        setTooltip(new Tooltip());
    }, [setTooltip]);

    return response;
}

const emptyFunc = () => {};
