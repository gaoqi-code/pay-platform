var parameter = {};
var updateFormValid;
var validateResult;
$(function() {
	$('#dialog_tagEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				APPTAG["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_tagEdit').dialog('close');
			}
		}]
	});
	$("#add_apptag").click(function(){
		APPTAG["add"]();
	});
	$("#search_apptag").click(function(){
		APPTAG["search"]();
	});
}); 

var APPTAG={
		"getList":function(dataId,index){
			$("#categoryId").val(dataId);
			$('#tableAppTag').datagrid({
				fitColumns:true,
				fit:true,
//				autoRowHeight: false,
				striped:true,
				toolbar: "#common_tag_search",
				url:'apptag/getTagListByPage.json',
				queryParams:{"categoryId":dataId},
				//remoteSort: false,
				singleSelect:true,
				idField:'tagId',
				columns:[[
					{field:'seq',title:'顺序',width:50,align:"center"},
					{field:'tagName',title:'名称',width:120,align:"center"},
					{field:'state',title:'状态',width:100,align:"center",formatter:function(val){
						return val==1?"有效":'<span style="color:red">无效</span>';
					}},
					{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
		                formatter:function(value,row,index){
		                	var updateHref=' <a href=javascript:APPTAG["updateOperate"]('+row.tagId+');>修改</a>';
		                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
		                    return '<span style="color:red">'+updateHref+'</span>';  
		                }
		            }
				]],
				pagination:true,
				rownumbers:true
			});
		},
		"add":function(){
	    	$("#tagId").val("");
	    	$("#tagName").val("");
	    	$("#tagSeq").val(1);
	    	$("#tagState").val(1);
			$('#dialog_tagEdit').dialog({title:"添加应用标签",closed:false});
		},
		"updateOperate":function(dataId){
			$('#dialog_tagEdit').dialog({title:"修改应用标签",closed:false});
			var row = $('#tableAppTag').datagrid('getSelected');
			$("#tagId").val(dataId);
		    if (row){
		    	$("#tagName").val(row.tagName);
		    	$("#tagSeq").val(row.seq);
		    	$("#tagState").val(row.state);
		    }
		},
		"submitButton":function(){
			var tagId = $("#tagId").val();
			var arr_add = {
					"categoryId":$("#categoryId").val(),
					"tagName":$("#tagName").val(),
					"seq":$("#tagSeq").val(),
					"state":$("#tagState").val()
			};
			if(tagId!=null&&tagId!=""){
				arr_add['tagId']=tagId;
				$.post("apptag/updateTag.json",arr_add,function(data){
					if(data.code==1){
						$('#tableAppTag').datagrid("reload");
						$('#dialog_tagEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("apptag/saveTag.json",arr_add,function(data){
					if(data.code==1){
						$('#tableAppTag').datagrid("reload");
						$('#dialog_tagEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！');
					}
				},"json");
			}
		},
		"search":function(){
			var parameter={"tagName":$("#tagName_search").val(),"state":$("#state_apptag_search").val()};
			if(parameter["state"]==-1)
				delete parameter["state"];
			$('#tableAppTag').datagrid("load",parameter);
		}
};