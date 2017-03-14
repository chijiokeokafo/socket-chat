window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on ('message', function (data) {
		if (data.message) {
			messages.push(data);
			var html = '';
			for (var i=0; i<messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Admin') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
		} else {
			console.log("there is a problem:", data);
			alert('Type something!');
		}
	});

	sendButton.onclick = sendMessage = function() {
		if(name.value == "") {
			alert("Please type your name!");

		} else {
			var text = field.value;
			socket.emit('send', { message: text, username: name.value });
			field.value = "";
		}
		
	};
}
// $(document).ready(function() {
// 	$("#field").keyup(function(e) {
// 		if(e.keycode == 13) {
// 			sendMessage();
// 		}
// 	});
// });

document.onkeydown = function(e) {
if (e.keyCode === 13 && ['name', 'field'].indexOf(document.activeElement.id) > -1 ) { sendMessage(); };
};