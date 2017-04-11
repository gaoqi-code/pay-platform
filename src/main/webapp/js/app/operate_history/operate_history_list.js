var parameter = {};
var categoryList = {};
var tagList = {};
var updateFormValid;
var validateResult;
$(function() {
	parameter = {"currentPage":1,"pageSize":10,"appId":$("#appId").val()};
	//validateResult = $("#testUserForm").validate();
	$("#add_app").click(function(){
		showModel();
	});
	
	getList(parameter);
	
	$("#back_button").click(function(){
		//var url = "content/app/app_list.jsp";
		//if($("#operateType").val()==2){
		//	url = "content/app/version/app_version_list.jsp";
		//}
		new waitDialog("body");
		//$("#rightDiv").load(url,{"appId":$("#appId").val()},function(data){
		//	waitDiv.close("body");
		//});
		window.location.href=getAppBasePath()+"content/app/app_list.jsp?ID="+$.getUrlVar("ID")+"&currentPage="+$("#prevPage").val();
	});	
	
	$("#category").change(function(){
		changeSelectEvent("tag",$(this).children('option:selected').val());
	});
	
	$("#category2").change(function(){
		changeSelectEvent("tag2",$(this).children('option:selected').val());
	});
}); 
	
 

function getList(parameter){
	_G.createTable({
		"field":{"id":{},"account":{},"operateTime":{},"operateRecord":{"operate":"font"}},
		"url":"operatehistory/getAppOperateHistoryList.html",
		"table_head":{"编号":"","账户":"","操作时间":"","操作记录":""},
		"parameter":parameter,
		"operateTdCss":[{"id":{"min-width":"20px;"}}],
		//"operateText":[{"isEffective":{"0":"未发布","1":"已发布"}}],
		"ID":{"listID":"app_list","pageID":"app_page"}
	});
}

/*** show model window ***/
function showModel(){
	$("#appId").val("");
	$("#appName").val("");
	
	$("#appIcon").val("");
	$("#show_appIcon").attr("src","");
	
	//$("#developerId").val("");
	$("#bundleId").val("");
	//$("#tagName").val("");
	$("#state").val(1);
	$("#seq").val(0);
	$("#appType").val(1);
	
	
	var divEntity = {"targetID":"modelDiv","width":625,"height":420,"content":"","title":"添加应用"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
}

/*** add tv ***/
function submit_model_window(){
//	if(!validateResult.form()){
//		return;
//	}
	var appId = $("#appId").val();
	var tagName = new Array();
	//tarName[0] = $("select[@name=items] option[@selected]").text();
	tagName[0]={};
	tagName[0]['category'] = $("#category").find("option:selected").text();
	tagName[0]['tag'] = $("#tag").find("option:selected").text();
	tagName[1]={};
	tagName[1]['category'] = $("#category2").find("option:selected").text();
	tagName[1]['tag'] = $("#tag2").find("option:selected").text();
	
	var arr_add = {
			"appName":$("#appName").val(),
			"bundleId":jQuery("#bundleId").val(),
			"developerId":jQuery("#developerId").val(),
			"seq":jQuery("#seq").val(),
			"tagName":'[{"category":"'+$("#category").find("option:selected").text()+'","tag":"'+$("#tag").find("option:selected").text()+'"},{"category":"'+$("#category2").find("option:selected").text()+'","tag":"'+$("#tag2").find("option:selected").text()+'"}]',
			"appType":jQuery("#appType").val(),
			"state":jQuery("#state").val(),
			"appIcon":jQuery("#appIcon").val()
	};
	if(appId!=null&&appId!=""){
		arr_add['appId']=appId;
		$.post("app/update.html",arr_add,function(data){
			if(data.msg=="success"){
				getList(parameter);
				closeModelDiv();
			}else{
				var dialog = new DialogDiv({"content":"修改失败"});
				dialog.showDialog();
			}
		},"json");
	}else{
		$.post("app/save.html",arr_add,function(data){
			if(data.msg=="success"){
				getList(parameter);
				closeModelDiv();
			}else{
				var dialog = new DialogDiv({"content":"添加失败"});
				dialog.showDialog();
			}
		},"json");
	}
}

/*** update  tv ***/
function updateOperate(dataId,dataIndex){
	$("#showLoadUrl").attr("src","");
	var divEntity = {"targetID":"modelDiv","width":625,"height":420,"content":"","title":"修改应用信息"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);

	$("#appId").val(back_data[dataIndex].appId);
	$("#appName").val(back_data[dataIndex].appName);
	
	$("#appIcon").val(back_data[dataIndex].appIcon);
	$("#show_appIcon").attr("src",back_data[dataIndex].appIcon);
	
	$("#developerId").val(back_data[dataIndex].developerId);
	$("#bundleId").val(back_data[dataIndex].bundleId);
	//$("#tagName").val("");
	$("#state").val(back_data[dataIndex].state);
	$("#seq").val(back_data[dataIndex].seq);
	$("#appType").val(back_data[dataIndex].appType);
}

/*** delete tv ***/
function deleteOperate(dataId,dataIndex){
	var dialog = new DialogDiv({"content":"您确定删除这个应用吗？","isHavaCancel":true});
	dialog.showDialog();
	d_dataId = dataId;
	d_dataIndex = dataIndex;
	if(isCancel){
		_deleteOperate(d_dataId,d_dataIndex);
	}
}

function _deleteOperate(dataId,dataIndex){
	$.post("app/delete.html",{"id":dataId},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
			new DialogDiv({"content":"删除失败！"}).showDialog();
		}	
	},"json");
};

//字符串转json
function strToJson(str){
	return eval('(' + str + ')'); 
}

function operateHistorySearch(){
	parameter["account"]=$("#account_s").val();
	parameter["currentPage"]=1;
	getList(parameter);
}
function getSmpFormatDate(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else {
        pattern = "yyyy-MM-dd";
    }
    return getFormatDate(date, pattern);
}