$(function() {
	$("#add_classSecond").click(function(){
		CLASSSECOND["add"]();
	});
});
function getSecondList(rowIndex,index){
	$("#classfirstId").val(rowIndex);
	var videoParameter={"firstclassId":rowIndex};
	$('#tableSecond').datagrid({
		fitColumns:true,
//		pageSize:15,
		autoRowHeight: false,
		striped:true,
		toolbar: "#common_second_search",
		url:'classSecond/getClassSecondByPage.json',
		queryParams:videoParameter,
		//remoteSort: false,
		singleSelect:true,
		idField:'secondclassId',
		columns:[[
            {field:'sequence',title:'顺序',width:60,editor:"numberbox"},
			{field:'secondclassName',title:'名称',width:300,editor:{type:'text'}},
			{field:'isEffective',title:'状态',width:130,editor:{
				type:'combobox',
				options:{
					valueField:'isEffective',
					textField:'name',
					panelHeight: 'auto',
					data:[
					    {isEffective:0,name:'无效'},
						{isEffective:1,name:'有效'}
						]
				}
			},formatter:function(value,row,index){
				return value==1?"有效":'<span style="color:red;">无效</span>';
			}},
			{field:'opt',title:'操作',width:150,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var href=' <a href=javascript:geThirdList('+row.firstclassId+','+row.secondclassId+');>标签</a>';
                	var changeHref=' <a href=javascript:CLASSSECOND["update"]('+row.secondclassId+','+index+');>修改</a>';
//                	var saveHref='-<a href=javascript:CLASSSECOND["sumbitOpreate"]();>保存</a>';
                	//ar deleteHref=' <a href=javascript:CLASSSECOND["delete"]('+row.firstclassId+','+index+');>删除</a>';
                    return '<span style="color:red">'+href+changeHref+'</span>';  
                }
            }
		]],
		pagination:true,
        pageSize: 10,
        pageList: [10, 15, 20, 25, 30],
		rownumbers:true,
		onLoadSuccess: function(data){
			geThirdList(-1,-1);
		},
		onClickRow: function(index,rowData){
			geThirdList(rowData.firstclassId,rowData.secondclassId);
		}
	});
	$('#dialog_classListEdit').dialog({title:"分类",closed:false});
	
}
var lastIndex;
var CLASSSECOND={
		"add":function(){
			$("#secondclassId").val("");
		    $('#tableSecond').datagrid('endEdit', lastIndex);  
		    $('#tableSecond').datagrid('appendRow',{
		    	secondclassName:'',  
		    	sequence:1,  
		    	isEffective:1,  
		    });  
		    lastIndex = $('#tableSecond').datagrid('getRows').length-1;  
		    $('#tableSecond').datagrid('selectRow', lastIndex);  
		    $('#tableSecond').datagrid('beginEdit', lastIndex);
		},
		"delete":function(){
			$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
				if (r){
					$.post("video/deleteVideo.json",{"videoId":fieldId},function(data){
						$('#tableVideo').datagrid('reload');
						$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					},"json");
				}
			});
		},
		"update":function(secondclassId,index){
			$("#tableSecond").datagrid('beginEdit', index);
			$("#secondclassId").val(secondclassId);
		},
		"sumbitOpreate":function(){
			var secondclassId = $("#secondclassId").val();
			var row = $('#tableSecond').datagrid('getSelected');
			if(row){
				$('#tableSecond').datagrid('acceptChanges');
				var index = $('#tableSecond').datagrid('getRowIndex', row);
				$('#tableSecond').datagrid('beginEdit', index);
			}
			arr_add=row;
			arr_add["firstclassId"]=$("#classfirstId").val();
			if(secondclassId!=null&&secondclassId!=""){
				arr_add['secondclassId']=secondclassId;
				$.post("classSecond/updateClassSecond.json",arr_add,function(data){
					if(data.code==1){
						$('#tableSecond').datagrid("reload");
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！'); 
					}
				},"json");
			}else{
				$.post("classSecond/saveClassSecond.json",arr_add,function(data){
					if(data.code=1){
						$('#tableSecond').datagrid("reload");
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！'); 
					}
				},"json");
			}
		},
		"search":function(){
			$('#tableSecond').datagrid("reload",{"firstclassId":$("#classfirstId").val(),"secondclassName":$("#secondName_search").val()});
		}
};