import * as  React from 'react';
import ChartistGraph from 'react-chartist'
import * as Legend from 'chartist-plugin-legend';


 var data = {
  labels: ['1/1/2016', '1/2/2016', '1/3/2016', '1/4/2016', '1/5/2016', '1/6/2016'],
  series: [
    {"name":"metric1", "data":[78, 90, 250, 50, 5, 100]},
    {"name":"metric2","data":[300, 201, 100, 150, 190, 6]},
    {"name":"metric3","data":[210, 100, 30, 90, 67, 95]}
  ]
};

var options = {
	width:'900px',
	height:'400px',
  // Don't draw the line chart points
  showPoint: false,
  // Disable line smoothing
  lineSmooth: false,
  // X-Axis specific configuration
  axisX: {
    // We can disable the grid for this axis

    // and also don't show the label
  },
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 60
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
    
  },

   plugins: [
     Legend({
            legendNames: ['metric1', 'metric2', 'metric3']
        })
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

export const Graph = () => {
    return (<div> <h1>Title</h1> <ChartistGraph data={data} type={'Line'} options={options} responsiveOptions={responsiveOptions} /></div>);
}