import React from 'react';
import axios from 'axios';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

   function formatLoads(workloads,row){
       //console.log(row)
        return <span>{workloads.map((workload) => <div key={workload.name}> {workload.name}
            </div> )}</span>
        }
   function shortDate(date,row){
       return new Date(date).toISOString().slice(0, 10);
       }

class TPCDS extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {
			bm_data : [],
            load_names: []
		};
	}
	
	componentDidMount(){
		axios.get("/api/t_benchmarks",
				{headers: {'Content-Type': 'application/json'}})
		.then(res=>{
            let all_wl = res.data.map(a => a.workloads.map(wl => wl.name))
            var load_names = uniq(flatten(all_wl))
            console.log(load_names)
			
            let mod_data  = res.data.map(row => {
                for (var i in load_names)
                { 
                    //console.log(load_names);
                    row[load_names[i]]="Hey there: "+load_names[i];
                }
                return row; 
             });
            console.log(mod_data)
            this.setState({bm_data: mod_data});
            this.setState({load_names: load_names})
		});
	}
	
	render(){
    
		return(
           <div>
                <BootstrapTable data={this.state.bm_data}  keyField='date' striped>
                    <TableHeaderColumn dataField='name'>Benchmark Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' dataFormat={ shortDate }>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='git_url'>repo url</TableHeaderColumn>
                    {this.state.load_names.map(name => <TableHeaderColumn  dataField={name} >{name}</TableHeaderColumn>)}
                </BootstrapTable>
          </div>
            );
	}
    
    
 
};

export default TPCDS;
