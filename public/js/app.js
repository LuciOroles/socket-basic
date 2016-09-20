alert("this is it");
		var socket= io();
	socket.on('connection',function(){
		console.log('connected to socket IO front');
	});