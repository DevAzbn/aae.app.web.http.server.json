'use strict';

var NeDB = require('nedb');

function _(app, azbn) {
	
	app.log.info(__filename);
	
	var __lastmoment = 0;
	
	var reloadDB = function(datestr) {
		
		azbn.setMdl('nedb.logger.json', new NeDB({
			filename : azbn.mdl('config').path.nedb + '/logs/logger/' + datestr + '.nedb',
		}));
		
		azbn.mdl('nedb.logger.json').loadDatabase();
		
	}
	
	var needReloadDB = function() {
		
		var nowdate = new Date();
		
		var datestr = '';
		var y = '' + (nowdate.getFullYear() + 0);
		var m = '' + (nowdate.getMonth() + 1);
		var d = '' + (nowdate.getDate() + 0);
		//var h = '' + (nowdate.getHours() + 0);
		//var i = '' + (nowdate.getMinutes() + 0);
		
		if(m.length === 1) {
			m = '0' + m;
		}
		
		if(d.length === 1) {
			d = '0' + d;
		}
		
		datestr = parseInt(datestr + y + m + d);
		
		if(datestr > __lastmoment) {
			
			__lastmoment = datestr;
			
			reloadDB(datestr);
			
		} else {
			
		}
		
	}
	
	needReloadDB();
	
	return function(req, res, next) {
		
		if(req.path.indexOf('/json') == 0) {
			
			needReloadDB();
			
			azbn.mdl('nedb.logger.json').insert({
				created_at : azbn.now(),
				created_at_str : azbn.formattime(),
				method : req.method,
				url : req.url,
				ip : req.ip,
				ips : req.ips || [],
				query : req.query || {},
				body : req.body || {},
			});
			
		}
		
		next();
		
	};
}

//app.loadJSON('../config/yandex-app'),

module.exports = _;