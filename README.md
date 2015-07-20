# jstreecombo

Usage
------

Using HTML
----

&lt;div id="combodiv"&gt;
	 &lt;ul&gt;
		&lt;li id="xxx" data-value="1"&gt;Item 1
			&lt;ul&gt;
				&lt;li id="xxx" data-value="1.1"> Item 1.1 &lt;/li&gt;
				&lt;li id="xxx" data-value="1.2"> Item 1.2 &lt;/li&gt;
			&lt;/ul&gt;
		&lt;/li&gt;
		&lt;li data-value="2"&gt; Item 2
			&lt;ul&gt;
				&lt;li id="xxx" data-value="2.1"> Item 2.1 &lt;/li&gt;
				&lt;li id="xxx" data-value="2.2"> Item 2.2 &lt;/li&gt;
			&lt;/ul&gt;
		&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;

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

