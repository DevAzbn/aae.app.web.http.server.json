'use strict';

var path = require('path');

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		//var method = req.body.method || 'default';
		/*
		req.body = POST
		req.query = GET
		req.params = in path
		*/
		
		app.clearRequireCache(require);
		
		var _path = '.' + req.path;
		var q = req.query || {};
		var data = app.loadJSON('.' + req.path);
		
		res.append('Access-Control-Allow-Origin', '*');
		
		if(q.format && q.format =='jsonp') {
			
			//?format=jsonp&callback=<function name>
			res.jsonp(data);
			
		} else {
			
			res.json(data);
			
		}
		
	};
}

module.exports = _;