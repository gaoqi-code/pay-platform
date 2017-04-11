$(function() {
	//初始化背景列表
	$('#dialog_wallpaper_list').dialog();
	//添加，修改窗口
	$('#dialog_wallpaper').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				submitWallpaper();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_wallpaper').dialog('close');
			}
		}]
	});
	
	   _initFileUpload("uploadifyLoad_wallday",{
	   		data:{imgName:"weatherWallPaperPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var back_r = ParseTextToJsonObject(response);
	        	$("#wallpaperUrl_day").val(back_r);
	        	$("#showDayWallpaperUrl").attr("src",back_r);
	        	$("#imgVideoUpload").hide();
	        },
	        onSubmit:function(file, extension){
	        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
		    		$("#imgVideoUpload").show();
		    		$("#uploadFlag").val("uploading");
		    	}else{
		    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
		    		return false;
		    	}
	        }
	 });
	   _initFileUpload("uploadifyLoad_wallnight",{
	   		data:{imgName:"weatherWallPaperPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var back_r = ParseTextToJsonObject(response);
	        	$("#wallpaperUrl_night").val(back_r);
	        	$("#showNightWallpaperUrl").attr("src",back_r);
	        	$("#imgVideoUpload").hide();
	        },
	        onSubmit:function(file, extension){
	        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
		    		$("#imgVideoUpload").show();
		    		$("#uploadFlag").val("uploading");
		    	}else{
		    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
		    		return false;
		    	}
	        }
	 });
	/*上传白天天气背景*/
//    new AjaxUpload($('#uploadifyLoad_wallday'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"weatherWallPaperPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var back_r = ParseTextToJsonObject(response);
//        	$("#wallpaperUrl_day").val(back_r);
//        	$("#showDayWallpaperUrl").attr("src",back_r);
//        	$("#imgVideoUpload").hide();
//        },
//        onSubmit:function(file, extension){
//        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//        }
//    });
    /*上传夜晚天气背景*/
    new AjaxUpload($('#uploadifyLoad_wallnight'), {//绑定AjaxUpload
        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
        data:{"propKey":"weatherWallPaperPath"},
        type:"POST",//提交方式
        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
        onComplete: function (file, response) {//文件提交完成后可执行的方法
        	var back_r = ParseTextToJsonObject(response);
        	$("#wallpaperUrl_night").val(back_r);
        	$("#showNightWallpaperUrl").attr("src",back_r);
        	$("#imgVideoUpload").hide();
        },
        onSubmit:function(file, extension){
        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#imgVideoUpload").show();
	    		$("#uploadFlag").val("uploading");
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
        }
    });
    //
    $('#add_wallpaper').click(function(){
		$('#wallpaperId').val('');
		$('#wallpaperUrl_day').val('');
		$('#showDayWallpaperUrl').attr('src','');
		$('#wallpaperUrl_night').val('');
		$('#showNightWallpaperUrl').attr('src','');
    	$('#dialog_wallpaper').dialog('open');
    });
    
	
}); 
function initWallPaper(param){
	$('#wallpager_table').datagrid({
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		toolbar:'#wallpaper_search',
		striped:true,
		url:'weatherWallpaper/getWeatherWallpaperList.json',
		queryParams:param,
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'weatherIconId',title:'天气编号',width:50,align:"center",hidden:true},
			{field:'dayWallpaper',title:'白天图标',width:100,align:"center",styler:function(value,row,index){return 'background-color:#0081c2;';},formatter:function(val){
				return '<img src="'+val+'" style="height:50px;">';
			}},
			{field:'nightWallpaper',title:'夜晚图标',width:100,align:"center",styler:function(value,row,index){return 'background-color:#0081c2;';},formatter:function(val){
				return '<img src="'+val+'" style="height:50px;">';
			}},
			{field:'wallpaperState',title:'天气编号',width:50,align:"center",
				formatter:function(value){
					return value==1?'有效':'<span style="color:red">无效</span>';
				}
			},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var updateHref='<a href=javascript:updateWallpaper();>修改</a>';
                	var deleteHref=' <a href=javascript:deleteWallpaper();>删除</a>';
                    return '<span style="color:red">'+updateHref+deleteHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}	

/*** show model window ***/
function deleteWallpaper(){
	$.messager.confirm(titleInfo,"确定删除该背景图？",function(r){
		if(r){
			var rowInfo = $('#wallpager_table').datagrid('getSelected');
			if(rowInfo){
				$.post("weatherWallpaper/deleteWeatherWallpaper.json",{id:rowInfo.id},function(data){
					if(data.code==1){
						$('#wallpager_table').datagrid('reload');
						$('#dialog_wallpaper').dialog('close');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'删除失败');
					}
				},"json");
			}
		}
	});
}
function updateWallpaper(){
	var rowInfo = $('#wallpager_table').datagrid('getSelected');
	if(rowInfo){
		$('#wallpaperId').val(rowInfo.id);
		$('#weatherIconId').val(rowInfo.weatherIconId);
		$('#wallpaperUrl_day').val(rowInfo.dayWallpaper);
		$('#showDayWallpaperUrl').attr('src',rowInfo.dayWallpaper);
		$('#wallpaperUrl_night').val(rowInfo.nightWallpaper);
		$('#showNightWallpaperUrl').attr('src',rowInfo.nightWallpaper);
		$('#wallpaperState').val(rowInfo.wallpaperState);
		$('#dialog_wallpaper').dialog('open');
	}
}
function submitWallpaper(){
	var id = $("#wallpaperId").val();
	var arr_add = {
			"weatherIconId":$("#weatherIconId").val(),
			"dayWallpaper":$("#wallpaperUrl_day").val(),
			"nightWallpaper":$("#wallpaperUrl_night").val(),
			"wallpaperState":$("#wallpaperState").val()
	};
	
	var nightWallpaper=$("#showDayWallpaperUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(nightWallpaper)){
		_sendFileToServer("weatherWallPaperPath",HIVEVIEW.upload.separate(nightWallpaper));
		arr_add["nightWallpaper"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.weatherWallPaperPath,"showUrl":nightWallpaper
		});
	}
	var nightWallpaper=$("#showNightWallpaperUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(nightWallpaper)){
		_sendFileToServer("weatherWallPaperPath",HIVEVIEW.upload.separate(nightWallpaper));
		arr_add["nightWallpaper"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.weatherWallPaperPath,"showUrl":nightWallpaper
		});
	}
	
	if(id!=null&&id!=""){
		arr_add['id']=id;
		$.post("weatherWallpaper/updateWeatherWallpaper.json",arr_add,function(data){
			if(data.code==1){
				$('#wallpager_table').datagrid('reload');
				$('#dialog_wallpaper').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败');
			}
		},"json");
	}else{//deleteWeatherWallpaper
		$.post("weatherWallpaper/addWeatherWallpaper.json",arr_add,function(data){
			if(data.code==1){
				$('#wallpager_table').datagrid('reload');
				$('#dialog_wallpaper').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'添加失败');
			}
		},"json");
	}
}
function _deleteOperate(dataId,dataIndex){
	$.post("weatherWallpaper/deleteWeatherWallpaper.html",{"id":dataId},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
			new DialogDiv({"content":"操作失败！"}).showDialog();
		}
	},"json");
};


/*** add tv ***/
function submit_model_window(){
//	if(!validateResult.form()){
//		return;
//	}
	if($("#img_day").val()==""||$("#img_day").val()==null){
		new DialogDiv({"content":"请选择白天背景图！"}).showDialog();
		return;
	}
	
	if($("#img_night").val()==""||$("#img_night").val()==null){
		new DialogDiv({"content":"请选择晚上背景图！"}).showDialog();
		return;
	}
	
	var id = $("#id").val();
	var arr_add = {
			"weatherIconId":$("#wId").val(),
			"wallpaperState":1,
			"dayWallpaper":$("#img_day").val(),
			"nightWallpaper":jQuery("#img_night").val()
	};
	if(id!=null&&id!=""){
		arr_add['id']=id;
		$.post("weatherWallpaper/updateWeatherWallpaper.html",arr_add,function(data){
			if(data.msg=="success"){
				//parameter["currentPage"]=flagCurrentPage;
				getList(parameter);
				closeModelDiv();
			}else{
				var dialog = new DialogDiv({"content":"修改失败"});
				dialog.showDialog();
			}
		},"json");
	}else{
		$.post("weatherWallpaper/addWeatherWallpaper.html",arr_add,function(data){
			if(data.msg=="success"){
				getList(parameter);
				closeModelDiv();
			}else{
				var dialog = new DialogDiv({"content":"添加失败"});
				dialog.showDialog();
			}
		},"json");
	}
}

/*** update  tv ***/
function updateOperate(dataId,dataIndex){
	$("#showImgUrl_day").attr("src","");
	$("#showImgUrl_night").attr("src","");
	var divEntity = {"targetID":"modelDiv","width":720,"height":380,"content":"","title":"修改天气背景图"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	$("#id").val(dataId);
	
	$("#img_day").val(back_data[dataIndex].dayWallpaper);
	$("#showImgUrl_day").attr("src",back_data[dataIndex].dayWallpaper);
	
	$("#img_night").val(back_data[dataIndex].nightWallpaper);
	$("#showImgUrl_night").attr("src",back_data[dataIndex].nightWallpaper);
}

function backgroundOperate(dataId,dataIndex){
	var waitDiv = new waitDialog("body");
	$('#rightDiv').load('content/video/related_list.jsp',{"videosetId":back_data2[dataIndex].videosetId,"videosetType":back_data2[dataIndex].videosetType},function(data){
		waitDiv.close("body");
	});
}

function weatherSearch(){
	parameter["name"]=$("#name_s").val();
	parameter["currentPage"]=1;
	getList(parameter);
}