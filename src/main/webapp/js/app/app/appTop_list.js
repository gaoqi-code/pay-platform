var addFlag = true;
var parameter = {};
$(function(){
	//初始化应用类别
	initCategoryList();
	//初始化 榜单列表
	initDataGrid();
	//init dialog
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				if(addFlag){
					saveAppTopInfo();
				}else{
					updateAppTopInfo();
				}
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
		//初始化待选APP列表
		initAppList();
		//clear default values
		$('#detail_form')[0].reset();
		$('#appId').val('');
		addFlag = true;
		dialogOpen();
	});
	$('#searchAapp_button').click(function(){
		initAppList();
	});
	//搜索
	$('#btn_search').click(function(){
		initDataGrid();
	});
	$('#select_category').change(function(){
		initDataGrid();
	});
	$('#select_toptype').change(function(){
		initDataGrid();
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
	$('#detail_table').datagrid('selectRecord',id);
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	//初始化待选APP列表
	initAppList();
	if(id){
		$('#seq').val(rowInfo.seq);
		$('#appId').val(rowInfo.appId);
		$('#isEffective').val(rowInfo.isEffective);
		$('#appName').val(rowInfo.app.appName);
		addFlag = false;
		dialogOpen();
	}
}
//delete
function infoDelete(){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var param = {
					"appId":rowInfo.appId,
					"topType":rowInfo.topType,
					"appName":rowInfo.app.appName,
					"topTypeName":$('#select_toptype').find("option:selected").text(),
					"categoryName":$('#select_category').find("option:selected").text()
				};
				$.post("apptop/delete.json",param,function(data){
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
function checkData(data){
	var checkFlag = true;
	if(!data.seq){
		$.messager.alert(titleInfo,"请填写顺序");
		checkFlag = false;
	}else if(!data.appId){
		$.messager.alert(titleInfo,"请选择应用");
		checkFlag = false;
	}
	return checkFlag;
}
//新增榜单数据
function saveAppTopInfo(){
	var dataInfo={
		seq:$('#seq').val(),
		appId:$('#appId').val(),
		topType:$('#select_toptype').val(),
		isEffective:$('#isEffective').val(),
		categoryId:$('#select_category').val(),
		appName:$('#appName').val(),
		topTypeName:$('#select_toptype').find("option:selected").text(),
		categoryName:$('#select_category').find("option:selected").text()
	};
	if(checkData(dataInfo)){
		$.post("apptop/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"应用已添加！");
			}
		},"json");
	}
}
//修改榜单数据
function updateAppTopInfo(){
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	var dataInfo={
		seq:$('#seq').val(),
		appId:$('#appId').val(),
		topType:$('#select_toptype').val(),
		isEffective:$('#isEffective').val(),
		categoryId:$('#select_category').val(),
		oldAppId:rowInfo.appId,
		oldTopType:rowInfo.topType,
		appName:$('#appName').val(),
		topTypeName:$('#select_toptype').find("option:selected").text(),
		categoryName:$('#select_category').find("option:selected").text()
	};
	if(checkData(dataInfo)){
		$.post("apptop/update.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"应用已存在！");
			}
		},"json");
	}
}
//init dataGridTable
function initDataGrid(){
	parameter.categoryId=$('#select_category').val();
	parameter.topType=$('#select_toptype').val();
	$('#detail_table').datagrid({
		nowrap: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'apptop/getAppTopList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'appId',
		columns:[[
		    {field:'seq',title:'顺序',width:20},
		    {field:'topType',title:'类型',width:100,hidden:true,
		    	formatter:function(value){
		    		return value==1?"付费榜":value==2?"热销榜":"免费榜";
		    	}
		    },
		    {field:'appIcon',title:'应用图标',width:70,
		    	formatter:function(value,row,index){
		    		return '<img alt="" src="'+row.app.appIcon+'" style="height:50px;">';
		    	}
		    },
		    {field:'appName',title:'应用名称',width:120,formatter:function(val,row,index){
		    	return row["app"]["appName"];
		    }},
		    {field:'isEffective',title:'状态',width:100,
		    	formatter:function(value){
		    		return value==1?"有效":'<span class="STATE0">无效</span>';
		    	}
		    },
		    {field:'appId',title:'操作',width:100,
				formatter:function(value){
					return '<a href="javascript:infoEdit('+value+')">编辑</a>'
						+ '  <a href="javascript:infoDelete()">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//**********************//
function initCategoryList(){
	$.ajax({
		async:false,
		dataType:"json",
		data:{rows:10},
		url:"apptag/getCategroyListByPage.json",
		success:function(data){
			$('#select_category').html('');
			$.each(data.rows,function(dataIndex,role){
				$('#select_category').append('<option value="'+role.categoryId+'">'+role.categoryName+'</option>');
			});
		}
	});
}
//************待选APP列表**********//
function initAppList(){
	var appParams = {
		topType:$('#select_toptype').val(),
		categoryId:$("#select_category").val(),
		appName:$("input[name='appName']").val()
	};
	if(appParams["appName"]=="")
		delete appParams["appName"];
	$('#applist_table').datagrid({
		height:249,
		width:730,
		fit:true,
		fitColumns:true,
		striped:true,
		nowrap: true,
		striped: true,
		toolbar: "#search_bar",
		url:'apptop/getAppListForApptop.json',
		queryParams:appParams,
		singleSelect:true,
		idField:'appId',
		columns:[[
			{field:'appIcon',title:'图标',width:70,align:"center",formatter:function(val){
				return '<img src="'+val+'" style="height:50px;">';
			}},
			{field:'appName',title:'名称',width:150,align:"center"},
			{field:'appType',title:'类型',width:80,align:"center",formatter:function(val){
				return val==1?"一般应用":'<span style="color:red">系统应用</span>';
			}},
			{field:'state',title:'状态',width:80,align:"center",formatter:function(val){
				return val==1?"有效":'<span style="color:red">无效</span>';
			}},
			{field:'isPay',title:'是否收费',width:80,align:"center",formatter:function(val){
				return val==1?'<span style="color:red">收费</span>':'免费';
			}},
			{field:'latestVersion',title:'使用版本',width:80},
			{field:'opt',title:'操作',width:50,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var addHref=' <a href=javascript:addApp('+row.appId+','+index+');>选择</a>';
                    return '<span style="color:red">'+addHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
//增加APP
function addApp(){
	$.messager.confirm(titleInfo, '您确定添加？',function(r){
		if(r){
			var rowInfo = $('#applist_table').datagrid('getSelected');
			setAppInfo(rowInfo.appId,rowInfo.appName);
		}
	});
}
//显示APPID APPNAME的值
function setAppInfo(appId,appName){
	$('#appId').val(appId);
	$('#appName').val(appName);
}