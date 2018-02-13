'use strict';

$(function() {
	
	var __body = $(document.body);
	
	var __form = __body.find('form.azbn7__json-edit-form');
	var __prefix = __form.attr('data-prefix') || '/json/';
	
	__body.on('keyup.azbn7', '.azbn7__form-action-change-input', null, function(){
		
		var input = $(this);
		var val = input.val();
		
		__form.attr('action', __prefix + val);
		
	});
	
	__body.find('.azbn7__form-action-change-input').trigger('keyup.azbn7');
	
});