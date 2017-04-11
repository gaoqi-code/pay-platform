//
var parameter = {};
var appInfo={};
var flagNoUpdateCurrnetData=true;
$(function(){
	//init dataGridTable
	initDataGrid();
	//init dialog
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				appRecommend['submitModel']();
			}
		},{
			text:'取消',
			handler:function(){
				$('#detail_dialog').dialog('close');
			}
		}]
	});
	//open add dialog
	$('#btn_add').click(function(){
		//clear default values
		$('#detail_form')[0].reset();
		$('#id').val('');
		$('#focusLargeImg_span').html('');
		$('#focusThumbImg_span').html('');
		dialogOpen("添加推荐应用");
	});
	$("#recommendType").change(function(){
		dataGridload({"navigationId":$(this).children('option:selected').val()});
	});
	$("#category").change(function(){
		showSelectList(1003);
	});
	$("#contentType").change(function(){
		var i=$(this).children('option:selected').val();
		if(i==1003)
			$("#category").show();
		else
			$("#category").hide();
		showSelectList(i);
	});
	
	HIVEVIEW.fn.app.category("category");
	
	//大图
	   _initFileUpload("browse_uploadify_large",{
	   		data:{imgName:"recommendImgPath"},
		    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#focusLargeImg_span").html(createImg("focusLargeImg",ParseTextToJsonObject(response)));
	    	$("#appFocusLargeImgUpload").hide();
	    },
	    onSubmit:function(file, extension){
	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#appFocusLargeImgUpload").show();
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
	    }
	 });
	   _initFileUpload("browse_uploadify_thumb",{
	   		data:{imgName:"recommendImgPath"},
		    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#focusThumbImg_span").html(createImg("focusThumbImg",ParseTextToJsonObject(response)));
	    	$("#appFocusThumbImgUpload").hide();
	    },
	    onSubmit:function(file, extension){
	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
	    		$("#appFocusThumbImgUpload").show();
	    	}else{
	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
	    		return false;
	    	}
	    }
	 });
//	new AjaxUpload($('#browse_uploadify_large'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"recommendImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#focusLargeImg_span").html(createImg("focusLargeImg",ParseTextToJsonObject(response)));
//	    	$("#appFocusLargeImgUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#appFocusLargeImgUpload").show();
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
//	//小图
//	new AjaxUpload($('#browse_uploadify_thumb'), {//绑定AjaxUpload
//	    action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//	    data:{"propKey":"recommendImgPath"},
//	    type:"POST",//提交方式
//	    autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//	    onComplete: function (file, response) {//文件提交完成后可执行的方法
//	    	$("#focusThumbImg_span").html(createImg("focusThumbImg",ParseTextToJsonObject(response)));
//	    	$("#appFocusThumbImgUpload").hide();
//	    },
//	    onSubmit:function(file, extension){
//	    	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#appFocusThumbImgUpload").show();
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//	    }
//	});
});
//dataGrid load data
function dataGridload(param){
	$('#detail_table').datagrid('reload',param);
}
//open dialog
function dialogOpen(title){
//	$('#detail_dialog').dialog('open');
	$('#detail_dialog').dialog({title:title,closed:false});
	var table =document.getElementById("tableData");
	if(table.rows[0]==null){
		showSelectList($("#contentType").val());
	}
}
function showSelectList(contentType){
	if(contentType==1003){
		appRecommend['initApp']();
	}else{
		appRecommend['initAppSubject']();
	}
}
var appRecommend={
	"update":function(){
		flagNoUpdateCurrnetData=false;
		var rowInfo =  $('#detail_table').datagrid('getSelected');
		if(rowInfo){
			$('#id').val(rowInfo.id);
			$('#position').val(rowInfo.position);
			$('#navigationId').val(rowInfo.navigationId);
			$('#seq').val(rowInfo.seq);
			$('#contentType').val(rowInfo.contentType);
			appInfo['appId']=rowInfo.contentId;
			$('#contentDesc').val(rowInfo.contentDesc);
			$('#focusLargeImg_span').html('<img id="focusLargeImg" style="height:60px;" src='+rowInfo.focusLargeImg+'>');
			$('#focusThumbImg_span').html('<img id="focusThumbImg" style="height:60px;" src='+rowInfo.focusThumbImg+'>');
			$('#contentName').val(rowInfo.contentName);
			$('#intervalTime').val(rowInfo.intervalTime);
			$('#isEffective').val(rowInfo.isEffective);	
			dialogOpen("修改推荐应用");
		}
	},
	"selectApp":function(){
		flagNoUpdateCurrnetData=true;
		var rowInfo =  $('#tableData').datagrid('getSelected');
		if(rowInfo){
			$('#isEffective').val(1);
			$('#focusThumbImg_span').html('');
			if($("#contentType").val()==1003){
				appInfo["appId"]=rowInfo.appId;
				$('#contentDesc').val(rowInfo.appDescribe);
				$('#focusLargeImg_span').html(createImg("focusLargeImg",rowInfo.appIcon));
				$('#contentName').val(rowInfo.appName);
			}else{
				appInfo["appId"]=rowInfo.subjectId;
				$('#contentDesc').val(rowInfo.subjectDesc);
				$('#focusLargeImg_span').html(createImg("focusLargeImg",rowInfo.subjectPic));
				$('#contentName').val(rowInfo.subjectName);
			}
		}
	},
	"submitModel":function(){
		var dataInfo={
			position:$('#position').val(),navigationId:$('#recommendType').val(),
			seq:$('#seq').val(),contentType:$('#contentType').val(),
			contentId:appInfo["appId"],contentDesc:$('#contentDesc').val(),
			focusLargeImg:$('#focusLargeImg').attr("src"),focusThumbImg:$('#focusThumbImg').attr("src"),
			contentName:$('#contentName').val(),intervalTime:$('#intervalTime').val(),
			isEffective:$('#isEffective').val(),
			"id":$('#id').val()
		};
		//获取主键值，根据主键值判断添加或修改
		var pkId = $('#id').val();
		//
		var focusLargeImg=$("#focusLargeImg").attr("src");
		if(HIVEVIEW.upload.isRsync(focusLargeImg)){
			_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(focusLargeImg));
			dataInfo["focusLargeImg"]=HIVEVIEW.upload.urlCombination({
				"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":focusLargeImg
			});
		}
		var focusThumbImg=$("#focusThumbImg").attr("src");
		if(HIVEVIEW.upload.isRsync(focusThumbImg)){
			_sendFileToServer("recommendImgPath",HIVEVIEW.upload.separate(focusThumbImg));
			dataInfo["focusThumbImg"]=HIVEVIEW.upload.urlCombination({
				"confUrl":HIVEVIEW.upload.conf.recommendImgPath,"showUrl":focusThumbImg
			});
		}
		if(null==pkId||pkId==""){
			$.post("appfocus/add.json",dataInfo,function(data){
				if(1==data.code){
					$('#detail_table').datagrid('reload');
					$('#detail_dialog').dialog('close');
					$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
				}else if(-100==data.code){
					$.messager.alert(titleInfo,"您要添加的数据已经存在！");
				}else
					$.messager.alert(titleInfo,"保存失败！");
			},"json");
		}else{
			$.post("appfocus/update.json",dataInfo,function(data){
				if(1==data.code){
					$('#detail_table').datagrid('reload');
					$('#detail_dialog').dialog('close');
					$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				}else if(-100==data.code){
					$.messager.alert(titleInfo,"您要添加的数据已经存在！");
				}else{
					$.messager.alert(titleInfo,"修改失败！");
				}
			},"json");
		}
	},
	"initApp":function(){
		$('#tableData').datagrid({
			nowrap: true,
			autoRowHeight: true,
			striped: true,
			toolbar: "#common_app_search",
			fit:true,
			fitColumns:true,
			collapsible:true,
			url:'appfocus/getAppListForAppfocus.json',
			queryParams:{"categoryId":$("#category").val()},
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
			                	var selectRowsData=' <a href=javascript:appRecommend["selectApp"]();>选择</a>';
			                    return '<span style="color:red">'+selectRowsData+'</span>';  
			                }
			            }
					]],
			pagination:true,
			rownumbers:true
		});	
	},
	initAppSubject:function(){
		$('#tableData').datagrid({
			nowrap: true,
			autoRowHeight: true,
			striped: true,
			toolbar: "#common_app_search",
			fit:true,
			fitColumns:true,
			collapsible:true,
			url:'appsubject/getList.json',
			queryParams:{"isEffective":1},
			singleSelect:true,
			idField:'subjectId',
			columns:[[
						{field:'subjectName',title:'名称',width:140,align:"center"},
						{field:'imgSize',title:'类型',width:80,align:"center"},
						{field:'subjectPic',title:'图标',width:75,align:"center",formatter:function(val){
							return '<img src="'+val+'" style="height:45px;">';
						}},
						{field:'opt',title:'操作',width:110,align:'center', rowspan:2,  
			                formatter:function(value,row,index){
			                	var selectRowsData=' <a href=javascript:appRecommend["selectApp"]();>选择</a>';
			                    return '<span style="color:red">'+selectRowsData+'</span>';  
			                }
			            }
					]],
			pagination:true,
			rownumbers:true
		});	
	}
};
//delete
function infoDelete(fieldId){
	$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
		if (r){
			var rowInfo = $('#detail_table').datagrid('getSelected');
			if(rowInfo){
				var param = {
					"id":fieldId,
				};
				$.post("appfocus/delete.json",param,function(data){
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
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		nowrap: true,
		autoRowHeight: true,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'appfocus/getList.json',
		queryParams:{"navigationId":$("#recommendType").val()},
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
{field:'position',title:'位置',width:70},{field:'seq',title:'顺序',width:70},
{field:'contentName',title:'名称',width:100},{field:'contentDesc',title:'描述',width:160},
{field:'focusLargeImg',title:'焦点图',width:80,formatter:function(val){
	return '<img src="'+val+'" style="height:50px;">';
}},{field:'focusThumbImg',title:'缩略图',width:100,formatter:function(val){
	return '<img src="'+val+'" style="height:50px;">';
}},
{field:'isEffective',title:'状态',width:100,formatter:function(val){
	return val==1?'有效':'<span class="STATE0">无效<span>';
}},{field:'id',title:'操作',width:100,
				formatter:function(value){
					return '<a href=javascript:appRecommend["update"]()>编辑</a>'
						+ '  <a href="javascript:infoDelete('+value+')">删除</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true
	});
}

function createImg(targetID,arg){
	return '<img id="'+targetID+'" src='+arg+' style="height:60px;">';
}