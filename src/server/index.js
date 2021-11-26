'use strict'; // eslint-disable-line

const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');
const monitor = require('os-monitor');
const Queue = require('./queue');
const exec = require('child_process').exec;
const checkBufferForNotification = require('./modules/alerting');

const NUM_CPUS = os.cpus().length;
const LOAD_ALERT_THRESHOLD = Math.ceil(NUM_CPUS / 3);

const history = new Queue();
const eventBuffer = [];
const notifications = [];

const listen = () => {
  server.listen(3000, () => {
    console.log('Server listening on port 3000...'); // eslint-disable-line
  });
};

// Broadcast monitor events
const handleMonitor = (e) => {
  const dataPoint = {
    loadavg: e.loadavg[0], // load average for 1 minute
    timestamp: Date.now(),
  };

  history.enqueue(dataPoint);
  if (isFull(history.toArray(), monitor.minutes(10))) {
    history.dequeue();
  }

  eventBuffer.push(dataPoint);
  if (isFull(eventBuffer, monitor.minutes(2))) {
    const notification = checkBufferForNotification(eventBuffer, notifications[0], LOAD_ALERT_THRESHOLD);
    if (notification) {
      notifications.unshift(notification);
      io.emit('notification', notification);
    }
    eventBuffer.length = 0; // reset buffer
  }

  io.emit('monitor', history.toArray());
};

const isFull = (array, deltaMaxTime) => {
  const oldest = array[0].timestamp;
  const newest = array[array.length - 1].timestamp;
  return newest - oldest >= deltaMaxTime;
};

// Route to index.html
app.use('/', express.static('public'));

// Start os monitor
monitor.start({
  delay: monitor.seconds(10),
  immediate: true,
});

// Listen to monitor events
monitor.on('monitor', handleMonitor);

// Setup socket connection with client
io.on('connection', (client) => {
  client.emit('initialState', {
    serverInfo: {
      numCores: NUM_CPUS,
      loadThreshold: LOAD_ALERT_THRESHOLD,
    },
    history: history.toArray(),
    notifications,
  });

  client.on('startIncreaseLoad', () => {
    exec('cat /dev/zero > /dev/null');
  });

  client.on('stopIncreaseLoad', () => {
    exec('killall cat');
  });
});

// Start server
listen();

module.exports = { checkBufferForNotification };
