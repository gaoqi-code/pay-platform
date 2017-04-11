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
		$("#tvlogo_url").attr("src","");
		$('#id').val('');
		dialogOpen();
	});
	//初始化TVLOGO上传按钮
	_initFileUpload("tvlogo_add",{
   		data:{imgName:"tvlogoPath"},
	    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#tvlogo").val(ParseTextToJsonObject(response));
	    	$("#tvlogo_url").attr("src",ParseTextToJsonObject(response));
	    	$("#uploadFlag").val("");
	    	$("#imgVideoUpload").hide();
	    },
	    onSubmit:function(file, extension){
	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#imgVideoUpload").show();
	    		$("#uploadFlag").val("uploading");
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
	    }
	});
	//查询电视台
	$("#btn_tv_search").click(function(){
		var tvname = $("#search_tvname").val();
		parameter.tvname = tvname;
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
function infoEdit(){
	var rowInfo =  $('#detail_table').datagrid('getSelected');
	if(rowInfo){
			$('#id').val(rowInfo.id);
			$('#tvid').val(rowInfo.tvid);
			$('#tvname').val(rowInfo.tvname);
			$('#tvlogo').val(rowInfo.tvlogo);
			$('#tvlogo_url').attr("src",rowInfo.tvlogo);
			$('#sequence').val(rowInfo.sequence);
			$('#areaLimit').val(rowInfo.areaLimit);
			$('#epgAddress').val(rowInfo.epgAddress);
			$('#mediatype').val(Number(rowInfo.mediatype));
			$('#liveurl').val(rowInfo.liveurl);
			$('#viewback').val(rowInfo.viewback);
			$('#isEffective').val(rowInfo.isEffective);
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
					"id":rowInfo.id,
				}
				$.post("tv/delete.json",param,function(data){
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
	var logPath = $('#tvlogo').val()
	var dataInfo={
			tvid:$('#tvid').val(),
			tvname:$('#tvname').val(),
			tvlogo:logPath,
			sequence:$('#sequence').val(),
			areaLimit:$('#areaLimit').val(),
//			epgAddress:$('#epgAddress').val(),
			epgAddress:"",
			mediatype:$('#mediatype').val(),
			liveurl:$('#liveurl').val(),
			viewback:$('#viewback').val(),
			isEffective:$('#isEffective').val(),
			"id":$('#id').val()
	};
	if(HIVEVIEW.upload.isRsync(logPath)){
		_sendFileToServer("tvlogoPath",HIVEVIEW.upload.separate(logPath));
		dataInfo["tvlogo"]=HIVEVIEW.upload.urlCombination({
			"confUrl":"/home/nginx/upload/tvimg/tvlogo","showUrl":logPath
		});
	}
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#id').val();
	//
	if(null==pkId||pkId==""){
		$.post("tv/add.json",dataInfo,function(data){
			if(1==data.code){
				$('#detail_table').datagrid('reload');
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,"保存失败！");
			}
		},"json");
	}else{
		$.post("tv/update.json",dataInfo,function(data){
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
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'tv/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
		          {field:'sequence',title:'顺序',width:30},
		          {field:'tvid',title:'电视台ID',width:70},
		          {field:'tvname',title:'电视台',width:100},
		          {field:'tvlogo',title:'台标',width:100,
		        	  formatter:function(value,row,index){
		        		  return '<img src="'+value+'" style="height:50px">';
		        	  }
		          },
		          {field:'areaLimit',title:'地域控制',width:100,
		        	  formatter:function(value,row,index){
		        		  return value==1?"全部地区":"仅大陆";
		        	  }
		          },
		          {field:'epgAddress',title:'节目单接口地址',width:100,hidden:true},
		          {field:'mediatype',title:'所属分类',width:100,
		        	  formatter:function(value,row,index){
		        		  return value=="1"?"中央电视台":value=="2"?"地方卫视":"城市电视台";
		        	  }
		          },
		          {field:'viewback',title:'回看状态',width:70,
		        	  formatter:function(value,row,index){
		        		  return value==1?"允许回看":"禁止回看";
		        	  }
		          },
		          {field:'isEffective',title:'状态',width:70,
		        	  formatter:function(value,row,index){
		        		  return value==1?"发布":"待发布";
		        	  }
		          },
		          {field:'opts',title:'操作',width:100,
		        	  formatter:function(value){
		        		  return '<a href="javascript:infoEdit()">编辑</a>'
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