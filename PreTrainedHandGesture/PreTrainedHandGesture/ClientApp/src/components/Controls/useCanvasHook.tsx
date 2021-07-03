import React, { useRef, useEffect } from 'react';

interface UseCanvasProps {
    
    draw: any;
}

const useCanvas = (draw: any) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext('2d');
            draw(context);
        }
    }, [draw]);

    return canvasRef;
}

export default useCanvas