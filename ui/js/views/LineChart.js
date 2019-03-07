define(['jquery','charts'], function($, Chart){
	console.log('linechart file loaded');
	return {
		render: function({container, data}){
			console.log('render called');
			var lineChart = new Chart($('.'+container).find('canvas'), {
				"type":"line",
				"data": data,
				"options": {}
			});
			return lineChart;
		}
	}
})