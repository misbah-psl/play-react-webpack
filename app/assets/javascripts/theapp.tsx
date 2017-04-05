import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Greeter} from './components/Greeter';
import {TPCDS} from './components/Tpcds';
import {Graph} from './components/Graph';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import '../stylesheets/style.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css' 


export const Loader = () => <div className="loader">Loading...</div>

class TheApp extends React.Component<any,any>{
    
     constructor(props:any){
        super(props)
    }
    
    render(){
        return (
        <BrowserRouter>
        <div className="nav">
        <ul>
            <li> <Link to="/app">Home </Link> </li>
        <li> <Link to="/app/about">About </Link> </li>
        <li> <Link to="/app/graph">Graph</Link> </li>
        <li> <Link to="/app/spinner">Spinner</Link> </li>
        </ul>
                <Route exact path="/app" component={() => (<Greeter name="User"/>)}/>
                <Route path="/app/about" component={TPCDS}/>
                <Route path="/app/spinner" component={Loader}/>
                <Route path="/app/graph" component={Graph}/>
        </div>
        </BrowserRouter>);
        }

};



export default TheApp;