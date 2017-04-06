import * as  React from 'react';
import {flatten,uniq} from 'lodash';
import container from "../inversify.config";
import BenchmarkService from "../services/benchmark_service";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import 'bootstrap/dist/css/bootstrap.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import LabelAsPoint from './LabelAsPoint';

export const Loader = () => <div className="loader">Loading...</div>
export class Graph extends React.Component<any,any>{
	constructor(props:any){
        super(props)       
        this.state = {
            data : {},
			loading: true,
			metric_names:[]
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
		this.setState({loading: true}) 
		let series = [];
        this.setState({loading: true}) 
        this.getBenchMarks().then(res=>{
			
		let all_date = res.data.map(metric=>{ return this.formatDate(metric._id.date)});
		let x_Axis_labels = uniq(flatten(all_date));
		let metric_names = uniq(flatten(res.data.map(metric=>metric._id.name)));
		let that = this;
		var series =[];
			 
		x_Axis_labels.forEach(function(date){
			var d = {};
			d["name"] = date;
			metric_names.forEach(function(names,index){
				res.data.forEach(function(metric){
					if((that.formatDate(metric._id.date) == date)){
							d[metric._id.name] = metric.average;
					} 								  
				});	
					
			});
			series.push(d);			
		}); 		
			this.setState({data:series});
			this.setState({metric_names: metric_names});
			this.setState({loading: false});			
		});
    }

	render(){
		if(this.state.loading){
            return (<Loader/>)
        }
		var strokes_fill = ["#8884d8","#ff7300","#82ca9d","#8884d8"];
		return (
			<div > 
			<h1>Title</h1> 
			<LineChart width = {600} height = {300} data = {this.state.data} margin = {{top: 5, right: 30, left: 20, bottom: 5}}>
				<XAxis dataKey = "name"/>
				<YAxis/>
				<CartesianGrid strokeDasharray = "3 3"/>
				<Tooltip/>
				<Legend />
				{	
					this.state.metric_names.map((names) => {
						return (<Line key = {`line_{names}`} dataKey = {names} activeDot = {false} label = {<LabelAsPoint />} strokeWidth = {4}  />)
					})		
				}
			</LineChart>
			</div>
	  );
	}
}