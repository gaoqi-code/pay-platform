var selectText="";
var selectValue="";
var uploadParameter={};
$(function(){
	//初始化
	initSelect();
	selectValue = $('#contentType:first-child').val();
	selectText = $('#contentType').find("option:selected").text();
	generateDataGrid(selectValue);
	//搜索按钮
	$('#select_search').click(function(){
		selectValue = $('#contentType').val();
		selectText = $('#contentType').find("option:selected").text();
		generateDataGrid(selectValue);
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
	
	
//	new AjaxUpload($('#uploadify_contentImg'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"recommendImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	var imgUrl = ParseTextToJsonObject(response);
//	    	$("#contentImg").val(ParseTextToJsonObject(response));
//	    	$("#showContentImgDiv").html('<img src="'+imgUrl+'" style="height:70px;">');
//	    	$("#uploadFlag").val("");
//	    	$("#contentImgUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#contentImgUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
	
});
function closeImg(){
	$('#img_dialog').dialog('close');
}
//显示图片
function showImg(imgUrl){
//	$('#content_img').attr('src',imgUrl);
//	$('#img_dialog').dialog('open');
}
//修改行
function editRow(){
	var rowInfo = $('#selected_table').datagrid('getSelected');
	if(rowInfo){
		$('#selected_subjectId').val(rowInfo.subjectId);
		$('#selected_contentId').val(rowInfo.contentId);
		$('#selected_contentType').val(rowInfo.contentType);
//		if()
		$('#selected_seq').val(rowInfo.seq);
		$('#selected_contentName').val(rowInfo.contentName);
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
		contentId:$('#selected_contentId').val(),
		contentType:$('#selected_contentType').val(),
		contentImg:$("#contentImg").val(),
		seq:selected_seq,
		isEffective:$('#selected_isEffective').val()
	};
	$.post('subjectcontent/update.json',dataInfo,function(data){
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
				var _contentImg='';
				if(rowInfo.videosetType==1||rowInfo.videosetType==2||rowInfo.videosetType==4||rowInfo.videosetType==6)
					_contentImg=HIVEVIEW.IMG.changeSuffix(rowInfo.videosetTvImg,HIVEVIEW.IMG.SIZE[0]);
				else
					_contentImg=HIVEVIEW.IMG.changeSuffix(rowInfo.videosetImg,HIVEVIEW.IMG.SIZE[1]);
				var dataInfo={
					subjectId:$('#ct_subject_id').val(),
					contentId:rowInfo.videosetId,
					contentType:rowInfo.videosetType,
					contentName:rowInfo.videosetName,
					contentImg:_contentImg,
					contentDesc:rowInfo.videosetFocus,
					isEffective:rowInfo.isEffective,
					seq:totalRows
				};
				$.post('subjectcontent/add.json',dataInfo,function(data){
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
					contentId:rowInfo.contentId,
					contentType:rowInfo.contentType
				};
				$.post('subjectcontent/delete.json',dataInfo,function(data){
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
	var textValue = $('#txt_search').val();
	if("" == typeValue){
		return;
	}else{
		initVideoSetGrid({videosetType:typeValue,videosetName:textValue});
	}
}
//初始化类型选择框
function initSelect(){
	$.ajax({
		async:false,
		dataType:'json',
		url:"classFirst/getClassFirstByPage.json",
		data:{rows:50},
		success:function(data){
			$("#contentType").html('');
			$.each(data.rows,function(dataIndex,role){
				if(role.firstclassId != 1001 && role.firstclassId != 1002){
					$("#contentType").append('<option value='+role.firstclassId+'>'+role.firstclassName+'</option>');
				}
			});
		},
		error:function(data){
			alert(data);
		}
	});
}
//init dataGridTable
function initSelected(param){
//	parameter.subjectId = $('#ct_subject_id').val();
	$('#selected_table').datagrid({
		nowrap: true,
		striped: true,
		fitColumns:true,
		collapsible:true,
		url:'subjectcontent/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'contentId',
		columns:[[
			{field:'seq',title:'序号',width:30,align:"center"},
			{field:'subjectId',title:'专题',width:100,hidden:true},
			{field:'contentName',title:'名称',width:100,align:"center"},
			{field:'videosetImg',title:'缩略图',width:100,align:"center",
				formatter:function(value,row){
					if(row.contentType==1||row.contentType==2||row.contentType==4||row.contentType==6){
						return '<img alt="" src="'+HIVEVIEW.PROJECT.GETIMGURL(HIVEVIEW.IMG.changeSuffix(row.videosetTvImg,HIVEVIEW.IMG.SIZE[0]))+'" style="height:50px;">';
					}
					else
						return '<img alt="" src="'+HIVEVIEW.PROJECT.GETIMGURL(HIVEVIEW.IMG.changeSuffix(row.videosetImg,HIVEVIEW.IMG.SIZE[1]))+'" style="height:50px;">';
				}
			},
			{field:'contentType',title:'类型',width:80,formatter:function(value){
				return HIVEVIEW.VIDEOTYPE[value];
			}},
			{field:'isEffective',title:'状态',width:30,align:"center",
				formatter:function(value){
					if(1==value){
						return '有效';
					}else{
						return '<span style="color:red;">无效</span>';
					}
				}
			},
			{field:'contentId',title:'操作',width:100,align:"center",
				formatter:function(value){
					return '<a href="javascript:editRow()">编辑</a>'
							+' <a href="javascript:deleteRow('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
//级联数据表--真实频道
function initVideoSetGrid(param){
	param.isEffective = 1;
	$('#select_table').datagrid({
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
			{field:'videosetId',title:'编号',width:50},
			{field:'videosetName',title:'名称',width:100},
			{field:'videosetImg',title:'图片',width:100,
				formatter:function(value,row){
					if(row.contentType==1||row.contentType==2||row.contentType==4||row.contentType==6){
						var imgUrl = row.contentImg;
						imgUrl=imgUrl.substring(0,imgUrl.lastIndexOf("."))+"_260_360"+imgUrl.substring(imgUrl.lastIndexOf("."));
						return '<img alt="" src="'+HIVEVIEW.PROJECT.GETIMGURL(imgUrl)+'" style="height:50px;">';
					}
					else
						return '<img alt="" src="'+HIVEVIEW.PROJECT.GETIMGURL(value)+'" style="height:50px;">';
				}
			},
			{field:'videosetType',title:'操作',width:50,
				formatter:function(){
					return '<a href="javascript:selectRow()">选择</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true
	});
}