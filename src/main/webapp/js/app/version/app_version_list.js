var updateFormValid;
var validateResult;
$(function() {
	$('#dialog_versionEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				VERSION["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_versionEdit').dialog('close');
			}
		}]
	});
	$("#add_appVersion").click(function(){
		VERSION["add"]();
	});
	$("#search_appVersion").click(function(){
		VERSION["search"]();
	});
	
	   _initFileUpload("uploadify_version",{
	   		data:{imgName:"appVersionPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	jQuery("#versionUrl").val(ParseTextToJsonObject(response));
	        	$("#uploadFlag").val("");
	        	$("#imgVideoUploadAppVersion").hide();
	        },
	        onSubmit:function(file, extension){
	        	$("#imgVideoUploadAppVersion").show();
	        	$("#uploadFlag").val("uploading");
	        }
	 });
//    var button = jQuery('#uploadify_version');//绑定事件
//    new AjaxUpload(button, {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        type:"POST",//提交方式
//        data:{"propKey":"appVersionPath"},
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	jQuery("#versionUrl").val(ParseTextToJsonObject(response));
//        	$("#uploadFlag").val("");
//        	$("#imgVideoUploadAppVersion").hide();
//        	
//        },
//        onSubmit:function(file, extension){
//        	$("#imgVideoUploadAppVersion").show();
//        	$("#uploadFlag").val("uploading");
//        }
//    });
}); 

function getListAppVersion(dataId){
	$("#appId").val(dataId);
	$('#tableAppVersion').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_appVersion_search",
		url:'appVersion/getAppVersionList.json',
		queryParams:{"appId":dataId},
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'versionNo',title:'版本',width:50,align:"center"},
			{field:'versionDescribe',title:'描述',width:320,align:"center"},
			{field:'state',title:'状态',width:100,align:"center",formatter:function(val){
				return val==1?"有效":'<span style="color:red">无效</span>';
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var updateHref=' <a href=javascript:VERSION["updateOperate"]('+row.id+','+index+');>修改</a>';
                	var imgHref=' <a href=javascript:showVersionImg('+row.videosetId+','+index+');>版本截图</a>';
                    return '<span style="color:red">'+updateHref+imgHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
var VERSION={
		"add":function(){
			$("input[name='is_newVersion']").removeAttr("checked"); 
			$("#id").val("");
			$("#versionName").val("");
			$("#versionDescribe").val("");
			$("#versionUrl").val("");
			//$("#appSize").val(0);
			$("#state").val(1);
			$('#dialog_versionEdit').dialog({title:"添加应用版本",closed:false});
		},
		"updateOperate":function(){
			$("input[name='is_newVersion']").removeAttr("checked"); 
			$('#dialog_versionEdit').dialog({title:"修改应用版本",closed:false});
			var row = $('#tableAppVersion').datagrid('getSelected');
		    if (row){
		    	$("#showLoadUrl").attr("src","");
		    	$("#id").val(row.id);
		    	$("#versionName").val(row.versionNo);
		    	//$("#appSize").val(row.appSize);
		    	$("#versionDescribe").val(row.versionDescribe);
		    	$("#versionUrl").val(row.versionUrl);
		    	$("#versionState").val(row.state);
		    }
		},
		"submitButton":function(){
			var id = $("#id").val();
			var isNewVersion=true;
			console.log($("input[name='is_newVersion']:checkbox:checked").length);
			if($("input[name='is_newVersion']:checkbox:checked").length==0)
				isNewVersion=false;
			var arr_add = {
					"appId":$("#appId").val(),
					"versionNo":jQuery("#versionName").val(),
					"isNewVersion":isNewVersion,
					"versionDescribe":jQuery("#versionDescribe").val(),
					"versionUrl":jQuery("#versionUrl").val(),
					"state":jQuery("#versionState").val(),
					"propKey":"tempPath"
			};
			
			if(arr_add["versionUrl"]==""){
				$.messager.alert(titleInfo,'请上传版本！');
				return;
			}
			if($("#uploadFlag").val()=="uploading"){
				$.messager.alert(titleInfo,'文件上传中，请稍等！');
				return;
			}

			var versionUrl=$("#versionUrl").val();
			if(HIVEVIEW.upload.isRsync(versionUrl)){
				_sendFileToServer("appVersionPath",HIVEVIEW.upload.separate(versionUrl));
				arr_add["versionUrl"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.appVersionPath,"showUrl":versionUrl,
					"flag":"tvapk"
				});
			}
			
			if(id!=null&&id!=""){
				arr_add['id']=id;
				$.post("appVersion/update.json",arr_add,function(data){
					if(data.code==1){
						$('#tableAppVersion').datagrid("reload");
						$('#dialog_versionEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("appVersion/save.json",arr_add,function(data){
					if(data.code==1){
						$('#tableAppVersion').datagrid("reload");
						$('#dialog_versionEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！');
					}
				},"json");
			}
		},
		"search":function(){
			var parameter={"appId":$("#appId").val(),"versionNo":$("#versionNo_search").val(),"state":$("#versionState_search").val()};
			if(parameter["state"]==-1)
				delete parameter["state"];
			$('#tableAppVersion').datagrid("load",parameter);
		}
};
//**********版本截图************//
function showVersionImg(avId,appId){
	var rowInfo = $('#tableAppVersion').datagrid('getSelected');
	$('#dialog_appVersionImgList').dialog({title:"应用版本列表",closed:false});
	initAppVersionImgList(rowInfo.id,$("#appId").val());
}