import React, { useRef, useEffect } from 'react';

interface VideoProps {
    width: number;
    height: number;
    runVideo: any;
}

const Video = ({ width, height, runVideo }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {

        //if (videoRef.current) {
        //    const video = videoRef.current;
            
        //    runVideo(video.);
        //}

        const getUserMedia = async () => {
            try {
               
                const video = videoRef.current;
                runVideo(video);
            } catch (err) {
                console.log(err);
            }
        };

        getUserMedia();

    }, [runVideo]);

    return <video ref={videoRef} height={height} width={width} autoPlay/>;
};

Video.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};

export default Video;