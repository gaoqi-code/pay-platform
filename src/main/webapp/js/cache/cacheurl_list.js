//
var parameter = {};
$(function(){
	//init dataGridTable
	initDataGrid();
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
	//open add dialog
	$('#btn_add').click(function(){
		//clear default values
		$('#detail_form')[0].reset();
		$('#id').val('');
		dialogOpen();
	});
	//搜索
	$('#btn_search').click(function(){
		var searchName = $("#search_name").val();
		var searchUrl = $("#search_url").val();
		$('#detail_table').datagrid("load",{cacheName:searchName,cacheUrl:searchUrl});
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
function removeCache(id){
	$.messager.confirm(titleInfo, '您确定清除缓存？', function(r){
		if(r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			var dataInfo = {
					cacheUrl:rowInfo.cacheUrl
			};
			$.post("cacheurl/removeCache.json",dataInfo,function(data){
				if(1==data.code){
					$('#detail_table').datagrid('reload');
					$.messager.show({title:titleInfo,msg:'清除成功！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,"清除失败！");
				}
			},"json");
		}
	});
}
//delete
function infoDelete(){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var param = {
					"id":rowInfo.id,
				};
				$.post("cacheurl/delete.json",param,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
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
function submitModel(){
	var dataInfo={
			cacheUrl:$('#cacheUrl').val(),
			cacheName:$('#cacheName').val(),
			isEffective:$('#isEffective').val(),
			"id":$('#id').val()
	};
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#id').val();
	//
	if(null==pkId||pkId==""){
		$.post("cacheurl/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"保存失败！");
			}
		},"json");
	}else{
		$.post("cacheurl/update.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"修改失败！");
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
		url:'cacheurl/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
		     {field:'cacheName',title:'接口名称',width:50},
		     {field:'cacheUrl',title:'接口路径',width:100},
		     {field:'isEffective',title:'状态',width:100,
		    	 formatter:function(value){
		    		 return value==1?"有效":"<span style='color:red'>无效</span>";
		    	 }
		     },
		     {field:'id',title:'操作',width:50,
				formatter:function(value){
					return '<a href="javascript:removeCache('+value+')">清除缓存</a>'
						+ '  <a href="javascript:infoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}