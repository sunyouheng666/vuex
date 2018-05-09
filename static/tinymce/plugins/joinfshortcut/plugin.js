/**
 * Justboil.me - a TinyMCE insert short cut text plugin
 * joinfshortcut/plugin.js
 *
 * Released 
 *
 * Author: gao
 * examples: https://www.tinymce.com/docs/api/tinymce/tinymce.plugin/
 */

tinymce.PluginManager.add('joinfshortcut', function(editor, url) {
	var randomId = $('#dynamic-tabs li.active').attr('data-randomid'),
		datatype = 'emailTextListForInsert',
		modalId = 'Modal-Select-ShortCutText_'+randomId,
		htmlStr = '<div class="height-400">'
					+'<table class="table table-hover m-0 tlist common-total-type" colspan="4" id="select-email-text">'
						+'<thead><th class="width-130">主题</th><th class="width-350">内容</th><th></th></thead>'
						+'<tbody></tbody>'
				 	+'</table>'
				 +'</div>'
				 +'<div class="row">'
					+'<div class="col-sm-12">'
						+'<nav class="dataTables_paginate pull-right">'
							+'<ul class="pagination"></ul>'
						+'</nav></div></div>';
		
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
	
	/**
	 * 加载快速文本列表数据
	 * @param {Function} callback 成功后的回调
	 */
	function emailTextDataLoad(callback){
		var _listDomStr = 'table#select-email-text tbody';

		$('#'+modalId).AjaxDataLoad({
			postUrl:'../emailText/selectList',
			datatype:datatype,
			datashow:{//交互数据
				sysDefault:1
			},
			page:1,  //分页数据,当前页
			numPrePage:50,//分页数据,每页数据数量
			contentWrap:'.modal-body',
			content:_listDomStr,
			listtag:'tr',
			callback:function(result){
				enabledLeftTabsBtn();
				//绑定编辑按钮
				$('body').on('click','#'+modalId+' .email-text-edit',function(event){
					event.stopPropagation();
					
					var _this = $(this),
						_tr = _this.parents('tr'),
						_subjectWrap = _tr.find('.short-cut-name'),
						_subject = _subjectWrap.text(),
						_contentWrap = _tr.find('.short-cut-content'),
						_content = _contentWrap.text(),
						_id = _tr.attr('data-id'),
						_callback = function(res){
							_subjectWrap.text(res.subject);
							_contentWrap.text(res.content);
						};
					
					editEmailText(_callback,_id,$.trim(_subject),$.trim(_content));
				});
				
				//绑定删除按钮
				$('body').on('click','#'+modalId+' .email-text-del',function(event){
					event.stopPropagation();
					
					var _this = $(this),
						_tr = _this.parents('tr'),
						_subject = escapeChar(_tr.find('.short-cut-name').text()),
						_id = _tr.attr('data-id'),
						_callback = function(){
							if(_tr.siblings('tr').length == 0){
								emailTextDataLoad();
							}else{
								_tr.remove();
							}
						};
					
					deleteEmailTextList(_id,_subject,_callback);
				});
				
				if(typeof callback === 'function'){//自定义回调
					callback(result);				
				}
			}
		});
	}
	
	/**
	 * 新增或编辑快速文本
	 * @param {Function} callback 交互成功后的回调
	 * @param {String or Number} id 文本id（新建时不传值）
	 * @param {String} subject 文本主题（新建时不传值）
	 * @param {String} content 文本内容（新建时不传值）
	 */
	function editEmailText(callback,id,subject,content){
		var _subject = '',
			_content = '',
			_id = '',
			_title = '新增文本',
			_modalId = 'Modal-New-Text';
		
		if(typeof id !== 'undefined'){
			_id = id;
			_subject = subject;
			_content = content;
			_title = '编辑文本';
			_modalId = 'Modal-Edit-Text';
		}
		
		var _newTextStr = '<form class="form-horizontal height-400">'+
                                '<div class="form-group">'+
                                    '<div class="col-md-12">'+
                                        '<input type="text" class="form-control" placeholder="请输入文本主题" maxlength="50" value="'+_subject+'" >'+
                                        '<span class="help-block"></span>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group height-350">'+
                                    '<div class="col-md-12 height-full">'+
                                        '<textarea class="form-control height-full" placeholder="请输入文本内容" rows="5" maxlength="1000">'+_content+'</textarea>'+
                                        '<span class="help-block"></span>'+
                                    '</div>'+
                                '</div>'+
                            '</form>',
            _saveCallback = function(){
				var $mbody = $('#'+_modalId+' .modal-body'),
					$subject = $mbody.find('input'),
					$content = $mbody.find('textarea');
					
				return saveEmailText(_id,$subject,$content,callback);
			};
            
		confirmPanel(0,_title,_modalId,_newTextStr,_saveCallback,null,null,['保存','关闭']);
	}
	
	/**
	 * 弹出文本选择框
	 * @param {Object} e
	 */
	function pickShortCutText(e) {
		// Open window
		
		if(_EMAIL_SETTING == 1){
			confirmPanel(1,'选择文本',modalId,htmlStr,_newCallback,null,_insertCallback,['新增文本','插入文本','关闭']);
		}else{
			confirmPanel(0,'选择文本',modalId,htmlStr,_insertCallback,null,null,['插入文本','关闭']);
		}

		//绑定选中事件
		$('body').on('click','#'+modalId+' table tbody tr','_'+randomId, selectQuoteListData);
		
		/**
		 * 新建文本回调
		 */
		function _newCallback(){
			editEmailText(function(res){
				var htmlStr = ReturnModel([res],datatype+'EscapeChar'); //返回数据的组装
				var content = $('#'+modalId+' table tbody');
				
				if(content.find('tr').length > 50){
					emailTextDataLoad();
				}else{
					content.find('.nodatatips').remove(); //删除空数据提示
					content.prepend(htmlStr);     //插入到列表中
					content.find('tr:first').trigger('click');
				}
				
			});
			return false;//阻止列表框退出
			
		}
		
		/**
		 * 插入文本回调
		 */
		function _insertCallback(){
			var _selected = $('#'+modalId+' table tr.selected');
			
			if(_selected.length == 0){//提示选择
				showTopMsg('请选择一个文本！',1);
				return false;
			}else{//插入文本
				var _content = _selected.find('td .short-cut-content').text();
				editor.insertContent($.trim(_content));
				showTopMsg('文本插入成功！可继续选择插入',0);
				_selected.removeClass('selected');
				return false;
			}
		}
		
	}

	// Add a button that opens a window
	editor.addButton('joinfshortcut', {
		tooltip: '插入文本',
//		icon: 'image',
		image: STATIC_RESOURCE_SERVER+'/plugins/tinymce/plugins/joinfshortcut/img/short-cut-text.png',
		text: '',
		onclick: pickShortCutText
	});
	
	//绑定弹框shown事件
	$('body').on('shown.bs.modal','#'+modalId,function(){
		emailTextDataLoad();
	});
	
});