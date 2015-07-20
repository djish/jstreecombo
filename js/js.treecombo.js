/*!
* 
*   Plugin  : jsTreeCombo v1.1.0
*   Author  : jishnutkl@gmail.com
*   Date    : 17-July-2015
*
*   Description : jQuery plugin for creating combo box 
*                 like a tree. Selected option will be shown
*                 at the required area (like in select)
*   
*/

(function ( $ ) {
	
    $.fn.jsTreeCombo = function( options ) {
		//#endregion expected data format
		//define all default parameters
		var defaults = {
			//default data object
			data : null,
			bodyElement : "body",
			basicElement : "div",
			unitmeasure: "px",
			minPadding : 20,
			maxHeight : "300px",
			/**
			* default popup background color
			* option : { backgroundColor : "#color_code" }
			*/
			backgroundColor: "#fff",
			/**
			* Drop down icon
			* will show right next to the 
			*/
			dropdownIcon : "img/icon-dropdown.png",
			dropdownIconwidth : "20",
			onchange : undefined, 
			onclick : undefined
		};
		
		
		
		/**
		* method module
		* contains all method to create TreeCombo
		* 
		* call init method to initialize
		*/
		var methods = (function(){
			//#region private variables
			var _data     = null;
			var _instance = null;
			var _position = null;
			var _popup    = null;
			var _dataContainer = null;
			var _val = null;
			
			var jsonData  = {};
			
			//#endregion private variables
			
			var _initialize = function(instance, data) {
				_data = $.parseJSON(data);
				_instance = instance;
				
				_position = _instance.position();
				_makeItCombo();
				_preparePopup();
				
				if(null != data) {
					_parseDatatoPopup();
				} else {
					_parseDOM();	
				}
				
				_prepareDropDown();
				_registerUserActions();
			};
			
			//#region private methods
			
			var _makeItCombo = function() {
				
			}

			
			//prepare Popup div
			var _preparePopup = function() {
				
				_instance.addClass("js-tree-dropdown");
				
				_popup = $("<div></div>").appendTo(defaults.bodyElement);
				
				if(null != _popup) {
					$(_popup).css("position", "absolute")
						.css("top", _position.top + _instance.height() + settings.unitmeasure)
						.css("left", _position.left + settings.unitmeasure)
						.css("background-color", settings.backgroundColor).css("display", "none")
						.css("z-index", "100").width("auto").height("auto")
						.css("max-height", settings.maxHeight).addClass("js-tree-popup")
						.css("min-width", _instance.width());
				}
			};
			
			//Parse data and append to popup
			var _parseDatatoPopup = function() {
				_popup.html("");
				_generateList(_data, _popup, 0);
			};
						
			var _generateList = function(data, tempInstance, level){
				
				if(!$.isEmptyObject(data)) {
					var index = 0;
					var jIndex = 0;
					tempInstance = $("<ul></ul>").appendTo(tempInstance).css("padding-left", level*settings.minPadding + "px")
												.css("margin-left", "5px");
						
				   	for(index =0; index < data.length; index++) {
						var tempInstance = $("<li></li>").appendTo(tempInstance).css("padding-top", "5px");
						$("<span></span>").appendTo(tempInstance).attr("data-value", data[index].value)
											.html(data[index].display).addClass("js-data-item")
											.css("cursor", "pointer");
						
						if(data[index].attributes.length > 0) {
							for(jIndex = 0; jIndex < data[index].attributes.length; jIndex++){
								for(var key in data[index].attributes[jIndex]) {
									if(data[index].attributes[jIndex].hasOwnProperty(key)) {
									   $(tempInstance).attr(key, data[index].attributes[jIndex][key]);
									}
								}
							}
						}
					
						if(!$.isEmptyObject(data[index].childs) && data[index].childs.length > 0) {
							
							_generateList(data[index].childs, tempInstance, 1);
						}
					}
			   }
			};
			
			var _parseDOM = function() {
			
				_data = _getParsedList(_instance.children());
				_instance.html("");
				_parseDatatoPopup();
			}
					
			var _getParsedList = function(tempDom) {
				var iIndex = 0;
				var jsonData;
				var jsonDataArray = [];
				for(jIndex = 0; jIndex < tempDom.length; jIndex++) {
					var elementDom = $(tempDom[iIndex]).children();
					
					for(iIndex = 0; iIndex < elementDom.length; iIndex++) {
						
						jsonData = {};

						jsonData.display = $(elementDom[iIndex].firstChild).text().trim();
						jsonData.value = $(elementDom[iIndex]).attr("data-value");
						jsonData.attributes = [];

						
						
						if(elementDom[iIndex].attributes.length > 0) {
							var obj = {};
							$.each(elementDom[iIndex].attributes, function() {
								if(this.specified && this.name != "data-value") {
									obj[this.name] = this.value;
									jsonData.attributes.push(obj);
								}
							});
						}
						jsonData.childs = _getParsedList($(elementDom[iIndex]).children());
						jsonDataArray.push(jsonData);
					}
				}
				
				return jsonDataArray;
			}
				
			var _prepareDropDown = function() {
				_dataContainer = $("<span></span>").appendTo(_instance).css("float", "left");
				$("<img>").appendTo(_instance).attr("src", settings.dropdownIcon)
							.css("float", "right").css("width", settings.dropdownIconwidth)
							.css("height", _instance.height());
			};
			
			var _registerUserActions = function() {
				$(_instance).click(function() {
					_popup.toggle("fast");
				});
				
				$(".js-data-item").click(function() {
					var val = $(this).attr("data-value");
					$(_dataContainer).html($(this).text().trim());
					_instance.attr("data-val", $(this).attr("data-value"));
					_popup.toggle("fast");
					if(settings.onclick != undefined) {
						setTimeout(settings.onclick, 1);	
					}
					
					if(val != _val) {
						$(".js-clicked-item").removeClass("js-clicked-item");
						$(this).addClass("js-clicked-item");
						_val = val;
						if(settings.onchange != undefined) {
							settings.onchange(val);
						}
					}
					
				});
				
				
				
				
			}
			//#endregion private methods
			
			return {
				//#region public functions
				init : _initialize
			}
			
		}());
		
		if(options == "value") {
			return $(this).attr("data-val");
		}
		
		else if(options == "obj") {
			var obj = {};
			obj.value = $(this).attr("data-val");
			obj.dispaly = $(this).children(0).text().trim();
		}
		
		else if(typeof options == 'object' || options == undefined) {
			
			if(options.value != undefined) {
				
			} else {
				var settings = $.extend({}, defaults, options);

				return this.each(function() {
					//data format mentioned in the expected data format region
					methods.init($(this), settings.data); 

				});
			}
		} 
		
	};
	
}( jQuery ));


//#region expected data format
/**

 [
	{ "display"    : "display_value", 
	  "value"      : "value",
	  "attributes" : [{"name" : "value"}],
	  "childs"     : [{ "display"    : "display_value", 
					  "value"      : "value",
					  "attributes" : [{"name" : "value"}],
					  "childs"     : []
					}]
	}
 ]
 
 html
 
 <ul>
 	<li >Item 1
		<ul>
			<li> Item 1.1 </li>
			<li> Item 1.2 </li>
		</ul>
	</li>
	<li> Item 2
		<ul>
			<li> Item 2.1 </li>
			<li> Item 2.2 </li>
		</ul>
	</li>
 </ul>
 
 
 
 {data : '[{ "display" : "display_value", "value" : "value","attributes" : [{"name" : "value"}], '+
											'"childs"     : [{ "display"    : "display_value", "value"      : "value", "attributes" : [{"name" : "value"}],'+
											'"childs"     : []}]}]'
										   	}
		

*/
