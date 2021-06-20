import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as GestureStore from '../store/Gestures';

type GestureProps =
    GestureStore.GesturesState &
    typeof GestureStore.actionCreators &
    RouteComponentProps<{ name: 'SINGLE_HAND_GESTURE' }>;

class Gesture extends React.PureComponent<GestureProps> {

    public render() {
        return (
            <React.Fragment>
                <h1>Hand Gesture</h1>
            

                {this.checkConsole()}
            </React.Fragment>
        );
    }

    private checkConsole() {
        console.log("Some Gesture was renedered.");
    }
};

export default connect(
    (state: ApplicationState) => state.gestureState,
    GestureStore.actionCreators
)(Gesture);
