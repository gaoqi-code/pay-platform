var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
var upgradeTypeArray=new Array();
var cpList=null;
var versionInfoSelected={};//点击版本详情时，记录版本的所有信息;
upgradeTypeArray[0]="不升级";
upgradeTypeArray[1]="可选升级";
upgradeTypeArray[2]="强制升级";
$(function() {
	getList();
	VERSION["initCpList"]();

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
	$("#search_button").click(function(){
		VERSION["search"]();
	});
	$("#version_add").click(function(){
		VERSION['add']();
	});
	
	   _initFileUpload("uploadifyVersion",{
   		data:{imgName:"versionPath"},
        onComplete: function (file, response) {//文件提交完成后可执行的方法
        	var url=ParseTextToJsonObject(response);
        	$("#url").val(url);
        	$("#uploadFlag").val("");
        	$("#imgVideoUpload").hide();
        },
        onSubmit:function(file, extension){
        	$("#imgVideoUpload").show();
        	$("#uploadFlag").val("uploading");
        }
 });
//    new AjaxUpload($('#uploadifyVersion'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"versionPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var url=ParseTextToJsonObject(response);
//        	$("#url").val(url);
//        	$("#uploadFlag").val("");
//        	$("#imgVideoUpload").hide();
//        },
//        onSubmit:function(file, extension){
//        	$("#imgVideoUpload").show();
//        	$("#uploadFlag").val("uploading");
//        }
//    });
	   
		//关联标签------------------start---
}); 
	
 

function getList(){
	$('#tableVersion').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
		//frozenColumns:[[{field:'ss',checkbox:true}]],
		checkbox:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'version/getVersionByPage.json',
		queryParams:{"isEffective":$("#isEffective_search").val()},
		//remoteSort: false,
		singleSelect:true,
		idField:'cvId',
		columns:[[
			{field:'cvId',title:'编号',width:50,align:'center'},
			{field:'version',title:'版本',width:150,align:'center',editor:{type:'text'}},
			{field:'type',title:'升级类型',width:100,align:'center',formatter:function(value){
				return upgradeTypeArray[value];
			}},
			{field:'isEffective',title:'启动状态',width:100,align:'center',formatter:function(value){
				return value==1?"已启用":'<span style="color:red;">未启用';
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var href=' <a href=javascript:VERSION["detailList"]('+row.cvId+','+index+');>详情</a>';
                	var updateHref=' <a href=javascript:VERSION["update"]('+row.cpId+','+index+');>修改</a>';
                	var deleteHref=' <a href=javascript:VERSION["deleteOperate"]('+row.cvId+');>删除</a>';
                    return '<span style="color:red">'+href+" "+updateHref+" "+deleteHref+'</span>';
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
	$('#tableCp').datagrid({onClickRow: function(index,rowData){
		$(this).datagrid('beginEdit', index);
		$("#cpId").val(rowData.cpId);
	}
	});
}
var lastIndex;
var VERSION={
		"add":function(){
			$("#cvId").val("");
			$("#version").val("");
			$("#type").val(1);
			$("#features").val("");
			$("#url").val("");
			$("#isEffective").val(1);
			$("#channel_list_select_selected").html("");
//			$("#channel_list_select_wait").removeAttr("disabled");
//			$("#channel_list_select_selected").removeAttr("disabled");
			$('#dialog_versionEdit').dialog({title:"添加版本",closed:false});
			versionUpdateInfoArray=new Array();
		},
		"update":function(){
			var rowInfo = $('#tableVersion').datagrid("getSelected");
//			$("#channel_list_select_wait").attr("disabled","disabled");
//			$("#channel_list_select_selected").attr("disabled","disabled");
			if(rowInfo){
				$("#cvId").val(rowInfo.cvId);
				$("#version").val(rowInfo.version);
				$("#type").val(rowInfo.type);
				$("#features").val(rowInfo.features);
				$("#url").val(rowInfo.url);
				$("#isEffective").val(rowInfo.isEffective);
				$.post("version/getVersionUpdateByPage.json",{"cvid":rowInfo.cvId},function(data){
					versionUpdateInfoArray=new Array();
					var versionUpdateInfo;
					$("#channel_list_select_selected").html("");
					for(var i=0;i<data.rows.length;i++){
						$("#channel_list_select_selected").append('<option value='+data.rows[i].cpChannelId+'>'+data.rows[i].cpName+"/"+data.rows[i].hardwareNo+"/"+data.rows[i].cpChannelName+'</option>');
						versionUpdateInfo = {};
						versionUpdateInfo["cpId"]=data.rows[i].cpId;
						versionUpdateInfo["hardwareNo"]=data.rows[i].hardwareNo;
						versionUpdateInfo["cpChannelId"]=data.rows[i].cpChannelId;
						versionUpdateInfoArray.push(versionUpdateInfo);
					}
				},"json");
			}
			$('#dialog_versionEdit').dialog({title:"修改版本",closed:false});
		},
		"deleteOperate":function(cvId){
			$.messager.confirm(titleInfo,"确定删除这个版本吗？",function(r){
				if(r){
					$.post("version/deleteVersion.json",{"cvId":cvId},function(data){
						if(data.code==1){
							$('#tableVersion').datagrid("reload");
							$('#dialog_versionEdit').dialog('close');
							$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
						}else{
							$.messager.alert(titleInfo,'删除失败！');
						}
					},"json");
				}
			});
		},
		"submitButton":function(){
			var cvId = $("#cvId").val();
			var arr_add = {
					"version":$("#version").val(),
					"type":$("#type").val(),
					"features":$("#features").val(),
					"cpchannelId":$("#cpchannel_list").val(),
					"url":$("#url").val(),
					"isEffective":$("#isEffective").val(),
					"propKey":"versionPath",
					"cpId":$("#hardware_list_select").val()
			};
			
			var url=$("#url").val();
			if(HIVEVIEW.upload.isRsync(url)){
				_sendFileToServer("versionPath",HIVEVIEW.upload.separate(url));
				arr_add["url"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.versionPath,"showUrl":url,
					"flag":"tvapk"
				});
			}
			
			if(cvId!=null&&cvId!=""){
				arr_add['cvId']=cvId;
				$.post("version/updateVersion.json",arr_add,function(data){
					if(data.code==1){
						$('#tableVersion').datagrid("reload");
						$('#dialog_versionEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("version/saveVersion.json",arr_add,function(data){
					if(data.code==1){
						$('#tableVersion').datagrid("reload");
						$('#dialog_versionEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！');
					}
				},"json");
			}
		},
		"detailList":function(cvid){
			$('#tableVersionUpdateSelected').datagrid({
				fitColumns:true,
				fit:true,
				checkbox:true,
				striped:true,
				toolbar: "",
				url:'version/getVersionUpdateByPage.json',
				queryParams:{"cvid":cvid},
				singleSelect:true,
				idField:'id',
				columns:[[
					{field:'id',title:'编号',width:50,align:'center'},
					{field:'cpName',title:'生成商',width:150,align:'center'},
					{field:'cpChannelName',title:'分公司',width:150,align:'center'},
					{field:'hardwareNo',title:'型号',width:150,align:'center'},
					{field:'opt',title:'操作',width:150,formatter:function(val,row,index){
	                	var updateHref=' <a href=javascript:VERSION["update"]('+row.id+','+index+');>修改</a>';
	                	var deleteHref=' <a href=javascript:VERSION["deleteSysVersionUpdate"]('+row.id+');>删除</a>';
	                    return '<span style="color:red">'+updateHref+" "+deleteHref+'</span>';
					}}
				]],
				pagination:true,
				rownumbers:true
			});
			var rowInfo = $('#tableVersion').datagrid("getSelected");
			if(rowInfo){
				versionInfoSelected={
						"cvid":rowInfo.cvId,
						"cpId":$("#hardware_list_select").val(),
						"version":rowInfo.version
					};
				VERSION["initCpChannel"]($("#cp_list_select").val());
			}
			$('#dialog_versionUpdateShow').dialog({title:"版本发布详情",closed:false});
		},
		"initCpList":function(){
			$.post("version/getCpListForSelect.json",{},function(data){
				if(data.code==1){
					cpList=data.obj;
					$("#cp_list_select").html('');
					for(var i=0;i<cpList.length;i++){
						$("#cp_list_select").append('<option value='+cpList[i].cpId+'>'+cpList[i].cpName+'</option>');
						if(i==0&&cpList[0].hardware.length>0){
							for(var j=0;j<cpList[i].hardware.length;j++){
								$("#hardware_list_select").append('<option value='+cpList[i].cpId+'>'+cpList[i].hardware[j].hardwareNo+'</option>');
							}
						}
					}
					$("#cp_list_select").change(function(){
						VERSION["changeCpEvent"]($(this).children('option:selected').val());
					});
					$("#hardware_list_select").change(function(){
						VERSION["changeHardwareEvent"]($(this).children('option:selected').val());
					});
				}
			},"json");
		},
		"changeCpEvent":function(val){
			$("#hardware_list_select").html("");
			for(var i=0;i<cpList.length;i++){
				if(cpList[i].cpId==val){
					for(var j=0;j<cpList[i].hardware.length;j++){
						$("#hardware_list_select").append('<option value='+cpList[i].hardware[j].id+'>'+cpList[i].hardware[j].hardwareNo+'</option>');
					}
					VERSION["initCpChannel"](cpList[i].cpId);
					break;
				}
			}
		},
		"changeHardwareEvent":function(val){
			VERSION["initCpChannel"](val);
		},
		"search":function(){
			var parameter={
					"version":$("#version_search").val(),
					"isEffective":$("#isEffective_search").val()
			};
			if(parameter['cpChannelId']==-1)
				delete parameter['cpChannelId'];
			$('#tableVersion').datagrid("load",parameter);
		},
		"initCpChannel":function(val){
			$('#tableVersionUpdate').datagrid({
				fitColumns:true,
				fit:true,
				striped:true,
				toolbar: "#tableVersionUpdate_search_div",
				url:'version/getCpChannelForVersion.json',
				queryParams:{"cpId":val,"cvid":versionInfoSelected.cvid,"hardwareId":$("#hardware_list_select").val()},
				singleSelect:true,
				idField:'cpChannelId',
				columns:[[
					{field:'cpChannelId',title:'编号',width:150,align:'center'},
					{field:'cpChannelName',title:'分公司名称',width:150,align:'center'},
					{field:'opt',title:'操作',width:150,formatter:function(val,row,index){
	                	var selectHref=' <a href=javascript:VERSION["selectCpChannel"]('+row.cpChannelId+');>选择</a>';
	                    return '<span style="color:red">'+selectHref+'</span>';
					}}
				]],
				pagination:true,
				rownumbers:true
			});
		},
		"selectCpChannel":function(cpChannelId){
			versionInfoSelected["hardwareId"]=$("#hardware_list_select").val();
			versionInfoSelected["cpChannelId"]=cpChannelId;
			$.post("version/addSysVersionUpdate.json",versionInfoSelected,function(data){
				if(data.code==1){
					$('#tableVersionUpdateSelected').datagrid("reload");
					$('#tableVersionUpdate').datagrid("reload");
				}else{
					$.messager.alert(titleInfo,'添加异常！');
				}
			},"json");
		},
		"deleteSysVersionUpdate":function(id){
			$.messager.confirm(titleInfo,"确定删除吗？",function(r){
				if(r){
					$.post("version/deleteSysVersionUpdate.json",{"id":id},function(data){
						if(data.code==1){
							$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
							$('#tableVersionUpdateSelected').datagrid("reload");
							$('#tableVersionUpdate').datagrid("reload");
						}else{
							$.messager.alert(titleInfo,'删除失败！');
						}
					},"json");
				}
			});
		},
};