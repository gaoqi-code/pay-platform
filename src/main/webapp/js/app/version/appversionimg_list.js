$(function(){
	//init dialog
	$('#detail_avi_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submitAVIModel();
			}
		},{
			text:'取消',
			handler:function(){
				$('#detail_avi_dialog').dialog('close');
			}
		}]
	});
	//open add dialog
	$('#btn_avi_add').click(function(){
		//clear default values
		$('#detail_avi_form')[0].reset();
		$('#avi_id').val('');
		$('#avi_imgUrl').val('');
		$('#detail_avi_dialog').dialog('open');
	});
	
	//上传--图片信息
	   _initFileUpload("uploadify_avi_imgUrl",{
   		data:{imgName:"appVersionImgPath"},
	    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#avi_imgUrl").val(ParseTextToJsonObject(response));
	    	$("#show_avi_imgUrl").attr("src",ParseTextToJsonObject(response));
	    	$("#uploadFlag").val("");
	    	$("#avi_imgVideoUpload").hide();
	    },
	    onSubmit:function(file, extension){
	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#avi_imgVideoUpload").show();
	    		$("#uploadFlag").val("uploading");
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
	    }
 });
//	new AjaxUpload($('#uploadify_avi_imgUrl'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"imgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#avi_imgUrl").val(ParseTextToJsonObject(response));
//	    	$("#show_avi_imgUrl").attr("src",ParseTextToJsonObject(response));
//	    	$("#uploadFlag").val("");
//	    	$("#avi_imgVideoUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#avi_imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
});
//edit info
function aviInfoEdit(){
	var rowInfo =  $('#tableVersionImgList').datagrid('getSelected');
	if(id){
			$('#avi_id').val(rowInfo.id);
			$('#avi_seq').val(rowInfo.seq);
			$('#avi_appId').val(rowInfo.appId);
			$('#avi_app_version_id').val(rowInfo.appVersionId);
			$('#avi_imgUrl').val(rowInfo.imgUrl);
			$('#show_avi_imgUrl').attr('src',rowInfo.imgUrl);
			$('#avi_imgSize').val(rowInfo.imgSize);
			$('#avi_imgDesc').val(rowInfo.imgDesc);
			$('#detail_avi_dialog').dialog('open');
	}
}
//delete
function aviInfoDelete(){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#tableVersionImgList').datagrid('getSelected');
			if(rowInfo){
				var param = {
					"id":rowInfo.id,
				};
				$.post("appversionimg/delete.json",param,function(data){
					if(1==data.code){
						$('#tableVersionImgList').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,"删除失败！");
					}
				},"json");
			}
		}
	});
}
//save or update info
function submitAVIModel(){
	var dataInfo={
			seq:$('#avi_seq').val(),
			appId:$('#avi_app_id').val(),
			appVersionId:$('#avi_app_version_id').val(),
			imgUrl:$('#avi_imgUrl').val(),
			imgSize:$('#avi_imgSize').val(),
			imgDesc:$('#avi_imgDesc').val(),
			"id":$('#avi_id').val()
	};
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#avi_id').val();
	//
	var imgUrl=$("#show_avi_imgUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(imgUrl)){
		_sendFileToServer("appVersionImgPath",HIVEVIEW.upload.separate(imgUrl));
		dataInfo["imgUrl"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.appVersionImgPath,"showUrl":imgUrl
		});
	}
	
	if(null==pkId||pkId==""){
		$.post("appversionimg/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#tableVersionImgList').datagrid('reload');
				$('#detail_avi_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"保存失败！");
			}
		},"json");
	}else{
		$.post("appversionimg/update.json",dataInfo,function(data){
			if(1==data.code){
				$('#tableVersionImgList').datagrid('reload');
				$('#detail_avi_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"修改失败！");
			}
		},"json");
	}
}
//init dataGridTable
function initAppVersionImgList(avId,appId){
	$('#avi_app_version_id').val(avId);
	$('#avi_app_id').val(appId);
	$('#tableVersionImgList').datagrid({
		nowrap: true,
		striped: true,
		toolbar: "#avi_common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		singleSelect:true,
		url:'appversionimg/getList.json',
		queryParams:{appId:appId,appVersionId:avId},
		idField:'id',
		columns:[[
		    {field:'seq',title:'顺序',width:20},
		    {field:'imgUrl',title:'截图',width:140,
		    	formatter:function(value,row,index){
		    		return '<img alt="" src="'+row.imgUrl+'" style="height:70px;">';
		    	}
		    },
		    {field:'imgSize',title:'截图尺寸',width:70},
		    {field:'imgDesc',title:'截图描述',width:100},
		    {field:'opts',title:'操作',width:100,
				formatter:function(value){
					return '<a href="javascript:aviInfoEdit()">编辑</a>'
						+ '  <a href="javascript:aviInfoDelete()">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}