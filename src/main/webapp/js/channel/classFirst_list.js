$(function() {
	$('#dialog_classFirstEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				CLASSFIRIST["sumbitOpreate"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_classFirstEdit').dialog('close');
			}
		}]
	});
	$("#add_classFirst").click(function(){
		CLASSFIRIST["add"]();
	});
	getVideoList();
	
	   _initFileUpload("uploadify_pic",{
	   		data:{imgName:"imgChannelPath"},
	        onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var imgUrl=ParseTextToJsonObject(response);
	        	$("#pic").val(imgUrl);
	        	$("#showClassFirstImgUrl").attr("src",imgUrl);
	        	$("#uploadFlag").val("");
	        	$("#imgpicUpload_").hide();
	        },
	        onSubmit:function(file, extension){
	        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
		    		$("#imgVideoUpload").show();
		    		$("#uploadFlag").val("uploading");
		    	}else{
		    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
		    		return false;
		    	}
	        }
	 });
	   
	   _initFileUpload("uploadify_icon",{
	   		data:{imgName:"imgChannelPath"},
	        onComplete: function (file, response){//文件提交完成后可执行的方法
	        	var imgUrl=ParseTextToJsonObject(response);
	        	$("#icon_span").html('<img id="icon" style="height:80px;" src='+imgUrl+'>');
	        	$("#uploadFlag").val("");
	        	$("#iconUpload_").hide();
	        },
	        onSubmit:function(file, extension){
	        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
		    		$("#iconUpload_").show();
		    		$("#uploadFlag").val("uploading");
		    	}else{
		    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
		    		return false;
		    	}
	        }
	 });
	
//    new AjaxUpload($('#uploadify_pic'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"imgChannelPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var imgUrl=ParseTextToJsonObject(response);
//        	$("#pic").val(imgUrl);
//        	$("#showClassFirstImgUrl").attr("src",imgUrl);
//        	$("#uploadFlag").val("");
//        	$("#imgpicUpload_").hide();
//        },
//        onSubmit:function(file, extension){
//        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#imgVideoUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//        }
//    });
});
//剧集列表
function getVideoList(){
	var videoParameter={};
	$('#tableDiv').datagrid({
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		pageSize:15,
		striped:true,
		toolbar: "#common_search",
		url:'classFirst/getClassFirstByPage.json',
		queryParams:videoParameter,
		//remoteSort: false,
		singleSelect:true,
		idField:'firstclassId',
		columns:[[
            {field:'sequence',title:'顺序',width:60},
			{field:'firstclassId',title:'编号',width:60},
			{field:'firstclassName',title:'名称',width:100},
			{field:'icon',title:'图标',width:100,
				formatter:function(value){
					return value==""?"":"<img src='"+value+"' style='height:100px;'>";
				}
			},
			{field:'isEffective',title:'状态',width:100,formatter:function(value,row,index){
				if(value==1)
					return "有效";
				else if(value==0)
					return '<span style="color:#AAA;">虚拟频道</span>';
				else{
					return '<span style="color:red;">无效</span>';
				}
			}},
			{field:'opt',title:'操作',width:100,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var href='<a href=javascript:getSecondList('+row.firstclassId+','+row.videoType+','+index+');>分类</a>';
                	var updateHref=' <a href=javascript:CLASSFIRIST["update"]('+row.firstclassId+','+index+');>修改</a>';
                	//ar deleteHref=' <a href=javascript:CLASSFIRIST["delete"]('+row.firstclassId+','+index+');>删除</a>';
                    return '<span style="color:red">'+href+updateHref+'</span>';  
                }
            }
		]],
		pagination:true,
        pageSize: 20,
        pageList: [10, 15, 20, 25, 30],
		rownumbers:false
	});
//	$('#dialog_video').dialog({title:"剧集与码流",closed:false});
}

var CLASSFIRIST={
		"add":function(){
			$("#classfirstId").val("");
			$("#showClassFirstImgUrl").attr("src","");
			$("#icon_span").html("");
			$("#firstForm")[0].reset();
			$('#dialog_classFirstEdit').dialog({title:"新增频道",closed:false});
		},
		"update":function(){
			var row = $('#tableDiv').datagrid('getSelected');
		    if (row){
				$("#classfirstId").val(row.firstclassId);
				$("#firstclassName").val(row.firstclassName);
				$("#sequence").val(row.sequence);
				$("#isEffective").val(row.isEffective);
				$("#pic").val(row.pic);
				$("#showClassFirstImgUrl").attr("src",row.pic);
				$("#icon_span").html('<img id="icon" style="height:80px;" src='+row.icon+'>');
		    }
			$('#dialog_classFirstEdit').dialog({title:"修改频道",closed:false});
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
		"sumbitOpreate":function(){
			var classfirstId = $("#classfirstId").val();
			var arr_add = {
					"firstclassName":$("#firstclassName").val(),
					"sequence":$("#sequence").val(),
					"isEffective":$("#isEffective").val(),
					"pic":$("#pic").val()
			};
			
			var pic=$("#showClassFirstImgUrl").attr("src");
			if(HIVEVIEW.upload.isRsync(pic)){
				_sendFileToServer("imgChannelPath",HIVEVIEW.upload.separate(pic));
				arr_add["pic"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.imgChannelPath,"showUrl":pic
				});
			}
			var icon=$("#icon").attr("src");
			if(HIVEVIEW.upload.isRsync(icon)){
				_sendFileToServer("imgChannelPath",HIVEVIEW.upload.separate(icon));
				arr_add["icon"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.imgChannelPath,"showUrl":icon
				});
			}
			
			if(classfirstId!=null&&classfirstId!=""){
				arr_add['firstclassId']=classfirstId;
				$.post("classFirst/updateClassFirst.json",arr_add,function(data){
					if(data.code==1){
						$('#tableDiv').datagrid("reload");
						$('#dialog_classFirstEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'修改失败！'); 
					}
				},"json");
			}else{
				$.post("classFirst/saveClassFirst.json",arr_add,function(data){
					if(data.code=1){
						$('#tableDiv').datagrid("reload");
						$('#dialog_classFirstEdit').dialog('close');
						$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,'添加失败！'); 
					}
				},"json");
			}
		},
		"search":function(){
			var syncParameter = {
					"firstclassName":$("#classFirstName_search").val()
				};
			$('#tableDiv').datagrid("load",syncParameter);
		}
};