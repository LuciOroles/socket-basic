var socket= io();
	socket.on('connect',function(){
		console.log('connected to socket IO front');
	});



	socket.on('message',function (message) {
		console.log('new message');
		console.log(message.text);
		$(".messages").append('<p>' + message.text + '</p>')
	});
// handle submiting of new message
	var $form=$('#message-form');

		$form.on('submit',function(event){
			event.preventDefault();
			if ($form.find("input[name='message']").val().length>0) {
				socket.emit('message', {
				text : $form.find("input[name='message']").val()
			});	

				$form.find("input[name='message']").val("");
			}
			


		});
