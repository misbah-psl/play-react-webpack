import axios from 'axios';
import {injectable} from "inversify";
import BenchmarkService from "./benchmark_service";

@injectable()
class TpcdsBenchmarkService implements BenchmarkService{
    
    getBenchmarks(){
        return axios.get("/api/t_benchmarks",
                {headers: {'Content-Type': 'application/json'}});
    }
	getBenchmarksGraphs(){
        return axios.get("/api/t_benchmarks/graph",
                {headers: {'Content-Type': 'application/json'}});
    }
	getBenchmarksOnDates(date){
		return axios.get("/api/t_benchmark_date/"+date,
                {headers: {'Content-Type': 'application/json'}});
	}
}

export default TpcdsBenchmarkService