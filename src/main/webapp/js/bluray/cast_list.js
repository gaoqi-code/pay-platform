var castId;
var castType;
var parameter = {};
$(function(){
	//init dataGridTable
	initDataGrid();
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
		//clear default values
		$('#detail_form')[0].reset();
		$('#castId').val('');
		$('#castType').val('');
		$("#castPicture").val('');
	    $("#castPicture_url").attr("src",'');
		dialogOpen();
	});
	//搜索
	$('#btn_search').click(function(){
		//clear default values
		var searchValue = $('#search').val();
		if(searchValue != ''){
			parameter.castName = searchValue;
		}else{
			delete parameter.castName;
		}
		var selectValue = $('#search_select').val();
		if(selectValue==0){
			delete parameter.castType;
		}else{
			parameter.castType = selectValue;
		}
		initDataGrid();
	});
	//上传--图片信息
//	new AjaxUpload($('#filePath_add_uploadify'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"castImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#photoUrl").val(ParseTextToJsonObject(response));
//	    	$("#photoUrl_url").attr("src",ParseTextToJsonObject(response));
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
	   _initFileUpload("filePath_add_uploadify",{
	   		data:{imgName:"castImgPath"},
		    onComplete: function (file, response){//文件提交完成后可执行的方法
		    	$("#photoUrl").val(ParseTextToJsonObject(response));
		    	$("#photoUrl_url").attr("src",ParseTextToJsonObject(response));
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
	   
	   _initFileUpload("castPic_add_uploadify",{
	   		data:{imgName:"castImgPath"},
		    onComplete: function (file, response) {//文件提交完成后可执行的方法
		    	$("#castPicture").val(ParseTextToJsonObject(response));
		    	$("#castPicture_url").attr("src",ParseTextToJsonObject(response));
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
	//上传--头像
//	new AjaxUpload($('#castPic_add_uploadify'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"castImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#castPicture").val(ParseTextToJsonObject(response));
//	    	$("#castPicture_url").attr("src",ParseTextToJsonObject(response));
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
	$('#detail_table').datagrid('selectRecord',id);
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(id){
		$('#castId').val(rowInfo.castId);
		$('#castName').val(rowInfo.castName);
		$('#castType').val(rowInfo.castType);
		$('#castDesc').val(rowInfo.castDesc);
		$('#castPicture').val(rowInfo.castPicture);
		$('#castPicture_url').attr("src",rowInfo.castPicture);
		dialogOpen();
	}
}
//删除
function infoDelete(id){
	$.messager.confirm(titleInfo, '您确定删除码？', function(r){
		if (r){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				$.ajax({
					data:rowInfo,
					url:'cast/delete.json',
					success:function(data){
						if(1==data.code){
							$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
							$('#detail_table').datagrid('reload');
						}else{
							$.messager.alert(titleInfo,'删除失败!');
						}
					},
					error:function(e){
						$.messager.alert(titleInfo,'网络连接失败!');
					}
				});
			}
		}
	});
}
//查看照片
function infoPhoto(id){
	$('#detail_table').datagrid('selectRecord',id);
}
//save or update info
function submitModel(){
	var dataInfo={
		castName:$('#castName').val(),
		castType:$('#castType').val(),
		castPicture:$('#castPicture').val(),
		castDesc:$('#castDesc').val()
	};
	
	var castPicture=$("#castPicture_url").attr("src");
	if(HIVEVIEW.upload.isRsync(castPicture)){
		_sendFileToServer("castImgPath",HIVEVIEW.upload.separate(castPicture));
		dataInfo["castPicture"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.castImgPath,"showUrl":castPicture
		});
	}
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#castId').val();
	//
	if(null==pkId||pkId==""){
		$.post("cast/add.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}else{
		dataInfo.castId = pkId;
		$.post("cast/update.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}
}
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		nowrap: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'cast/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'castId',
		columns:[[
			{field:'castName',title:'姓名',width:100},
			{field:'castPicture',title:'头像',width:100,
				formatter:function(value){
					if(value != null){
						return '<img src="'+value+'" style="height:80px;">';
					}
				}
			},
			{field:'castType',title:'类别',width:120,
				formatter:function(value){
					if(1==value){
						return '导演';
					}else if(2==value){
						return '制片';
					}else if(3==value){
						return '主演/演唱者/主持人/配音';
					}else if(4==value){
						return '演员/MV演员/嘉宾/配音 角色';
					}else if(5==value){
						return '作词';
					}else if(6==value){
						return '作曲';
					}else if(7==value){
						return '主持人';
					}else if(8==value){
						return '嘉宾';
					}else if(9==value){
						return '配音';
					}else if(10==value){
						return '名星';
					}else if(11==value){
						return '出品人';
					}else{
						return '编剧';
					}
				}
			},
			{field:'castDesc',title:'人物简介',width:300,hidden:true},
			{field:'castId',title:'操作',width:50,
				formatter:function(value){
					return '<a href="javascript:infoEdit('+value+')">编辑</a>  ' +
							'<a href="javascript:infoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				castId = rowInfo.castId;
				castType = rowInfo.castType;
				$('#common_search_photo').show();
//				$('#photo_div').panel().resize('width','400px')
//				$('#photo_div').panel().expand();//('expand','east');
				photoDataGrid({castId:castId,castType:castType});
			}
        }
	});
}