const express = require('express');
const si = require('systeminformation');
const osu = require('node-os-utils');
const app = express();
global.__serverroot = __dirname;
const resourceApi = require(__serverroot + '/api');
const server = app.listen(9000, function(){
	console.log('listening to port 9000 !!');
});
routerModule = require(__serverroot + '/routes/routes');
/*si.cpu()
    .then(data => console.log(' si cpu in', data))
    .catch(error => console.error(error));
setInterval(function(){
	osu.cpu.usage().then(data => console.log('cpu usage % ', data));
	osu.mem.used().then(data => console.log('mem info', data));
}, 1000);*/
app.use(routerModule.basePath,routerModule.routerInst);
const io = require('socket.io')(server);
io.on('connection', async function(socket){
	console.log('user connected');
	var resources = await resourceApi.getSystemResource();
	setInterval(function(){
		socket.emit('cpu_mem', resources);
	}, 1000);
});