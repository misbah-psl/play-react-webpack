import React from 'react';
import axios from 'axios';


   function formatLoads(workloads,row){
        return <span>{workloads.map((workload) => <div key={workload.name}> {workload.name}
            </div> )}</span>
        }

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
			this.setState({bm_data: res.data});
		});
	}
	
	render(){
    
        let columns = [
                    {name: 'name'},
                      { name: 'date' },
                      {name: 'git_url'},
                      {name:'workloads'}
                ]

        
        let benchmarks =[
            {name:"TPCDS",
            date:new Date()
            }
            ]
    
        
		return(
           <div>
                <BootstrapTable data={this.state.bm_data}  keyField='date'>
                    <TableHeaderColumn dataField='name'>Benchmark Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='git_url'>repo url</TableHeaderColumn>
                    <TableHeaderColumn  dataField='workloads' dataFormat={ formatLoads }>Benchmarks</TableHeaderColumn>
                </BootstrapTable>
          </div>
            );
	}
    
    
 
};

export default TPCDS;
