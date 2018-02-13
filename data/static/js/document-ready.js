'use strict';

var field_editor = {
	
	buildFieldMenu : function(field) {
		
		var menu = $('<div/>', {
			class : '__menu',
		});
		
		menu.appendTo(field);
		
	},
	
	destroyFieldMenu : function(field) {
		
		field
			.find('.__menu')
				.empty()
				.remove()
		;
		
	},
	
	addField : function(cont) {
		
		var __name = prompt('Введите name поля', 'k');
		
		var field = $('<div/>', {
			class : '__field',
			'data-name' : __name,
		});
		
		var field__item = $('<div/>', {
			class : '__item',
		});
		
		var field__input =  $('<input/>', {
			class : '__input',
			name : __name,
			type : 'text',
			placeholder : __name,
			value : '',
		});
		
		var field__fields = $('<div/>', {
			class : '__fields',
		});
		
		field__input.appendTo(field__item);
		field__item.appendTo(field);
		field__fields.appendTo(field);
		
		this.buildFieldMenu(field);
		
		field.appendTo(cont.children('.__fields'));
		
		cont.children('.__item')
			.empty()
			.remove()
		;
		
	},
	
	removeField : function(field) {
		
	},
	
}

$(function() {
	
	var __body = $(document.body);
	
	var __form = __body.find('form.azbn7__json-edit-form');
	var __prefix = __form.attr('data-prefix') || '/json/';
	
	__body.on('keyup.azbn7 blur.azbn7', '.azbn7__form-action-change-input', null, function(){
		
		var input = $(this);
		var val = input.val();
		
		__form.attr('action', __prefix + val);
		
	});
	
	__body.find('.azbn7__form-action-change-input').trigger('blur.azbn7');
	
	__body.on('dblclick.azbn7', 'form.azbn7__json-edit-form', null, function(){
		
		field_editor.addField(__form);
		
	});
	
	
	__body.on('mouseover.azbn7', 'form.azbn7__json-edit-form .__fields .__field', null, function(){
		
		field_editor.buildFieldMenu($(this));
		
	});
	
	__body.on('mouseout.azbn7', 'form.azbn7__json-edit-form .__fields .__field', null, function(){
		
		field_editor.destroyFieldMenu($(this));
		
	});
	
	
	//addField(__form);
	
});