import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { TFService } from '../Services/TFService';
import { ApplicationState } from '../store';
import * as TFStore from '../store/TF';
import * as tf from "@tensorflow/tfjs";
import * as tfVis from "@tensorflow/tfjs-vis";

type TensorFlowProps =
    TFStore.TFState &
    typeof TFStore.actionCreators &
    RouteComponentProps<{}>;

class TensorFlow extends React.PureComponent<TensorFlowProps> {

    private tfServie: TFService;
    // This method is called when the component is first added to the document
    public componentDidMount() {

    }

    // This method is called when the route parameters change
    public componentDidUpdate() {

    }

    constructor(props: TensorFlowProps) {
        super(props);
        this.tfServie = new TFService();

    }

    public render() {
        return (
            <React.Fragment>
                <h1>Inside TensorFlow component</h1>            
                {this.runTensorFlowTest()}                
            </React.Fragment>
        );
    }

    private runTensorFlowTest() {

        console.log("Testing123");
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

    private async run() {

        // Load and plot the original input data that we are going to train on.
        const data = await this.tfServie.getCarsData();
        const values = data.map((d: { horsepower: any; mpg: any; }) => (
            {
                x: d.horsepower,
                y: d.mpg,
            }));

        tfVis.render.scatterplot(
            { name: 'Horsepower v MPG' },
            { values },
            { xLabel: 'Horsepower', yLabel: 'MPG1', height: 700 }
        );

        // More code will be added below
    }
};

export default connect(
    (state: ApplicationState) => state.tfState,
    TFStore.actionCreators
)(TensorFlow);