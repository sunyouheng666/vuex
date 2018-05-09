/**
 * Justboil.me - a TinyMCE insert short cut text plugin
 * joinftranslate/plugin.js
 *
 * Released 
 *
 * Author: gao
 * examples: https://www.tinymce.com/docs/api/tinymce/tinymce.plugin/
 */

tinymce.PluginManager.add('joinftranslate', function(editor, url) {
	var randomId = $('#dynamic-tabs li.active').attr('data-randomid'),
		modalId = 'Modal-Translate_'+randomId,
		uriLength = 8000;

	// var isFirefox = window.navigator.userAgent.indexOf("Firefox"); 
	// var isChrome = window.navigator.userAgent.indexOf("Chrome");
	// var isIES = navigator.userAgent.toUpperCase().indexOf("MSIE");
	// if(isChrome > -1){
	// 	uriLength = 8000;
	// }else if(isFirefox > -1){
	// 	uriLength = 10000;
	// }else if(isIES > -1){
	// 	uriLength = 2000;
	// }

	/**
	 * 弹出在线翻译框
	 * @param {Object} e
	 */
	function getTranslateContent(e) {
		var _content = getEmailContent('_'+randomId,{'format':'text'}),
			_reg = /\n/g;//换行符

		_content = _content.replace(_reg,''); //过滤换行符
		_content = handleUriCode(_content); //转换uri编码
		
		var	_href = 'https://fanyi.baidu.com/translate?query='+_content+'&lang=auto2zh#en/zh/'+_content,
			_htmlStr = '<iframe class="no-border" style="margin-top:-65px; margin-left:-125px; margin-bottom:-100px; height:645px; width:1160px" src="'+_href+'" />';
		confirmPanel(2,'在线翻译',modalId,_htmlStr,null,null,null,['关闭']);
		
	}

	/**
	 * 转成uri编码,按照指定长度截取,并通过判断再次截取最后不完整的uri编码
	 * @param {String} code 需要转码的字符
	 * @param {String} _newCode 返回转码后的字符
	 */
	function handleUriCode(code){
		var _newCode = encodeURIComponent(code);
		if(_newCode.length > uriLength){//根据不同的浏览器截取合理的长度
			_newCode = _newCode.slice(0,uriLength); // 截取

			var _lastIndex = _newCode.lastIndexOf('%'); //再次截取最后不完整的uri编码
			if((_newCode.length - _lastIndex) < 3){
				_newCode = _newCode.slice(0,_lastIndex);

				_newCode = checkUriCode(_newCode);
			}

			showTopMsg('内容过长,只能截取并翻译前面一部分',1);
		}

		return _newCode;
	}

	/**
	  * 通过解码检测是否正确,并截掉所以不完整编码
	  *
	  **/
	function checkUriCode(code){
		var _newCode = code;
		try{//二次检测,是否正确,不正确再截掉3个字符
		  decodeURIComponent(_newCode);
		}
		catch(err){
		  _newCode = _newCode.slice(0,_newCode.length-3);
		  _newCode = checkUriCode(_newCode);
		}

		return _newCode;
	}

	// Add a button that opens a window
	editor.addButton('joinftranslate', {
		tooltip: '在线翻译',
		image: STATIC_RESOURCE_SERVER+'/plugins/tinymce/plugins/joinftranslate/img/translate.png',
		onclick: getTranslateContent
	});
	
});