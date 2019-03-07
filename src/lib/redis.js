const redis = require('redis');
const client = redis.createClient();

function getClient(){
	return client;
}

module.exports.getClient = getClient;