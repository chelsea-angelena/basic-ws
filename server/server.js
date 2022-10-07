const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/client'));

const expressServer = app.listen(5000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
	socket.emit('messageFromServer', { data: 'Welcome, connected to server' });
	socket.on('messageToServer', (data) => {});
	socket.on('newMessageToServer', (data) => {
		io.emit('messageToClient', { data: data.message });
	});
});
