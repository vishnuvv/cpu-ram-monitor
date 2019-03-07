//$(document).ready(function(){
	//console.log('document ready..');
	require(['ui/js/views/LineChart'], function(LineChart){
		console.log('Line chart loaded');
		const lineChart = LineChart.render({
			"container": 'cpu_mem_line',
			"data":{
				"labels":["Time"],
				"datasets":[{"label":"CPU","data":[],"fill":false,"borderColor":"rgb(75, 192, 192)"},
							{"label":"Memory","data":[],"fill":false,"borderColor":"rgb(0, 25, 192)"}]
			},
			"options": {
		        scales: {
		            xAxes: [{
		                type: 'time',
		                time: {
		                    unit: 'millisecond',
		                    format: 'h:mm:ss a'
		                    //distribution: 'series',
		                    //displayFormats: {
		                    //	second:	'h:mm:ss a'
		                    //}
		                }
		            }],
		            yAxes: [{
		            	ticks:{
		            		source: 'labels'
		            	},
	                    scaleLabel: {
	                        display:     true,
	                        labelString: 'value'
	                    }
	                }]
		        }
		    }
		});
		socket.on("timeseries", function(data){
			let cpuData = [], memData = [], labels = [];
			$.each(data, function(idx, record){
				var sampleDate = new Date(record['t']);
				var label = moment(record['t']).format("h:mm:ss");
				cpuData.push({
					y: record['cpu'],
					x: sampleDate
				});
				memData.push({
					y: record['mem'],
					x: sampleDate
				})
				labels.push(label)
			});
			lineChart.data.labels = labels;
			lineChart.data.datasets[0]['data'] = cpuData;
			lineChart.data.datasets[1]['data'] = memData;
			lineChart.update();
		});
	});

	require(['ui/js/views/BarChart'], function(BarChart){
		console.log('Bar chart loaded');
		var cpuChart = BarChart.render({
			"container": 'cpu_bar',
			"data":{
				"labels":["CPU"],
				"datasets":[{"label":"CPU","data":[0],"fill":false,"borderColor":"rgb(75, 192, 192)"}]
			}
		});
		var memChart = BarChart.render({
			"container": 'mem_bar',
			"data":{
				"labels":["Memory"],
				"datasets":[{"label":"Memory","data":[0],"fill":false,"borderColor":"rgb(75, 192, 192)"}]
			}
		});
		socket.on('cpu_mem', function(data){
			cpuChart.data.datasets[0]['data'] = [data[0]];
			memChart.data.datasets[0]['data'] = [data[1]];
			cpuChart.update();
			memChart.update();
		});
	});
//});