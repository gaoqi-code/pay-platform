//
var channelArray = new Array();

var recommend={};
recommend={"subject":"subject/getList.json",
		"app":"focus/getAppListClassify.json",
		"videoset":"videoSet/getVideoSetByPage.json",
		"casts":"cast/getList.json"};

var parameter = {};
//控制编辑页面不能改变内容，只能修改图片
var editFlag = true;
$(function(){
	//init dataGridTable
	$('body').layout('collapse','east');	
	initDataGrid();
	initSelect();
	initAppTypeList();
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
	//open add dialog
	$('#btn_add').click(function(){
		editFlag = false;
		$('#id').val("");
		$('#intervalTime').val(1);
		$('#contentType').attr('disabled',false);
		$('#focusLargeImg_url').attr('src',"");
		$('#focusThumbImg_url').attr('src',"");
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
	   _initFileUpload("filePath_add_uploadify_large",
	    		{
	    		data:{imgName:"appIconPath"},
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
	  }});
	//缩略图
	   _initFileUpload("filePath_add_uploadify_thumb",{
	    		data:{imgName:"appIconPath"},
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
	//查询按钮
	$('#btn_search').click(function(){
		initInfoGrid($('#contentType').val());
	});
	$("#contentType").change(function(){
		var categoryId=$(this).children('option:selected').val();
		if(categoryId==1003)
			$("#categoryId").show();
		else
			$("#categoryId").hide();
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
	$('#focusLargeImg_url').attr('src',"");
	$('#focusThumbImg_url').attr('src',"");
	if(rowInfo){
		editFlag = true;
		$('#position').val(rowInfo.position);
		$('#intervalTime').val(rowInfo.intervalTime);
		$('#id').val(rowInfo.id);
		$('#seq').val(rowInfo.seq);
		$('#contentType').val(rowInfo.contentType);
		if($("#contentType").val()==1003)
			$("#categoryId").show();
		$('#contentTypeName').val(rowInfo.contentTypeName);
		$('#contentId').val(rowInfo.contentId);
		$('#contentName').val(rowInfo.contentName);
		$('#contentDesc').val(rowInfo.contentDesc);
		$('#focusLargeImg').val(rowInfo.focusLargeImg);
		$('#focusThumbImg').val(rowInfo.focusThumbImg);
		$('#focusLargeImg_url').attr("src",rowInfo.focusLargeImg);
		$('#focusThumbImg_url').attr("src",rowInfo.focusThumbImg);
		$('#isEffective').val(rowInfo.isEffective);
		initInfoGrid(rowInfo.contentType);
		$("#detail_dialog").dialog('open');
	}
}
//删除
function infoDelete(id){
	$.messager.confirm(titleInfo, '确定删除该条信息？', function(r){
		if(r){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var dataInfo={
					id:rowInfo.id,
					contentName:rowInfo.contentDesc
				};
				$.post("focus/delete.json",dataInfo,function(data){
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
//save or update info
function submitModel(){
	var seq=$('#seq').val();
	var position=$('#position').val();
	var contentId=$('#contentId').val();
	var focusLargeImg=$('#focusLargeImg').val();
//	var focusThumbImg=$('#focusThumbImg').val();
	if(seq == ""){
		$.messager.alert(titleInfo,'请填写序号');
		return;
	}
	if(position==""||position==null){
		$.messager.alert(titleInfo,'请填写位置！');
		return;
	}
	if(position!=4&&position!=5){
		if(contentId == ""){
			$.messager.alert(titleInfo,'请选择内容');
			return;
		}
	}
	if(focusLargeImg==""){
		$.messager.alert(titleInfo,'请上传大图');
		return;
	}
	var dataInfo={
			position:$('#position').val(),
			intervalTime:$('#intervalTime').val(),
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
		_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(focusLargeImg));
		dataInfo["focusLargeImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":focusLargeImg
		});
	}
	
	var focusThumbImg=$("#focusThumbImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(focusThumbImg)){
		_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(focusThumbImg));
		dataInfo["focusThumbImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":focusThumbImg
		});
	}
	
	if(editFlag){
		dataInfo['id']=$("#id").val();
		$.post("focus/update.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"修改失败！");
			}
		},"json");
	}else{
		$.post("focus/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"数据已经存在！");
			}
		},"json");
	}
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
		url:'focus/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'',
		columns:[[
			{field:'position',title:'位置',width:30},
			{field:'seq',title:'顺序',width:30},
			{field:'contentDesc',title:'简介',width:100},
			{field:'contentType',title:'频道',width:50,formatter:function(value){
					return channelArray[value];
			}},
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
	$.post("classFirst/getAllEffectiveClassFirst.json",{},function(data){
		$("#contentType").html('');
		$.each(data.rows,function(dataIndex,role){
			channelArray[role.firstclassId]=role.firstclassName;
			$("#contentType").append('<option value='+role.firstclassId+'>'+role.firstclassName+'</option>');
		});
	},"json");
}
//初始化级联数据表
function initInfoGrid(typeValue){
	$("#contentType").val(typeValue);
	var content = $('#content').val();
	if("" == typeValue){
		return;
	}else if(1001==typeValue){
		initHdSubjectGrid({subjectName:content});
	}else if(1002==typeValue){
		initCastGrid({castName:content});
	}else if(1003==typeValue){
		FOCUSAPP.initList();
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
			{field:'videosetImg',title:'图片',width:100,
				formatter:function(value){
					return '<img alt="" src="'+HIVEVIEW.PROJECT.GETIMGURL(value)+'" style="height:70px;">';
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
		fit:true,
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
			{field:'castPicture',title:'图片',width:100,
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="height:70px;">';
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
		url:'subject/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'subjectId',
		columns:[[
			{field:'subjectId',title:'编号',width:50},
			{field:'subjectName',title:'名称',width:100},
			{field:'subjectPic',title:'图片',width:100,
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="height:70px;">';
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
	$('#contentId').val(videoId);
	$('#contentName').val(videoName);
	$('#contentDesc').val(videoName);
}

function initAppTypeList(){
	$.post("apptag/getCategroyListByPage.json",{rows:50,state:1},function(data){
		$("#categoryId").html('');
		$.each(data.rows,function(dataIndex,category){
			$("#categoryId").append('<option value='+category.categoryId+'>'+category.categoryName+'</option>');
		});
	},"json");
}

var FOCUSAPP={
		"initList":function(){
			$('#info_table').datagrid({
				nowrap: true,
				striped: true,
				fit:true,
				fitColumns:true,
				collapsible:true,
				toolbar:'#content_search',
				url:'focus/getAppListClassify.json',
				queryParams:{"categoryId":$("#categoryId").val()},
				remoteSort: false,
				singleSelect:true,
				idField:'appId',
				columns:[[
					{field:'appId',title:'编号',width:50},
					{field:'appName',title:'名称',width:100},
					{field:'appIcon',title:'图片',width:100,
						formatter:function(value){
							return '<img alt="" src="'+value+'" style="height:70px;">';
						}
					}
				]],
				pagination:true,
				rownumbers:true,
				onClickRow:function(rowIndex){
					var rowInfo =  $('#info_table').datagrid('getSelected');
					setValue(rowInfo.appId,rowInfo.appName);
		        }
			});
		}
};
