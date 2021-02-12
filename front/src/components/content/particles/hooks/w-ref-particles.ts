import React, { useCallback, useRef, useState } from "react";
import ParticlesCanvas from "../canvas";

export function useParticlesManager(elements: any[] | null) {
    const containerRef = useRef(null);
    const [canvas, setCanvas] = useState<ParticlesCanvas | null>(containerRef.current)

    const canvasRef = useRef(canvas);
    canvasRef.current = canvas;
    
    const setContainerRef = useCallback((node) => {
        if (!node) return;
        setCanvas(new ParticlesCanvas(node, elements ?? []));
    }, []);

    const handleElementsChange = useCallback((elements: any[] | null) => {
        canvasRef.current?.getParticlesManager().setNewElements(elements ?? []);
    }, [])

    return [setContainerRef, handleElementsChange] as const;
}
