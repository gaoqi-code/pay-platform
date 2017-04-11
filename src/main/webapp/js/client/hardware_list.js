//
var parameter = {};
$(function(){
	initCp();
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
	//选择不同的生产商
	$('#search_cp').change(function(){
		parameter.cpId=$(this).val();
		initDataGrid();
	});
	
});
//初始化厂商
function initCp(){
	$.post("cp/getCpList.json",{rows:20,cpState:1},function(data){
		$("#cpId").html('');
		$("#search_cp").html('<option value="">全部</option>');
		$.each(data.rows,function(dataIndex,role){
			$("#cpId").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
			$("#search_cp").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
		});
	},"json");
}
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
function infoEdit(){
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
			$('#id').val(rowInfo.id);
			$('#cpId').val(rowInfo.cpId);
			$('#hardwareNo').val(rowInfo.hardwareNo);
			$('#isEffective').val(rowInfo.isEffective);
			dialogOpen();
	}
}
//delete
function infoDelete(id){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				$.post("hardware/delete.json",{"id":id},function(data){
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
			id:$('#id').val(),
			cpId:$('#cpId').val(),
			hardwareNo:$('#hardwareNo').val(),
			isEffective:$('#isEffective').val()
	};
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#id').val();
	//
	if(null==pkId||pkId==""){
		$.post("hardware/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"添加失败，您添加的型号已经存在！");
			}
		},"json");
	}else{
		$.post("hardware/update.json",dataInfo,function(data){
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
		url:'hardware/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
		    {field:'cpName',title:'生产商',width:100,
		    	formatter:function(value,row,index){
		    		if(row.cp!=null)
		    			return row.cp.cpName;
		    		return '无';
		    	}
		    },
		    {field:'hardwareNo',title:'硬件型号',width:100},
		    {field:'isEffective',title:'状态',width:100,
		    	formatter:function(value){
		    		return value==1?"有效":"无效";
		    	}
		    },
		    {field:'opts',title:'操作',width:100,
				formatter:function(value,row,index){
					return '<a href="javascript:infoEdit('+row.id+')">编辑</a>'
						+ '  <a href="javascript:infoDelete('+row.id+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true
	});
}