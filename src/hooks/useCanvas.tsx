import { useEffect, useRef, useState } from "react"

export default function useCanvas() {
    const [gl, setGl] = useState<WebGLRenderingContext | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const Canvas = <canvas ref={canvasRef} />

    useEffect(() => {
        if (canvasRef.current) {
            setGl(canvasRef.current.getContext('webgl'));
        }
    }, [canvasRef]);

    return {
        gl,
        Canvas
    }
}