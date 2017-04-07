import * as  React from 'react';
import container from "../inversify.config";
import BenchmarkService from "../services/benchmark_service";
import SERVICE_IDENTIFIER from "../constants/identifiers";

export default class LabelAsPoint extends React.Component <any,any>{
	propTypes :{
		getTableData: React.PropTypes.func,
	}
	constructor(props:any){
        super(props)       
    }
    onClick = () => {
        const { index, key, payload } = this.props;
		let date = this.formatDate(payload.name);
		this.getBenchMarks(date).then(response=>{	
			let returnData = [];
			let all_dates = response.data.map(row=>{ return this.formatDate(row.date)});
			let metrices = response.data.map(row=> row.workloads.map(workload=>workload.metrics));
			var that = this;
			all_dates.forEach(function(metric_date){
				var d = {};
				d["date"] = metric_date;
				response.data.forEach(function(data){
					if(that.formatDate(data.date) == metric_date){					
						data.workloads.map(workload=>workload.metrics.map(obj=>{ d[obj.name] = obj.value; return;}));
					}				
				});
				returnData.push(d);
			});			
			this.props.getTableData(returnData);
		})
    }
	formatDate(date){
		var d = new Date(date); 
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var dt = d.getDate();

		if (dt < 10) {
		  dt = '0' + dt;
		}
		if (month < 10) {
		  month = '0' + month;
		}

		return year + '-' + month + '-' + dt;
	} 
	getBenchMarks(year){
		let bm_service = container.get<BenchmarkService>(SERVICE_IDENTIFIER.BM_SERVICE);
		return bm_service.getBenchmarksOnDates(year);
	} 
	
    render() {
        const { x, y } = this.props;
        return (
            <circle
                className='dot'
                onClick={this.onClick}
                cx={x}
                cy={y}
                r={8}
                fill="transparent"/>
        );
    }
}