'use strict';

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		res.render('add', {
			html : {
				head : {
					title : 'Create JSON',
				},
			},
			profile : req.session.profile || {},
			data : {
				
			},
		});
		
	};
}

//app.loadJSON('../config/yandex-app'),

module.exports = _;