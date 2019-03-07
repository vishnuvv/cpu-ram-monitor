const express = require('express');
const si = require('systeminformation');
const redis = require('./src/lib/redis');
const redisClient = redis.getClient();
const osu = require('node-os-utils');
const app = express();
global.__serverroot = __dirname;
const resourceApi = require(__serverroot + '/src/api');
const server = app.listen(9000, function(){
	console.log('listening to port 9000 !!');
});
routerModule = require(__serverroot + '/src/routes/routes');
/*si.cpu()
    .then(data => console.log(' si cpu in', data))
    .catch(error => console.error(error));
setInterval(function(){
	osu.cpu.usage().then(data => console.log('cpu usage % ', data));
	osu.mem.used().then(data => console.log('mem info', data));
}, 1000);*/
app.use(routerModule.basePath,routerModule.routerInst);
app.use(express.static(__dirname));
app.get('/', function(req,res) {
  res.sendFile('index.html');
});
const io = require('socket.io')(server);
io.on('connection', function(socket){
	console.log('user connected');
	setInterval(async function(){
		var resources = await resourceApi.getSystemResource({history: false});
		var history = await resourceApi.getSystemResource({history: true});
		socket.emit('timeseries', history);
		redisClient.zadd('cpu_mem_history', new Date().getTime(), resources[0]+':'+resources[1]);
		socket.emit('cpu_mem', resources);
	}, 2000);
});