var HIVEVIEW={"SHOWBIGIMG":function(obj,event){
	//onmousemove=HIVEVIEW["SHOWBIGIMG"](this,event)
	//鼠标移上来的效果
		if (!document.getElementById("hiveview_2_0")) {
			$(document.body).append('<div id="hiveview_2_0" style="position: absolute;"></div>');
		}
		var ei = document.getElementById("hiveview_2_0");
	event = event || window.event;
	ei.style.display = "block";
	ei.innerHTML = '<img src="' + obj.src + '" />';
	ei.style.top  = document.body.scrollTop + event.clientY + 10 + "px";
	ei.style.left = document.body.scrollLeft + event.clientX + 10 + "px";
	//鼠标移走的效果
	
	obj.onmouseout = function(){
		ei.innerHTML = "";
		ei.style.display = "none";
	};
	
//	var demo = document.getElementById(targetContainer);
//	var gg = demo.getElementsByTagName("img");
//	if(!document.getElementById("hiveview_2_0")){   
//		$(document.body).append('<div id="hiveview_2_0"></div>');
//	}
//	var ei = document.getElementById("hiveview_2_0");
//	for(var i=0; i<gg.length; i++){
//		var ts = gg[i];
//		ts.onmousemove = function(event){
//			event = event || window.event;
//			ei.style.display = "block";
//			ei.innerHTML = '<img src="' + this.src + '" />';
//			ei.style.top  = document.body.scrollTop + event.clientY + 10 + "px";
//			ei.style.left = document.body.scrollLeft + event.clientX + 10 + "px";
//		};
//		ts.onmouseout = function(){
//			ei.innerHTML = "";
//			ei.style.display = "none";
//		};
//		ts.onclick = function(){
//			window.open( this.src );
//		};
//	}
}};


