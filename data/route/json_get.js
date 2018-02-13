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
		
		var _path = 'static' + req.path;
		var q = req.query || {};
		var data = app.loadJSON('static' + req.path);
		
		if(q.format && q.format =='jsonp') {
			
			//?format=jsonp&callback=<function name>
			res.jsonp(data);
			
		} else {
			
			res.json(data);
			
		}
		
	};
}

module.exports = _;