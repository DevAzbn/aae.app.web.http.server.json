'use strict';

/*
sockets
*/
var wsport = 17003;
/*
/sockets
*/


var randstr = function(l) {
	l = l > 0 ? l : 36;
	return (Math.random().toString(l).split('.'))[1];// + '' + (new Date().getTime());
};

var field_editor = {
	
	buildFieldMenu : function(field, is_root) {
		
		var menu = $('<div/>', {
			class : 'btn-group __menu',
			role : 'group',
		});
		
		var a_add = $('<a/>', {
			class : 'btn btn-success btn-sm __btn-add',
			html : 'Доб.',
		});
		
		//var a_copy = $('<a/>', {
		//	class : 'btn btn-primary btn-sm __btn-copy',
		//	html : 'Дубл.',
		//});
		
		var a_remove = $('<a/>', {
			class : 'btn btn-danger btn-sm __btn-remove',
			html : 'Уд.',
		});
		
		
		a_add.appendTo(menu);
		if(!is_root) {
			//a_copy.appendTo(menu);
			a_remove.appendTo(menu);
		} else {
			a_remove
				.empty()
				.remove()
			;
			//a_copy
			//	.empty()
			//	.remove()
			//;
		}
		
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
		
		var __name = prompt('Введите name поля', 'field_' + randstr());
		
		//if(__name != '') {
		if(1) {
			
			var __cont = cont.closest('.__field');
			var __prev_name = __cont.attr('data-name') || '';
			
			if(__prev_name != '') {
				__name = __prev_name + '[' + __name + ']';
			}
			
			var field = $('<div/>', {
				class : '__field',
				'data-name' : __name,
			});
			
			var field__item = $('<div/>', {
				class : 'form-group __item',
			});
			
			var field__label = $('<label/>', {
				class : '__label',
				html : __name,
			});
			
			var field__input =  $('<input/>', {
				class : 'form-control __input',
				name : __name,
				type : 'text',
				placeholder : 'Значение поля ' + __name,
				value : '',
			});
			
			var field__fields = $('<div/>', {
				class : '__fields',
			});
			
			field__label.appendTo(field__item);
			field__input.appendTo(field__item);
			field__item.appendTo(field);
			field__fields.appendTo(field);
			
			this.buildFieldMenu(field);
			
			field.appendTo(cont.children('.__fields'));
			
			cont.children('.__item')
				.find('.__input')
					.empty()
					.remove()
			;
			
			field__input
				.trigger('focus')
			;
			
		}
		
	},
	
	removeField : function(field) {
		field
			.empty()
			.remove()
		;
	},
	
}

$(function() {
	
	var __body = $(document.body);
	
	var __form = __body.find('form.azbn7__json-edit-form');
	var __form_s = __body.find('form.azbn7__socket-io-form');
	var __prefix = __form.attr('data-prefix') || '/json/';
	var __pre = __body.find('.azbn7__json-viewer');
	
	__body.on('keyup.azbn7 blur.azbn7', '.azbn7__form-action-change-input', null, function(){
		
		var input = $(this);
		var val = input.val();
		
		__form.attr('action', __prefix + val);
		
	});
	
	__body
		.find('.azbn7__form-action-change-input')
			.val(randstr())
			.trigger('blur.azbn7')
	;
	
	/*
	__body.on('dblclick.azbn7', '.__field', null, function(){
		
		field_editor.addField($(this));
		
	});
	*/
	
	//field_editor.addField(__form.children('.__field').eq(0));
	
	__body.on('mouseover.azbn7', '.__field', null, function(){
		
		//field_editor.buildFieldMenu($(this));
		
	});
	
	__body.on('mouseout.azbn7', '.__field', null, function(){
		
		//field_editor.destroyFieldMenu($(this));
		
	});
	
	__body.on('click.azbn7', '.__field .__menu .__btn-add', null, function(){
		
		field_editor.addField($(this).closest('.__field'));
		
	});
	
	__body.on('click.azbn7', '.__field .__menu .__btn-remove', null, function(){
		
		if(confirm('Удалить поле?')) {
			
			field_editor.removeField($(this).closest('.__field'));
			
			__pre.html(JSON.stringify(__form.serializeObject(), null, '	'));
			
		}
		
	});
	
	__body.on('click.azbn7', '.__field .__menu .__btn-copy', null, function(){
		
		var __field = $(this).closest('.__field');
		
		__field
			.clone(true)
				.insertAfter(__field)
		;
		
	});
	
	__body.on('keyup.azbn7 blur.azbn7', '.__field .__item .__input', null, function(){
		
		__pre.html(JSON.stringify(__form.serializeObject(), null, '	'));
		
	});
	
	field_editor.buildFieldMenu(__form.children('.__field').eq(0), true);
	
	__body.on('submit.azbn7', '.azbn7__json-edit-form', function(event){
		event.preventDefault();
		
		var form = $(this);
		var _action = form.attr('action') || '';
		
		$.post(_action, form.serialize(), function(data){
			
			console.dir(data);
			
			//window.location.reload();
			
			__body
				.find('.azbn7__form-action-change-input')
					.val(randstr())
					.trigger('blur.azbn7')
			;
			
			__form.children('.__field').children('.__fields').empty();
			
			__pre.html(JSON.stringify(__form.serializeObject(), null, '	'));
			
		});
		
	});
	





	var socket = io.connect('http://localhost:' + wsport);
	var __chat_texts = __body.find('.azbn7__chat-texts');
	var __chat_input = __body.find('.azbn7__chat-input');

	socket.on('server.event', function(msg){
		__chat_texts.val(__chat_texts.val() + msg.text + '\n');
	});

	socket.on('you.connect', function(userName){
		__chat_texts.val(__chat_texts.val() + 'You\'r username => ' + userName + '\n');
	});

	socket.on('server.client.connect', function(userName){
		__chat_texts.val(__chat_texts.val() + userName + ' connected!\n');
	});

	socket.on('message.text', function(msg, name){
		__chat_texts.val(__chat_texts.val() + name + ' : '+ msg +'\n');
	});

	__body.on('submit.azbn7', '.azbn7__socket-io-form', function(event){
		event.preventDefault();
		var message = __chat_input.val();
		socket.emit('message.text', message);
		__chat_input
			.val(null)
			.trigger('click')
		;
	});

	
});