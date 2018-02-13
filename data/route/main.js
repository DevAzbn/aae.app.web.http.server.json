/*
обработчик запроса
*/

function _(app, azbn) {
	
	azbn.mdl('express').set('views', azbn.mdl('config').path.pug);
	azbn.mdl('express').set('view engine', 'pug');
	
	azbn.mdl('express').use((new require('./logger.js')(app, azbn)));
	azbn.mdl('express').get('/', (new require('./index')(app, azbn)));
	azbn.mdl('express').get('/json/*', (new require('./json_get')(app, azbn)));
	azbn.mdl('express').post('/json/*', (new require('./json_post')(app, azbn)));

	//azbn.mdl('express').put('/', (new require('./route/event/item/put')(app, azbn)));
	//azbn.mdl('express').delete('/event/:year/:month/:day/', (new require('./route/event/item/delete')(app, azbn)));
	
	azbn.mdl('io').on('connection', function(socket){

		var name = (socket.id).toString();//.substr(1,4);

		socket.broadcast.emit('server.client.connect', name);

		socket.emit('you.connect', name);

		socket.on('message.text', function(msg){
			azbn.mdl('io').sockets.emit('message.text', msg, name);
		});

		socket.on('disconnect', function(){
			azbn.mdl('io').sockets.emit('server.client.disconnect', name);
		});

	});

}

module.exports = _;