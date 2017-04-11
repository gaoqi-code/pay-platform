
/**
 * 绑定上传按钮,初始化上传
 * @param button: 上传按钮
 * @param fileExt: 过滤的文件类型,图片类型：pic
 * @param callback
 */
function _initFileUpload(buttonId,fileExt,callback,callback2){
	new AjaxUpload($('#'+buttonId), {//绑定AjaxUpload
		action : "fileUpload/upload.html",//文件要上传到的处理页面,语言可以PHP,ASP,JSP等
		type : "POST",//提交方式
		data : {"propKey" : "imgTempPath"},
		autoSubmit : true,//选择文件后,是否自动提交.这里可以变成true,自己去看看效果吧.
		onComplete : function(file, response) {//文件提交完成后可执行的方法
			var back_r = ParseTextToJsonObject(response);
			callback(back_r);
		},
		onSubmit : function(file, extension) {
			callback2();
			return validateFileExt["validate_"+fileExt];
		}
	});
}

/**
 * 删除上传的文件
 * @param propKey 文件所属目录
 * @param fileUrl 文件访问路径
 * @param fileId id
 * @param fileSrc src路径
 */
function _deleteFileUpload(propKey,fileUrl,callback){
	$.messager.confirm(titleInfo, '确定删除该条信息？', function(r){
		if(r){
			var dataInfo = {"propKey":propKey,"fileUrl":fileUrl};
			$.post("fileUpload/delete.json",dataInfo,function(data){
				if(data.code==1){
					$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
					callback();
				}else{
					$.messager.alert(titleInfo, "删除失败！");
					return false;
				}
			},"json");
		}
	});
}
/**
 * 确认保存图片
 * @param propKey 文件所属目录
 * @param fileUrl 文件临时访问路径
 * @param callback 回调方法
 */
function _saveFileUpload(propKey,fileUrl,callback){
	$.post("fileUpload/saveFile.json",{"propKey":propKey,"fileUrl":fileUrl},function(data){
		if(data.data.code ==1){
			callback(data.data.obj);
		}else{
			$.messager.alert(titleInfo, "图片保存失败！");
		}
	},"json");
}


/**
 * 对文件进行格式验证
 * extension: 上传的文件后缀
 * fileExt: 验证的文件类型
 */

var validateFileExt={
	"validate_pic":function(extension){
		if (extension && /^(jpg|png|jpeg|gif)$/.test(extension))
			return true;
		else {
			$.messager.alert(titleInfo, "非图片类型文件，请重传");
			return false;
		}
	},
	"validate_app":function(extension){
		if (extension && /^(apk)$/.test(extension))
			return true;
		else{
			$.messager.alert(titleInfo, "非图片类型文件，请重传");
			return false;
		}
	},
	"validate_file":function(extension){
		if (extension && /^(csv)$/.test(extension))
			return true;
		else{
			$.messager.alert(titleInfo, "非图片类型文件，请重传");
			return false;
		}
	}
};
function validateFileExt(extension,fileExt){
	//验证图片类型
	if(fileExt=="pic"){
		if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)) {
			return true;
		} else {
			$.messager.alert(titleInfo, "非图片类型文件，请重传");
			return false;
		}
	}else{
		return true;
	}
}