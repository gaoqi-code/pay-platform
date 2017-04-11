var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化渠道
	CPCHANNEL["getList"]();
	$("#cpChannelSelectButton").click(function(){
		searchCpChannel();
	});
	$("#cpChannel_add").click(function(){
		CPCHANNEL['add']();
	});
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				CPCHANNEL["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	$('#dialog_tv').dialog({});
	//初始化渠道LOGO上传按钮
	_initFileUpload("cpChannelLogo_add",{
   		data:{imgName:"cpChannelLogoPath"},
	    onComplete: function (file, response) {//文件提交完成后可执行的方法
	    	$("#cpChannelLogo").val(ParseTextToJsonObject(response));
	    	$("#cpChannelLogo_url").attr("src",ParseTextToJsonObject(response));
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
		initTvList({isEffective:1,tvname:tvname,cpChannelId:$('#tableCpChannel').datagrid("getSelected").cpChannelId});
	});
}); 
var lastIndex;
var CPCHANNEL={
		"getList":function(cpId,index){
			$('#tableCpChannel').datagrid({
				fitColumns:true,
				fit:true,
				checkbox:true,
//				autoRowHeight: false,
				striped:true,
				toolbar: "#common_channel_search",
				url:'cpChannel/getCpChannelByPage.json',
				queryParams:{"cpId":cpId},
				//remoteSort: false,
				singleSelect:true,
				idField:'cpChannelId',
				columns:[[
//					{field:'cpChannelId',title:'编号',width:50,align:'center'},
					{field:'cpChannelName',title:'名称',width:150,align:'center',editor:{type:'text'}},
					{field:'cpChannelLogo',title:'LOGO',width:150,
						formatter:function(value,row,index){
							return '<img src="'+value+'" style="height:50px">';
						}
					},
					{field:'cpChannelState',title:'状态',width:100,align:'center',editor:{
						type:'combobox',
						options:{
							valueField:'cpState',
							textField:'name',
							panelHeight: 'auto',
							data:[
							    {cpState:0,name:'无效'},
								{cpState:1,name:'有效'}
								]
						}
					},formatter:function(value){
						return value==1?"有效":'<span style="color:red;">无效</span>';
					}},
					{field:'secretKey',title:'密钥',width:200,align:'center',editor:{type:'text'},hidden:true},
					{field:'maxSize',title:'最大数量',width:100,align:'center',editor:"numberbox",hidden:true},
					{field:'isCheckMac',title:'是否验证MAC',width:100,align:'center',editor:{
						type:'combobox',
						options:{
							valueField:'isCheckMac',
							textField:'name',
							panelHeight: 'auto',
							data:[
							    {isCheckMac:0,name:'不验证'},
								{isCheckMac:1,name:'验证'}
								]
						}
					},formatter:function(value){
						return value==1?"验证":'<span style="color:red;">不验证</span>';
					}},
					{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
		                formatter:function(value,row,index){
		                	//var href=' <a href=javascript:CP["enterCpChannelList"]('+row.cpId+','+index+');>渠道</a>';
		                	var updateHref=' <a href=javascript:CPCHANNEL["edit"]();>修改</a>';
		                	var tvHref=' <a href=javascript:CPCHANNEL["tvInfo"]();>关联电视台</a>';
		                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
		                    return '<span style="color:red">'+tvHref+updateHref+'</span>';  
		                }
		            }
				]],
				pagination:true,
				rownumbers:true,
				onClickRow:function(index,rowData){
				}
			});
		},
		"add":function(){
			$('#cpChannelId').val('');
			$('#cpChannelName').val('');
			$('#dialog').dialog('open');
		},
		"edit":function(){
			var row = $('#tableCpChannel').datagrid('getSelected');
			$('#cpChannelId').val(row.cpChannelId);
			$('#cpChannelName').val(row.cpChannelName);
			$('#cpChannelState').val(row.cpChannelState);
			$('#isCheckMac').val(row.isCheckMac);
			$('#cpChannelLogo').val(row.cpChannelLogo);
			$('#cpChannelLogo_url').attr("src",row.isCheckMac);
			$('#dialog').dialog('open');
		},
		"submitButton":function(){
			var cpChannelId = $('#cpChannelId').val();
			var logPath = $('#cpChannelLogo').val();
			var arr_add={
					cpChannelName:$('#cpChannelName').val(),
					cpChannelState:$('#cpChannelState').val(),
					isCheckMac:$('#isCheckMac').val(),
					cpChannelLogo:logPath
			};
			if(HIVEVIEW.upload.isRsync(logPath)){
				_sendFileToServer("cpChannelLogoPath",HIVEVIEW.upload.separate(logPath));
				arr_add["cpChannelLogo"]=HIVEVIEW.upload.urlCombination({
					"confUrl":"/home/nginx/upload/tvimg/cpChannelLogo","showUrl":logPath
				});
			}
			if(cpChannelId!=null&&cpChannelId!=""){
				arr_add['cpChannelId']=cpChannelId;
				$.post("cpChannel/updateCpChannel.json",arr_add,function(data){
					if(data.code==1){
						$('#tableCpChannel').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("cpChannel/saveCpChannel.json",arr_add,function(data){
					if(data.code==1){
						$('#tableCpChannel').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！');
					}
				},"json");
			}
		},
		"enterCpChannelList":function(){
			$('#dialog_cpChannel').dialog('open');
		},
		"tvInfo":function(){
			var row = $('#tableCpChannel').datagrid('getSelected');
			if(row){
				initAddTvList({cpChannelId:row.cpChannelId});
				initTvList({isEffective:1,cpChannelId:row.cpChannelId});
				$('#dialog_tv').dialog("open");
			}
		}
};

function searchCpChannel(){
	parameter["currentPage"]=1;
	parameter["cpChannelName"]=$("#cpChannelName_search").val();
	if(parameter["cpChannelName"]=="")
		delete parameter["cpChannelName"];
	$('#tableCpChannel').datagrid("reload",parameter);
}
//已经关联的电视台
function initAddTvList(param){
	$('#tv_add_list').datagrid({
		title:'已关联列表',
		nowrap: true,
		striped: true,
		fit:true,
//		toolbar: "#common_search",
		fitColumns:true,
		collapsible:true,
		url:'cpchanneltv/getList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
//		idField:'',
		columns:[[
		          {field:'tvname',title:'电视台',width:100,
		        	  formatter:function(value,row,index){
		        		  return row.tv.tvname;
		        	  }  
		          },
		          {field:'tvlogo',title:'台标',width:100,hidden:true,
		        	  formatter:function(value,row,index){
		        		  return '<img src="'+row.tv.tvlogo+'" style="height:50px">';
		        	  }
		          },
		          {field:'areaLimit',title:'地域控制',width:100,
		        	  formatter:function(value,row,index){
		        		  return row.tv.areaLimit==1?"全部地区":"仅大陆";
		        	  }
		          },
		          {field:'epgAddress',title:'节目单接口地址',width:100,hidden:true},
		          {field:'mediatype',title:'所属分类',width:100,
		        	  formatter:function(value,row,index){
		        		  return row.tv.mediatype==1?"中央电视台":value==2?"地方卫视":"城市电视台";
		        	  }
		          },
		          {field:'viewback',title:'回看状态',width:100,
		        	  formatter:function(value,row,index){
		        		  return row.tv.viewback==1?"允许回看":"禁止回看";
		        	  }
		          },
		          {field:'isEffective',title:'状态',width:100,hidden:true,
		        	  formatter:function(value,row,index){
		        		  return row.tv.isEffective==1?"发布":"待发布";
		        	  }
		          },
		          {field:'opts',title:'操作',width:100,
		        	  formatter:function(value){
//		        		  return '<a href="javascript:infoEdit()">编辑</a>'
		        		  return '  <a href="javascript:infoDelete()">删除</a>';
		        	  }
		          }
		          ]],
		          pagination:true,
		          rownumbers:true,
		          onClickRow:function(rowIndex){
		          }
	});
}
//所有的可关联的电视台
function initTvList(param){
	$('#tv_list').datagrid({
		title:'电视台列表',
		nowrap: true,
		striped: true,
		fit:true,
		toolbar: "#common_tv_search",
		fitColumns:true,
		collapsible:true,
		url:'tv/getUnselectList.json',
		queryParams:param,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
		          {field:'sequence',title:'顺序',width:30},
		          {field:'tvid',title:'电视台ID',width:100},
		          {field:'tvname',title:'电视台',width:100},
		          {field:'tvlogo',title:'台标',width:100,hidden:true,
		        	  formatter:function(value,row,index){
		        		  return '<img src="'+value+'" style="height:30px">';
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
		        		  return value==1?"中央电视台":value==2?"地方卫视":"城市电视台";
		        	  }
		          },
		          {field:'viewback',title:'回看状态',width:100,
		        	  formatter:function(value,row,index){
		        		  return value==1?"允许回看":"禁止回看";
		        	  }
		          },
		          {field:'isEffective',title:'状态',width:100,hidden:true,
		        	  formatter:function(value,row,index){
		        		  return value==1?"发布":"待发布";
		        	  }
		          },
		          {field:'opts',title:'操作',width:100,
		        	  formatter:function(value){
		        		  return '<a href="javascript:tvAdd()">授权</a>';
		        	  }
		          }
		          ]],
		          pagination:true,
		          rownumbers:true,
		          onClickRow:function(rowIndex){
		          }
	});
}
//添加选中的电视台
function tvAdd(){
	$.messager.confirm(titleInfo,"确认授权？",function(r){
		if(r){
			var tvInfo = $('#tv_list').datagrid("getSelected");
			var queryParam = $('#tv_add_list').datagrid("options").queryParams;
			var dataInfo={cpChannelId:queryParam.cpChannelId,tvId:tvInfo.id,isEffective:1};
			$.post('cpchanneltv/add.json',dataInfo,function(data){
				if(1==data.code){
					$('#tv_add_list').datagrid('reload');
					$('#tv_list').datagrid('reload');
					$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				}else if(0==data.code){
					$.messager.alert(titleInfo,'数据已存在!');
				}
			},'json');
		}
	});
}
//删除选中的电视台
function infoDelete(){
	$.messager.confirm(titleInfo,"确认删除？",function(r){
		if(r){
			var row = $('#tv_add_list').datagrid("getSelected");
			var dataInfo={cpChannelId:row.cpChannelId,tvId:row.tvId};
			$.post('cpchanneltv/delete.json',dataInfo,function(data){
				if(1==data.code){
					$('#tv_add_list').datagrid('reload');
					$('#tv_list').datagrid('reload');
					$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
				}else if(0==data.code){
					$.messager.alert(titleInfo,'数据删除失败!');
				}
			},'json');
		}
	});
}
