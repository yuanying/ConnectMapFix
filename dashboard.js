if ( !location.href.match(/^https?:\/\/connect.garmin.com\/dashboard/) ) {
  return;
}
document.getElementById("activityMap").innerHTML = "<iframe id=\"myframe\" style=\"height:232px; width:412px;\" frameborder=\"0\" scrolling=\"no\" src=\"about:blank\" style=\"overflow: hidden; background-image: none; background-color: rgb(233, 231, 212); move;\"></iframe>";

var myscript = 
"Garmin.map.MapsUtil.initializeMap=function(){};"+
"Garmin.map.MapsUtil.addEncodedPolylineToMap=function(map,data){"+
"document.getElementById('myframe').src='"+safari.extension.baseURI + "iframe.html?'+data.gPolyline.activityId;"+
// "document.getElementById('myframe').src='"+chrome.extension.getURL('iframe.html')+"?'+data.gPolyline.activityId;"+
"};"+
"Garmin.widget.ActivitiesWidget.prototype.hideLoadingMask=function(){"+
"document.getElementById('myframe').src='about:blank';"+
"document.getElementById('loadingMaskContainer').hide();"+
"document.getElementById('activityMap').show();"+
"};";

var gxscript = document.createElement("script");
gxscript.setAttribute("type","text/javascript");
gxscript.appendChild(document.createTextNode(myscript));
document.body.appendChild(gxscript);

// var dashboard = document.getElementById("firmwareNotificationBox").parentNode;
// var gxbox = document.createElement("div");
// gxbox.innerHTML = '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FGfix%2F171855459510617&amp;width=218&amp;colorscheme=light&amp;show_faces=false&amp;stream=true&amp;header=false&amp;height=350" scrolling="no" frameborder="0" style="margin-top:18px; overflow:hidden; width:218px; height:350px;" allowTransparency="true"></iframe>';
// dashboard.appendChild(gxbox); 

/*
var dnodes = document.getElementById("firebugMessage").parentNode.childNodes;
var i=0;
while( dnodes[i] ){
	if( dnodes[i].className=="headerContainer" ){
		var gxbox = document.createElement("div");
		gxbox.align="right";
		gxbox.innerHTML = '<div style="margin-bottom:5px;"><a href="http://www.facebook.com/#!/pages/Gfix/171855459510617"><font color="#909090">powered by Gfix</font></a></div>'+
		'<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2F%23%21%2Fpages%2FGfix%2F171855459510617&amp;layout=button_count&amp;show_faces=false&amp;width=80&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
		dnodes[i].appendChild(gxbox); 
		break;
	}
	i++;
}
*/
safari.self.tab.dispatchMessage('storeParam', {'action' : 'storeParam', 'id': 0, 'param': 0 });
// chrome.extension.sendRequest({'action' : 'storeParam', 'id': 0, 'param': 0 } );
