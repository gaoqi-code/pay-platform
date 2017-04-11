var parameter = {};
var updateFormValid;
var validateResult;
$(function() {
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				CATEGORY["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	$("#add_category").click(function(){
		CATEGORY["add"]();
	});
	$("#search_developer").click(function(){
		CATEGORY["search"]();
	});
	getList();
}); 

function getList(){
	$('#tableDiv').datagrid({
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'apptag/getCategroyListByPage.json',
		queryParams:{},
		//remoteSort: false,
		singleSelect:true,
		idField:'categoryId',
		columns:[[
			{field:'seq',title:'顺序',width:50,align:"center"},
			{field:'categoryName',title:'名称',width:120,align:"center"},
			{field:'state',title:'状态',width:100,align:"center",formatter:function(val){
				return val==1?"有效":'<span style="color:red">无效</span>';
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var href=' <a href=javascript:CATEGORY["tagOperate"]('+row.categoryId+','+index+');>标签</a>';
                	var updateHref=' <a href=javascript:CATEGORY["updateOperate"]('+row.categoryId+','+index+');>修改</a>';
                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
                    return '<span style="color:red">'+href+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
var CATEGORY={
		"tagOperate":function(dataId,index){
			APPTAG["getList"](dataId,index);
			$('#dialog_tagList').dialog({title:"应用标签列表",closed:false});
		},
		"add":function(){
	    	$("#categoryId").val("");
	    	$("#categoryName").val("");
	    	$("#seq").val(1);
	    	$("#state").val(1);
			$('#dialog').dialog({title:"添加应用类别",closed:false});
		},
		"updateOperate":function(){
			$('#dialog').dialog({title:"修改应用类别",closed:false});
			var row = $('#tableDiv').datagrid('getSelected');
		    if (row){
		    	$("#categoryId").val(row.categoryId);
		    	$("#categoryName").val(row.categoryName);
		    	$("#seq").val(row.seq);
		    	$("#state").val(row.state);
		    }
		},
		"submitButton":function(){
			var categoryId = $("#categoryId").val();
			var arr_add = {
					"categoryName":$("#categoryName").val(),
					"seq":$("#seq").val(),
					"state":$("#state").val()
			};
			if(categoryId!=null&&categoryId!=""){
				arr_add['categoryId']=categoryId;
				$.post("apptag/updateCategroy.json",arr_add,function(data){
					if(data.code==1){
						$('#tableDiv').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("apptag/saveCategory.json",arr_add,function(data){
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
		"search":function(){
			var parameter={"categoryName":$("#categoryName_search").val(),"state":$("#state_search").val()};
			if(parameter["state"]==-1)
				delete parameter["state"];
			$('#tableDiv').datagrid("load",parameter);
		}
};