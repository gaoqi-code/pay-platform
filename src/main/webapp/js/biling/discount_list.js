var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	$("#discountSelectButton").click(function(){
		searchDiscount();
	});
	$("#discount_add").click(function(){
		DISCOUNT['add']();
	});
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				DISCOUNT["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#detail_dialog').dialog("close");
			}
		}]
	});
	getList();
}); 
	
 

function getList(){
	$('#tableDiscount').datagrid({
		nowrap: true,		
		//iconCls:'icon-save',
		collapsible:true,
		fitColumns:true,
		fit:true,
		//frozenColumns:[[{field:'ss',checkbox:true}]],
		checkbox:true,
		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'discount/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'discountId',
		columns:[[
			{field:'discountId',title:'编号',width:50,align:'center'},
			{field:'discountName',title:'名称',width:150,align:'center'},
			{field:'state',title:'状态',width:100,align:'center',
				formatter:function(value){
					return value==1?"已上线":'<span style="color:red;">待上线</span>';
				}
			},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
//                	var href=' <a href=javascript:CP["enterCpChannelList"]('+row.cpId+','+index+');>渠道</a>';
                	var updateHref=' <a href=javascript:DISCOUNT["update"]('+row.discountId+','+index+');>修改</a>';
                	//var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+index+');>删除</a>';
                    return '<span style="color:red">'+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
var lastIndex;
var DISCOUNT={
		"add":function(){
			$("#discountName").val("");
			$("#state").val("");
			$('#detail_dialog').dialog("open");
		},
		"update":function(){
			var rowInfo = $('#tableDiscount').datagrid("getSelected");
			$("#discountId").val(rowInfo.discountId);
			$("#discountName").val(rowInfo.discountName);
			$("#state").val(rowInfo.state);
			$('#detail_dialog').dialog("open");
		},
		"submitButton":function(){
			var discountId = $("#discountId").val();
			var param={
				discountName:$("#discountName").val(),
				state:$("#state").val()
			}
			if(discountId!=null&&discountId!=""){
				param['discountId']=discountId;
				$.post("discount/update.json",param,function(data){
					if(data.code==1){
						$('#tableDiscount').datagrid("reload");
						$('#detail_dialog').dialog("close");
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("discount/save.json",param,function(data){
					if(data.code==1){
						$('#detail_dialog').dialog("close");
						getList(parameter);
					}else{
						new DialogDiv({"content":"添加失败"}).showDialog();
					}
				},"json");
			}
		},
};

function searchDiscount(){
	parameter["currentPage"]=1;
	parameter["discountName"]=$("#discountName_search").val();
	if(parameter["discountName"]=="")
		delete parameter["discountName"];
	$('#tableDiscount').datagrid("reload",parameter);
}
