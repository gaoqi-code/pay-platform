var updateFlag=1;
var vidArray=new Array();
vidArray[1]="300";
vidArray[2]="600";
vidArray[3]="800";
vidArray[4]="1000";
vidArray[5]="720P";
vidArray[6]="1080P";
vidArray[7]="极速码流";
vidArray[8]="8000";
vidArray[9]="10000";
vidArray[10]="15000";
vidArray[11]="20000";
vidArray[12]="25000";
vidArray[13]="30000";

$(function() {
	$('#dialog_videoUrlEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				sumbitvideoUrlEdit();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_videoUrlEdit').dialog('close');
			}
		}]
	});
	$("#add_videoUrl").click(function(){
		addVideoUrl();
	});
	
	loadVid();
});
//码流列表
function getVideoUrlList(fieldId,videoType){
	$("#videoId_url").val(fieldId);
	$("#videoType_url").val(videoType);
	var videoParameter={"videoId":fieldId};
	$('#tableVideoUrl').datagrid({
		//collapsible:true,
		fitColumns:true,
		//fit:true,
		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search_videoUrl",
		url:'videoUrl/getVideoUrlByPage.json',
		queryParams:videoParameter,
		//remoteSort: false,
		singleSelect:true,
		columns:[[
			{field:'vid',title:'码率',width:50,formatter:function(val){
				return val;
			}},
			{field:'m3u8',title:'m3u8地址',width:200},
			{field:'mp4',title:'mp4地址',width:170},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var updateHref=' <a href=javascript:updateVideoUrl('+row.videoId+','+index+');>修改</a>';
                	var deleteHref='　<a href=javascript:deleteVideoUrl('+row.videoId+','+row.videoType+','+row.vid+','+index+');>删除</a>';
                    return '<span style="color:red">'+updateHref+deleteHref+'</span>';  
                }
            }
		]],
		pagination:true,
		rownumbers:true
	});
}
function addVideoUrl(){
	updateFlag=1;
	$('#vid_content input[type="radio"]').attr("disabled",false);
	$("#videoUrlFrom")[0].reset();
	$('#dialog_videoUrlEdit').dialog({title:"添加码流",closed:false});
}

function updateVideoUrl(){
	updateFlag=2;
	var row = $('#tableVideoUrl').datagrid('getSelected');
    if (row){
    	var tempVid=document.getElementsByName("vid");
    	for(var i=0;i<tempVid.length;i++){
    		if(tempVid[i].value==row.vid){
    			tempVid[i].checked=true;
    			break;
    		}
    	}
    	$("#startTime").val(row.startTime);
    	$("#endTime").val(row.endTime);
    	$("#m3u8").val(row.m3u8);
    	$("#mp4").val(row.mp4);
    	$("#isEffective").val(row.isEffective);
    	$("#videoIdSource").val(row.videoIdSource);
    	$('#vid_content input[type="radio"]').attr("disabled","disabled");
    }
	$('#dialog_videoUrlEdit').dialog({title:"修改码流",closed:false});
}

function sumbitvideoUrlEdit(){
	var arr_add = {
			"videoId":$("#videoId_url").val(),
			"videoType":$("#videoType_url").val(),
			"startTime":$("#startTime").val(),
			"endTime":$("#endTime").val(),
			"m3u8":$("#m3u8").val(),
			"mp4":$("#mp4").val(),
			"vid":$('input[name="vid"]:checked').val(),
			"isEffective":1,
			"videosetId":$("#commonVideosetid").val()
	};
	if(arr_add["videoId"]==null||arr_add["videoId"]==""||arr_add["videoId"]==-1){
		$.messager.alert(titleInfo,'请选择一个剧集！'); 
		return;
	}
	if(updateFlag==2){
		$.post("videoUrl/updateVideoUrl.json",arr_add,function(data){
			if(data.code==1){
				$('#tableVideoUrl').datagrid("reload");
				$('#dialog_videoUrlEdit').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败！'); 
			}
		},"json");
	}else{
		arr_add['dataRate']=videoUrlOpt["getVideosetUrls"](1,arr_add["vid"]);
		$.post("videoUrl/saveVideoUrl.json",arr_add,function(data){
			if(data.code==1){
				$('#tableVideoUrl').datagrid("reload");
				$('#dialog_videoUrlEdit').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
			}else if(data.code==2){
				$.messager.alert(titleInfo,'码流已经存在！'); 
			}else{
				$.messager.alert(titleInfo,'添加失败！'); 
			}
		},"json");
	}
}
function deleteVideoUrl(fieldId,videoType,vid,indexId){
	$.messager.confirm(titleInfo, '您确定删除码？', function(r){
		if (r){
			var dateInfo = {
				"videoId" : fieldId,
				"videoType" : videoType,
				"vid":vid,
				"videosetId":$("#commonVideosetid").val(),
				"dataRate":videoUrlOpt["getVideosetUrls"](2,vid)
			};
			$.post("videoUrl/delVideoUrl.json",dateInfo,function(data){
				$('#tableVideoUrl').datagrid('reload');
				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
			},"json");
		}
	});
}
/********** 加载码流 radio ************/
function loadVid(){
	//码流 1:300 2:600 3:800 4:1000 5:720p 6:1080P 7:极速码流
	var content = new StringBuffer();
	var vidArrayLength = vidArray.length-1;
	for(var i=0;i<vidArrayLength;i++){
		content.append('<span class="rateList">').append('<input type="radio" name="vid" value='+vidArray[i+1]+'> ').append(vidArray[i+1]).append('</span>');
	}
	$("#vid_content").html(content.toString());
}

var videoUrlOpt={
	"getVideosetUrls":function(flag,value){
		var tableDate = $('#tableVideoUrl').datagrid('getData');
		if(flag==1){//添加
			var dataRate = new StringBuffer("");
			for(var i=0;i<tableDate.rows.length;i++){
				dataRate.append([tableDate.rows[i].vid]).append(',');
			}
			dataRate.append(value);
			return dataRate.toString();
		}else if(flag==2){//删除
			var dataRate = new StringBuffer("");
			for(var i=0;i<tableDate.rows.length;i++){
				if(tableDate.rows[i].vid!=value)
					dataRate.append([tableDate.rows[i].vid]).append(',');
			}
			if(dataRate._strings_.length!=0&&dataRate._strings_[dataRate._strings_.length-1]==",")
				dataRate._strings_.pop();
			return dataRate.toString();
		}
	}
};