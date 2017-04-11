//var videoTypeArray=new Array();
//videoTypeArray[1]="电视剧";
//videoTypeArray[2]="栏目";
//videoTypeArray[3]="电影";
//videoTypeArray[4]="新闻";
//videoTypeArray[5]="直播";
//
//videoTypeArray[6]="3D";
//videoTypeArray[7]="今日头条";
//videoTypeArray[8]="娱乐";
//videoTypeArray[9]="动漫";
//videoTypeArray[10]="财经";
//
//videoTypeArray[11]="片花";
//videoTypeArray[12]="音乐";
//videoTypeArray[13]="体育";
//videoTypeArray[14]="旅游";
//videoTypeArray[15]="纪录片";
//
//videoTypeArray[16]="蓝光高清";
//videoTypeArray[1001]="专题";
//videoTypeArray[1002]="演职员";

//初始化这个专辑对应的人物列表
function initVideosetRelated(fieldId,vdieosetTypeCommon,indexId){
	var relateTypeTypeArray=new Array();
	relateTypeTypeArray[1]="系列片";
	relateTypeTypeArray[2]="片花";
	$("#videosetId_cast").val(fieldId);
	$("#videosetType_common").val(vdieosetTypeCommon);
	var parameter = {
			"videosetId":fieldId
		};
		$('#tableVideosetRelated').datagrid({
			//iconCls:'icon-save',
			//collapsible:true,
			fitColumns:true,
			//fit:true,
			striped:true,
			toolbar: "#common_search_videosetRelated",
			url:'videosetrelated/getList.json',
			queryParams:parameter,
			//remoteSort: false,
			singleSelect:true,
			columns:[[
	            {field:'sequence',title:'顺序',width:50,editor:'numberbox'},
	            {field:'videosetName',title:'名称',width:150},
	            {field:'relatedContentType',title:'频道',width:100,formatter:function(value){
			    	return videoTypeArray[value];
			    }},
			    {field:'relatedType',title:'类型',width:100,formatter:function(value){
			    	return relateTypeTypeArray[value];
			    }},
				{field:'opt',title:'操作',width:70,align:'center', rowspan:2,  
	                formatter:function(value,row,index){
	                	var saveHref=' <a href=javascript:relatedOpreate["updateOperate"]('+row.relatedContentId+','+row.relatedContentType+','+row.relatedType+');>保存</a>';
	                	var deleteHref=' <a href=javascript:relatedOpreate["deleteOperate"]('+row.relatedContentId+','+row.relatedContentType+','+row.relatedType+');>删除</a>';
	                    return '<span style="color:red">'+saveHref+deleteHref+'</span>';  
	                }
	            }
			]],
			pagination:true,
			rownumbers:true,
			onClickCell: function(index,field,value){
				$(this).datagrid('beginEdit', index);
			}
		});
		$('#dialog_related').dialog({title:"关联专辑",closed:false});
		initVideosetListForRelated();
}
function initVideosetListForRelated(){
	var parameter = {
			//"castType":$("#type_common_search_cast").val()
			isEffective:1
		};
		$('#tableVideoset_related').datagrid({
			//iconCls:'icon-save',
			//collapsible:true,
			fitColumns:true,
			//fit:true,
			striped:true,
			toolbar: "#common_search_videoset_related",
			url:'videoSet/getVideoSetByPage.json',
			queryParams:parameter,
			//remoteSort: false,
			singleSelect:true,
			columns:[[
	            {field:'videosetName',title:'名称',width:90},
	            {field:'videosetType',title:'类型',width:90,formatter:function(index){
	            	return videoTypeArray[index];
	            }},
				{field:'opt',title:'操作',width:70,align:'center', rowspan:2,  
	                formatter:function(value,row,index){
	                	var add1Href=' <a href=javascript:relatedOpreate["addOperate"]('+row.videosetId+','+row.videosetType+');>选择</a>';
	                    return '<span style="color:red">'+add1Href+'</span>';  
	                }
	            }
			]],
			pagination:true,
			rownumbers:true
		});
}
function videosetRelateSearch(){
	var syncParameter = {
			"videosetId":$("#videosetId_cast").val(),
			"videosetName":$("#videosetName_related_search").val()
		};
	$('#tableVideosetRelated').datagrid("reload",syncParameter);
}
function relateListSearch(){
	var syncParameter = {
			"videosetName":$("#videosetName_relate_select_search").val(),
			"videosetType":$("#videosetType_relate_select_search").val(),
			"isEffective":1
		};
	if(syncParameter["videosetType"]==-1)
		delete syncParameter["videosetType"];
	$('#tableVideoset_related').datagrid("load",syncParameter);
}


var relatedOpreate = {
		"deleteOperate":function(relatedContentId,relatedContentType,relatedType){
			var videosetId=$("#videosetId_cast").val();
			var videosetType=$("#videosetType_common").val();
			$.post("videosetrelated/delete.json",{"videosetId":videosetId,"videosetType":videosetType,"relatedContentId":relatedContentId,"relatedType":relatedType},function(data){
				if(data.code==1){
					$('#tableVideosetRelated').datagrid("reload");
					$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,'删除失败！'); 
				}
			},"json");
		},
		"updateOperate":function(){
			//编辑
			var rowInfo = $('#tableVideosetRelated').datagrid('getSelected');
			if(rowInfo){
				$('#tableVideosetRelated').datagrid('acceptChanges');
				rowInfo['videosetId']=$("#videosetId_cast").val();
				var index = $('#tableVideosetRelated').datagrid('getRowIndex', rowInfo);
				$('#tableVideosetRelated').datagrid('beginEdit', index);
				$.post("videosetrelated/update.json",rowInfo,function(data){
					if(data.code==1){
						$('#tableVideosetRelated').datagrid('beginEdit', index);
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}
				});
			}
		},
		"addOperate":function(relatedContentId,relatedContentType){
			var relatedType=1;
			if(relatedContentType==11){
				relatedType=2;
			}
			var parameter = {
					"sequence" : 1,
					"videosetId" : $("#videosetId_cast").val(),
					"videosetType" :$("#videosetType_common").val(),
					"relatedContentId" : relatedContentId,
					"relatedContentType" : relatedContentType,
					"relatedType" : relatedType
				};
			$.post("videosetrelated/getList.json",parameter,function(data){
				if(data.total>=1){
					$.messager.alert(titleInfo,'已添加！');
					return;
				}else{
					$.post("videosetrelated/add.json",parameter,function(data){
						if(data.code=1){
							$('#tableVideosetRelated').datagrid("reload");
							$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
						}else{
							$.messager.alert(titleInfo,'添加失败！'); 
						}
					},"json");
				}
			},"json");
		}
};
