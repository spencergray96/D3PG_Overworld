var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use("/phaser",express.static(__dirname + "/D3PG_Overworld/node_modules/phaser"));
app.use("/assets",express.static(__dirname + "/D3PG_Overworld/assets"));
app.use("/state",express.static(__dirname + "/D3PG_Overworld/state"));
app.use("/objects",express.static(__dirname + "/D3PG_Overworld/objects"));
app.use("/misc",express.static(__dirname + "/D3PG_Overworld/misc"));
console.log(__dirname);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/D3PG_Overworld/index.html');
});

server.listen(8080,function(){ // Listens to port 8080
    console.log('Listening on '+server.address().port);
});