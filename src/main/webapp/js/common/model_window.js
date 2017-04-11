var _targetDiv = "";
var moveDiv = "#_modelDiv";//移动区域（移动层）
var moveClickDiv = "#modelDivTitle";//鼠标点击后的层（移动层）
var isCancel=false;
var _move=false;//移动标记
var _x,_y;//鼠标离控件左上角的相对位置

//弹出层对应的entity
function DialogDiv(divEntity){
	if(divEntity.targetID==null){
		this._targetDiv = "dialog_div";
		_targetDiv = "dialog_div";
	}else{
		this._targetDiv = divEntity.targetID;
		_targetDiv = divEntity.targetID;
	}
	if(divEntity.width==null){
		this.width = 300;
	}else{
		this.width = divEntity.width;
	}
	if(divEntity.height==null){
		this.height = 100;
	}else{
		this.height = divEntity.height;
	}

	if(divEntity.title==null){
		this.title = "提示信息";
	}else{
		this.title = divEntity.title;
	}
	this.content = divEntity.content;
	this.isShowCannel = divEntity.cannel;
	if(divEntity.isReInstallSubmit!=null){
		this.reInstallSubmit = divEntity.isReInstallSubmit;
	}
	this.isMove = true;
	if(divEntity.isMove!=null){
		this.isMove = divEntity.isMove;
	}
	this.showDialog = function(){
		var windowobj = $(window);
		var browserwidth = windowobj.width();
		var browserheight = windowobj.height();
		var	scrollLeft = windowobj.scrollLeft();
		var	scrollTop = windowobj.scrollTop();

		var divLeft = (browserwidth-this.width)/2;
		var temp = (browserheight-this.height)/2;
		var divTop = temp<0?0:temp;
		if(divTop.toString()=="NaN"){
			divTop=200;
		}

		var divs = document.getElementsByTagName("div");
		//alert($("#hyalineDiv").css("z-index"));
		var max=0;
		for(var i=0; i<divs.length; i++){
			if($(divs[i]).css("z-index")!="auto")
				max = Math.max(max,$(divs[i]).css("z-index"));
		}
		$("#"+this._targetDiv).html('');
		var heightModel = $(window).height();
		var modelDiv = '<div id=_hyalineDiv'+this._targetDiv+' style="width:'+browserwidth+'px; height:'+heightModel+'px; position:absolute; z-index:'+(max+1)+'; filter: Alpha(Opacity=50); opacity:0.45; background:black; left:0px; top:0px;"></div>';
		modelDiv += '<div id=_content_'+this._targetDiv+' class="modelDiv" style="width:'+this.width+'px; top:'+divTop+'px; left:'+divLeft+'px; z-index:'+(max+2)+'">';
		modelDiv += '<div id=modelDivTitle'+this._targetDiv+' class="modelDivTitle"><h3>'+this.title+'</h3><a id="dialog_button_1" title="关闭" class="cancel_btn qz_dialog_btn_close"><span class="none">╳</span></a></div>';
		if(divEntity.height==null){
			modelDiv += '<div class="modelDivContent" id="modleDivContent" style="line-height:'+this.height+'px;">'+this.content+'</div>';
		}else{
			modelDiv += '<div class="modelDivContent" id="modleDivContent" style="height:'+this.height+'px;">'+this.content+'</div>';
		}
		modelDiv += '<div class="modelDivBottom">';
		
		if(divEntity.isHavaCancel){
			modelDiv += '<button class="btn btn-primary" onclick="_closeModelDiv()">确认</button> <button class="cancel_btn '+btnSumbitClassName+'")>取消</button>';
		}else{
			if(this.reInstallSubmit!=null){
				modelDiv += '<button class="btn btn-primary" onclick='+this.reInstallSubmit+'("'+this._targetDiv+'")>确认</button> <button class="cancel_btn '+btnSumbitClassName+'">取消</button>';
			}else{
				modelDiv += '<button class="btn btn-primary" onclick=_dialog_cancel("'+this._targetDiv+'")>确认</button>';
			}
		}
		
		modelDiv += '</div></div>';
		$("#"+this._targetDiv).append(modelDiv);
		var targetId = this._targetDiv;
		$("#"+this._targetDiv+" .cancel_btn").click(function(){
			_dialog_cancel(targetId);
		});
		$("#_content_"+this._targetDiv).show();
		if(this.isMove){
			_moveDivFN("modelDivTitle"+this._targetDiv,"_content_"+this._targetDiv);
		}
		makeDivRightInTheMiddle('_content_'+this._targetDiv);
	};
	
	this.closeDialog=_closeModelDiv;
	
	this.closeDialog_=_dialog_cancel;
}

//关闭弹出层
function _closeModelDiv(){
	$("#"+_targetDiv).html("");
	$("#_hyalineDiv").css("width",0);
	_deleteOperate(d_dataId,d_dataIndex);
	isCancel=false;
}

function _dialog_cancel(_targetId_){
	$("#"+_targetId_).html("");
	$("#_hyalineDiv"+_targetId_).css("width",0);
	//$("#_hyalineDiv"+this._targetDiv).css("width",0);
	isCancel=false;
};

DialogDiv.prototype._dialog_cancel = function(callbackdata){
	$("#"+_targetDiv).html("");
	$("#_hyalineDiv").css("width",0);
	isCancel=false;
};
function _deleteOperate(){
	
};

//
function makeDivRightInTheMiddle(){
	var windowobj = $(window);
	//var browserwidth = windowobj.width();
	var browserheight = windowobj.height();
	var	scrollLeft = windowobj.scrollLeft();
	var	scrollTop = windowobj.scrollTop();
	var real_top = (browserheight - $("#"+arguments[0]).height())/2;
	$("#"+arguments[0]).css("top",real_top+scrollTop+"px");
}

//可移动层的操作移动
function _moveDivFN(moveclickdiv,moveModelDiv){
    $("#"+moveclickdiv).click(function(){
        //alert("click:"+moveclickdiv);//点击（松开后触发）
        }).mousedown(function(e){
        _move=true;
        _x=e.pageX-parseInt($("#"+moveModelDiv).css("left"));
        _y=e.pageY-parseInt($("#"+moveModelDiv).css("top"));
        //$(moveDiv).fadeTo(20, 0.8);//点击后开始拖动并透明显示
    });
    
    $("#"+moveModelDiv).mousemove(function(e){
        if(_move){
            var x=e.pageX-_x>0?e.pageX-_x:0;//移动时根据鼠标位置计算控件左上角的绝对位置
            var y=e.pageY-_y>0?e.pageY-_y:0;
            var windowobj = $(window);
        	var browserwidth = windowobj.width();
        	var browserheight = windowobj.height();
        	//获得当移动层的高和宽
        	var widthDiv = $('#'+moveModelDiv).width();
        	var heightDiv = $('#'+moveModelDiv).height();
        	if(x>browserwidth-widthDiv){
        		x = browserwidth-widthDiv-2;
        	}
        	if(y>browserheight-heightDiv){
        		y = browserheight-heightDiv-2;
        	}
        	if(y<=0){
        		y=0;
        	}
            $("#"+moveModelDiv).css({top:y,left:x});//控件新位置
        }
    }).mouseup(function(){
    _move=false;
    //$(moveDiv).fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
  });
}


function waitDialog(targetId){
	this.targetId = targetId;
		var windowobj = $(window);
		var browserwidth = windowobj.width();
		var browserheight = $(document.body).height();
		var	scrollLeft = windowobj.scrollLeft();
		var	scrollTop = windowobj.scrollTop();

		var target = $("#"+this.targetId);
		if(targetId=="body"){
			$("body").append('<div id=wait_'+this.targetId+' style="left:0px;top:0px;width:'+browserwidth+'px; height:'+browserheight+'px; position:absolute; z-index:100; filter: Alpha(Opacity=50); opacity:0.45; background:black;"><div style="height:30px; color:#FFFFFF;text-align:center;margin-top:'+(windowobj.height()/2)+'px"><img src="images/common/loading.gif"> loading...</div></div>');
		}else{
			$("#"+this.targetId).append('<div id=wait_'+this.targetId+' style="left:'+target.offset().left+'px;top:'+target.offset().top+'px;width:'+target.width()+'px; height:'+target.height()+'px; position:absolute; z-index:100; filter: Alpha(Opacity=50); opacity:0.45; background:black;"><div style="height:30px; color:#FFFFFF;text-align:center;margin-top:'+(target.height()/2)+'px"><img src="images/common/loading.gif"> loading...</div></div>');
		}
}

waitDialog.prototype.close = function(obj){
	$("#wait_"+obj).remove();
};


/***************** parent dialog start ***************************/
function show(){
	
}
/***************** parent dialog end *****************************/