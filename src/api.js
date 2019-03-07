const os = require('os');
const osu = require('node-os-utils');
const redis = require('./lib/redis');
const redisClient = redis.getClient();
async function getSystemResource({history}){
     //osu.cpu.usage().then(data => console.log('cpu usage % ', data));
     //osu.mem.used().then(data => console.log('mem info', data));
     //let history = true;
     if (history) {
     	return new Promise(function(resolve, reject){
     		//[ 'myzset', max, min, 'WITHSCORES', 'LIMIT', offset, count ];
     		//'cpu_mem_history', new Date().getTime()-3600, new Date().getTime()
     		redisClient.zrangebyscore(['cpu_mem_history', new Date().getTime()- 5 * 60 * 1000, new Date().getTime(), 'WITHSCORES'], function(err, res){
     			let data = res.filter(function(val, idx){
					return idx % 2 == 0;
				});
				let timestamp = res.filter(function(val, idx){
					return idx % 2 == 1;
				});
				let result = [];
				data.map(function(val, idx){
					var arr = val.split(':');
					result.push({
						cpu: parseInt(arr[0]),
						mem: parseInt(arr[1]),
						t: parseInt(timestamp[idx])
					})
				});
     			resolve(result);
     		})
     	}) 
     } else {
     	 var memPromise = osu.mem.used().then(function(data){
     		return Number.parseFloat(Number.parseFloat(data['usedMemMb']/data['totalMemMb'] * 100).toFixed(2));
	     })
	     return Promise.all([osu.cpu.usage(), memPromise]);
     }
}

module.exports.getSystemResource = getSystemResource;
