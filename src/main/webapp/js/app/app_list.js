var parameter = {};
var categorys_app;
var tags_app;
var validateResult;
$(function() {
	parameter = {"currentPage":1,"pageSize":10};
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				APP["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	APP.init();
	$("#add_app").click(function(){
		APP["add"]();
	});
	$("#search_app").click(function(){
		APP["search"]();
	});
	getList();
	$("#category").change(function(){
		changeSelectEvent("tag",$(this).children('option:selected').val());
	});
	   _initFileUpload("uploadify",{
	    		data:{imgName:"appIconPath"},
		          onComplete: function (file, response) {//文件提交完成后可执行的方法
			        	var back_r = ParseTextToJsonObject(response);
			        	$("#appIcon").val(back_r);
			        	$("#show_appIcon").attr("src",back_r);
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
}); 

function getList(){
	$('#tableDiv').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'app/getAppList.json',
		queryParams:{},
		//remoteSort: false,
		singleSelect:true,
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
                	var href=' <a href=javascript:APP["version"]('+row.appId+','+index+');>版本</a>';
                	var updateHref=' <a href=javascript:APP["updateOperate"]('+row.appId+','+index+');>修改</a>';
                	var historyHref=' <a href=javascript:getHistoryList('+row.appId+');>操作历史</a>';
                    return '<span style="color:red">'+href+updateHref+historyHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
var APP={
		"add":function(){
			$("#appId").val("");
			$("#appName").val("");
			$("#appDescribe").val("");
			
			$("#appIcon").val("");
			$("#show_appIcon").attr("src","");
			$("#usbDevice").val("");
			//$("#developerId").val("");
			$("#bundleId").val("");
			//$("#tagName").val("");
			$("#state").val(1);
			$("#seq").val(0);
			$("#appType").val(1);
			$("#isPay").val(1);
			$('#dialog').dialog({title:"添加应用",closed:false});
		},
		"updateOperate":function(){
			$('#dialog').dialog({title:"修改应用",closed:false});
			var row = $('#tableDiv').datagrid('getSelected');
		    if (row){
		    	$("#showLoadUrl").attr("src","");
		    	$("#appId").val(row.appId);
		    	$("#appName").val(row.appName);
		    	$("#appIcon").val(row.appIcon);
		    	$("#show_appIcon").attr("src",row.appIcon);
		    	
		    	$("#developerId").val(row.developerId);
		    	$("#bundleId").val(row.bundleId);
		    	$("#state").val(row.state);
		    	$("#seq").val(row.seq);
		    	$("#appType").val(row.appType);
		    	
		    	$("#isPay").val(row.isPay);
		    	$("#developer").val(row.developer);
		    	$("#appDescribe").val(row.appDescribe);
		    	$("#usbDevice").val(row.usbDevice);
		    }
		},
		"submitButton":function(){
			var appId = $("#appId").val();
			var arr_add = {
					"appName":$("#appName").val(),
					"bundleId":jQuery("#bundleId").val(),
					"developerId":jQuery("#developerId").val(),
					"developer":jQuery("#developerId").find("option:selected").text(),
					"appDescribe":jQuery("#appDescribe").val(),
					"seq":jQuery("#seq").val(),
					"tagInfo":'[{"categoryId":'+$("#category").val()+',"category":"'+$("#category").find("option:selected").text()+'","tagId":'+$("#tag").val()+',"tag":"'+$("#tag").find("option:selected").text()+'"}]',
					"tagName":$("#category").find("option:selected").text(),//+","+$("#category2").find("option:selected").text(),
					"appType":jQuery("#appType").val(),
					"state":jQuery("#state").val(),
					"isPay":jQuery("#isPay").val(),
					"usbDevice":$("#usbDevice").val(),
					"categoryId":$("#category").val()
			};
			var appIcon=$("#show_appIcon").attr("src");
			if(HIVEVIEW.upload.isRsync(appIcon)){
				_sendFileToServer("appIconPath",HIVEVIEW.upload.separate(appIcon));
				arr_add["appIcon"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.appIconPath,"showUrl":appIcon
				});
			}
			if(appId!=null&&appId!=""){
				arr_add['appId']=appId;
				$.post("app/update.json",arr_add,function(data){
					if(data.code==1){
						$('#tableDiv').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("app/save.json",arr_add,function(data){
					if(data.code==1){
						$('#tableDiv').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！');
					}
				},"json");
			}
		},
		"version":function(dataId){
			$('#dialog_appVersionList').dialog({title:"应用版本列表",closed:false});
			getListAppVersion(dataId);
		},
		"search":function(){
			var parameter={"appName":$("#appName_search").val(),"state":$("#state_search").val(),"appType":$("#appType_search").val()};
			if(parameter["state"]==-1)
				delete parameter["state"];
			if(parameter["appType"]==-1)
				delete parameter["appType"];
			$('#tableDiv').datagrid("load",parameter);
		},
		"init":function(){
			//分类
			$.post("apptag/getCategroyListByPage.json",{"state":1,"rows":100},function(data){
				var rows=data.rows;
				categorys_app=data.rows;
				if(rows.length==0)
					return;
				$("#category").html("");
				$("#category2").html("");
				for(var i=0;i<rows.length;i++){
					$("#category").append('<option value='+rows[i].categoryId+'>'+rows[i].categoryName+'</option>');
					$("#category2").append('<option value='+rows[i].categoryId+'>'+rows[i].categoryName+'</option>');
					if(i==0){
						initTag(rows[i].categoryId);
					}
				}
			},"json");
			$.post("appdeveloper/getDeveloperList.json",{"state":1,"rows":20},function(data1){
				var data = data1.rows;
				if(data!=null){
					$("#developerId").html("");
					for(var i=0;i<data.length;i++){
						$("#developerId").append('<option value='+data[i].id+'>'+data[i].developerName+'</option>');
					}
				}
			},"json");
			//标签
			function initTag(categoryId){
				$.post("apptag/getTagList.json",{"state":1,"rows":2000},function(data){
					tags_app = data;
					if(tags_app!=null&&tags_app.length!=0){
						$("#tag").html("");
						$("#tag2").html("");
						for(var i=0;i<tags_app.length;i++){
							if(tags_app[i].categoryId==categoryId){
								$("#tag").append('<option value='+tags_app[i].tagId+'>'+data[i].tagName+'</option>');
								$("#tag2").append('<option value='+tags_app[i].tagId+'>'+data[i].tagName+'</option>');
							}
						}
					}
				},"json");
			}
		}
};
function changeSelectEvent(targetId,categoryId){
	$("#"+targetId).html("");
	if(tags_app!=null){
		for(var i=0;i<tags_app.length;i++){
			if(tags_app[i].categoryId==categoryId){
				$("#"+targetId).append('<option value='+tags_app[i].tagId+'>'+tags_app[i].tagName+'</option>');
			}
		}
	}else{
		$("#"+targetId).append('<option value="-1"></option>');
	}
}
function getHistoryList(appId){
	$('#dialog_history_list').dialog({title:"操作历史",closed:false});
	$('#tableHistoryList').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		url:'operatehistory/getAppOperateHistoryList.json',
		queryParams:{"appId":appId},
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'account',title:'操作人员',width:50,align:"center"},
			//{field:'operateType',title:'操作类型',width:55,align:"center"},
			{field:'operateRecord',title:'操作记录',width:120,align:"center"},
			{field:'operateTime',title:'操作时间',width:100,align:"center",formatter:function(val){
				var date = new Date(val);
				return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDay()+1)+" "+date.getHours()+":"+date.getMinutes();
			}}
		]],
		pagination:true,
		rownumbers:true
	});
}