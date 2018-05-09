/**
 * Justboil.me - a TinyMCE image upload plugin
 * jbimages/plugin.js
 *
 * Released under Creative Commons Attribution 3.0 Unported License
 *
 * License: http://creativecommons.org/licenses/by/3.0/
 * Plugin info: http://justboil.me/
 * Author: Viktor Kuzhelnyi
 *
 * Version: 2.3 released 23/06/2013
 */

tinymce.PluginManager.add('joinfimage', function(editor, url) {
	function escape2Html(str) {
		var arrEntities = {
			'lt': '<',
			'gt': '>',
			'nbsp': ' ',
			'amp': '&',
			'quot': '"'
		};
		return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
			return arrEntities[t];
		});
	}

	function pickImage(e) {
		var dom = editor.dom;
		var inputFile = $('<input type="file" name="imgFile" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp" multiple="multiple">');
		inputFile.on('change', function() {
			var form = $("<form/>", {
				action: editor.settings.images_upload_url,
				style: 'display:none',
				method: 'post',
				enctype: 'multipart/form-data'
			});
			form.append(inputFile);
			form.ajaxSubmit({
				beforeSubmit: function() {
					//showTopMsg('图片上传中...',2,true);
					return true;
				},
				success: function(data) {
					//showTopMsg('');
					data = escape2Html(data);
					data = $.parseJSON(data);
					if(data.url) {
						editor.focus();
						editor.selection.setContent(dom.createHTML('img', {
							src: data.url,
							'data-code': data.filename //by:gxl 用于给图片属性code赋值
						}));
					}
					else if(data.state && data.state == 'fail'){
						//alertShow(data.msg);
						MessageBox.alert(data.msg);
					}
				},
				error: function(res) {
					//showTopMsg('上传失败',1);
					console.log('error:',res);
				}
			});
		});

		inputFile.click();
	}

	editor.addCommand("mceUploadImageEditor", pickImage);

	// Add a button that opens a window
	editor.addButton('joinfimage', {
		tooltip: '插入图片',
		icon: 'image',
		text: '',
		onclick: pickImage
	});
	// Adds a menu item to the tools menu
	editor.addMenuItem('joinfimage', {
		text: 'Upload image',
		icon: 'image',
		context: 'insert',
		onclick: pickImage
	});
});