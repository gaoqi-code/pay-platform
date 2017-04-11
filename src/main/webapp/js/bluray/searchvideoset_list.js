var parameter = {};
var selectedType="";//搜索的数据类型
$(function(){
	//init dataGridTable
	initDataGrid();
	initSelect();
	generateDataGrid(selectedType);
	//添加窗口
	$('#detail_dialog').dialog();
	//修改窗口
	$('#detail_edit_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submitUpdateModel();
			}
		},{
			text:'取消',
			handler:function(){
				$('#detail_edit_dialog').dialog('close');
			}
		}]
	});
	//open add dialog
	$('#btn_add').click(function(){
		dialogOpen();
	});
	//添加窗口 搜索按钮
	$('#btn_search').click(function(){
		selectedType = $('#videosetType').val();
		generateDataGrid(selectedType);
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
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
		$('#edit_sequence').val(rowInfo.sequence);
		$('#edit_videosetId').val(rowInfo.videosetId);
		$('#edit_name').val(rowInfo.videosetName);
		$('#edit_isEffective').val(rowInfo.isEffective);
		$('#edit_videosetType').val(rowInfo.videosetType);
		$('#detail_edit_dialog').dialog('open');
	}
}
//删除
function infoDelete(){
	$.messager.confirm(titleInfo, '确定删除该条信息？', function(r){
		if(r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var dataInfo = {
					videosetId:rowInfo.videosetId,
					videosetType:rowInfo.videosetType,
					videosetName:rowInfo.videosetName
				};
				$.post("searchvideoset/delete.json",dataInfo,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'删除失败!');
					}
				},"json");
			}
		}
	});
}

//修改
function submitUpdateModel(){
	var dataInfo={
		sequence:$('#edit_sequence').val(),
		name:$('#edit_name').val(),
		isEffective:$('#edit_isEffective').val(),
		videosetId:$('#edit_videosetId').val(),
		videosetType:$('#edit_videosetType').val()
	};
	$.post("searchvideoset/update.json",dataInfo,function(data){
		$('#detail_table').datagrid('reload');
		$('#detail_edit_dialog').dialog('close');
		$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
	},"json");
}
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'searchvideoset/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'videosetId',
		columns:[[
			{field:'sequence',title:'顺序',width:50},
			{field:'videosetName',title:'名称',width:100},
			{field:'videosetImg',title:'图片',width:100,
				formatter:function(value){
					return '<img src="'+value+'" style="height:100px">';
				}
			},
			{field:'videosetType',title:'类型',width:50,
				formatter:function(value){
					if(3==value){
						return "电影";
					}else if(11==value){
						return "片花";
					}else if(16==value){
						return "蓝光极清";
					}else if(1002==value){
						return "演职员";
					}else{
						return '<span style="color:red">未知</span>';
					}
				}
			},
			{field:'isEffective',title:'状态',width:50,
				formatter:function(value){
					if(1==value){
						return "有效";
					}else{
						return '<span style="color:red">无效</span>';
					}
				}
			},
			{field:'videosetId',title:'操作',width:70,
				formatter:function(value){
					return '<a href="javascript:infoEdit('+value+')">编辑</a>  '
							+'<a href="javascript:infoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		pageSize:20,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

		/************************添加页面********************/
//初始化类型选择框
function initSelect(){
	$.ajax({
		async:false,
		dataType:'json',
		url:"classFirst/getClassFirstByPage.json",
		data:{rows:50},
		success:function(data){
			$("#videosetType").html('');
			$.each(data.rows,function(dataIndex,role){
				if(role.firstclassId == 3 || role.firstclassId == 11 
						|| role.firstclassId == 16 || role.firstclassId == 1002){
					$("#videosetType").append('<option value='+role.firstclassId+'>'+role.firstclassName+'</option>');
				}
			});
			selectedType = $('#videosetType:first-child').val();
		},
		error:function(data){
			alert(data);
		}
	});
}
//根据不同类型显示不同数据表
function generateDataGrid(typeValue){
	var textValue = $('#txt_search').val();
	if(1002 == typeValue){
		initCastSetGrid({castName:textValue});
	}else if(1002!=typeValue){
		initVideoSetGrid({videosetType:typeValue,videosetName:textValue});
	}
}
//添加
function submitModel(videoId,videosetName,videosetImg){
	$.messager.confirm(titleInfo, '确定添加为热门搜索？', function(r){
		if (r){
			var dataInfo={
				sequence:1,
				isEffective:1,
				videosetType:selectedType,
				videosetId:videoId,
				videosetName:videosetName,
				videosetImg:videosetImg
			};
			if(null!=dataInfo.videosetId && ""!=dataInfo.videosetId){
				$.post("searchvideoset/add.json",dataInfo,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
						$('#detail_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'已经存在!');
						$('#detail_dialog').dialog('close');
					}
				},"json");
			}
		}
	});
}
//级联数据表--真实频道
function initVideoSetGrid(param){
	$('#select_table').datagrid({
		title:'待选列表',
		fit:true,
		nowrap: true,
		striped: true,
		toolbar: "#select_tool",
		fitColumns:true,
		collapsible:true,
		url:'videoSet/getVideoSetByPage.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'videosetId',
		columns:[[
			{field:'videosetName',title:'名称',width:100},
			{field:'videosetImg',title:'图片',width:70,
				formatter:function(value){
					return '<img src="'+value+'" style="width:100px;height:40px;">';
				}
			},
			{field:'videosetId',title:'操作',width:30,
				formatter:function(value,row,index){
					return "<a href='javascript:submitModel("+row.videosetId+",\""+row.videosetName+"\",\""+row.videosetImg+"\")'>选择</a>";
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//级联数据表--演职员
function initCastSetGrid(param){
	$('#select_table').datagrid({
		title:'待选列表',
		fit:true,
		nowrap: true,
		striped: true,
		toolbar: "#select_tool",
		fitColumns:true,
		collapsible:true,
		url:'cast/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'castId',
		columns:[[
			{field:'castName',title:'姓名',width:100},
			{field:'castPicture',title:'头像',width:70,
				formatter:function(value){
					return '<img src="'+value+'" style="width:100px;height:40px;">';
				}
			},
			{field:'castType',title:'类别',width:50,
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
			{field:'castDesc',title:'人物简介',width:200,hidden:true},
			{field:'castId',title:'操作',width:30,
				formatter:function(value,row,index){
					return "<a href='javascript:submitModel("+row.castId+",\""+row.castName+"\",\""+row.castPicture+"\")'>选择</a>";
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}