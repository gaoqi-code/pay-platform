var updateFormValid;
var validateResult;
$(function() {
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				submitButton();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	//validateResult = $("#testUserForm").validate();
	$("#add_weather").click(function(){
		$("#id").val('');
		$("#name").val('');
		$("#iconUrl_day").val('');
		$("#showDayIconUrl").attr("src",'');
		$("#iconUrl_night").val('');
		$("#showNightIconUrl").attr("src",'');
		$('#dialog').dialog('open');
	});
	
	getList();
	
	/*上传白天天气图标*/
	   _initFileUpload("uploadifyLoad_day",{
	   		data:{imgName:"weatherIconPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var back_r = ParseTextToJsonObject(response);
	        	$("#iconUrl_day").val(back_r);
	        	$("#showDayIconUrl").attr("src",back_r);
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
	   _initFileUpload("uploadifyLoad_night",{
	   		data:{imgName:"weatherIconPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var back_r = ParseTextToJsonObject(response);
	        	$("#iconUrl_night").val(back_r);
	        	$("#showNightIconUrl").attr("src",back_r);
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
//    new AjaxUpload($('#uploadifyLoad_day'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"weatherIconPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var back_r = ParseTextToJsonObject(response);
//        	$("#iconUrl_day").val(back_r);
//        	$("#showDayIconUrl").attr("src",back_r);
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
    /*上传夜晚天气图标*/
//    new AjaxUpload($('#uploadifyLoad_night'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"weatherIconPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var back_r = ParseTextToJsonObject(response);
//        	$("#iconUrl_night").val(back_r);
//        	$("#showNightIconUrl").attr("src",back_r);
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
}); 

function getList(){
	$('#tableDiv').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'weatherIcon/getWeatherIconList.json',
		queryParams:{},
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'id',title:'编号',width:50,align:"center"},
			{field:'name',title:'名称',width:120,align:"center"},
			{field:'dayIcon',title:'白天图标',width:100,align:"center",styler:function(value,row,index){return 'background-color:#0081c2;';},formatter:function(val){
				return '<img src="'+val+'" style="height:50px;">';
			}},
			{field:'nightIcon',title:'夜晚图标',width:100,align:"center",styler:function(value,row,index){return 'background-color:#0081c2;';},formatter:function(val){
				return '<img src="'+val+'" style="height:50px;">';
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var href='<a href=javascript:initSelectedWallPaper();>天气背景</a>';
                	var updateHref=' <a href=javascript:updateWeather();>修改</a>';
                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
                    return '<span style="color:red">'+href+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
//背景图片
function initSelectedWallPaper(){
	var rowInfo = $('#tableDiv').datagrid('getSelected');
	if(rowInfo){
		initWallPaper({weatherIconId:rowInfo.id});
		$('#weatherIconId').val(rowInfo.id);
		$('#dialog_wallpaper_list').dialog('open');
	}
}
//修改
function updateWeather(){
	var rowInfo = $('#tableDiv').datagrid('getSelected');
	if(rowInfo){
		$("#id").val(rowInfo.id);
		$("#name").val(rowInfo.name);
		$("#iconUrl_day").val(rowInfo.dayIcon);
		$("#showDayIconUrl").attr("src",rowInfo.dayIcon);
		$("#iconUrl_night").val(rowInfo.nightIcon);
		$("#showNightIconUrl").attr("src",rowInfo.nightIcon);
		$('#dialog').dialog('open');
	}
}
//保存
function submitButton(){
	var id = $("#id").val();
	var arr_add = {
			"name":$("#name").val(),
			"dayIcon":$("#iconUrl_day").val(),
			"nightIcon":$("#iconUrl_night").val()
	};
	
	var dayIcon=$("#showDayIconUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(dayIcon)){
		_sendFileToServer("weatherIconPath",HIVEVIEW.upload.separate(dayIcon));
		arr_add["dayIcon"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.weatherIconPath,"showUrl":dayIcon
		});
	}
	
	var nightIcon=$("#showNightIconUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(nightIcon)){
		_sendFileToServer("weatherIconPath",HIVEVIEW.upload.separate(nightIcon));
		arr_add["nightIcon"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.weatherIconPath,"showUrl":nightIcon
		});
	}
	
	if(id!=null&&id!=""){
		arr_add['id']=id;
		$.post("weatherIcon/updateWeatherIcon.json",arr_add,function(data){
			if(data.code==1){
				$('#tableDiv').datagrid('reload');
				$('#dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败');
			}
		},"json");
	}else{
		$.post("weatherIcon/addWeatherIcon.json",arr_add,function(data){
			if(data.code==1){
				$('#tableDiv').datagrid('reload');
				$('#dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'添加失败');
			}
		},"json");
	}
}
