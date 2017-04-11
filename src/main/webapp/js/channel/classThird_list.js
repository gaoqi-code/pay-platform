$(function() {
	$("#add_classThird").click(function(){
		CLASSTHIRD["add"]();
	});
});
//剧集列表
function geThirdList(firstclassId,secondclassId){
	$("#secondclassId").val(secondclassId);
	var videoParameter={"firstclassId":firstclassId,"secondclassId":secondclassId};
	$('#tableThird').datagrid({
		//collapsible:true,
		title:"标签",
		fitColumns:true,
//		pageSize:15,
		autoRowHeight: false,
		striped:true,
		toolbar: "#common_third_search",
		url:'classThird/getClassThirdByPage.json',
		queryParams:videoParameter,
		//remoteSort: false,
		singleSelect:true,
		idField:'thirdclassId',
		columns:[[
            {field:'sequence',title:'顺序',width:60,editor:"numberbox"},
			{field:'thirdclassName',title:'名称',width:300,editor:{type:'text'}},
			{field:'isEffective',title:'状态',width:130,editor:{
				type:'combobox',
				options:{
					valueField:'isEffective',
					textField:'name',
					panelHeight: 'auto',
					data:[{isEffective:0,name:'无效'},{isEffective:1,name:'有效'}]
				}
			},formatter:function(value,row,index){
				return value==1?"有效":'<span style="color:red;">无效</span>';
			}},
			{field:'opt',title:'操作',width:150,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var updateHref=' <a href=javascript:CLASSTHIRD["sumbitOpreate"]('+row.firstclassId+','+index+');>保存</a>';
                	var deleteHref=' <a href=javascript:CLASSTHIRD["delete"]('+row.thirdclassId+');>删除</a>';
                    return '<span style="color:red">'+updateHref+deleteHref+'</span>';  
                }
            }
		]],
		pagination:true,
        pageSize: 30,
        pageList: [10, 15, 20, 25, 30],
		rownumbers:true,
		onClickRow: function(index,rowData){
			$(this).datagrid('beginEdit', index);
			$("#thirdclassId").val(rowData.thirdclassId);
		}
	});
//	$('#dialog_video').dialog({title:"剧集与码流",closed:false});
}

var CLASSTHIRD={
		"add":function(){
			$("#thirdclassId").val("");
		    $('#tableThird').datagrid('endEdit', lastIndex);  
		    $('#tableThird').datagrid('appendRow',{
		    	secondclassName:'',  
		    	sequence:1,  
		    	isEffective:1,  
		    });  
		    lastIndex = $('#tableThird').datagrid('getRows').length-1;  
		    $('#tableThird').datagrid('selectRow', lastIndex);  
		    $('#tableThird').datagrid('beginEdit', lastIndex);
		},
		"update":function(){
			var row = $('#tableDiv').datagrid('getSelected');
		    if (row){
				$("#classfirstId").val(row.firstclassId);
				$("#firstclassName").val(row.firstclassName);
				$("#sequence").val(row.sequence);
				$("#isEffective").val(row.isEffective);
				$("#pic").val(row.pic);
		    }
			$('#dialog_classFirstEdit').dialog({title:"修改频道",closed:false});
		},
		"delete":function(thirdId){
			$.messager.confirm(titleInfo, '您确定删除码？', function(r){
				if (r){
					var deleteParate={
							"firstclassId":$("#classfirstId").val(),
							"secondclassId":$("#secondclassId").val(),
							"thirdclassId":thirdId
					};
					$.post("classThird/deleteClassThird.json",deleteParate,function(data){
						$('#tableThird').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					},"json");
				}
			});
		},
		"sumbitOpreate":function(){
			var thirdclassId = $("#thirdclassId").val();
			var row = $('#tableThird').datagrid('getSelected');
			if(row){
				$('#tableThird').datagrid('acceptChanges');
				var index = $('#tableThird').datagrid('getRowIndex', row);
				$('#tableThird').datagrid('beginEdit', index);
			}
			arr_add=row;
			arr_add['secondclassId']=$("#secondclassId").val();
			arr_add["firstclassId"]=$("#classfirstId").val();
			if(arr_add['secondclassId']==""||arr_add['secondclassId']==null||arr_add['secondclassId']==-1){
				$.messager.alert(titleInfo,'请先选择一个二级频道！');
				return;
			}
			if(thirdclassId!=null&&thirdclassId!=""){
				arr_add['thirdclassId']=thirdclassId;
				$.post("classThird/updateClassThird.json",arr_add,function(data){
					if(data.code==1){
						$('#tableThird').datagrid("reload");
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！'); 
					}
				},"json");
			}else{
				$.post("classThird/saveClassThird.json",arr_add,function(data){
					if(data.code=1){
						$('#tableThird').datagrid("reload");
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！'); 
					}
				},"json");
			}
		},
		"search":function(){
			var syncParameter = {
					"firstclassId":$("#classfirstId").val(),
					"secondclassId":$("#secondclassId").val(),
					"thirdclassName":$("#thirdName_search").val(),
					"isEffective":1
				};
			$('#tableThird').datagrid("load",syncParameter);
		}
};