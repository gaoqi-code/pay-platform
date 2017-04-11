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
				$.messager.show({title:titleInfo,msg:'确定按钮！',timeout:timeoutValue,showType:'slide'});
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
		$('#contentId').val('');
		$('#contentType').val('');
		dialogOpen();
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
	if(id){
$('#seq').val(rowInfo.seq);$('#subjectId').val(rowInfo.subjectId);$('#contentId').val(rowInfo.contentId);			$('#contentId').val(rowInfo.contentId);
$('#contentName').val(rowInfo.contentName);$('#contentType').val(rowInfo.contentType);			$('#contentType').val(rowInfo.contentType);
$('#contentDesc').val(rowInfo.contentDesc);$('#createdTime').val(rowInfo.createdTime);$('#updatedTime').val(rowInfo.updatedTime);$('#isEffective').val(rowInfo.isEffective);		dialogOpen();
	}
}
//save or update info
function submitModel(){
	var dataInfo={
			seq:$('#seq').val(),
			subjectId:$('#subjectId').val(),
			contentId:$('#contentId').val(),
			contentName:$('#contentName').val(),
			contentType:$('#contentType').val(),
			contentDesc:$('#contentDesc').val(),
			createdTime:$('#createdTime').val(),
			updatedTime:$('#updatedTime').val(),
			isEffective:$('#isEffective').val(),
			"contentId":$('#contentId').val(),
			"contentType":$('#contentType').val()
	}
	//获取主键值，根据主键值判断添加或修改
			var pkId = $('#contentId').val();
			var pkId = $('#contentType').val();
	//
	if(null==pkId||pkId==""){
		$.post("hdsubjectcontent/add.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}else{
		$.post("hdsubjectcontent/update.json",dataInfo,function(data){
			$('#detail_table').datagrid('reload');
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		},"json");
	}
}
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'hdsubjectcontent/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'seq',title:'seq',width:100},
			{field:'subjectId',title:'subjectId',width:100},
			{field:'contentId',title:'contentId',width:100},
			{field:'contentName',title:'contentName',width:100},
			{field:'contentType',title:'contentType',width:100},
			{field:'contentDesc',title:'contentDesc',width:100},
			{field:'createdTime',title:'createdTime',width:100},
			{field:'updatedTime',title:'updatedTime',width:100},
			{field:'isEffective',title:'isEffective',width:100},
			{field:'contentId',title:'操作',width:100,
				formatter:function(value){
					return '<span onclick="infoEdit('+value+')">编辑</span>';
				}
			},
			{field:'contentType',title:'操作',width:100,
				formatter:function(value){
					return '<span onclick="infoEdit('+value+')">编辑</span>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}