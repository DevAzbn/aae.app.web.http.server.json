'use strict';

var path = require('path');

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		var _path = req.query.path || '';
		
		var _dir = path.normalize(__dirname + '/../json/' + _path);
		
		var _res = [];
		
		azbn.mdl('fs/tree').walk(_dir, function(file, stat){
			
			if (stat && stat.isDirectory()) {
				
			} else if(stat) {
				_res.push(path.normalize(file.replace(_dir, '')));
			}
			
		}, function(err, results){
			
			res.send(_res);
			
		});
		
	};
}

//app.loadJSON('../config/yandex-app'),

module.exports = _;