'use strict';

var path = require('path');

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		//var method = req.body.method || 'default';
		
		var _path = 'static' + req.path;
		var _dir = path.dirname(_path);
		
		app.mkDataDir(_dir);
		
		//req.baseUrl
		//req.originalUrl
		app.saveJSON('static' + req.path, req.body);
		
		res.append('Access-Control-Allow-Origin', '*');
		
		res.redirect(302, req.path);//+ '.json'
		
	};
}

module.exports = _;