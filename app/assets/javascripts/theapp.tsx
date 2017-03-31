import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Greeter} from './components/Greeter';
import {TPCDS} from './components/Tpcds';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import '../stylesheets/style.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css' 




class App extends React.Component<any,any>{
    
     constructor(props:any){
        super(props)
    }
    
    render(){
        return (
        <Router>
      <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Greeter}/>
      <Route path="/about" component={TPCDS}/>
    </div>
</Router>);
        }

};

//const App = () => 

export default App;