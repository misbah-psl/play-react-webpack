import React from 'react';
import axios from 'axios';

class TPCDS extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {
			bm_data : []
		};
	}
	
	componentDidMount(){
		axios.get("/api/t_benchmarks",
				{headers: {'Content-Type': 'application/json'}})
		.then(res=>{
			//console.log(res);
			//console.log(res.data);
			this.setState({bm_data: res.data});
		});
	}
	
	render(){
		return(<div> 
				   <ul style={{border:1+'px'}}>
        {
        this.state.bm_data.map((bm,index) =>
          <li key={index}><BmRow bm_row={bm} /></li>
        )
    }
      </ul>
				</div>);
	}
};

class Workload extends React.Component{
    constructor(props){
        super(props)
        }
    
    render(){
        return(<ul> 
                <div> {this.props.load.name} </div>
                <div>
                {
                    this.props.load.metrics.map((metric,index) =>
                     <li key={index}> {metric.name} - {metric.value} </li>)
                }
                </div>
            </ul>)
            
        }
    }

class BmRow extends React.Component{
    constructor(props){
        super(props)
        }
    
    render(){
        return(<div> {this.props.bm_row.name} - {this.props.bm_row.date} 
        { this.props.bm_row.workloads.map((load, index) => 
            <span key={index}>  <Workload load={load} /> </span>)
        }
            </div>);
        }
}   

export default TPCDS;
