# jstreecombo

Usage
------

Using HTML
----

&lt;div id="combodiv"&gt;<br/>
	 &lt;ul&gt;<br/>
		&lt;li id="xxx" data-value="1"&gt;Item 1<br/>
			&lt;ul&gt;<br/>
				&lt;li id="xxx" data-value="1.1"> Item 1.1 &lt;/li&gt;<br/>
				&lt;li id="xxx" data-value="1.2"> Item 1.2 &lt;/li&gt;<br/>
			&lt;/ul&gt;<br/>
		&lt;/li&gt;<br/>
		&lt;li data-value="2"&gt; Item 2<br/>
			&lt;ul&gt;<br/>
				&lt;li id="xxx" data-value="2.1"> Item 2.1 &lt;/li&gt;<br/>
				&lt;li id="xxx" data-value="2.2"> Item 2.2 &lt;/li&gt;<br/>
			&lt;/ul&gt;<br/>
		&lt;/li&gt;<br/>
	&lt;/ul&gt;<br/>
&lt;/div&gt;<br/>

javascript
-----------
  $(#combodiv").jstreecombo({[options]});

Using JSON
----------
json =  [<br/>
        	{ "display"    : "display_value", <br/>
        	  "value"      : "value",<br/>
        	  "attributes" : [{"name" : "value"}],<br/>
        	  "childs"     : [{ "display"    : "display_value", <br/>
        					  "value"      : "value",<br/>
        					  "attributes" : [{"name" : "value"}],<br/>
        					  "childs"     : []<br/>
        					}]<br/>
        	}<br/>
         ]<br/>

javascript
----------
$(#combodiv").jstreecombo({data : json, [other options]});

Options: 
---------
  {<br/>
    onchange : function_name, // called when selected option value changed<br/>
    onclick : function_name   // called when item clicked<br/>
  }<br/>
  
Methods:
--------
$(#combodiv").jstreecombo("value") // return value<br/>
$(#combodiv").jstreecombo("obj")   // return object with value and display value<br/>

