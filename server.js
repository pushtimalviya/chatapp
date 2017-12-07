var PORT = 8080;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io =  require('socket.io')(http);

app.use(express.static(__dirname+'/public'));
app.get('/',function (req,res) {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection',function(socket){
    console.log('user connected via soket.io');


    socket.on('message', function(message){
        console.log('message received'+' '+ message.text);
        //socket.broadcast.emit('message',message);
        io.emit('message',message);
    });

        socket.emit('message',{
        text:'message sent welcome to chat app'
    });
});


http.listen(PORT, function () {
    console.log('server started');
});

