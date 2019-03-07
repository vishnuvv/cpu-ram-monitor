define(['jquery','charts'], function($, Chart){
	console.log('barchart file loaded');
	return {
		render: function({container, data}){
			console.log('render called');
			var barChart = new Chart($('.'+container).find('canvas'), {
				"type":"bar",
				"data": data,
				"options": {}
			});
			return barChart;
		}
	}
})