 var PORT = process.env.PORT || 3021;
 var express = require('express');
 var app = express();
 var http = require('http').Server(app);
 var io = require('socket.io')(http);
 var moment = require('moment');
 var clientInfo ={};
 app.use(express.static(__dirname + '/public'));



 io.on('connection', function(socket) {
     console.log('user connected via socket.io');

     socket.on('disconnect', function(){
     		var userData = clientInfo[socket.id];
     		if (typeof userData !== 'undefined' ) {
     			socket.leave(clientInfo[socket.id]);
     			io.to(userData.room).emit('message', {
     				name : 'System',
		     		text :  userData.name + ' has left!',
		     		timestamp : moment().valueOf()

     			});
     			delete clientInfo[socket.id];
			}
     });

     socket.on('joinRoom', function(req) {
     	console.log(req + '\t' + req.name);
     	clientInfo[socket.id] = req;
     	socket.join(req.room);
     	socket.broadcast.to(req.room).emit('message',{
     		name : 'System',
     		text : req.name + ' has joined!',
     		timestamp : moment().valueOf()
     	});
     	}
     );

     socket.on('message', function(message) {
         console.log("message rec :" + message.text);
         //socket.broadcast.emit('message', message); emiting to all but emitter

         	message.timestamp = moment.valueOf();
           io.to(clientInfo[socket.id].room).emit('message', message); // emit to
		});


	  socket.emit('message', {
	  	name: 'System',
         text: 'Welcome to the chat app',
         timestamp : moment().valueOf()
     });
});
 http.listen(PORT, function() {
     console.log('server started on ' + PORT);
 });
