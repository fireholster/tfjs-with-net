import React, { useRef, useEffect } from 'react';

interface TrackerProps {
    width: number;
    height: number;
    draw: any;
    runVideo: any;
    drawHand: any
}

const Tracker = ({ width, height, draw, runVideo, drawHand }: TrackerProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        let canvasContext: any;

        const styleCanvas = (ctx: CanvasRenderingContext2D) => {

           
            ctx.fillRect(20, 20, 100, 80);
        } 

        const getUserMedia = async () => {
            try {

                const video = videoRef.current;
                runVideo(video, canvasContext);
               
            } catch (err) {
                console.log(err);
            }
        };

        if (canvas) {
            canvasContext = canvas.getContext('2d');
           // styleCanvas(canvasContext);
        }   

        getUserMedia();         

    }, [draw, runVideo, drawHand]);

    return <div ref={divRef}><video ref={videoRef} height={height} width={width} autoPlay /><canvas ref={canvasRef} height={height} width={width} /></div>;
};

Tracker.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};

export default Tracker;