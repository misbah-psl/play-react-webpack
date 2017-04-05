import * as  React from 'react';
import ChartistGraph from 'react-chartist'
import * as Legend from 'chartist-plugin-legend';
import {flatten,uniq} from 'lodash';
import container from "../inversify.config";
import BenchmarkService from "../services/benchmark_service";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import 'bootstrap/dist/css/bootstrap.css';
var chartistPluginTooltip = require("chartist-plugin-tooltip");

var options = {
  width:'900px',
  height:'400px',
  showPoint: false,
  lineSmooth: false,
  axisX: {},
  axisY: {
    offset: 60   
  },
  plugins: [
     Legend({legendNames:["avgTimeMs","maxTimeMs","minTimeMs","stdDev"]}),
	 chartistPluginTooltip()
  ]
};

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    showPoint: false,
    axisX: {
      labelInterpolationFnc: function(value) {     
        return value.slice(0, 3);
      }
    }
  }],
  ['screen and (max-width: 640px)', {

    axisX: {
      labelInterpolationFnc: function(value) {      
        return value[0];
      }
    }
  }]
];

export class Graph extends React.Component<any,any>{
	constructor(props:any){
        super(props)       
        this.state = {
            data : {}			
        };
    }
	getBenchMarks(){
		let bm_service = container.get<BenchmarkService>(SERVICE_IDENTIFIER.BM_SERVICE);
		return bm_service.getBenchmarksGraphs();
	}
	formatDate(date){
		var d = new Date(date); 
		return d.toLocaleDateString()
	}   
    componentDidMount(){
		let series =[];
        this.setState({loading: true}) 
        this.getBenchMarks().then(res=>{
			
		let all_date = res.data.map(metric=>{ return this.formatDate(metric._id.date)});
		let x_Axis_labels = uniq(flatten(all_date));
		let metric_name = uniq(flatten(res.data.map(metric=>metric._id.name)));
		let that = this;
		var series =[];
				 			 				
		metric_name.forEach(function(names,index){
			 var d = [];			 
			 x_Axis_labels.forEach(function(dates){
				res.data.forEach(function(metric){	
					if((that.formatDate(metric._id.date) == dates) && (metric._id.name == names)){ 								
							d.push(metric.average)
					} 								  
				});	
					
			});
			series.push(d);		
		}); 		
			this.setState({data:{ labels:x_Axis_labels, series:series}});
		});
    }
	render(){
		return (<div> <h1>Title</h1> <ChartistGraph data={this.state.data} type={'Line'} options={options} responsiveOptions={responsiveOptions} /></div>);
	}
}