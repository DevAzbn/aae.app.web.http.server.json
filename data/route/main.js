/*
обработчик запроса
*/

function _(app, azbn) {
	
	azbn.mdl('express').set('views', azbn.mdl('config').path.pug);
	azbn.mdl('express').set('view engine', 'pug');
	
	azbn.mdl('express').get('/', (new require('./index')(app, azbn)));
	azbn.mdl('express').get('/json/*', (new require('./json_get')(app, azbn)));
	azbn.mdl('express').post('/json/*', (new require('./json_post')(app, azbn)));
	//azbn.mdl('express').put('/', (new require('./route/event/item/put')(app, azbn)));
	//azbn.mdl('express').delete('/event/:year/:month/:day/', (new require('./route/event/item/delete')(app, azbn)));
	
}

module.exports = _;