# jstreecombo

Usage
------

Using HTML
----
<div id="combodiv">
		 <ul>
			<li id="xxx" data-value="1">Item 1
				<ul>
					<li id="xxx" data-value="1.1"> Item 1.1 </li>
					<li id="xxx" data-value="1.2"> Item 1.2 </li>
				</ul>
			</li>
			<li data-value="2"> Item 2
				<ul>
					<li id="xxx" data-value="2.1"> Item 2.1 </li>
					<li id="xxx" data-value="2.2"> Item 2.2 </li>
				</ul>
			</li>
		 </ul>
	</div>
	
javascript
-----------
  $(#combodiv").jstreecombo({[options]});

Using JSON
----------
json =  [
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

javascript
----------
$(#combodiv").jstreecombo({data : json, [other options]});

Options: 
---------
  {
    onchange : function_name, // called when selected option value changed
    onclick : function_name   // called when item clicked
  }
  
Methods:
--------
$(#combodiv").jstreecombo("value") // return value
$(#combodiv").jstreecombo("obj")   // return object with value and display value

