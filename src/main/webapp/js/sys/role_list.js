var parameter = {};
var dataList={};

$(function() {
	//初始化表格
	initDataGrid();
	//初始化树
	getauthTreeData();
	//初始化弹出框
	$('#role_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				dialogClose();
			}
		}]
	});
	//添加角色
	$('#role_add').click(function(){
		$('#role_detail_form')[0].reset();
		$('#roleId').val('');
		getAuthTree();
		dialogOpen();
	});
});
//修改
function roleEdit(roleId){
	$('#role_table').datagrid('selectRecord',roleId);
	var rowInfo =  $('#role_table').datagrid('getSelected');
	if(roleId){
		$('#roleId').val(roleId);
		$('#roleName').val(rowInfo.roleName);
		$('#isEffective').val(rowInfo.isEffective);
		getauthMyTreeData(roleId);
		dialogOpen();
	}
}
//dataGrid加载数据
function dataGridload(param){
	$('#role_table').datagrid('load',param);
}
//关闭对话框
function dialogClose(){
	$('#role_detail_dialog').dialog('close');
}
//打开对话框
function dialogOpen(){
	$('#role_detail_dialog').dialog('open');
}


//初始化table
function initDataGrid(){
	$('#role_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysRole/getSysRole_All.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'roleId',
		columns:[[
			{field:'roleName',title:'角色名称',width:100},
			{field:'isEffective',title:'状态',width:70,
					formatter:function(value){
						if(1==value){
							return '有效';
						}else{
							return '<span style="color:red;">无效</span>';
						}
					}
			},
			{field:'roleId',title:'操作',width:70,
					formatter:function(value){
						return '<a href="javascript:roleEdit('+value+')">修改</a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

function gotoPage(currentPage,pageSize){
	parameter['currentPage'] = currentPage;
	getList(parameter);
}


/*** show model window ***/
function showModel(){
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":480,"content":content,"title":"添加系统角色"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	//getAuthTree();
	$("#roleId").val("");
	$("#roleName").val("");
}

/*** add sys user ***/
function submit_model_window(){
	if($("#roleName").val()==null||$("#roleName").val()==""){
		$.messager.alert(titleInfo,'您还没有输入角色名称!');
		return;
	}


	 var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	 var tree_nodes=zTree.getCheckedNodes(true);
	 
	if(tree_nodes.length==0){
		$.messager.alert(titleInfo,'请为角色选择权限!');
		return;
	}
	
	 var authId = "";
	 for(var tree_nodes_index=0;tree_nodes_index<tree_nodes.length;tree_nodes_index++){
		 authId += tree_nodes[tree_nodes_index].id+",";
	 }
	var roleId = $("#roleId").val();
	var arr_add = {
			"roleName":$("#roleName").val(),
			"isEffective":$("#isEffective").val(),
			"sysRoleAuth":authId
	};
	if(roleId!=null&&roleId!=""){
		arr_add['roleId']=roleId;
		$.post("sysRole/updateSysRole.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'修改失败!!!');
			}
		},"json");
	}else{
		$.post("sysRole/addSysRole.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'添加失败!');
			}
		},"json");
	}
}

/*** 删除角色 ***/
function deleteOperate(dataId,dataIndex){
	var dialog = new DialogDiv({"content":"您确定删除这个角色吗？","isHavaCancel":true});
	dialog.showDialog();
	d_dataId = dataId;
	d_dataIndex = dataIndex;
	if(isCancel){
		_deleteOperate(d_dataId,d_dataIndex);
	}
}
function _deleteOperate(dataId,dataIndex){
	$.post("sysRole/deleteRole.json",{"roleId":dataId},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
			alert("delete failure!");
		}
	},"json");
}

/*** 修改用用户 ***/
function updateOperate(dataId,dataIndex){
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":480,"content":content,"title":"修改系统角色"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	getauthMyTreeData(dataId);
	$("#roleId").val(dataId);
	$("#roleName").val(back_data[dataIndex].roleName);
	$("#isEffective").val(back_data[dataIndex].isEffective);
}

//获得树开菜单数据
var treeData;
var my_treeData;
function getauthTreeData(){
	$.post('sysAuth/getAllAuthToTree.json',{"isEffective":1},function(data){
		treeData = data.rows;
	},"json");
}
//点击修改后，获得当前角色的权限树
function getauthMyTreeData(roleId){
	$.post('sysAuth/getAuthByRoleId.json',{"roleId":roleId},function(data){
		my_treeData = data.rows;
		getAuthTree("update");
	},"json");
}
/*****************************************  tree **********************************/
var zNodes =[];
var code;
var treeObject;
function getAuthTree(operate){
	var setting = {
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
	
	$.each(treeData,function(authIndex,auth){
		var flag = false;
		if(operate=="update"){
			for(var i=0;i<my_treeData.length;i++){
				if(my_treeData[i].authId==auth.authId){
					flag=true;
					break;
				}
			}		
		}
		if(flag){
			zNodes[authIndex]={id:auth.authId,pId:auth.pid,name:auth.authName,checked:true,open:true};
		}else{
			zNodes[authIndex]={id:auth.authId,pId:auth.pid,name:auth.authName,open:true};
		}
	});
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	treeObject = setCheck();
}


////////////////////////////////
function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	py = $("#py").attr("checked")? "p":"",
	sy = $("#sy").attr("checked")? "s":"",
	pn = $("#pn").attr("checked")? "p":"",
	sn = $("#sn").attr("checked")? "s":"",
	type = { "Y":py + sy, "N":pn + sn};
	zTree.setting.check.chkboxType = type;
	showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
}
function showCode(str) {
	if (!code) code = $("#code");
	code.empty();
	code.append("<li>"+str+"</li>");
}