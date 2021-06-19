import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ITFService } from '../Services/TFService';
import { ApplicationState } from '../store';
import * as TFStore from '../store/TF';
import * as tf from "@tensorflow/tfjs";
import * as tfVis from "@tensorflow/tfjs-vis";

type TensorFlowProps =
    TFStore.TFState &
    typeof TFStore.actionCreators &
    RouteComponentProps<{}>;

class TensorFlow extends React.PureComponent<TensorFlowProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {

    }

    // This method is called when the route parameters change
    public componentDidUpdate() {

    }

    public render() {
        return (
            <React.Fragment>
                <h1>Inside TensorFlow component</h1>
                {this.runTensorFlowTest()}
                {this.run()}
            </React.Fragment>
        );
    }

    private checkConsole() {
        console.log("Inside TensorFlow Component");
    }

    private runTensorFlowTest() {

        console.log("Testing");
        // Define a model for linear regression.
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

        // Generate some synthetic data for training.
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

        // Train the model using the data.
        model.fit(xs, ys, { epochs: 10 }).then(() => {
            // Use the model to do inference on a data point the model hasn't seen before:
            (model.predict(tf.tensor2d([5], [1, 1])) as tf.Tensor).print();
            // Open the browser devtools to see the output
        });

    }

    private async getCarsData() {

        const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
        const carsData = await carsDataResponse.json();
        const cleaned = carsData.map((car: { Miles_per_Gallon: any; Horsepower: any; }) => ({
            mpg: car.Miles_per_Gallon,
            horsepower: car.Horsepower,
        }))
            .filter((car: { mpg: null; horsepower: null; }) => (car.mpg != null && car.horsepower != null));

        return cleaned;
    }

    private async run() {

        // Load and plot the original input data that we are going to train on.
        const data = await this.getCarsData();
        const values = data.map((d: { horsepower: any; mpg: any; }) => (
            {
                x: d.horsepower,
                y: d.mpg,
            }));

        

         
        tfVis.render.scatterplot(
            { name: 'Horsepower v MPG' },
            { values },
            { xLabel: 'Horsepower', yLabel: 'MPG', height: 700 }
        );

        // More code will be added below
    }
};

export default connect(
    (state: ApplicationState) => state.counter,
    TFStore.actionCreators
)(TensorFlow);
