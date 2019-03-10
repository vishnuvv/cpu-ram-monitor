**Realtime cpu and ram monitor with live charts**

**Instructions to install and run CPU and RAM Monitor App on ubuntu machine**

![alt text](https://github.com/vishnuvv/cpu-ram-monitor/blob/master/contest_cpu_ram.gif)

Consists of bar and line charts where bar chart represent the live CPU/Memory and
line charts displays last 5 minutes data

node js server

redis timeseries database

chart js chart library

Once you unzip the repo execute the below commands to 
install prerequisites like node.js and redis and run the app
```
$sudo apt install curl
$curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
$sudo apt install nodejs
$sudo apt-get install redis-server
```
Start the redis-server
```
$sudo service redis-server start
```
To download and install dependent node modules in contest directory
```
$cd cpu-ram-monitor
$sudo npm install
```
Start Services:
```
$node app.js
```

and load localhost:9000 in browser
