//
var parameter = {};
$(function(){
	//初始化类别
	initCategoryList();
	//init dataGridTable
	initDataGrid();
	//初始化类型
	//init dialog
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submitModel();
			}
		},{
			text:'取消',
			handler:function(){
				dialogClose();
			}
		}]
	});
	//选择内容按钮
	$('#subject_dialog').dialog();
	//open add dialog
	$('#btn_add').click(function(){
		//clear default values
		$('#detail_form')[0].reset();
		$('#subjectId').val('');
		$("#subjectPic_url").attr("src",'');
		$("#subjectBgImg_url").attr("src",'');
		$("#subjectPic").val('');
		$("#subjectBgImg").val('');
		$('#categoryId').val($('#detail_table').datagrid('options').queryParams.categoryId);
		dialogOpen();
	});
	//大图
	   _initFileUpload("filePath_add_uploadify_bg",{
   		data:{imgName:"recommendImgPath"},
	    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#subjectBgImg").val(ParseTextToJsonObject(response));
	    	$("#subjectBgImg_url").attr("src",ParseTextToJsonObject(response));
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
//	new AjaxUpload($('#filePath_add_uploadify_bg'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"recommendImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#subjectBgImg").val(ParseTextToJsonObject(response));
//	    	$("#subjectBgImg_url").attr("src",ParseTextToJsonObject(response));
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
	   _initFileUpload("filePath_add_uploadify_pic",{
	   		data:{imgName:"recommendImgPath"},
		    onComplete: function (file, response) {//文件提交完成后可执行的方法
		    	$("#subjectPic").val(ParseTextToJsonObject(response));
		    	$("#subjectPic_url").attr("src",ParseTextToJsonObject(response));
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
//	new AjaxUpload($('#filePath_add_uploadify_pic'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"recommendImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#subjectPic").val(ParseTextToJsonObject(response));
//	    	$("#subjectPic_url").attr("src",ParseTextToJsonObject(response));
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
	//搜索
	$('#btn_search').click(function(){
		var searchText = $('#search_text').val();
		var searchType = $('#search_imgSize').val();
		parameter.subjectName=searchText;
		parameter.imgSize=searchType;
		if(parameter.imgSize=="所有尺寸")
			delete parameter["imgSize"];
		parameter.categoryId = $('#search_category').val();
		initDataGrid();
	});
});

				/******************** 专题页面相关   ***************************/

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
	$('#detail_table').datagrid('selectRecord',id);
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
		$('#subjectId').val(rowInfo.subjectId);
		$('#seq').val(rowInfo.seq);
		$('#subjectName').val(rowInfo.subjectName);
		$('#subjectPic').val(rowInfo.subjectPic);
		$('#imgSize').val(rowInfo.imgSize);
		$('#subjectBgImg').val(rowInfo.subjectBgImg);
		$('#subjectDesc').val(rowInfo.subjectDesc);
		$('#isEffective').val(rowInfo.isEffective);
		$('#subjectPic_url').attr("src",rowInfo.subjectPic);
		$('#subjectBgImg_url').attr("src",rowInfo.subjectBgImg);
		$('#categoryId').val(rowInfo.categoryId);
		dialogOpen();
	}
}
//删除
function infoDelete(id){
	$.messager.confirm(titleInfo, '确定删除该条信息？', function(r){
		if(r){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				$.post("appsubject/delete.json",{subjectId:rowInfo.subjectId,subjectName:rowInfo.subjectName},function(data){
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
	var dataInfo={
			seq:$('#seq').val(),
			subjectName:$('#subjectName').val(),
			subjectPic:$('#subjectPic').val(),
			subjectDesc:$('#subjectDesc').val(),
			subjectBgImg:$('#subjectBgImg').val(),
			imgSize:$('#imgSize').val(),
			isEffective:$('#isEffective').val(),
			categoryId:$('#categoryId').val(),
			"subjectId":$('#subjectId').val()
	};
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#subjectId').val();
	//
	
	var subjectPic=$("#subjectPic_url").attr("src");
	if(HIVEVIEW.upload.isRsync(subjectPic)){
		_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(subjectPic));
		dataInfo["subjectPic"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":subjectPic
		});
	}
	
	var subjectBgImg=$("#subjectBgImg_url").attr("src");
	if(HIVEVIEW.upload.isRsync(subjectBgImg)){
		_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(subjectBgImg));
		dataInfo["subjectBgImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":subjectBgImg
		});
	}
	
	if(null==pkId||pkId==""){
		$.post("appsubject/add.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}else{
		$.post("appsubject/update.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}
}
//init dataGridTable
function initDataGrid(){
	parameter.categoryId = $('#search_category').val();
	$('#detail_table').datagrid({
		nowrap: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'appsubject/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'subjectId',
		columns:[[
			{field:'seq',title:'顺序',width:50},
			{field:'subjectName',title:'专题名',width:100},
			{field:'imgSize',title:'尺寸',width:50},
			{field:'subjectPic',title:'缩略图',width:170,
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="height:100px;">';
				}
			},
			{field:'subjectBgImg',title:'背景图',width:170,
				formatter:function(value){
					return '<img alt="" src="'+value+'" style="height:100px;">';
				}
			},
			{field:'isEffective',title:'状态',width:50,
				formatter:function(value){
					if(1==value){
						return '有效';
					}else{
						return '<span style="color:red;">无效</span>';
					}
				}
			},
			{field:'subjectId',title:'操作',width:80,
				formatter:function(value){
					var linkEdit = '<a style="cursor: pointer;" href="javascript:infoEdit('+value+')">编辑</a>';
					var linkInfo = '<a style="cursor: pointer;" href="javascript:infoDetail('+value+')">信息</a>';
					var linkDelete = '<a style="cursor: pointer;" href="javascript:infoDelete('+value+')">删除</a>';
					return '<span>'+linkInfo+' '+linkEdit+'  '+linkDelete+'</span>';
				}
			}
		]],
		pagination:true,
		pageSize:20,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//应用类别
function initCategoryList(){
	$.ajax({
		async:false,
		dataType:"json",
		data:{rows:10},
		url:"apptag/getCategroyListByPage.json",
		success:function(data){
			$('#categoryId').html('');
			$('#search_category').html('');
			$.each(data.rows,function(dataIndex,role){
				$('#categoryId').append('<option value="'+role.categoryId+'">'+role.categoryName+'</option>');
				$('#search_category').append('<option value="'+role.categoryId+'">'+role.categoryName+'</option>');
			});
		}
	});
}
				/******************** 专题内容相关   ***************************/

//打开详细信息
function infoDetail(){
//	subject_dialog
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
		$('#ct_subject_id').val(rowInfo.subjectId);
		initSelected({subjectId:rowInfo.subjectId,categoryId:rowInfo.categoryId});
		initAppList({categoryId:rowInfo.categoryId,state:1});
		$('#subject_dialog').dialog('open');
	}
}