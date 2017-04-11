var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	$('#dialog_cpChannel').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				CPCHANNEL["submitButton"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_cpChannel').dialog('close');
			}
		}]
	});
	$("#cpSelectButton").click(function(){
		searchCp();
	});
	$("#cp_add").click(function(){
		CP['add']();
	});
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				CP["submitButton"]();
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
	$('#tableCp').datagrid({
		//iconCls:'icon-save',
		//collapsible:true,
		fitColumns:true,
		fit:true,
		//frozenColumns:[[{field:'ss',checkbox:true}]],
		checkbox:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'cp/getCpByPage.json',
		queryParams:{},
		//remoteSort: false,
		singleSelect:true,
		idField:'cpId',
		columns:[[
			{field:'cpId',title:'编号',width:50,align:'center'},
			{field:'cpName',title:'名称',width:150,align:'center'},
			{field:'cpState',title:'状态',width:100,align:'center',
				formatter:function(value){
					return value==1?"有效":'<span style="color:red;">无效</span>';
				}
			},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
//                	var href=' <a href=javascript:CP["enterCpChannelList"]('+row.cpId+','+index+');>渠道</a>';
                	var updateHref=' <a href=javascript:CP["update"]('+row.cpId+','+index+');>修改</a>';
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
var CP={
		"add":function(){
			$("#cpId").val("");
			$("#cpName").val("");
			$('#detail_dialog').dialog("open");
		},
		"update":function(){
			var rowInfo = $('#tableCp').datagrid("getSelected");
			$("#cpId").val(rowInfo.cpId);
			$("#cpName").val(rowInfo.cpName);
			$("#cpState").val(rowInfo.cpState);
			$('#detail_dialog').dialog("open");
		},
		"submitButton":function(){
			var cpId = $("#cpId").val();
			var param={
				cpName:$("#cpName").val(),
				cpState:$("#cpState").val()
			}
			if(cpId!=null&&cpId!=""){
				param['cpId']=cpId;
				$.post("cp/updateCp.json",param,function(data){
					if(data.code==1){
						$('#tableCp').datagrid("reload");
						$('#detail_dialog').dialog("close");
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！');
					}
				},"json");
			}else{
				$.post("cp/saveCp.json",param,function(data){
					if(data.code==1){
						$('#detail_dialog').dialog("close");
						getList(parameter);
					}else{
						new DialogDiv({"content":"添加失败"}).showDialog();
					}
				},"json");
			}
		},
		"enterCpChannelList":function(cpId,index){
			CPCHANNEL["getList"](cpId,index);
			$('#dialog_cpChannel').dialog('open');
		}
};

function searchCp(){
	parameter["currentPage"]=1;
	parameter["cpName"]=$("#cpName_search").val();
	if(parameter["cpName"]=="")
		delete parameter["cpName"];
	$('#tableCp').datagrid("reload",parameter);
}
