
var rightTargetID = "rightDiv";

var task_interval = -1;//定时器

var menuID = null;
var auth_id;
$(function(){
	leftClickNavLi();
	leftClickNavLiLi();
	
});
function initLeftMeau(list){
	$("#leftContainer").html("");
	menuID = $.getUrlVar("ID");
	for(var listIndex=0;listIndex<list.length;listIndex++){
		auth_id = list[listIndex].authId;
		if(list[listIndex].pid==0){
			$("#leftContainer").append('<li class="leftDivLi">'+list[listIndex].authName+'</li><li id=li_'+listIndex+' class="leftDivLi_"></li>');
			var $li = $("#leftContainer li").last();
			$li.append("<ul></ul>");
			var $lili = $li.children("ul");
			
			for(var i=0;i<list.length;i++){
				if(auth_id==list[i].pid&&list[i].pid!=0){
					if(null==menuID){
						//menuID=list[i].authId;//去掉注释后，左侧菜单的焦点默认会停留在第一个上面
					}else{
						menuID=parseInt(menuID);
					}
					if(menuID==list[i].authId){
						$lili.append('<li class="leftDivLiLi active_click" page_id="'+list[i].authId+'" onclick=gotoJSP("'+list[i].authAction+'!ID='+list[i].authId+'")>'+list[i].authName+'</li>');
						$("#li_"+listIndex).show();
						$("#li_"+listIndex).prev("li").addClass("active_click");
					}else{
						$lili.append('<li class="leftDivLiLi" page_id="'+list[i].authId+'" onclick=gotoJSP("'+list[i].authAction+'!ID='+list[i].authId+'")>'+list[i].authName+'</li>');
					}
				}
			}
		}
	}
	leftClickNavLi();
	leftClickNavLiLi();
}

//一级菜单
function leftClickNavLi(){
	/* 一级菜单 */
	$('.leftDivLi').each(function(index){
		$(this).mouseover(function(){
			$(this).addClass('active');
		}).mouseout(function(){
			$(this).removeClass('active');
		});
	});
	
	/* 一级菜单 */
	$('.leftDivLi').each(function(index){
		$(this).click(function(){
			$(".leftDivLi_").slideUp("200");
			//收缩控制
			if("none"==$(this).next("li").css("display")){
				$(this).next("li").slideToggle("200");
			}
			//当前样式控制
			$('li').removeClass('active_click');
			$(this).addClass("active_click");
			if($(this).hasClass('active')){
				//$(this).css('width',defaultActiveLiWidth);
			}else{
				//$(this).css('width',defaultLiWidth);
			}
		});
	});

}

//二级菜单
function leftClickNavLiLi(){
	/* 二级菜单 */
	$('.leftDivLiLi').each(function(index){
		$(this).mouseover(function(){
			//$('li').removeClass('active');
			//$(this).attr("page_id");
			$(this).addClass('active');
		}).mouseout(function(){
			$(this).removeClass('active');
			//$(this).css('width',($(this).width()+3));
			//$(this).addClass('active');
		});;
	});
	
	/* 二级菜单 */
	$('.leftDivLiLi').each(function(index){
		$(this).click(function(){
			window.clearInterval(task_interval);
			$('.leftDivLiLi').removeClass('active_click');
			$(this).addClass("active_click");//.css('width',defaultActiveLiWidth);
		});
	});
}
/*** 跳到指定jsp ***/
function gotoJSP(jspHref){
	$('#'+rightTargetID).html('<div style="margin-top:100px;text-align:center;"><img src="images/common/loading.gif"></div>');
	if(jspHref.lastIndexOf("?")==-1){//如果没有?
		jspHref=jspHref.replace("!","?");
//		window.location.href=getAppBasePath()+jspHref;
//		return;
	}else if(jspHref.lastIndexOf("!")!=-1){
		jspHref=jspHref.replace("!","&");
//		window.location.href=getAppBasePath()+jspHref;
	}
	$.post("loginChecksession.json",null,function(data){
		if(data.data==null||data.data.code==0)
			window.location.href=getAppBasePath()+jspHref;
	});
	$("#centerIframe").attr("src",getAppBasePath()+jspHref);
}