**Instructions to install and run CPU and RAM Monitor App**
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
$cd contest
$sudo npm install
```
Start Services:
```
$node app.js
```

and load localhost:9000 in browser