 var PORT = process.env.PORT || 3021;
 var express = require('express');
 var app = express();
 var http = require('http').Server(app);
 var io = require('socket.io')(http);

 app.use(express.static(__dirname + '/public'));
 io.on('connection', function(socket) {
     console.log('user connected via socket.io');

     socket.on('message', function(message) {
         console.log("message rec :" + message.text);
         //socket.broadcast.emit('message', message); emiting to all but emitter
           io.emit('message', message); // emit to
		});


	  socket.emit('message', {
         text: 'Welcome to the chat app'
     });
});
 http.listen(PORT, function() {
     console.log('server started on ' + PORT);
 });
