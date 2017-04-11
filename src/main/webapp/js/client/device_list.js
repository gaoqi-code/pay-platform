var parameter = {};
$(function() {
	$('#dialog_dievice').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				submitModel();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_dievice').dialog('close');
			}
		}]
	});
	$('#dievice_export').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				exportDevice();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dievice_export').dialog('close');
			}
		}]
	});
	//
	$('#dialog_upload').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				submitUpload();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_upload').dialog('close');
			}
		}]
	});
	//导出设备
	$('#batch_export').click(function(){
		batchExport();
	});
	//添加按钮
	$('#device_add').click(function(){
		$('#deviceForm')[0].reset();
		$('#id').val('');
		$('#dialog_dievice').dialog('open');
	});
	//搜索按钮
	$('#search_button').click(function(){
		var cpChannelListSearch = $('#cpChannelList_search').val();
		var deviceStateSearch = $('#deviceState_search').val();
		var cpListSearch = $('#cpList_search').val();
		parameter={
			deviceState:deviceStateSearch,
			cpChannelId:cpChannelListSearch,
			cpId:cpListSearch
		}
		getList();
	});
	//级联显示硬件型号
	$('#export_cpList').change(function(){
		initHardwareNoList($('#export_cpList').val());
	});
	//初始化选择框--cpchinal
	initCp();
	initCpChannel();
	getList();
}); 
//修改	
function editDevice(){
	var rowInfo = $('#tableDevice').datagrid('getSelected');
	if(rowInfo){
		$('#id').val(rowInfo.id);
		$('#deviceId').val(rowInfo.deviceId);
		$('#deviceMac').val(rowInfo.deviceMac);
		$('#deviceSn').val(rowInfo.deviceSn);
		$('#deviceState').val(rowInfo.deviceState);
		$('#deviceVersion').val(rowInfo.deviceVersion);
		$('#cpList').val(rowInfo.cpId);
		$('#cpChannelList').val(rowInfo.cpChannelId);
		$('#dialog_dievice').dialog('open');
	}
}
//批量上传
function submitUpload(){
	var dataInfo = {
		 filePath : $('#uploadPath').val(),
		 channelId : $('#upload_cpChannelList').val(),
		 version : $('#upload_deviceVersion').val()
	
	}
	$.post("device/saveForeach.json",dataInfo,function(data){
		if(1==data.code){
			$('#tableDevice').datagrid('reload');
			$('#dialog_upload').dialog('close');
			$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,"导入失败！")
		}
	},"json");
}
//确定
function submitModel(){
	var dataInfo = {
		deviceId:$('#deviceId').val(),
		deviceMac:$('#deviceMac').val(),
		deviceSn:$('#deviceSn').val(),
		deviceState:$('#deviceState').val(),
		deviceVersion:$('#deviceVersion').val(),
		cpChannelId:$('#cpChannelList').val()
	}
	//获取主键值，根据主键值判断添加或修改
	var pkId = $('#id').val();
	if(null==pkId||pkId==""){
		$.post("device/saveDevice.json",dataInfo,function(data){
			if(1==data.code){
				$('#tableDevice').datagrid('reload');
				$('#dialog_dievice').dialog('close');
				$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
			}
		},"json");
	}else{
		dataInfo.id = pkId;
		$.post("device/updateDevice.json",dataInfo,function(data){
			if(1==data.code){
				$('#tableDevice').datagrid('reload');
				$('#dialog_dievice').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}
		},"json");
	}
}
function deleteDevice(){
	$.messager.confirm(titleInfo,"确定删除该设备？",function(r){
		if(r){
			var rowInfo = $('#tableDevice').datagrid('getSelected');
			if(rowInfo){
				$.post('device/deleteDevice.json',{id:rowInfo.id},function(data){
					if(1==data.code){
						$('#tableDevice').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					}
				},'json');
			}	
		}
	});
}
//初始化渠道列表
function initCpChannel(){
	$.post("cpChannel/getCpChannelByPage.json",{rows:20,cpChannelState:1},function(data){
			$("#cpChannelList_search").html('<option value="">全部</option>');
			$("#cpChannelList").html('<option value="">全部</option>');
			$("#export_cpChannelList").html('<option value="">全部</option>');
			$("#upload_cpChannelList").html('<option value="">全部</option>');
			$.each(data.rows,function(dataIndex,role){
				$("#cpChannelList_search").append('<option value='+role.cpChannelId+'>'+role.cpChannelName+'</option>');
				$("#cpChannelList").append('<option value='+role.cpChannelId+'>'+role.cpChannelName+'</option>');
				$("#export_cpChannelList").append('<option value='+role.cpChannelId+'>'+role.cpChannelName+'</option>');
				$("#upload_cpChannelList").append('<option value='+role.cpChannelId+'>'+role.cpChannelName+'</option>');
			});
		},"json");
} 
//初始化生产商列表
function initCp(){
	$.post("cp/getCpList.json",{rows:20,cpState:1},function(data){
		$("#cpList_search").html('<option value="">全部</option>');
		$("#export_cpList").html('<option value="">全部</option>');
		$("#cpList").html('<option value="">全部</option>');
		$("#upload_cpList").html('<option value="">全部</option>');
		$.each(data.rows,function(dataIndex,role){
			$("#cpList_search").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
			$("#cpList").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
			$("#export_cpList").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
			$("#upload_cpList").append('<option value='+role.cpId+'>'+role.cpName+'</option>');
		});
	},"json");
} 
//初始化硬件版本号列表
function initHardwareNoList(cpId){
	$.post("hardware/getList.json",{rows:200,isEffective:1,cpId:cpId},function(data){
		$("#export_hardwareNo").html('');
		$.each(data.rows,function(dataIndex,role){
			$("#export_hardwareNo").append('<option value='+role.id+'>'+role.hardwareNo+'</option>');
		});
	},"json");
}
//批量导出，指定数量，完善信息
function batchExport(){
	var rows = $('#tableDevice').datagrid('getSelections');
	
	getDeviceCount();
}
function exportDevice(){
	var amount = parseInt($('#amount').val());
	var available = parseInt($('#available').val());
	if(available<amount){
		$.messager.alert(titleInfo,"超过最大未激活数量");
		return false;
	}
	var dataInfo = {
		amount:amount,
		cpId:$('#export_cpList').val(),
		cpName:$('#export_cpList').find("option:selected").text(),
		cpChannelId:$('#export_cpChannelList').val(),
		cpChannelName:$('#export_cpChannelList').find("option:selected").text(),
		romVersion:$('#export_romVersion').val(),
		hardwareId:$('#export_hardwareNo').val(),
		hardwareNo:$('#export_hardwareNo').find("option:selected").text()
	}
	$('#h_cpName').val(dataInfo.cpName);
	$('#h_cpChannelName').val(dataInfo.cpChannelName);
	$('#h_hardwareNo').val(dataInfo.hardwareNo);
	
	$('#exportDevice').submit();
	$('#dievice_export').dialog('close');
//	$.post("device/exportDevice.json",dataInfo);
}
//显示设备数量状态
function getDeviceCount(){
	$.post("device/countDevice.json",{},function(data){
		if(data.code == 1){
			$('#available').val(data.obj);
			$('#dievice_export').dialog('open');
		}else{
			$.messager.alert(titleInfo,"生成失败");
		}
	},"json");
}
function getList(){
	$('#tableDevice').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
		//frozenColumns:[[{field:'ss',checkbox:true}]],
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'device/getDeviceByPage.json',
		queryParams:parameter,
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'deviceMac',title:'MAC',width:150,align:'center'},
			{field:'deviceSn',title:'SN',width:200,align:'center'},
			{field:'deviceVersion',title:'版本',width:70,align:'center'},
			{field:'cpName',title:'生产商',width:150,align:'center',
				formatter:function(value,row,index){
					if(row.cp){
						return row.cp.cpName;
					}
				}
			},
			{field:'cpChannelName',title:'渠道',width:150,align:'center',
				formatter:function(value,row,index){
					if(row.cpChannel){
						return row.cpChannel.cpChannelName;
					}
				}
			},
			{field:'hardwareNo',title:'硬件版本',width:70,align:'center',
				formatter:function(value,row,index){
					if(row.hardware){
						return row.hardware.hardwareNo;
					}
				}
			},
			{field:'romVersion',title:'rom版本',width:70,align:'center'},
//			{field:'deviceLastIp',title:'IP',width:150,align:'center'},
			{field:'deviceState',title:'状态',width:70,align:'center',
				formatter:function(value){
					return value==1?'已激活':'<span style="color:red">未激活</span>';
				}
			},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	//var href=' <a href=javascript:CP["enterCpChannelList"]('+row.cpId+','+index+');>修改</a>';
                	var updateHref=' <a href=javascript:editDevice('+row.id+','+index+');>修改</a>';
                	var deleteHref=' <a href=javascript:deleteDevice('+row.videosetId+','+index+');>删除</a>';
                    return '<span style="color:red">'+updateHref+' '+deleteHref+'</span>';  
                }
            }
		]],
		pagination:true,
		pageSize:20,
		rownumbers:true
	});
}
