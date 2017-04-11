var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化弹出框
	$('#user_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	});
	//初始化表格
	initDataGrid();
	//添加用户
	$('#user_add').click(function(){
		$('#user_detail_form')[0].reset();
		$('#userId').val('');
		$('#user_detail_dialog').dialog('open');
	});
	//初始化权限选择
	initRoleList();
});
function initRoleList(){
	$.post("sysRole/getSysRole_All.json",{page:0,rows:50},function(data){
		$("#roleId").html("");
		$.each(data.rows,function(dataIndex,role){
			$("#roleId").append('<option value='+role.roleId+'>'+role.roleName+'</option>');
		});
	},"json");
}
//修改
function userEdit(userId){
	$('#user_table').datagrid('selectRecord',userId);
	var rowInfo =  $('#user_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#user_detail_dialog').dialog('open');
	}
}
//保存
function submit_model_window(){
	var userId = $("#userId").val();
	var user = {
			"userName":$("#userName").val(),
			"userPwd":$("#userPwd").val(),
			"userMail":$("#userMail").val(),
			"roleId":$("#roleId").val(),
			"isEffective":jQuery("#isEffective").val()
	};
	if(userId!=null&&userId!=""){
		user['userId']=userId;
		if($("#userMail").val()==$("#oldUserMail").val()){
			delete user["userMail"];
		}
		$.post("sysUser/updateSysUserById.json",user,function(data){
			if(data.code==1){
				$('#user_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				$('#user_table').datagrid('load',parameter);
			}else{
				if(data.msg=="mail_same"){
					$.messager.alert(titleInfo,'您输入的邮箱已经存在！');
				}else{
					$.messager.alert(titleInfo,'修改失败！');
				}
			}
		},"json");
	}else{
		$.post("sysUser/addSysUser.json",user,function(data){
			if(data.code==1){
				$('#user_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				$('#user_table').datagrid('load',parameter);
			}else if(data.msg=="mail_same"){
				$.messager.alert(titleInfo,'您输入的邮箱已经存在！');
			}else{
				$.messager.alert(titleInfo,'添加失败！');
			}
		},"json");
	}
}
function userDelete(sysUserId){
	$.messager.confirm(titleInfo,"您确定删除这个用户吗？",function(r){
		if(r){
			$.post("sysUser/deleteSysUserById.json",{"sysUserId":sysUserId},function(data){
				if(data.code==1){
					$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					$('#user_table').datagrid('reload');
				}else{
					$.messager.alert(titleInfo,'删除失败！');
				}
			},"json");
		}
	});
}
//初始化table
function initDataGrid(){
	$('#user_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysUser/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'userId',
		columns:[[
			{field:'userName',title:'用户名称',width:100},
			{field:'userMail',title:'邮箱',width:220},
			{field:'userPwd',title:'密码',hidden:true},
			{field:'isEffective',title:'状态',width:70,
					formatter:function(value){
						if(1==value){
							return '有效';
						}else{
							return '<span style="color:red;">无效</span>';
						}
					}
			},
			{field:'userId',title:'操作',width:70,
					formatter:function(value){
						return '<a href="javascript:userEdit('+value+')">修改</a> <a href="javascript:userDelete('+value+')">删除</a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//设置弹出框信息 
function generateDialog(rowInfo){
	$('#userId').val(rowInfo.userId);
	$('#userName').val(rowInfo.userName);
	$('#userPwd').val(rowInfo.userPwd);
	$('#userMail').val(rowInfo.userMail);
	$('#oldUserMail').val(rowInfo.userMail);
	$('#roleId').val(rowInfo.roleId);
	$('#isEffective').val(rowInfo.isEffective);
}