import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import {Greeter} from './components/Greeter';
//import {TPCDS} from './components/Tpcds';
//import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import TheApp from './theapp'
import '../stylesheets/style.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css' 





ReactDOM.render((
    <TheApp />), document.getElementById("app"));