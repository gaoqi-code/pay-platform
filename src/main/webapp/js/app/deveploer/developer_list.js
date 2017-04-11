var parameter = {};
var updateFormValid;
var validateResult;
$(function() {
	parameter = {"currentPage":1,"pageSize":10};
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				DEVELOPER["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	$("#add_developer").click(function(){
		DEVELOPER["add"]();
	});
	$("#search_developer").click(function(){
		DEVELOPER["search"]();
	});
	getList(parameter);
}); 

function getList(parameter){
	$('#tableDiv').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'appdeveloper/getDeveloperList.json',
		queryParams:{},
		//remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'id',title:'编号',width:50,align:"center"},
			{field:'developerName',title:'名称',width:120,align:"center"},
			{field:'state',title:'状态',width:100,align:"center",formatter:function(val){
				return val==1?"有效":'<span style="color:red">无效</span>';
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var updateHref=' <a href=javascript:DEVELOPER["updateOperate"]('+row.videosetId+','+index+');>修改</a>';
                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
                    return '<span style="color:red">'+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
var DEVELOPER={
		"add":function(){
	    	$("#id").val("");
	    	$("#developerName").val("");
	    	$("#state").val(1);
			$('#dialog').dialog({title:"添加开发商",closed:false});
		},
		"updateOperate":function(){
			$('#dialog').dialog({title:"修改开发商",closed:false});
			var row = $('#tableDiv').datagrid('getSelected');
		    if (row){
		    	$("#id").val(row.id);
		    	$("#developerName").val(row.developerName);
		    	$("#state").val(row.state);
		    }
		},
		"submitButton":function(){
			var id = $("#id").val();
			var arr_add = {
					"developerName":$("#developerName").val(),
					"state":$("#state").val()
			};
			validateResult = $("#developerForm").form('validate');
			if(!validateResult){
				return;
			}
			if(id!=null&&id!=""){
				arr_add['id']=id;
				$.post("appdeveloper/update.json",arr_add,function(data){
					if(data.code==1){
						$('#tableDiv').datagrid("reload");
						$('#dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("appdeveloper/save.json",arr_add,function(data){
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
			var parameter={"developerName":$("#developerName_search").val(),"state":$("#state_search").val()};
			if(parameter["state"]==-1)
				delete parameter["state"];
			$('#tableDiv').datagrid("load",parameter);
		}
};