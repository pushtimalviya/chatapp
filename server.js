var PORT = 8080;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io =  require('socket.io')(http);
var moment = require('moment');
var clientInfo = {};
app.use(express.static(__dirname+'/public'));
app.get('/',function (req,res) {
    res.sendFile(__dirname + '/public/index.html')
});

function sendCurrentUsers(socket){
  var info = clientInfo[socket.id];
  var users = [];

  if (typeof info === 'undefined'){
      return;
  }

  Object.keys(clientInfo).forEach( function (socketId) {
      var userInfo = clientInfo[socketId];

      if(info.room == userInfo.room){
          users.push(userInfo.name);
      }
  });

    socket.emit('message', {
        name:'System',
        text:'currentuser '+ users.join(', '),
        timestamp:moment().valueOf()
    });

}

io.on('connection',function(socket){
    console.log('user connected via soket.io');
    socket.on('disconnect', function(){

        if( typeof clientInfo !== 'undefined'){
            socket.leave(clientInfo[socket.id].room);
            io.to(clientInfo[socket.id].room).emit('message',{
                name:'System',
                text: clientInfo[socket.id].name + 'has left',
                timestamp:moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('message', function(message){
        console.log('message received'+' '+ message.text);
        //socket.broadcast.emit('message',message);

        if(message.text === '@currentuser'){

            sendCurrentUsers(socket);

        } else {
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('message', message);
        }
    });



    socket.on('joinroom',function (req) {
        clientInfo[socket.id]=req;  //clientInfo.name = 'test';
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message',{
            name:'System',
            text: req.name + 'has joined',
            timestamp:moment().valueOf()
        })

    });
        socket.emit('message',{
            name:'chatserver',
            text:'message sent welcome to chat app',
            moment: moment.valueOf()
    });
});


http.listen(PORT, function () {
    console.log('server started');
});

