var flagThirdList;
var castTypeArray=new Array();
var videoTypeArray=new Array();
var VIDEOSET={};
castTypeArray[0]="导演";
castTypeArray[1]="制片";
castTypeArray[2]="主演/演唱者/主持人/配音";
castTypeArray[3]="演员/MV演员/嘉宾/配音 角色";
castTypeArray[4]="作词";

castTypeArray[5]="作曲";
castTypeArray[6]="主持人";
castTypeArray[7]="嘉宾";
castTypeArray[8]="配音";
castTypeArray[9]="名星";

castTypeArray[10]="出品人";
castTypeArray[11]="编剧";

$(function() {
	getList();
	
	initClassFirst();//初始化视频类型
	$("#add_t").click(function(){
		add();
	});
	$("#sync_videoset").click(function(){
		initSyncData();
	});
	$('#dialog').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				sumbitButton();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog').dialog('close');
			}
		}]
	});
	
	//关联标签------------------start---
	$("#secondclassId_relateclass").change(function(){
		videosetRelateClass["changeEventForSecondclassId"]($(this).children('option:selected').val());
	});
	$("#add_relateClass").click(function(){
		$('#dialog_relateClassEdit').dialog({title:"添加标签",closed:false});
	});
	
	$('#dialog_relateClassEdit').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				videosetRelateClass["submitButton"]();
			}
		},{
		text:'关闭',
		handler:function(){
			$('#dialog_relateClassEdit').dialog('close');
		}
	}]
	});
	//关联标签------------------ end ---
	$('#dialog_moveVideo').dialog({
		buttons:[{
			text:'确定',
			handler:function(videosetId,seq,flag,index){
				moveVideo(1,1,3,1);
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_moveVideo').dialog('close');
			}
		}]
	});
	$('#dialog_sync').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				sendSyncMessage();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_sync').dialog('close');
			}
		}]
	});
	/******************* 运营自由组合剧集 start *******************/
	$('#dialog_groupVideo').dialog({
		buttons:[{
			text:'确定',
			handler:function(){
				VIDEOSET.SYNC.sendData();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dialog_groupVideo').dialog('close');
			}
		}]
	});
	$("#sync_groupVideo").click(function(){
		VIDEOSET.SYNC.sendData();
	});
	/******************* 运营自由组合剧集 end *******************/
	//关联人物弹出框
	$('#dialog_cast').dialog({
		buttons:[{text:'关闭',handler:function(){$('#dialog_cast').dialog('close');}
		}]
	});
	
	   _initFileUpload("uploadify_videoset",{
	   		data:{imgName:"imgPath"},
	   		onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var imgUrl=ParseTextToJsonObject(response);
	        	$("#imgUrl").val(imgUrl);
	        	$("#uploadFlag").val("");
	        	$("#imgVideoUpload").hide();
	        	$("#showImgUrlDiv").html('<img alt="" id="showImgUrl" src='+imgUrl+' style="height:80px">');
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
	   _initFileUpload("uploadify_videosetTvImg",{
	        action: "fileUpload/uploadSuffix.html",
	        data:{imgName:"imgPath","suffix":"_260_360"},
	        type:"POST",
	        autoSubmit:true,onComplete: function (file, response) {//文件提交完成后可执行的方法
	        	var imgUrl=ParseTextToJsonObject(response);
	        	$("#videosetTvImg").val(imgUrl);
	        	$("#uploadFlag").val("");
	        	$("#videosetTvImgUpload").hide();
	        	imgUrl=imgUrl.substring(0,imgUrl.lastIndexOf("."))+"_260_360"+imgUrl.substring(imgUrl.lastIndexOf("."));
	        	$("#showVideosetTvImgDiv").html('<img alt="" id="videosetTvImgUrl" src='+imgUrl+' style="height:80px">');
	        },
	        onSubmit:function(file, extension){
	        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
		    		$("#videosetTvImgUpload").show();
		    		$("#uploadFlag").val("uploading");
		    	}else{
		    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
		    		return false;
		    	}
	        }
	    });
//    new AjaxUpload($('#uploadify_videoset'), {//绑定AjaxUpload
//        action: "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
//        data:{"propKey":"imgPath"},
//        type:"POST",//提交方式
//        autoSubmit:true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
//        onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var imgUrl=ParseTextToJsonObject(response);
//        	$("#imgUrl").val(imgUrl);
//        	//$("#showImgUrl").attr("src",imgUrl);
//        	$("#uploadFlag").val("");
//        	$("#imgVideoUpload").hide();
//        	$("#showImgUrlDiv").html('<img alt="" src='+imgUrl+' style="height:80px">');
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
    
//    new AjaxUpload($('#uploadify_videosetTvImg'), {
//        action: "fileUpload/uploadSuffix.html",data:{"propKey":"imgPath","suffix":"_260_360"},type:"POST",
//        autoSubmit:true,onComplete: function (file, response) {//文件提交完成后可执行的方法
//        	var imgUrl=ParseTextToJsonObject(response);
//        	$("#videosetTvImg").val(imgUrl);
//        	$("#uploadFlag").val("");
//        	$("#videosetTvImgUpload").hide();
//        	imgUrl=imgUrl.substring(0,imgUrl.lastIndexOf("."))+"_260_360"+imgUrl.substring(imgUrl.lastIndexOf("."));
//        	$("#showVideosetTvImgDiv").html('<img alt="" src='+imgUrl+' style="height:80px">');
//        },
//        onSubmit:function(file, extension){
//        	if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)){
//	    		$("#videosetTvImgUpload").show();
//	    		$("#uploadFlag").val("uploading");
//	    	}else{
//	    		$.messager.alert(titleInfo, "非图片类型文件，请重传");
//	    		return false;
//	    	}
//        }
//    });
    
    for(var i=0;i<castTypeArray.length;i++){
    	$("#type_common_search_cast").append('<option value="'+(i+1)+'">'+castTypeArray[i]+'</option>');
    }
    $('#dialog_matrix').dialog({});
	//显示豆瓣信息弹出框
    $('#twoDimCodeBtn').click(function(){
    	var videosetName = $('#videosetName').val();
    	$('#matrix_video_name').val(videosetName);
    	$('#dialog_matrix').dialog('open');
    });
	//搜索豆瓣信息
    $('#matrix_video_search').click(function(){
    	var matrixVideoName = $('#matrix_video_name').val();
    	initVideoReview({videoName:matrixVideoName});
    });
});

function getList(){
	var parameter = {
		"isEffective":$("#isEffective_search").val()
	};
	$('#tableDiv').datagrid({
		checkbox:true,
		//collapsible:true,
		fitColumns:true,
		fit:true,
//		autoRowHeight: false,
		striped:true,
		toolbar: "#common_search",
		url:'videoSet/getVideoSetByPage.json',
		queryParams:parameter,
		//remoteSort: false,
		singleSelect:true,
		idField:'videosetId',
		columns:[[
{field:'ck',checkbox:true},
			{field:'seq',title:'位置',width:50,align:"center",formatter:function(val,row){
				var date = new Date(row.createTime);
				var hour = date.getHours();
				hour = hour>=10?hour:"0"+hour;
				var minute = date.getMinutes();
				minute = minute>=10?minute:"0"+minute;
				return row.seq+"<br />"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDay()+1)+" "+hour+":"+minute;
			}},
			{field:'videosetId',title:'专辑ID',align:"center",width:40},
			{field:'videosetName',title:'专辑名称',align:"center",width:140},
			{field:'videosetImg',title:'缩略图',width:80,align:"center",formatter:function(value){
				return '<img class="tableImg" src="'+HIVEVIEW.PROJECT.GETIMGURL(value)+'" data-echo="images/common/loading.gif"  style="height:100px;">';
			}},
			{field:'videosetType',title:'影片类型',width:80,align:"center",formatter:function(value){
				return videoTypeArray[value];
			}},
			{field:'opt',title:'操作',width:160,align:'center', rowspan:2,  
                formatter:function(value,row,index){
                	var castHref='<a href=javascript:initVideosetCast('+row.videosetId+','+index+');>关联演职员</a>';
                	var relateVideosetHref=' <a href=javascript:initVideosetRelated('+row.videosetId+','+index+');>关联专辑</a>';
                	var relateClassFirst=' <a href=javascript:videosetRelateClass["relateClassFirst"]('+row.videosetId+','+row.videosetType+','+index+');>标签</a>';
                	var videoHref=' <a href=javascript:getVideoList('+row.videosetId+','+row.videosetType+','+row.videosetTotal+','+index+');>剧集</a>';
                	var varietyVideo='<br/><a href=javascript:VIDEOSET.SYNC.groupVideoList();>综艺聚合</a>';
                	var moveHref='<br /><a href=javascript:openMoveDialog('+row.videosetId+','+row.seq+',3,'+index+',"'+row.videosetName+'");>置顶</a>  <a href=javascript:moveVideo('+row.videosetId+','+row.seq+',1,'+index+');>上移</a> <a href=javascript:moveVideo('+row.videosetId+','+row.seq+',2,'+index+');>下移</a>';
                	if(row.videosetType==6){
                		moveHref=varietyVideo+moveHref;
                	}
                	var updateHref=' <a href=javascript:update('+row.videosetId+','+index+');>修改</a>';
                	var deleteHref=' <a href=javascript:deleteOperate('+row.videosetId+','+row.isEffective+','+row.videosetType+');>'+(row.isEffective==1?"下线":"上线")+'</a>';
                    return '<span style="color:red">'+castHref+relateVideosetHref+relateClassFirst+videoHref+updateHref+deleteHref+moveHref+'</span>';  
                }
            }
		]],
		pagination:true,
        pageSize: 50,
        pageList: [10,30,50,100,300,500,1000],
		rownumbers:false
	});

}

VIDEOSET.ALBUM={
		"showIMG":function(data){
			if(data.rows.length>0){
				for(var i=0;i<data.rows.length;i++){
					$('#tableDiv').datagrid('updateRow',{
						index:i,
						row: {
							showVideosetImg:HIVEVIEW.IMG.showImg(i,data.rows[i].videosetImg)
						}
					});
				}
			}
		}
};

var videosetRelateClass = {
		"initClassSecond":function(firstClassId){
			$.post("classSecond/getClassSecondByPage.json",{"firstclassId":firstClassId,"rows":50,"isEffective":1},function(data){
				var list = data.rows;
				$("#secondclassId_relateclass").html('<option value=-1>选择</option>');
				for(var index=0;index<list.length;index++){
					$("#secondclassId_relateclass").append('<option value='+list[index].secondclassId+'>'+list[index].secondclassName+'</span>');
				}
			});
		},
		"initClassThird":function(firstClassId){
			$("#thirdclass_list").html("");
			$.post("classThird/getClassThirdByPage.json",{"rows":2000,"firstclassId":firstClassId},function(data){
				flagThirdList = data.rows;
			},"json");
		},
		"changeEventForSecondclassId":function(flagSecondclassId){
			$("#thirdclass_relateclass").html("");
			$.each(flagThirdList,function(dataIndex,thirdclass){
				if(thirdclass.secondclassId==flagSecondclassId){
					$("#thirdclass_relateclass").append('<option value='+thirdclass.thirdclassId+'>'+thirdclass.thirdclassName+'</option>');
				}
			});
		},
		"add":function(){
			$("#sequence_relateclass").val(1);
			//$("#secondclassId_relateclass").val(1);
			$('#dialog_relateClassEdit').dialog({title:"关联标签",closed:false});
		},
		"delete":function(sequence,thirdclassId,videosetId){
			$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
				if(r){
					var delete_arr = {
							"sequence":sequence,
							"thirdclassId":thirdclassId,
							"videosetId":videosetId
					};
					$.post("videosetClass/deleteVideosetClass.json",delete_arr,function(data){
						if(data.code==1){
							$('#tableRelateClass').datagrid("reload");
							$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
						}else{
							$.messager.alert(titleInfo,'删除失败！');
						}	
					},"json");
				}
			});
		},
		"submitButton":function(){
			var videosetClassParameter = {
					"sequence" : $("#sequence_relateclass").val(),
					"firstclassId" : $("#firstclassId_relateclass").val(),
					"secondclassId" : $("#secondclassId_relateclass").val(),
					"thirdclassId" : $("#thirdclass_relateclass").val(),
					"thirdclassIds":$("#thirdclass_relateclass").val(),
					"videosetId" : $("#videosetId_relateclass").val(),
					"videosetType" : $("#firstclassId_relateclass").val()
			};
			if(videosetClassParameter["thirdclassId"]==""||videosetClassParameter["thirdclassId"]==null){
				$.messager.alert(titleInfo,'您还没有选择标签！');
				return;
			}
			$.post("videosetClass/addVideoSetClass.json",videosetClassParameter,function(data){
				if(data.code==1){
					$('#tableRelateClass').datagrid("reload");
					$('#dialog_relateClassEdit').dialog('close');
					$.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,'添加失败！');
				}
			},"json");
		},
		"relateClassFirst":function(videosetId,videosetType,index){
			$('#tableRelateClass').datagrid({
				//iconCls:'icon-save',
				//collapsible:true,
				fitColumns:true,
				fit:true,
//				autoRowHeight: false,
				striped:true,
				toolbar: "#common_relateClass_search",
				url:'videosetClass/getClassByPage.json',
				queryParams:{"videosetId":videosetId},
				//remoteSort: false,
				singleSelect:true,
				columns:[[
					{field:'sequence',title:'顺序',width:50},
					{field:'thirdclassName',title:'名称',width:100},
					{field:'opt',title:'操作',width:200,align:'center', rowspan:2,  
		                formatter:function(value,row,index){
		                	var deleteHref=' <a href=javascript:videosetRelateClass["delete"]('+row.sequence+','+row.thirdclassId+','+row.videosetId+');>删除</a>';
		                    return '<span style="color:red">'+deleteHref+'</span>';  
		                }
		            }
				]],
				pagination:true,
		        pageSize: 50,
		        pageList: [10,30,50],
				rownumbers:false
			});
			$('#dialog_relateClass').dialog({title:"关联标签",closed:false});
			$("#firstclassId_relateclass").val(videosetType);$("#videosetId_relateclass").val(videosetId);
			videosetRelateClass["initClassSecond"](videosetType);
			videosetRelateClass["initClassThird"](videosetType);
		}
};

function openMoveDialog(videosetId,seq,flag,index,videosetName){
	$("#moveVideosetName").val(videosetName);
	$("#moveVideosetId").val(videosetId);
	$("#moveVideosetSeq").val(seq);
	$("#moveVideosetSeq_").val(seq);
	$('#dialog_moveVideo').dialog({title:"置顶",closed:false});
}
//上移，下移
function moveVideo(videosetId,seq,flag,index){
	var tableVideosetData = $("#tableDiv").datagrid("getData");
	var tableVideosetDataRows=tableVideosetData.rows;
	var seq_;
	var videosetId_=-1;
	if(flag==1){//上移
		if((index-1)==-1){$.messager.alert(titleInfo,'这个视频已经在第一位了！'); return;}
		seq_=tableVideosetDataRows[index-1].seq;
		videosetId_=tableVideosetDataRows[index-1].videosetId;
	}else if(flag==3){//置顶
		videosetId=$("#moveVideosetId").val();
		seq=$("#moveVideosetSeq").val();
		seq_=$("#moveVideosetSeq_").val();
		if(seq_<1||seq_>50){
			$.messager.alert(titleInfo,'输入不正确！'); 
			return;
		}
	}else{
		if(tableVideosetDataRows[index+1]==null){$.messager.alert(titleInfo,'这个视频已经在最后一位了！'); return;}
		seq_=tableVideosetDataRows[index+1].seq;
		videosetId_=tableVideosetDataRows[index+1].videosetId;
	}
	$.post("videoSet/updateVideoSetSequence.json",{"videosetId":videosetId,"seq":seq,"videosetId_":videosetId_,"seq_":seq_,"flag":flag},function(data){
		if(data.code==1){
			$("#tableDiv").datagrid("reload");
			$.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
			$('#dialog_moveVideo').dialog('close');
		}else{}
	});
}

function add(){
	$('#videosetId').val("");
	$("#videosetName").val("");
	//$("#videoSetType").val("");
	$("#videosetTotal").val("");
	$("#isSuetime").val("");
	
	$("#years").val("");
	$("#timeLength").val("");
	$("#videosetTvImg").html("");
	$("#showVideosetTvImgDiv").html('');
	
	$("#director").val("");
	$("#actors").val("");
	$("#keyWord").val("");
	$("#tag").val("");
	$("#seq").val(1);
	
	$("#videosetFocus").val("");
	$("#imgUrl").val("");
//	$("#showImgUrl").attr("src","");
	$("#showImgUrlDiv").html("");
	$("#videosetBrief").val("");
	
	$("#score").val(0);
	$("#is3D").val(0);
	$("#isSeries").val(0);
	$("#videosetUpdate").val(1);
	$('#dialog').dialog({title:"添加专辑",closed:false});
}

function update(){
	var row = $('#tableDiv').datagrid('getSelected');
    if (row){
		$("#videosetId").val(row.videosetId);
		$("#videosetName").val(row.videosetName);
		$("#videoSetType").val(row.videosetType);
		$("#videosetTotal").val(row.videosetTotal);
		$("#isSuetime").val(row.isSuetime);
		
		$("#years").val(row.years);
		$("#timeLength").val(row.timeLength);
		
		var imgUrl=row.videosetTvImg;
		if(null!=imgUrl&&imgUrl!=""){
			imgUrl=imgUrl.substring(0,imgUrl.lastIndexOf("."))+"_260_360"+imgUrl.substring(imgUrl.lastIndexOf("."));
		}
		$("#videosetTvImg").html(row.videosetTvImg);
		$("#showVideosetTvImgDiv").html('<img alt="" id="videosetTvImgUrl" src='+imgUrl+' style="height:80px">');
		
		$("#director").val(row.director);
		$("#actors").val(row.actors);
		$("#keyWord").val(row.keyWord);
		$("#tag").val(row.tag);
		$("#seq").val(row.seq);
		
		$("#videosetFocus").val(row.videosetFocus);
		$("#imgUrl").val(row.videosetImg);
		//$("#showImgUrl").attr("src",row.videosetImg);
		//$("#showImgUrlDiv").html(HIVEVIEW.IMG.showImg(row.videosetId,row.videosetImg));
		$("#showImgUrlDiv").html('<img id="showImgUrl" src="'+HIVEVIEW.PROJECT.GETIMGURL(row.videosetImg)+'" style="height:80px;"/>');
		$("#videosetBrief").val(row.videosetBrief);
		$("#twoDimCode").attr("src",row.twoDimCode);
		
		$("#score").val(row.score);
		$("#is3D").val(row.is3D);
		$("#isSeries").val(row.isSeries);
		$("#videosetUpdate").val(row.videosetUpdate);
    }
	$('#dialog').dialog({title:"修改专辑",closed:false});
}

function sumbitButton(){
	validateResult = $("#videoSetForm").form('validate');
	if(!validateResult){
		return;
	}
	var years=$("#years").val();
	if(years!=""){
		var yearsArray = years.split(",");
		for(var key in yearsArray){
			if(isNaN(yearsArray[key])||yearsArray[key].length>4||yearsArray[key].length<4||yearsArray[key]>3000){
				$.messager.alert(titleInfo,'您输入的年份不正确！');
				return;
			}
		}
	}
	if($("#uploadFlag").val()=="uploading"){
		$.messager.alert(titleInfo,'正在上传图片，请稍等...'); 
		return;
	}
	if($("#videoSetType").val()==-1){
		$.messager.alert(titleInfo,'请选择频道！'); 
		return;
	}
	var videosetId = $("#videosetId").val();
	var arr_add = {
			"videosetName":$("#videosetName").val(),
			"videosetType":$("#videoSetType").val(),
			"videosetTotal":$("#videosetTotal").val(),
			"years":$("#years").val(),
			"timeLength":$("#timeLength").val(),
			"isSuetime":$("#isSuetime").val(),
			"videosetBrief":jQuery("#videosetBrief").val(),
			
			"director":jQuery("#director").val(),
			"actors":jQuery("#actors").val(),
			"keyWord":jQuery("#keyWord").val(),
			"tag":jQuery("#tag").val(),
			"classFirstName":$("#videoSetType").find("option:selected").text(),
			"cpVideosetId":jQuery("#cpVideosetId").val(),
			"videosetImg":$("#imgUrl").val(),
			
			"seq":$("#seq").val(),
			"videosetFocus":jQuery("#videosetFocus").val(),
			"twoDimCode":$("#twoDimCode").attr("src"),
			
			"score":jQuery("#score").val(),
			"is3D":$("#is3D").val(),
			"isSeries":$("#isSeries").val(),
			"videosetUpdate":$("#videosetUpdate").val()
	};
	
	var videosetImg=$("#showImgUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(videosetImg)){
		_sendFileToServer("imgPath",HIVEVIEW.upload.separate(videosetImg));
		arr_add["videosetImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.imgPath,"showUrl":videosetImg
		});
	}
	
	var videosetTvImg=$("#videosetTvImgUrl").attr("src");
	if(HIVEVIEW.upload.isRsync(videosetTvImg)){
		_sendFileToServer("imgPath",HIVEVIEW.upload.separate(videosetTvImg));
		arr_add["videosetTvImg"]=HIVEVIEW.upload.urlCombination({
			"confUrl":HIVEVIEW.upload.conf.imgPath,"showUrl":videosetTvImg
		});
		arr_add["videosetTvImg"]=arr_add["videosetTvImg"].replace(HIVEVIEW.IMG.SIZE[0],"");
	}
	
	if(videosetId!=null&&videosetId!=""){
		arr_add['videosetId']=videosetId;
		$.post("videoSet/updateVideoSet.json",arr_add,function(data){
			if(data.code==1){
				$('#tableDiv').datagrid("reload");
				$('#dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'修改失败！'); 
			}
		},"json");
	}else{
		arr_add["isEffective"]=1;
		$.post("videoSet/addVideoSet.json",arr_add,function(data){
			if(data.code==1){
				$('#tableDiv').datagrid("reload");
				$('#dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
			}else{
				$.messager.alert(titleInfo,'添加失败！'); 
			}
		},"json");
	}
}

function deleteOperate(fieldId,isEffective,type){
	var flagStr = isEffective==1?"下线":"上线";
	$.messager.confirm(titleInfo, '您确定'+flagStr+'吗？', function(r){
		if (r){
			$.post("videoSet/deleteVideoSet.json",{"videoSetId":fieldId,"isEffective":isEffective,"classFirstName":videoTypeArray[type]},function(data){
				if(data.code==1){
					$('#tableDiv').datagrid('reload');
					$.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
				}
			},"json");
		}
	});
}

//查询
function videoSetSearch(){
	var parameter = {
			"videosetName" : $("#videoSetName").val(),
			"videosetType":$("#class_first").val(),
			"isEffective":$("#isEffective_search").val()
		};
	if(parameter['videosetType']==-1)
		delete parameter['videosetType'];
	$('#tableDiv').datagrid("load",parameter);
}

function initClassFirst(){
	//有效频道列表：classFirst/getClassFirstByPage.json
	$.post("classFirst/getAllEffectiveClassFirst.json",{"rows":50,"isEffective":1},function(data){
		if(data.rows!=null){
			sync_class_first=data.rows;
			$("#class_first").html("<option value=-1>全部</option>");
			$("#videoSetType").html("");
			$("#videosetType_sync").html("");
			$("#videosetType_relate_select_search").html('<option value=-1>全部</option>');
			for(var i=0;i<sync_class_first.length;i++){
				if(sync_class_first[i].firstclassId != '1001' && sync_class_first[i].firstclassId != '1002'){
					videoTypeArray[sync_class_first[i].firstclassId]=sync_class_first[i].firstclassName;
					$("#class_first").append('<option value='+sync_class_first[i].firstclassId+'>'+sync_class_first[i].firstclassName+'</option>');
					$("#videoSetType").append('<option value='+sync_class_first[i].firstclassId+'>'+sync_class_first[i].firstclassName+'</option>');
					$("#videosetType_sync").append('<option value='+sync_class_first[i].firstclassId+'>'+sync_class_first[i].firstclassName+'</option>');
					//关联系列片
					$("#videosetType_relate_select_search").append('<option value='+sync_class_first[i].firstclassId+'>'+sync_class_first[i].firstclassName+'</option>');
				}
			}
		}
	});
}

/***************************  同步数据  start************************************/
//同步数据
function initSyncData(){
	var syncParameter = {
			"videosetType":1,
			"isEffective":0
		};
		$('#tableSync').datagrid({
			//iconCls:'icon-save',
			//collapsible:true,
			fitColumns:true,
			fit:true,
			//frozenColumns:[[{field:'ss',checkbox:true}]],
			checkbox:true,
//			autoRowHeight: false,
			striped:true,
			toolbar: "#common_search_sync",
			url:'sync/getSyncVideoSetByPage.json',
			queryParams:syncParameter,
			//remoteSort: false,
			singleSelect:false,
			idField:'videosetId',
			columns:[[
			    {field:'ck',checkbox:true},
				{field:'videosetId',title:'编号',width:50},
				{field:'videosetName',title:'名称',width:150}
			]],
			pagination:true,
			rownumbers:true
		});
		$('#dialog_sync').dialog({title:"同步专辑",closed:false});
}
function videoSyncSearch(){
	var syncParameter = {
			"videosetName" : $("#videoName_sync_search").val(),
			"videosetType":$("#videosetType_sync").val(),
			"isEffective":$("#videosetState_sync").val()
		};
	$('#tableSync').datagrid("load",syncParameter);
}

//发送要同步的消息
function sendSyncMessage(){
	//获得选择的项
	var list = new Array();
	var rows = $('#tableSync').datagrid('getSelections');
	for(var i=0; i<rows.length; i++){
		var row={};
		row['videosetName']=rows[i].videosetName;
		row['videosetId']=rows[i].videosetId;
		row['cp']=rows[i].cp;
		row['type']=rows[i].videosetType;
		list.push(row);
	}
	$('#tableSync').datagrid('clearSelections');
	//转化成字符串
	//发送数据
	$.ajax({
        type: "POST",
        dataType: "json",
        url: "videoSet/synchronousData.json",
        async: true,
        data: {"videosetIds":JSON.stringify(list)},
        success: function(backData){
        	if(backData.code==1){
        		$.messager.alert(titleInfo,'加入队列成功！'); 
        	}else{
        		$.messager.alert(titleInfo,'加入队列出现错误，请联系管理员！'); 
        	}
        }});
}
/***************************  同步数据  end************************************/


/***************************  关联人物开始  start************************************/
//初始化这个专辑对应的人物列表
function initVideosetCast(fieldId,indexId){
	$("#videosetId_cast").val(fieldId);
	var parameter = {
			"videosetId":fieldId
		};
		$('#tableVideosetCast').datagrid({
			//iconCls:'icon-save',
			//collapsible:true,
			fitColumns:true,
		//	fit:true,
//			autoRowHeight: false,
			striped:true,
			toolbar: "#common_search_videosetCast",
			url:'videosetcast/getList.json',
			queryParams:parameter,
			//remoteSort: false,
			singleSelect:true,
			columns:[[
	            {field:'castName',title:'姓名',width:90},
			    {field:'castType',title:'类型',width:300,formatter:function(value){
			    	return castTypeArray[value-1];
			    }},
				{field:'opt',title:'操作',width:70,align:'center', rowspan:2,  
	                formatter:function(value,row,index){
	                	var deleteHref=' <a href=javascript:deleteCastToVideosetCast('+row.videosetId+','+row.castId+','+row.castType+');>删除</a>';
	                    return '<span style="color:red">'+deleteHref+'</span>';  
	                }
	            }
			]],
			pagination:true,
			rownumbers:true
		});
		$('#dialog_cast').dialog({title:"专辑人物",closed:false});
		initCastList();
}
function initCastList(){
	var parameter = {
			"castType":$("#type_common_search_cast").val()
		};
		$('#tableCast').datagrid({
			//iconCls:'icon-save',
			//collapsible:true,
			fitColumns:true,
			//fit:true,
			striped:true,
			toolbar: "#common_search_cast",
			url:'cast/getList.json',
			queryParams:parameter,
			//remoteSort: false,
			singleSelect:true,
			columns:[[
	            {field:'castName',title:'姓名',width:90},
			    {field:'castDesc',title:'类型',width:300},
				{field:'opt',title:'操作',width:70,align:'center', rowspan:2,  
	                formatter:function(value,row,index){
	                	var deleteHref=' <a href=javascript:addCastToVideosetCast('+row.castId+','+row.castType+');>选择</a>';
	                    return '<span style="color:red">'+deleteHref+'</span>';  
	                }
	            }
			]],
			pagination:true,
			rownumbers:true
		});
}
function videosetCastSearch(){
	var syncParameter = {
			"videosetId":$("#videosetId_cast").val(),
			"castName":$("#videosetCastName_search").val()
		};
	$('#tableVideosetCast').datagrid("reload",syncParameter);
}
function castListSearch(){
	var syncParameter = {
			"castName":$("#castName_search").val(),
			"castType":$("#type_common_search_cast").val()
		};
	$('#tableCast').datagrid("load",syncParameter);
}

function deleteCastToVideosetCast(videosetId,castId,castType){
	$.post("videosetcast/delete.json",{"videosetId":videosetId,"castId":castId,"castType":castType},function(data){
		if(data.code=1){
			$('#tableVideosetCast').datagrid("reload");
			$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,'删除失败！'); 
		}
	},"json");
}
function addCastToVideosetCast(castId,castType){
	var row = $('#tableCast').datagrid('getSelected');
	if(!row)
		return;
	var parameter = {
			"castId" : castId,
			"castType" : castType,
			"videosetId" : $("#videosetId_cast").val()
		};
	$.post("videosetcast/getList.json",parameter,function(data){
		if(data.total>=1){
			$.messager.alert(titleInfo,'已添加！');
			return;
		}else{
			parameter["castName"]=row.castName;
			$.post("videosetcast/add.json",parameter,function(data){
				if(data.code=1){
					$('#tableVideosetCast').datagrid("reload");
					$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,'添加失败！'); 
				}
			},"json");
		}
	},"json");
}
/***************************  关联人物开始  end************************************/

/***************************  二维码  start************************************/
//选择二维码
function chooseReview(id){
	$.messager.confirm(titleInfo, '您确定生成二维码？', function(r){
		if(r){
			var rowInfo = $('#table_matrix').datagrid("getSelected");
			if(rowInfo){
				//影评地址
				var videoAlt = rowInfo.alt;
				$.post("matrix/create.json",{contentUrl:videoAlt},function(data){
					if(1==data.code){
						$('#twoDimCode').attr('src',data.obj);
						$.messager.show({title:titleInfo,msg:'二维码生成成功！',timeout:timeoutValue,showType:'slide'});
						$('#dialog_matrix').dialog('close');
					}else{
						$.messager.alert(titleInfo,'二维码生成失败!');
					}
				},"json");
			}
		}
	});
}
function initVideoReview(param){
	$('#table_matrix').datagrid({
		fitColumns:true,
		fit:true,
		checkbox:true,
		striped:true,
		toolbar: "#matrix_search_bar",
		url:'videoSet/getReviewList.json',
		queryParams:param,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'title',title:'名称',width:100},
			{field:'subtype',title:'类型',width:70},
			{field:'id',title:'操作',width:70,
				formatter:function(rowIndex,row,info){
					return "<a href='"+row.alt+"' target='_blank'>查看</a>"
						+ "  <a href='javascript:chooseReview(\""+row.id+"\")'>选择</a>";
				}
			}
		]],
		pagination:true,
		pageSize:20,
		rownumbers:true
	});
}
/***************************  二维码  end************************************/

/******************* 运营自由组合剧集 start **********************/
VIDEOSET.SYNC={   
		"groupVideoList":function(){
			var videoset_rows = $('#tableDiv').datagrid('getSelected');
//			if(videoset_rows.length==0){
//				$.messager.alert(titleInfo,'请选择一个专辑！'); 
//				return;
//			}
			
			if(videoset_rows.videosetName){
				var videoName=videoset_rows.videosetName;
				var _videoName=videoName.substring(0,videoName.indexOf("之"));
				if(_videoName!="")
					$("#videoName_groupVideo_search").val(_videoName);
				else
					$("#videoName_groupVideo_search").val(videoName);
			}
			
			var sync_list_parameter={
					"isEffective":$("#videoState_groupVideo").val(),
					"videoType":$("#videoType_groupVideo").val(),
					"videoName":$("#videoName_groupVideo_search").val()
			};
			
			
			
			if(sync_list_parameter["videoName"]=="")
				delete sync_list_parameter["videoName"];
			$('#tableGroupVideo').datagrid({
				//collapsible:true,
				fitColumns:true,
				fit:true,
				checkbox:true,
				autoRowHeight: false,
				striped:true,
				toolbar: "#common_search_groupVideo",
				url:'video/getVideoByPage.json',
				queryParams:sync_list_parameter,
				singleSelect:false,
				idField:'videoId',
				columns:[[
				    {field:'ck',checkbox:true},
					{field:'videoId',title:'编号',width:50},
					{field:'videoName',title:'名称',width:300}
				]],
				pagination:true
			});
			$('#dialog_groupVideo').dialog({title:"剧集列表",closed:false});
		},
		"search":function(){
			var groupParameter={
					"videoName":$("#videoName_groupVideo_search").val(),
					"videoType":$("#videoType_groupVideo").val(),
					"isEffective":$("#videoState_groupVideo").val(),
					"playLength":$("#playLength_video").val()
			};
			if(groupParameter["videoName"]=="")
				delete groupParameter["videoName"];
			if(groupParameter["videoType"]==-1)
				delete groupParameter["videoType"];
			if(groupParameter["playLength"]=="")
				delete groupParameter["playLength"];
			else
				groupParameter["playLength"]=groupParameter["playLength"]*60;
			$('#tableGroupVideo').datagrid("reload",groupParameter);
		},
		"sendData":function(){
			//获得选择的项
			var videoIds = new StringBuffer();
			var rows = $('#tableGroupVideo').datagrid('getSelections');
			if(rows.length==0){
				$.messager.alert(titleInfo,'您还没有选择要组合的剧集！'); 
				return;
			}
			for(var i=0; i<rows.length; i++){
				videoIds.append(rows[i].videoId).append(",");
			}
			var videoset_rows = $('#tableDiv').datagrid('getSelections');
			videoIds._strings_.pop();
			$('#tableGroupVideo').datagrid('clearSelections');
			$.post("video/batchUpdateVideo.json",{"videosetId":videoset_rows[0].videosetId,"videoIds":videoIds.toString()},function(data){
				if(data.code=1){
					$('#tableGroupVideo').datagrid("reload");
					$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,'修改失败！'); 
				}
			},"json");
		}
};

/******************* 运营自由组合剧集 end **********************/