//
var parameter = {action:"hdfocus"};
var ACTIONMAP={
		"hdfocus":"蓝光焦点图",
		"hdsubject":"蓝光专题",
		"searchvideoset":"蓝光热搜",
		"videoSet":"视频管理",
		"classFirst":"频道管理",
		"focus":"蜂巢焦点图",
		"subject":"蜂巢专题",
		"videosetRecom":"影院推荐",
		"moduleskin":"首屏背景",
		"appfocus":"应用推荐",
		"apptop":"应用榜单",
		"appsubject":"应用专题"
}
$(function(){
	//init dataGridTable
	initDataGrid();
	$('#btn_search').click(function(){
		parameter.action = $('#action').val();
		initDataGrid();
	});
});
//init dataGridTable
function initDataGrid(){
	$('#detail_table').datagrid({
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'useract/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
		    {field:'userName',title:'用户',width:70},
		    {field:'action',title:'模块',width:70,
		    	formatter:function(value){
		    		return ACTIONMAP[value];
		    	}
		    },
		    {field:'operation',title:'操作',width:70,
		    	formatter:function(value){
		    		var reAdd = new RegExp('add');
		    		var reUpdate = new RegExp('update');
		    		var reDelete = new RegExp('delete');
		    		if(reAdd.test(value)){
		    			return "添加";
		    		}else if(reUpdate.test(value)){
		    			return "更新";
		    		}else if(reDelete.test(value)){
		    			return "删除";
		    		}else{
		    			return value;
		    		}
		    	}
		    },
		    {field:'info',title:'信息',width:100},
		    {field:'createTime',title:'时间',width:100,
		    	formatter:function(value){
		    		var date = new Date(value);
					return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
		    	}
		    }
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}