<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<body  class="easyui-layout">
	<div id="avi_common_search" class="common_search">
	<input type="button" id="btn_avi_add" class="btn btn-success" value="添加">
	</div>
	<table id="tableVersionImgList"></table>
	<div id="detail_avi_dialog" data-options="closed:true,modal:true,title:'应用截图',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_avi_form">
		<input type="hidden" id="avi_id"/>
		<input type="hidden" id="avi_app_version_id"/>
		<input type="hidden" id="avi_app_id"/>
	<table>
			<tr>	
				<td class="tableTdRight">顺序：</td>	
				<td class="tableTdLeft"><input type="text" class="easyui-numberbox" id="avi_seq"></td>
			</tr>
			<tr>	
				<td class="tableTdRight">截图尺寸：</td>	
				<td class="tableTdLeft"><input type="text" id="avi_imgSize"></td>
			</tr>
			<tr>	
				<td class="tableTdRight">截图描述：</td>	
				<td class="tableTdLeft"><input type="text" id="avi_imgDesc"></td>
			</tr>
			<tr>	
				<td class="tableTdRight">图片：</td>
				<td class="tableTdLeft">
					<input type="hidden" id="avi_imgUrl" />
					<img src="" id="show_avi_imgUrl" style="width:70px;">
					<input type="button" id="uploadify_avi_imgUrl" value="浏览" class="btn btn-inverse">
					<input type="file" class="fileCommon"><span id="avi_imgVideoUpload" style="display:none;"><img src="images/uploading.gif"></span>
				</td>
			</tr>
	</table>
	</form>
    </div>
</body>
</html>