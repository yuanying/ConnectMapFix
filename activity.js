if ( !location.href.match(/^https?:\/\/connect.garmin.com\/activity\//) ) {
  return;
}
var param = document.createElement("div");
param.setAttribute("id","gxparam");
param.style.visibility = "hidden";
document.body.appendChild(param); 
var param0 = document.createElement("div");
param.appendChild(param0); 
var param1 = document.createElement("div");
param.appendChild(param1); 


var proxy = document.createElement("iframe");
proxy.setAttribute("id","gxproxy");
proxy.style.position = "absolute";
proxy.style.visibility = "hidden";
proxy.style.top = proxy.style.left = proxy.style.width = proxy.style.height = "0";
document.body.appendChild(proxy); 

var myscript = 
"Garmin.mapLoader.prototype.initializeMap=function(){};"+
"function myFrame( action ){"+
" var proxy=document.getElementById('gxproxy');"+
" proxy.src='"+ safari.extension.baseURI + "proxy.html?'+action;"+
// " proxy.src='"+chrome.extension.getURL("proxy.html")+"?'+action;"+
"};"+
"function myParam( id, param ){"+
" var pnodes=document.getElementById('gxparam').childNodes;"+
" pnodes[id].innerHTML = param;"+
"};"+
"if(JSON != null && JSON != undefined && JSON.size() > 0){"+
" document.getElementById('lapToggle').show();"+
" document.getElementById('showLapMarkers').addEventListener('click',function(){"+
" (this.checked) ? myFrame('lapon') : myFrame('lapoff');"+
" },false);"+
" myParam(0,JSON.toJSON());"+
"}else{"+
" myParam(0,0);"+
"};"+
"myParam(1,Activity.ACTIVITY_ID);"

var gxscript = document.createElement("script");
gxscript.setAttribute("type","text/javascript");
gxscript.appendChild(document.createTextNode(myscript));
document.body.appendChild(gxscript);

safari.self.tab.dispatchMessage('storeParam', {'action' : 'storeParam', 'id': 0, 'param': param0.innerHTML});
// chrome.extension.sendRequest({'action' : 'storeParam', 'id': 0, 'param': param0.innerHTML} );
safari.self.tab.dispatchMessage('storeParam', {'action' : 'storeParam', 'id': 1, 'param': param1.innerHTML});
// chrome.extension.sendRequest({'action' : 'storeParam', 'id': 1, 'param': param1.innerHTML} );

document.getElementById("activityMapContainer").innerHTML = "<iframe name=\"myframe\" style=\"height:418px; width:578px;\" frameborder=\"0\" scrolling=\"no\" src=\""+safari.extension.baseURI + "iframe.html\" style=\"overflow: hidden; background-image: none; background-color: rgb(233, 231, 212); move;\"></iframe>";
// document.getElementById("activityMapContainer").innerHTML = "<iframe name=\"myframe\" style=\"height:418px; width:578px;\" frameborder=\"0\" scrolling=\"no\" src=\""+chrome.extension.getURL("iframe.html")+"\" style=\"overflow: hidden; background-image: none; background-color: rgb(233, 231, 212); move;\"></iframe>";

var dnodes = document.getElementById("detailsMapBox").childNodes;
var i=0;
while( dnodes[i] ){
	if( dnodes[i].className=="detailsBoxTitle map" ){
		dnodes[i].innerHTML = dnodes[i].innerHTML+"<img onClick='var win=window.open(\""+safari.extension.baseURI + "iframe.html#popup\",\"mywindow\",\"width=800,height=600,left=0,top=0,titlebar=yes,statusbar=no,menubar=no,resizable=yes,scrollbars=no\")' style='margin-bottom: -3px;margin-left: 10px;' src='"+safari.extension.baseURI + "open.png'>";
    // dnodes[i].innerHTML = dnodes[i].innerHTML+"<img onClick='var win=window.open(\""+chrome.extension.getURL('iframe.html')+"#popup\",\"mywindow\",\"width=800,height=600,left=0,top=0,titlebar=yes,statusbar=no,menubar=no,resizable=yes,scrollbars=no\")' style='margin-bottom: -3px;margin-left: 10px;' src='"+chrome.extension.getURL('open.png')+"'>";
		break;
	}
	i++;
}
