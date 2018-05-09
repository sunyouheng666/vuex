/**
 * Justboil.me - a TinyMCE insert short cut text plugin
 * joinfspellchecker/plugin.js
 *
 * Released 
 *
 * Author: gao
 * examples: https://www.tinymce.com/docs/api/tinymce/tinymce.plugin/
 */

tinymce.PluginManager.add('joinfspellchecker', function(editor, url) {
	var randomId = $('#dynamic-tabs li.active').attr('data-randomid'),
		_randomId = '_'+randomId,
		_modalId = 'Modal-Spell-Checker'+_randomId,
		_title = '拼写检查';

	/**
	 * 弹出在线翻译框
	 * @param {Object} e
	 */
	function getSpellCheckerContent(e) {
		var _htmlStr = '',
			_content = getEmailContent(_randomId,{'format':'text'}),
			_data = { 'content': _content },
			paramData = {
				url: '../contentProcess/spellCheck',
				data: JSON.stringify(_data),
				params: { paramsThis: null, paramsI18n: false },
				success: function (result) {
					if (result.result == 'success') {//commonMsg(result),非用户操作，不需要提示
						if(result.data && result.data.length > 0){
							var $data = result.data,
								$htmlStr = '',
								i = 0,
								l = $data.length;
							
							$invalidWord = $data[i].invalidWord;
							$htmlStr = __getHtmlStr($data[i].suggestedWord);
							
							_htmlStr = '<form class="form-horizontal">'+
			                                '<div class="form-group">'+
			                                		'<label class="col-md-3 l-h-34">可能的拼写错误</label>'+
			                                		'<label class="col-md-9 l-h-34 border-1 invalid-word">'+$invalidWord+'</label>'+
			                                '</div>'+
			                                '<div class="form-group m-t-03 m-b-5">'+
			                                		'<label class="col-md-3">建议拼写</label>'+
			                                    '<div class="col-md-9 border-1 p-0 height-200 overflow-y-auto">'+
			                                        '<ul class="suggest-word nav nav-pills nav-stacked nav-sm">'+$htmlStr+'</ul>'+
			                                    '</div>'+
			                                '</div>'+
			                                '<div class="form-group m-b-0">'+
			                                		'<label class="col-md-3"></label>'+
			                                		'<label class="col-md-9 p-0 text-aaa f-w-300">当前第 <span class="text-danger num">'+(i+1)+'</span> 条,共 <span class="text-danger">'+l+'</span> 条</label>'+
			                                '</div>'+
			                            '</form>';
			                confirmPanel(1,_title,_modalId,_htmlStr,ignore,null,revise,['忽略','修改','修改全部','取消']);
				            var reviseAllBtn = $('#'+_modalId+' .modal-footer button').eq(2);
				            reviseAllBtn.on('click',reviseAll);
				            
				            function ignore(){//忽略
				            		__showInvalidWord();
				            		return false;
				            }
				            
							function revise(){//修改
								__replaceWord();
								__showInvalidWord();
								return false;
							}
							
							function reviseAll(){//修改全部
								var _modal = $('#'+_modalId);
								showTopMsg('修改完成!');
								
								_modal.remove();
							}
							
				            function __showInvalidWord(invalidWord,suggestWord){
				            		var _modal = $('#'+_modalId),
				            			_iwordWrap = _modal.find('.invalid-word'),
				            			_swordWrap = _modal.find('.suggest-word'),
				            			_numWrap = _modal.find('span.num');
				            		
				            		if(++i < l){//
				            			_numWrap.text(i+1);
				            			_iwordWrap.text($data[i].invalidWord);
				            			_swordWrap.html(__getHtmlStr($data[i].suggestedWord));
				            		}else{
				            			_modal.modal('hide');
				            		}
				            		
				            }
				            
				            function __replaceWord(){
				            		var _modal = $('#'+_modalId),
				            			_selected = _modal.find('.suggest-word li.active'),
				            			_iword = $data[i].invalidWord,
				            			_sword = _selected.text();
				            		
				            		if(_selected.length > 0){
				            			//replace tinymce content
				            			
				            		}else{
				            			showTopMsg('请选择一个推荐的拼写!');
				            		}
				            		
				            }
							
							/**
							 * 拼接推荐的单词
							 * @param {Object} data 推荐正确的单词
							 * @return {String} _str 返回拼接好的html
							 */
							function __getHtmlStr(data){
								var _str = '',
									i = 0,
									l = data.length,
									_selected = '';
								
								for(i; i<l; i++){
									_selected = i == 0 ? 'active' : '';
									_str += '<li class="'+_selected+'"><a class="text-ellipsis text-43" href="javascript:;" title="'+data[i].word+'">'+data[i].word+'</a></li>';
								}
								
								return _str;
							}
							
							$('body').on('click','#'+_modalId+' .suggest-word li',function(){
	            				var _this = $(this);
	            				
	            				_this.siblings('li.active').removeClass('active');
	            				_this.addClass('active');
	            			});
	            			
						}else{
							showTopMsg('未检测到拼写错误!');
						}
					} else {
						
					}
				}
			};
			
		commonPostAjax(paramData);
		/**
		 * 弹窗打开后,进行交互 
		 */
		$('body').on('shown.bs.modal','#'+_modalId,function(){
			var _this = $(this);
			
			_customModalStyle(_this);
		});
		
		/**
		 * 自定义弹框样式
		 * @param {jQ Object} dom 弹框dom节点
		 */
		function _customModalStyle(dom){
			var _modal = dom;
			
			_modal.find('.modal-body').addClass('height-300');
		}
	}
	
	// Add a button that opens a window
	editor.addButton('joinfspellchecker', {
		tooltip: _title,
		image: STATIC_RESOURCE_SERVER+'/plugins/tinymce/plugins/joinfspellchecker/img/spellchecker.png',
		onclick: getSpellCheckerContent
	});

});