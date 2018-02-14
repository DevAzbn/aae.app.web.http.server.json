'use strict';

var path = require('path');

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		var _path = req.query.path || '';
		
		var _dir = path.normalize(__dirname + '/../json/' + _path);
		
		var _res = [];
		
		azbn.mdl('fs/tree').list(_dir, function(err, results){

			res.send(results.filter(function(item){
				return /(.json)$/.test(item);
			}).map(function(item){
				return item.replace(new RegExp('(.json)$', 'ig'), '');
			}));
			
		});
		
	};
}

//app.loadJSON('../config/yandex-app'),

module.exports = _;