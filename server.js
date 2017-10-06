var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use("/phaser",express.static(__dirname + "/node_modules/phaser"));
app.use("/assets",express.static(__dirname + "/assets"));
app.use("/state",express.static(__dirname + "/state"));
app.use("/character",express.static(__dirname + "/character"));
app.use("/misc",express.static(__dirname + "/misc"));
console.log(__dirname);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.listen(8080,function(){ // Listens to port 8080
    console.log('Listening on '+server.address().port);
});