import React, { useRef, useEffect } from 'react';
import useCanvas from './useCanvasHook';

interface CanvasProps {
    width: number;
    height: number;
    draw: any;    
}

const Canvas = ({ width, height, draw }: CanvasProps) => {

    const canvasRef = useCanvas(draw);   

    return <canvas ref={canvasRef} height={height} width={width} />;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};

export default Canvas;