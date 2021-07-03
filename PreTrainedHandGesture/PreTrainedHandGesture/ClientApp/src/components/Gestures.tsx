import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as GestureStore from '../store/Gestures';
import * as handPose from '@tensorflow-models/handpose';
import Tracker from './Controls/Tracker';


type GestureProps =
    GestureStore.GesturesState &
    typeof GestureStore.actionCreators &
    RouteComponentProps<{ name: 'SINGLE_HAND_GESTURE' }>;

class Gesture extends React.PureComponent<GestureProps> {

    private canvasContext: any;
    private videoContext: any;

    public render() {
        return (
            <React.Fragment>
                <h1>Hand Gesture</h1>
                <div id="videoContainer">
                    <Tracker draw={this.drawTest} runVideo={this.runVideo} drawHand={this.drawHand} height={500} width={500} />
                </div>
            </React.Fragment>
        );
    }

    private checkConsole() {
        console.log("Some Gesture was renedered.");
    }

    private async runVideo(video: any, canvasContext: any) {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (video) {
            video.srcObject = stream;
        }

        //canvasContext.drawImage(video, 0, 0, 5000, 5000);       
        const model = await handPose.load();
        const predictions = await model.estimateHands(video);

        if (predictions.length > 0) {

            for (let i = 0; i < predictions.length; i++) {

                //0th represent the position of  the palm
                const fingerJoints = {
                    thumb: [0, 1, 2, 3, 4],
                    indexFinger: [0, 5, 6, 7, 8],
                    middleFinger: [0, 9, 10, 11, 12],
                    ringFinger: [0, 13, 14, 15, 16],
                    pinky: [0, 17, 18, 19, 20],
                };

                const style = {
                    0: { color: "yellow", size: 10 }, 1: { color: "gold", size: 6 }, 2: { color: "green", size: 10 }, 3: { color: "gold", size: 6 }, 4: { color: "gold", size: 6 },
                    5: { color: "purple", size: 10 }, 6: { color: "gold", size: 6 }, 7: { color: "gold", size: 6 }, 8: { color: "gold", size: 6 }, 9: { color: "blue", size: 10 },
                    10: { color: "gold", size: 6 }, 11: { color: "gold", size: 6 }, 12: { color: "gold", size: 6 }, 13: { color: "red", size: 10 }, 14: { color: "gold", size: 6 },
                    15: { color: "gold", size: 6 }, 16: { color: "gold", size: 6 }, 17: { color: "orange", size: 10 }, 18: { color: "gold", size: 6 },
                    19: { color: "gold", size: 6 }, 20: { color: "gold", size: 6 },
                };

                predictions.forEach(p => {

                    var landmarks = p.landmarks;

                    for (const finger in fingerJoints) {                       

                        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                            // Get pairs of joints
                            const firstJointIndex = fingerJoints[finger][k];
                            const secondJointIndex = fingerJoints[finger][k + 1];
                            // Draw path
                            canvasContext.beginPath();
                            canvasContext.moveTo(
                                landmarks[firstJointIndex][0],
                                landmarks[firstJointIndex][1]
                            );
                            canvasContext.lineTo(
                                landmarks[secondJointIndex][0],
                                landmarks[secondJointIndex][1]
                            );
                            canvasContext.strokeStyle = "plum";
                            canvasContext.lineWidth = 4;
                            canvasContext.stroke();
                        }
                    }

                    for (let i = 0; i < landmarks.length; i++) {
                        // Get x point
                        const x = landmarks[i][0];
                        // Get y point
                        const y = landmarks[i][1];
                        // Start drawing
                        canvasContext.beginPath();
                        canvasContext.arc(x, y, 10, 0, Math.PI);
                        // Set line color                        
                        canvasContext.fill();
                    }

                });
                var confidence = predictions[i].handInViewConfidence;
                var probabilty = (confidence * 100).toPrecision(5).toString();

                var text = "Confidence:" + probabilty + "%";

                canvasContext.shadowBlur = 20;
                canvasContext.shadowColor = "black";
                canvasContext.fillStyle = "red";
                canvasContext.font = "16pt Comic Sans MS";                
                canvasContext.fillText(text, 10, 200);
            }
        }
        console.log(predictions);
    }

    private drawHand(predictions: handPose.AnnotatedPrediction[], ctx: any){

       

    }

    private async drawAndPredict(videoCtx: any, canvasCtx: any) {

    }

    private drawTest(ctx: any) {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.arc(50, 100, 200 * Math.sin(100) ** 2, 0, 2 * Math.PI);
        ctx.fill();
    }
};

export default connect(
    (state: ApplicationState) => state.gestureState,
    GestureStore.actionCreators
)(Gesture);
