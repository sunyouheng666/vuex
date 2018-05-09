(function($, window, document, undefined) {
	function isMail(a) {
		var b = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(b.test(a)) {
			return true;
		} else {
			return false;
		}
	}
	function canAdd(o, v) {
		var vals = o.getInputValue();
		var valarr = vals.split(",");
		var find = false;
		$.each(valarr, function(i, data) {
			if(data == v) {
				find = true;
				return false;
			}
		});
		return !find;
	}
	function trimStr(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	function appendSpan(input, container) {
		var inputVal = trimStr(input.val());
		if(inputVal.length > 0 && isMail(inputVal) && canAdd(container, inputVal)) {
			var span = $("<div class=\"one\"><span class=\"addr\" title=\"" + inputVal + "\">" + inputVal + "</span>,</div>");
			span.insertBefore(input);
			span.on("click", function(e) {
				e.stopPropagation();
				$(this).parent().find(".select").removeClass("select");
				$(this).addClass("select");
				input.focus();
			});
			input.val("");
			resetInputPosition(container,input);
		}
	}

	function appendSpanFromValue(inputVal, input, container,isMail) {
		var isMailtemp = true ;
		var span = '';
		 if (isMail==null || !isMail) {
		 	  isMailtemp = isMail(inputVal);
		 }
		if(inputVal.length > 0 && isMailtemp && canAdd(container, inputVal)) {
			var name = '',email = '';
			if(inputVal.indexOf("<") != -1) {
				var num = inputVal.indexOf("<") ;
				name  = inputVal.substring(0, num+1);
				email  = inputVal.substring(num+1, inputVal.length);
				email =' ' +email;
				span = $("<div class=\"one\"><span class=\"addr\" title=\"" + inputVal + "\">" + name + email 
				+ "</span>,</div>");
			}else{
				span = $("<div class=\"one\"><span class=\"addr\" title=\"" + inputVal + "\">" + inputVal 
				+ "</span>,</div>");
			}
			
			
			span.insertBefore(input);
			span.on("click", function(e) {
				e.stopPropagation();
				$(this).parent().find(".select").removeClass("select");
				$(this).addClass("select");
				input.focus();
			});
			input.val("");
			resetInputPosition(container,input);
		}
	}
	function resetInputPosition($container,input){
		input.focus();
		var lastItem = $container.find(".one").last();
		if(lastItem.length>0){ 
			var width = $container.width()-(lastItem.position().left + lastItem.width())+100;
			if(width>30){
				input.width(width);
			}
			else{
				input.width("80%");
			}
		}
		else{
			input.width("80%");
		}
	}
	function handleRemove(input,$container) {
		if(input.val().length != 0) {
			return;
		}
		if($container.find(".select").length == 0) {
			$container.find(".one").last().addClass("select");
		} else {
			if($container.find(".select").first().html() != null) {
				$container.find(".select").remove();
				resetInputPosition($container, input);
			}
		}
	}
	function isAndroid(){
		var u = navigator.userAgent; 
 		var ua = navigator.userAgent.toLowerCase(); 
 		var isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1;
 		return isAndroid;
	}
	$.fn.emailInput = function() {
		var $container = $(this);
		var input = $container.find("input");
		if(input.length == 0) {
			$container.append("<input v-show=\"showInput\" type=\"text\" id=\"inputEmail_" + $(this).attr("id") + "\" value=\"\"/>");
			input = $container.find("input");
			input.on("keydown", function(event) {
				if(event.keyCode == 13||event.keyCode == 32) {
					appendSpan(input, $container);
				} else if(event.keyCode == 8) {
					if(input.val().length != 0) {
						return true;
					}
					if($container.find(".select").length == 0) {
						$container.find(".one").last().addClass("select");
						return false;
					} else {
						if($container.find(".select").first().html() != null) {
							$container.find(".select").remove();
							resetInputPosition($container,input);
							return false;
						}
					}
				} else if(event.keyCode == 46) {
					$container.find(".select").remove();
					resetInputPosition($container,input);
				}
			});
			input.on("blur", function() {
				var inputVal = trimStr(input.val());
				if(inputVal.length > 0 && isMail(inputVal) && canAdd($container, inputVal)) {
					appendSpan(input, $container);
				} else {
					input.val("");
				}
			});
		}
		return $container.on("click", function() {
			resetInputPosition($container,input);
			$container.find(".select").removeClass("select");
		});
	};
	$.fn.getInputValue = function() {
		var val = "";
		$(this).find(".one").each(function() {
			val += $(this).find("span").first().text() + ",";
		});
		if(val.length > 0) {
			val = val.substr(0, val.length - 1);
		}
		return val;
	};
	$.fn.setInputValue = function(val,isMail) {
		if(val.length == 0) {
			return;
		}
		var $container = $(this); 
		var input = $container.find("input");
		var arr = val.split(",");
		$.each(arr, function(i, data) { 
			appendSpanFromValue(data, input, $container,isMail);
		});
	};
	$.fn.handleRemove=function(){
		var $container = $(this);
		var input = $container.find("input");
		handleRemove(input,$container);
	};
})(jQuery, window, document);