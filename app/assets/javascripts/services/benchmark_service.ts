interface BenchmarkService{
    getBenchmarks():any;
	getBenchmarksGraphs():any;
	getBenchmarksOnDates(date):any;
}

export default BenchmarkService;