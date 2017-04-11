$(function(){
	//init dataGridTable
	//init dialog
	$('#detail_dialog_photo').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
//				$.messager.show({title:titleInfo,msg:'确定按钮！',timeout:timeoutValue,showType:'slide'});
				//save demo
				submitPhotoModel();
			}
		},{
			text:'取消',
			handler:function(){
				photoDialogClose();
			}
		}]
	});
	//open add dialog
	$('#btn_add_photo').click(function(){
		//clear default values
		$('#detail_form_photo')[0].reset();
		$('#photoId').val('');
		$("#photoUrl").val('');
	    $("#photoUrl_url").attr("src",'');
		photoDialogOpen();
	});
	
});
//close dialog
function photoDialogClose(){
	$('#detail_dialog_photo').dialog('close');
}
//open dialog
function photoDialogOpen(){
	$('#detail_dialog_photo').dialog('open');
}
//edit info
function photoEdit(id){
	$('#detail_table_photo').datagrid('selectRecord',id);
	var rowInfo =  $('#detail_table_photo').datagrid('getSelected');
	if(id){
		$('#photoId').val(rowInfo.photoId);
		$('#photoDesc').val(rowInfo.photoDesc);
		$('#castType').val(castType);
		$('#castId').val(castId);
		$('#photoUrl').val(rowInfo.photoUrl);
	    $("#photoUrl_url").attr("src",rowInfo.photoUrl);
		photoDialogOpen();
	}
}
//删除
function photoDelete(id){
	$('#detail_table_photo').datagrid('selectRecord',id);
	var rowInfo =  $('#detail_table_photo').datagrid('getSelected');
	if(rowInfo){
		var dataInfo={
			photoId:rowInfo.photoId,
			castId:castId
		};
		$.post("castphotos/delete.json",dataInfo,function(data){
			if(1==data.code){
				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
				$('#detail_table_photo').datagrid('reload');
			}else{
				$.messager.alert(titleInfo,'删除失败!');
			}
		},"json");
		
	}
}
//save or update info
function submitPhotoModel(){
	var dataInfo={
		photoDesc:$('#photoDesc').val(),
		castType:castType,
		castId:castId,
		photoUrl:$('#photoUrl').val()
	};
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#photoId').val();
	
	var photoUrl=$("#photoUrl_url").attr("src");
	if(HIVEVIEW.upload.isRsync(photoUrl)){
		_sendFileToServer("castImgPath",HIVEVIEW.upload.separate(photoUrl));
		dataInfo["photoUrl"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.castImgPath,"showUrl":photoUrl
		});
	}
	if(null==pkId||pkId==""){
		$.post("castphotos/add.json",dataInfo,function(data){
			$('#detail_table_photo').datagrid('reload');
			$('#detail_dialog_photo').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}else{
		dataInfo.photoId = pkId;
		$.post("castphotos/update.json",dataInfo,function(data){
			$('#detail_table_photo').datagrid('reload');
			$('#detail_dialog_photo').dialog('close');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}
}
//init dataGridTable
function photoDataGrid(param){
	$('#detail_table_photo').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		striped: true,
		toolbar: "#common_search_photo",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'castphotos/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'photoId',
		columns:[[
			{field:'photoUrl',title:'图片',width:100,height:100,
				formatter:function(value){
					if(value != null){
						return '<img src="'+value+'" style="height:100px;width:100px;">';
					}
			}},
			{field:'photoDesc',title:'描述',width:100,hidden:true},
			{field:'photoId',title:'操作',width:70,
				formatter:function(value){
					return '<a href="javascript:photoEdit('+value+')">编辑</a>  '
							+'<a href="javascript:photoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}