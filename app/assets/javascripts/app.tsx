import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Greeter} from './components/Greeter';
import {TPCDS} from './components/Tpcds';

import '../stylesheets/style.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css' 


//import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


ReactDOM.render((
    <div>
        <h1>CI Performance Benchmark Dashboard</h1>
    <TPCDS />
    </div>), document.getElementById("app"));