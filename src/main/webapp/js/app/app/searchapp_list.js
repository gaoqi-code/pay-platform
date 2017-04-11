//
var parameter = {};
var appInfo={};
var flagUpdate=true;
var flagNoUpdateCurrnetData=true;
$(function(){
	//init dataGridTable
	//initDataGrid();
	searchApp.init();
	$("#category").change(function(){
		dataGridload({"categoryId":$(this).children('option:selected').val()});
	});
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
		$('#sequence').val('1');
		$('#appId').val('');
		$('#appIcon_span').html("");
		flagUpdate=false;
		dialogOpen("添加");
	});
	$('#search_app').click(function(){
		var param = {"appName":$("#appName_search").val(),"categoryId":$("#category").val(),"state":1};
		if(param["appName"]=="")
			delete param["appName"];
		$('#tableData').datagrid('load',param);
	});
});
//dataGrid load data
function dataGridload(param){
	$('#detail_table').datagrid('reload',param);
}
//close dialog
function dialogClose(){
	$('#detail_dialog').dialog('close');
}
//open dialog
function dialogOpen(title){
	$('#detail_dialog').dialog({title:title,closed:false});
	$('#tableData').datagrid({
		nowrap: true,
		autoRowHeight: true,
		striped: true,
		toolbar: "#common_app_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'app/getAppList.json',
		queryParams:{"state":1,"categoryId":$("#category").val()},
		singleSelect:true,
		idField:'appId',
		columns:[[
					{field:'appIcon',title:'图标',width:75,align:"center",formatter:function(val){
						return '<img src="'+val+'" style="height:45px;">';
					}},
					{field:'appName',title:'名称',width:140,align:"center"},
					{field:'tagName',title:'类型名称',width:90,align:"center"},
					{field:'appType',title:'类型',width:80,align:"center",formatter:function(val){
						return val==1?"一般应用":'<span style="color:red">系统应用</span>';
					}},
					{field:'isPay',title:'是否收费',width:80,align:"center",formatter:function(val){
						return val==1?'<span style="color:red">收费</span>':'免费';
					}},
					{field:'latestVersion',title:'使用版本',width:80},
					{field:'opt',title:'操作',width:110,align:'center', rowspan:2,  
		                formatter:function(value,row,index){
		                	var selectRowsData=' <a href=javascript:searchApp["selectApp"]();>选择</a>';
		                    return '<span style="color:red">'+selectRowsData+'</span>';  
		                }
		            }
				]],
		pagination:true,
		rownumbers:true
	});
}

var searchApp={
	"update":function(){
		flagUpdate=true;
		flagNoUpdateCurrnetData=false;
		var rowInfo =  $('#detail_table').datagrid('getSelected');
		if(rowInfo){
			appInfo["id"]=rowInfo.id;
			appInfo["appId"]=rowInfo.appId;
			appInfo["bundleId"]=rowInfo.bundleId;
			appInfo["appType"]=rowInfo.appType;
			$('#sequence').val(rowInfo.sequence);
			$('#appIcon_span').html('<img id="appIcon" src='+rowInfo.appIcon+' style="height:70px;">');
			$('#appName').val(rowInfo.appName);
			$('#isEffective').val(rowInfo.isEffective);
			dialogOpen("修改");
		}
	},
	"selectApp":function(){
		flagNoUpdateCurrnetData=true;
		var rowInfo =  $('#tableData').datagrid('getSelected');
		if(rowInfo){
			$('#appIcon_span').html('<img id="appIcon" src='+rowInfo.appIcon+' style="height:70px;">');
			$('#appName').val(rowInfo.appName);
			$('#isEffective').val(1);
			appInfo["appId"]=rowInfo.appId;
			appInfo["bundleId"]=rowInfo.bundleId;
			appInfo["appType"]=rowInfo.appType;
		}
	},
	"init":function(){
		$.post("apptag/getCategroyListByPage.json",{"state":1,"rows":100},function(data){
			var rows=data.rows;
			categorys_app=data.rows;
			if(rows.length==0)
				return;
			$("#category").html('');
			for(var i=0;i<rows.length;i++){
				$("#category").append('<option value='+rows[i].categoryId+'>'+rows[i].categoryName+'</option>');
				if(i==0){
					initDataGrid(rows[i].categoryId);
				}
			}
		},"json");
	}
};
//delete
function infoDelete(){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				$.post("searchapp/delete.json",{id:rowInfo.id},function(data){
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
	if(HIVEVIEW.checkInput.isNaN($('#sequence').val())){
		$.messager.alert(titleInfo,"请输一个正确的 顺序！");
		return;
	}
	if(appInfo["appId"]==""){
		$.messager.alert(titleInfo,"请选择一个应用！");
		return;
	}
	var dataInfo={
		sequence:$('#sequence').val(),
		appId:appInfo["appId"],
		bundleId:appInfo["bundleId"],
		appType:appInfo["appType"],
		appIcon:$('#appIcon').attr("src"),
		appName:$('#appName').val(),
		isEffective:$('#isEffective').val(),
		flagNoUpdateCurrnetData:flagNoUpdateCurrnetData
	};
	//
	if(flagUpdate){
		dataInfo["id"]=appInfo["id"];
		$.post("searchapp/update.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else if(-100==data.code){
				$.messager.alert(titleInfo,"您选择的数据已经存在！");
			}else{
				$.messager.alert(titleInfo,"修改失败！");
			}
		},"json");
	}else{
		delete dataInfo["id"];
		$.post("searchapp/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else if(-100==data.code){
				$.messager.alert(titleInfo,"您选择的数据已经存在！");
			}else{
				$.messager.alert(titleInfo,"保存失败！");
			}
		},"json");
	}
}
//init dataGridTable
function initDataGrid(categoryId){
	$('#detail_table').datagrid({
		nowrap: true,
		autoRowHeight: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'searchapp/getList.json',
		queryParams:{"categoryId":categoryId},
		singleSelect:true,
		columns:[[
{field:'sequence',title:'顺序',width:70},
{field:'appName',title:'名称',width:150},
{field:'appIcon',title:'图标',width:80,formatter:function(val){
	return '<img src='+val+' style="height:50px;">';
}},
{field:'isEffective',title:'状态',width:70,formatter:function(val){
	return val==1?'有效':'无效';
}},
{field:'appId',title:'操作',width:100,formatter:function(value){
					return '<a href=javascript:searchApp["update"]('+value+')>编辑</a>'+' <a href="javascript:infoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true
	});
}