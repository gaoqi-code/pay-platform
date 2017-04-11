//
var parameter = {};
//控制编辑页面不能改变内容，只能修改图片
var editFlag = true;
$(function(){
	//init dataGridTable
	$('body').layout('collapse','east');	
	initDataGrid();
	initSelect();
	//init dialog
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				//save demo
				submitModel();
			}
		},{
			text:'取消',
			handler:function(){
				dialogClose();
			}
		}]
	});
	$('#edit_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				//save demo
				submitUpdateModel();
			}
		},{
			text:'取消',
			handler:function(){
				$('#edit_dialog').dialog('close');
			}
		}]
	});
	//open add dialog
	$('#btn_add').click(function(){
		editFlag = false;
		$('#contentType').attr('disabled',false);
		//clear default values
		$('#detail_form')[0].reset();
		$('#seq').val('');
		$('#contentType').val('');
		$('#contentId').val('');
		var selectValue = $('#contentType:first-child').val();
		initInfoGrid(selectValue);
		dialogOpen();
	});
	
	//大图
	   _initFileUpload("filePath_add_uploadify_large",{
	   		data:{imgName:"focusImgPath"},
		    onComplete: function (file, response) {//文件提交完成后可执行的方法
		    	$("#focusLargeImg").val(ParseTextToJsonObject(response));
		    	$("#focusLargeImg_url").attr("src",ParseTextToJsonObject(response));
		    	$("#uploadFlag").val("");
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
//	new AjaxUpload($('#filePath_add_uploadify_large'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"focusImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#focusLargeImg").val(ParseTextToJsonObject(response));
//	    	$("#focusLargeImg_url").attr("src",ParseTextToJsonObject(response));
//	    	$("#uploadFlag").val("");
//	    	$("#imgVideoUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
	//缩略图
_initFileUpload("filePath_add_uploadify_thumb",{
		data:{imgName:"focusImgPath"},
	    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#focusThumbImg").val(ParseTextToJsonObject(response));
	    	$("#focusThumbImg_url").attr("src",ParseTextToJsonObject(response));
	    	$("#uploadFlag").val("");
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
//	new AjaxUpload($('#filePath_add_uploadify_thumb'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"focusImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#focusThumbImg").val(ParseTextToJsonObject(response));
//	    	$("#focusThumbImg_url").attr("src",ParseTextToJsonObject(response));
//	    	$("#uploadFlag").val("");
//	    	$("#imgVideoUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
	//大图-修改
_initFileUpload("edit_filePath_add_uploadify_large",{
	data:{imgName:"focusImgPath"},
    onComplete: function (file, response) {//文件提交完成后可执行的方法
    	$("#edit_focusLargeImg").val(ParseTextToJsonObject(response));
    	$("#edit_focusLargeImg_url").attr("src",ParseTextToJsonObject(response));
    	$("#uploadFlag").val("");
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
//	new AjaxUpload($('#edit_filePath_add_uploadify_large'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"focusImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#edit_focusLargeImg").val(ParseTextToJsonObject(response));
//	    	$("#edit_focusLargeImg_url").attr("src",ParseTextToJsonObject(response));
//	    	$("#uploadFlag").val("");
//	    	$("#imgVideoUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
	//缩略图-修改
_initFileUpload("edit_filePath_add_uploadify_thumb",{
	data:{imgName:"focusImgPath"},
    onComplete: function (file, response) {//文件提交完成后可执行的方法
    	$("#edit_focusThumbImg").val(ParseTextToJsonObject(response));
    	$("#edit_focusThumbImg_url").attr("src",ParseTextToJsonObject(response));
    	$("#uploadFlag").val("");
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
//	new AjaxUpload($('#edit_filePath_add_uploadify_thumb'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"focusImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#edit_focusThumbImg").val(ParseTextToJsonObject(response));
//	    	$("#edit_focusThumbImg_url").attr("src",ParseTextToJsonObject(response));
//	    	$("#uploadFlag").val("");
//	    	$("#imgVideoUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
	//查询按钮
	$('#btn_search').click(function(){
		initInfoGrid($('#contentType').val());
	});
	
});
//dataGrid load data
function dataGridload(param){
	$('#detail_table').datagrid('load',param);
}
//close dialog
function dialogClose(){
	$('#detail_dialog').dialog('close');
}
//open dialog
function dialogOpen(){
	$('#detail_dialog').dialog('open');
}
//edit info
function infoEdit(id){
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
		editFlag = true;
		$('#edit_seq').val(rowInfo.seq);
		$('#edit_contentType').val(rowInfo.contentType);
		$('#edit_contentTypeName').val(rowInfo.contentTypeName);
		$('#edit_contentId').val(rowInfo.contentId);
		$('#edit_contentName').val(rowInfo.contentName);
		$('#edit_contentDesc').val(rowInfo.contentDesc);
		$('#edit_focusLargeImg').val(rowInfo.focusLargeImg);
		$('#edit_focusThumbImg').val(rowInfo.focusThumbImg);
		$('#edit_focusLargeImg_url').attr("src",rowInfo.focusLargeImg);
		$('#edit_focusThumbImg_url').attr("src",rowInfo.focusThumbImg);
		$('#edit_isEffective').val(rowInfo.isEffective);
		$("#edit_dialog").dialog('open');
	}
}
//删除
function infoDelete(id){
	$.messager.confirm(titleInfo, '确定删除该条信息？', function(r){
		if(r){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var dataInfo={
					seq:rowInfo.seq,
					contentType:rowInfo.contentType,
					contentId:rowInfo.contentId,
					contentName:rowInfo.contentName,
					contentTypeName:rowInfo.contentTypeName
				};
				$.post("hdfocus/delete.json",dataInfo,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'删除失败!');
					}
				},"json");
			}
		}
	});
}
//修改
function submitUpdateModel(){
	var dataInfo={
		seq:$('#edit_seq').val(),
		contentType:$('#edit_contentType').val(),
		contentId:$('#edit_contentId').val(),
		focusLargeImg:$('#edit_focusLargeImg').val(),
		focusThumbImg:$('#edit_focusThumbImg').val(),
		isEffective:$('#edit_isEffective').val(),
		contentDesc:$('#edit_contentDesc').val(),
		contentTypeName:$('#edit_contentTypeName').val(),
		contentName:$('#edit_contentName').val()
	};
	
	var focusLargeImg=$("#edit_focusLargeImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(focusLargeImg)){
		_sendFileToServer("focusImgPath",HIVEVIEW.upload.separate(focusLargeImg));
		dataInfo["focusLargeImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.focusImgPath,"showUrl":focusLargeImg
		});
	}
	
	var focusThumbImg=$("#edit_focusThumbImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(focusThumbImg)){
		_sendFileToServer("focusImgPath",HIVEVIEW.upload.separate(focusThumbImg));
		dataInfo["focusThumbImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.focusImgPath,"showUrl":focusThumbImg
		});
	}
	
	$.post("hdfocus/update.json",dataInfo,function(data){
		if(1==data.code){
			$('#detail_table').datagrid('reload');
			$('#edit_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,"修改失败！");
		}
	},"json");
}
//save or update info
function submitModel(){
	var seq=$('#seq').val();
	var contentId=$('#contentId').val();
	var focusLargeImg=$('#focusLargeImg').val();
	var focusThumbImg=$('#focusThumbImg').val();
	if(seq == ""){
		$.messager.alert(titleInfo,'请填写序号');
		return;
	}else if(contentId == ""){
		$.messager.alert(titleInfo,'请选择内容');
		return;
	}else if(focusLargeImg==""||focusThumbImg==""){
		$.messager.alert(titleInfo,'请上传图片');
		return;
	}
	var dataInfo={
			seq:$('#seq').val(),
			contentType:$('#contentType').val(),
			contentId:$('#contentId').val(),
			focusLargeImg:$('#focusLargeImg').val(),
			focusThumbImg:$('#focusThumbImg').val(),
			isEffective:$('#isEffective').val(),
			contentDesc:$('#contentDesc').val(),
			contentTypeName:$('#contentType').find("option:selected").text(),
			contentName:$('#contentName').val()
	};
	
	var focusLargeImg=$("#focusLargeImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(focusLargeImg)){
		_sendFileToServer("focusImgPath",HIVEVIEW.upload.separate(focusLargeImg));
		dataInfo["focusLargeImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.focusImgPath,"showUrl":focusLargeImg
		});
	}
	
	var focusThumbImg=$("#focusThumbImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(focusThumbImg)){
		_sendFileToServer("focusImgPath",HIVEVIEW.upload.separate(focusThumbImg));
		dataInfo["focusThumbImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.focusImgPath,"showUrl":focusThumbImg
		});
	}
	
	$.post("hdfocus/add.json",dataInfo,function(data){
		if(1==data.code){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,"数据已经存在！");
		}
	},"json");
}
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'hdfocus/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'',
		columns:[[
			{field:'seq',title:'顺序',width:30},
			{field:'contentName',title:'名称',width:100},
			{field:'contentTypeName',title:'频道',width:50},
			{field:'isEffective',title:'状态',width:50,
				formatter:function(value){
					if(1==value){
						return '上线';
					}else{
						return '<span style="color:red;">下线</span>';
					}
				}
			},
			{field:'contentId',title:'操作',width:100,
				formatter:function(rowIndex,row){
					return '<a style="cursor: pointer;" href="javascript:infoEdit('+rowIndex+')">编辑</a>'
						+'  <a style="cursor: pointer;" href="javascript:infoDelete('+rowIndex+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			$('#showLarge').html('<img alt="largeImg" src="'+rowInfo.focusLargeImg+'" style="width: 100%;height: 300px;max-width: 100%">');
			$('#showThumb').html('<img alt="thumbImg" src="'+rowInfo.focusThumbImg+'" style="max-height: 100px;max-width: 100%">');
        }
	});
}
//初始化类型选择框
function initSelect(){
	$.post("classFirst/getClassFirstByPage.json",{rows:50},function(data){
		$("#contentType").html('');
		$.each(data.rows,function(dataIndex,role){
			$("#contentType").append('<option value='+role.firstclassId+'>'+role.firstclassName+'</option>');
		});
	},"json");
}
//初始化级联数据表
function initInfoGrid(typeValue){
	var content = $('#content').val();
	if("" == typeValue){
		return;
	}else if(1001==typeValue){
		initHdSubjectGrid({subjectName:content});
	}else if(1002==typeValue){
		initCastGrid({castName:content});
	}else{
		initVideoSetGrid({videosetType:typeValue,videosetName:content});
	}
}
//级联数据表--真实频道
function initVideoSetGrid(param){
	param.isEffective = 1;
	$('#info_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		toolbar:'#content_search',
		url:'videoSet/getVideoSetByPage.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'videosetId',
		columns:[[
			{field:'videosetId',title:'编号',width:50},
			{field:'videosetName',title:'名称',width:100},
			{field:'videosetImg',title:'图片',width:70,
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="height:55px;">';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
			var rowInfo =  $('#info_table').datagrid('getSelected');
			setValue(rowInfo.videosetId,rowInfo.videosetName);
        }
	});
}
//级联数据表--演职员
function initCastGrid(param){
	$('#info_table').datagrid({
		nowrap: true,
		striped: true,
		fitColumns:true,
		collapsible:true,
		toolbar:'#content_search',
		url:'cast/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'castId',
		columns:[[
			{field:'castId',title:'编号',width:50},
			{field:'castName',title:'名称',width:100},
			{field:'castPicture',title:'图片',
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="width:100px;height:40px;">';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
			var rowInfo =  $('#info_table').datagrid('getSelected');
			setValue(rowInfo.castId,rowInfo.castName);
        }
	});
}
//级联数据表--专题
function initHdSubjectGrid(param){
	param.isEffective = 1;
	$('#info_table').datagrid({
		nowrap: true,
		striped: true,
		fitColumns:true,
		collapsible:true,
		toolbar:'#content_search',
		url:'hdsubject/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'subjectId',
		columns:[[
			{field:'subjectId',title:'编号',width:50},
			{field:'subjectName',title:'名称',width:100},
			{field:'subjectPic',title:'图片',
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="width:100px;height:40px;">';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
			var rowInfo =  $('#info_table').datagrid('getSelected');
			setValue(rowInfo.subjectId,rowInfo.subjectName);
        }
	});
}
//设置属性值
function setValue(videoId,videoName){
	if(!editFlag){
		$('#contentId').val(videoId);
		$('#contentName').val(videoName);
	}
}
