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
<title></title>
</head>
<body class="easyui-layout">
	<div id="common_appVersion_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_appVersion" value="添加"/>
		<input type="text" id="versionNo_search">
		<select id="versionState_search"><option value=-1>全部</option><option value=1>有效</option><option value=0>无效</option></select>
		<input type="button"  class="btn btn-primary" id="search_appVersion" value="查询"/>
	</div>
	<table id="tableAppVersion"></table>
<div id="dialog_versionEdit" data-options="closed:true,modal:true,title:'应用版本列表'" style="padding:5px;width:600px;height:320px;">  
<input type="hidden" id="id">
<table>
<tr>
<td width="80px;">版本名称：</td><td class="tableTdLeft"><input type="text" id="versionName" />&nbsp;是否最新：<input type="checkbox" name="is_newVersion" value="1" style="vertical-align: middle;"></td>
</tr>
<tr>
<td width="80px;">版本状态：</td><td class="tableTdLeft"><select id="versionState"><option value="1">已发布</option><option value="0">未发布</option></select></td>
</tr>
<tr>
<td>下载路径：</td>
<td class="tableTdLeft">
<input type="text" id="versionUrl" disabled="disabled" /> 
<input type="button" id="uploadify_version" value="浏览" class="btn btn-inverse">
<input type="file" class="fileCommon"><span id="imgVideoUploadAppVersion" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
<tr>
<td width="80px;">版本简介：</td><td class="tableTdLeft"><textarea id="versionDescribe" style="width:380px;height:100px;"></textarea></td>
</tr>
</table>
</div>
</body>
</html>