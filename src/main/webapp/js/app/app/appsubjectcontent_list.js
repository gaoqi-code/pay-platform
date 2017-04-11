var uploadParameter={};
$(function(){
	//搜索按钮
	$('#select_search').click(function(){
		var param = $('#select_table').datagrid('options').queryParams;
		param.appName=$('#txt_search').val();
		initAppList(param);
	});
	//修改窗口
	$('#selected_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				saveSelectedInfo();
			}
		},{
			text:'取消',
			handler:function(){
				$('#selected_dialog').dialog('close');
			}
		}]
	});
	//图片窗口
	$('#img_dialog').dialog();
	
	
	
});
//修改行
function editRow(){
	var rowInfo = $('#selected_table').datagrid('getSelected');
	if(rowInfo){
		$('#selected_seq').val(rowInfo.seq);
		$('#selected_subjectId').val(rowInfo.subjectId);
		$('#selected_contentId').val(rowInfo.appId);
		$('#selected_contentName').val(rowInfo.app.appName);
		$('#selected_isEffective').val(rowInfo.isEffective);
		$('#selected_dialog').dialog('open');
	}
}
//保存修改内容
function saveSelectedInfo(){
	var selected_seq = $('#selected_seq').val();
	if(selected_seq==''){
		$.messager.alert(titleInfo,'序号不能为空!');
		return;
	}
	var dataInfo = { 
		subjectId:$('#selected_subjectId').val(),
		appId:$('#selected_contentId').val(),
		seq:selected_seq,
		isEffective:$('#selected_isEffective').val()
	};
	$.post('appsubjectcontent/update.json',dataInfo,function(data){
		if(1==data.code){
			$('#selected_dialog').dialog('close');
			$('#selected_table').datagrid('load');
			$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,'修改失败!');
		}
	},'json');
}
//选择数据
function selectRow(){
	$.messager.confirm(titleInfo,"确定添加该数据？",function(r){
		if(r){
			var rowInfo = $('#select_table').datagrid('getSelected');
			if(rowInfo){
				var totalRows =  $('#selected_table').datagrid('getData').total+1;
				var dataInfo={
					subjectId:$('#ct_subject_id').val(),
					appId:rowInfo.appId,
					isEffective:rowInfo.state,
					seq:totalRows
				};
				$.post('appsubjectcontent/add.json',dataInfo,function(data){
					if(1==data.code){
						$('#selected_table').datagrid('load');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else if(0==data.code){
						$.messager.alert(titleInfo,'数据已存在!');
					}
				},'json');
			}
		}
	});
}
//删除数据
function deleteRow(){
	$.messager.confirm(titleInfo,"确定要删除该条数据？",function(r){
		if(r){
			var rowInfo = $('#selected_table').datagrid('getSelected');
			if(rowInfo){
				//删除
				var dataInfo={
					subjectId:rowInfo.subjectId,
					appId:rowInfo.appId
				};
				$.post('appsubjectcontent/delete.json',dataInfo,function(data){
					if(1==data.code){
						$('#selected_table').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}
				},'json');
			}
		}
	});
}
//根据不同类型显示不同数据表
function generateDataGrid(typeValue){
	initVideoSetGrid({videosetType:typeValue,videosetName:textValue});
}
//init dataGridTable
function initSelected(param){
//	parameter.subjectId = $('#ct_subject_id').val();
	$('#selected_table').datagrid({
		title:'已选列表',
		nowrap: true,
		striped: true,
		fitColumns:true,
		collapsible:true,
		url:'appsubjectcontent/getInfoList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'appId',
		columns:[[
			{field:'seq',title:'序号',width:30,align:"center"},
			{field:'appName',title:'名称',width:100,align:"center",
				formatter:function(value,row,index){
					return row.app.appName;
				}
			},
			{field:'appIcon',title:'应用图标',
		    	formatter:function(value,row,index){
		    		return '<img alt="" src="'+row.app.appIcon+'" style="width:50px;height:50px;">';
		    	}
		    },
			{field:'isEffective',title:'状态',width:30,align:"center",
				formatter:function(value){
					if(1==value){
						return '有效';
					}else{
						return '<span style="color:red;">无效</span>';
					}
				}
			},
			{field:'appId',title:'操作',width:100,align:"center",
				formatter:function(value){
					return '<a href="javascript:editRow()">编辑</a>'
							+' <a href="javascript:deleteRow()">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//待选APP列表
function initAppList(param){
	$('#select_table').datagrid({
		title:'待选列表',
		nowrap: true,
		striped: true,
		fitColumns:true,
		collapsible:true,
		remoteSort: false,
		singleSelect:true,
		toolbar: "#select_tool",
		url:'app/getAppList.json',
		queryParams:param,
		idField:'appId',
		columns:[[
			{field:'seq',title:'顺序',width:50,align:"center"},
			{field:'appIcon',title:'图标',width:55,align:"center",formatter:function(val){
				return '<img src="'+val+'" style="width:50px;height:50px;">';
			}},
			{field:'appName',title:'名称',width:140,align:"center"},
			{field:'tagName',title:'类型名称',width:90,align:"center"},
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
			{field:'opt',title:'操作',width:110,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var addHref=' <a href=javascript:selectRow();>选择</a>';
                    return '<span style="color:red">'+addHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}