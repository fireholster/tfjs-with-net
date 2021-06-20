import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import TensorFlow from './components/TensorFlow';
import Gestures from './components/Gestures';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/tensor-flow' component={TensorFlow} />
        <Route path='/gestures/:name?' component={Gestures} />
     
    </Layout>
);
