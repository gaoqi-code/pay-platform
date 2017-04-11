$(function() {
	$('#dialog_videoEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				sumbitvideoEdit();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_videoEdit').dialog('close');
			}
		}]
	});
	$("#isEffective_video_search").change(function(){
		if($(this).children('option:selected').val()==1)
			$("#changeStateForVideoButton").html("下线");
		else
			$("#changeStateForVideoButton").html("上线");
	});
	$("#add_video").click(function(){
		addVideo();
	});
	$("#changeStateForVideoButton").click(function(){
		var videoIds = new StringBuffer();
		var rows = $('#tableVideo').datagrid('getSelections');
		if(rows.length==0)
			return;
		for(var i=0; i<rows.length; i++){
			videoIds.append(rows[i].videoId).append(",");
		}
		videoIds._strings_.pop();
		
		var videos = new Array();
		var isEffective_video_search = $("#isEffective_video_search").val();
		for(var i=0; i<rows.length; i++){
			if(isEffective_video_search==1){
				videos[i] = {"videosetId":rows[i].videosetId,"videoId":rows[i].videoId};
			}else
				videos[i] = {"videosetId":rows[i].videosetId,"videoId":rows[i].videoId,"videoName":rows[i].videoName,"episode":$("#videosetTotal_huan").val()};
		}
		//JSON.stringify(videos)
		var send_data={"videoIds":videoIds.toString(),"state":isEffective_video_search,"videos":JSON.stringify(videos),"flagHuan":true};
		send_data["state"]=send_data["state"]==1?0:1;
		$.post("video/changeStateForVideo.json",send_data,function(data){
			if(data.code==1){
				$('#tableVideo').datagrid("reload");
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败！'); 
			}
		},"json");
	});
	
	   _initFileUpload("uploadify_video",{
	   		data:{imgName:"imgPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
        	var imgUrl=ParseTextToJsonObject(response);
        	$("#videoImg").val(imgUrl);
        	$("#showVideoImgUrl").attr("src",imgUrl);
        	$("#uploadFlag").val("");
        	$("#imgVideoUpload_").hide();
        },
        onSubmit:function(file, extension){
        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#imgVideoUpload_").show();
	    		$("#uploadFlag").val("uploading");
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
        }
	 });
	   
//    new AjaxUpload($('#uploadify_video'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"imgPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var imgUrl=ParseTextToJsonObject(response);
//        	$("#videoImg").val(imgUrl);
//        	$("#showVideoImgUrl").attr("src",imgUrl);
//        	$("#uploadFlag").val("");
//        	$("#imgVideoUpload_").hide();
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
//剧集列表
function getVideoList(fieldId,videosetType,videosetTotal,indexId){
	$("#commonVideosetid").val(fieldId);
	$("#videosetType_common").val(videosetType);
	$("#videosetTotal_huan").val(videosetTotal);
	var isEffective_video_search = $("#isEffective_video_search").val();
	if(isEffective_video_search==1){
		$("#changeStateForVideoButton").html("下线");
	}else{
		$("#changeStateForVideoButton").html("上线");
	}
	var videoParameter={"videosetId":fieldId,"isEffective":isEffective_video_search};
	$('#tableVideo').datagrid({
		checkbox:true,
		fitColumns:true,
		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search_video",
		url:'video/getVideoByPage.json',
		queryParams:videoParameter,
		selectOnCheck: false,
		singleSelect:false,
		idField:'videoId',
		columns:[[
		    {field:'ck',checkbox:true},
			{field:'videoId',title:'编号',width:50},
			{field:'videoName',title:'名称',width:300},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	//var videoUrlHref='<a href=javascript:getVideoUrlList('+row.videoId+','+row.videoType+','+index+');>码流</a>';
                	var updateHref=' <a href=javascript:updateVideo('+row.videoId+','+index+');>修改</a>';
                	//var deleteHref='　<a href=javascript:deleteVideo('+row.videoId+','+index+');>删除</a>';
                    return '<span style="color:red">'+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true,
		onLoadSuccess: function(data){
			getVideoUrlList(-1,-1);
		},
		onClickRow: function(index,rowData){
			getVideoUrlList(rowData.videoId,rowData.videoType,index);
		}
	});
	$('#dialog_video').dialog({title:"剧集与码流",closed:false});
}

function addVideo(){
	$("#videoId").val("");
	$("#videoForm")[0].reset();
	$('#dialog_videoEdit').dialog({title:"添加剧集",closed:false});
}

function updateVideo(videoId,index){
	var row = $('#tableVideo').datagrid('getData');
//	var rows = $('#tableVideo').datagrid('getSelections');
//	if(rows.length==0)
//		return;
	if(row.total<=0){
		return;
	}
	row = row.rows;
	$("#showVideoImgUrl").attr("src","");
    if (row){
		$("#videoId").val(row[index].videoId);
		$("#videoName").val(row[index].videoName);
		$("#sequence").val(row[index].sequence);
		$("#videoType").val(row[index].videoType);
		$("#videoFocus").val(row[index].videoFocus);
		$("#phase").val(row[index].phase);
		$("#season").val(row[index].season);
		$("#playLength").val(row[index].playLength);
//		$("#video_isEffective").val(row.isEffective);
		$("#videoBrief").val(row[index].videoBrief);
		$("#keyWord_video").val(row[index].keyWord);
		$("#videoImg").val(row[index].videoImg);
		$("#showVideoImgUrl").attr("src",row[index].videoImg);
		$("#videoIdSource").val(row[index].videoIdSource);
		$("#year").val(row[index].year);
    }
	$('#dialog_videoEdit').dialog({title:"修改剧集",closed:false});
}

function sumbitvideoEdit(){
	var videoId = $("#videoId").val();
	var arr_add = {
			"videoName":$("#videoName").val(),
			"videoFocus":$("#videoFocus").val(),
			"phase":$("#phase").val(),
			"season":$("#season").val(),
			"playLength":$("#playLength").val(),
			"keyWord":$("#keyWord_video").val(),
			"videoBrief":$("#videoBrief").val(),
			"videoImg":$("#videoImg").val(),
			"sequence":jQuery("#sequence").val(),
			"videoIdSource":jQuery("#videoIdSource").val(),
//			"isEffective":jQuery("#video_isEffective").val(),
			"videosetId":$("#commonVideosetid").val(),
			"contentType":$("#contentType").val(),
			"year":$("#year").val(),
			"episode":$("#videosetTotal_huan").val()
	};
	
	var videoImg=$("#showVideoImgUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(videoImg)){
		_sendFileToServer("imgPath",HIVEVIEW.upload.separate(videoImg));
		arr_add["videoImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.imgPath,"showUrl":videoImg
		});
	}
	if(videoId!=null&&videoId!=""){
		arr_add['videoId']=videoId;
		$.post("video/updateVideo.json",arr_add,function(data){
			if(data.code==1){
				$('#tableVideo').datagrid("reload");
				$('#dialog_videoEdit').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败！'); 
			}
		},"json");
	}else{
		arr_add["videoType"]=$("#videosetType_common").val();
		arr_add["isEffective"]=1;
		if(arr_add["videoType"]==1)
			arr_add["episode"]=0;
		$.post("video/saveVideo.json",arr_add,function(data){
			if(data.code=1){
				$('#tableVideo').datagrid("reload");
				$('#dialog_videoEdit').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'添加失败！'); 
			}
		},"json");
	}
}
function deleteVideo(fieldId,indexId){
	$.messager.confirm(titleInfo, '您确定删除码？', function(r){
		if (r){
			$.post("video/deleteVideo.json",{"videoId":fieldId},function(data){
				$('#tableVideo').datagrid('reload');
				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
			},"json");
		}
	});
}

function videoSearch(){
	var syncParameter = {
			"videosetId":$("#commonVideosetid").val(),
			"videoName":$("#videoName_search").val(),
			"isEffective":$("#isEffective_video_search").val()
		};
	$('#tableVideo').datagrid("load",syncParameter);
}