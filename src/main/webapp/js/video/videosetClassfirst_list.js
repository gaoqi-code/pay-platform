$(function() {
	$('#dialog_videosetClassfirstEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				sumbitvideoEdit();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_videosetClassfirstEdit').dialog('close');
			}
		}]
	});
	$("#add_videosetClassfirst").click(function(){
		
	});
});
//列表
function initVideosetClassFirst(fieldId,videosetType,indexId){
	$("#commonVideosetid").val(fieldId);
	$("#videosetType_common").val(videosetType);
	var videoParameter={"videosetId":fieldId};
	$('#tableVideosetClassFirst').datagrid({
		//collapsible:true,
		fitColumns:true,
		toolbar:"#common_videosetClassfirst_search",
		autoRowHeight: false,
		striped:true,
		url:'videosetClass/getClassByPage.json',
		queryParams:videoParameter,
		//remoteSort: false,
		singleSelect:true,
		columns:[[
			{field:'sequence',title:'顺序',width:50},
			{field:'thirdclassName',title:'名称',width:300},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var deleteHref='　<a href=javascript:deleteVideo('+row.videosetId+','+row.thirdclassId+');>删除</a>';
                    return '<span style="color:red">'+deleteHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
	$('#dialog_videosetClassfirstTable').dialog({title:"关联标签列表",closed:false});
	
	
}