var name= getUrlParams().name, room = getUrlParams().room;


var socket= io();
	socket.on('connect',function(){
		console.log('connected to socket IO front');
	});



	socket.on('message',function (message) {
		console.log('new message');
		console.log(message.text);
		var momentTimeStamp = moment.utc(message.timestamp);
		var $message = $('.meesages');

		$(".messages").append('<p><strong>'+ momentTimeStamp.local().format('h:mm a')  + '</strong>: ' + message.text + '</p>')
	});
// handle submiting of new message
	var $form=$('#message-form');

		$form.on('submit',function(event){
			event.preventDefault();
			if ($form.find("input[name='message']").val().length>0) {
				socket.emit('message', {
				text : $form.find("input[name='message']").val(),
				name : name
			});	

				$form.find("input[name='message']").val("");
			}
			


		});
