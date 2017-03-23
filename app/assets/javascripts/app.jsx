import React from 'react';
import { render } from 'react-dom';
//import Greeter from './Greeter.jsx';
import TPCDS from './Tpcds.jsx';

import '../stylesheets/style.scss';

render((
    <div>
        <h1>CI Performance Benchmark Dashboard</h1>
    <TPCDS />
    </div>), document.getElementById("app"));