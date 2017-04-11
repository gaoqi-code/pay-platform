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
<div id="dialog_videosetClassfirstTable" data-options="closed:true,modal:true,title:'相关标签列表'" style="padding:5px;width:550px;height:450px;">  
	<div id="common_videosetClassfirst_search" class="common_search">
	<input type="button" class="btn btn-success" id="add_videosetClassfirst" value="添加"/>
	</div>
	<table id="tableVideosetClassFirst" style="height:300px;"></table>
</div>
<div id="dialog_videosetClassfirstEdit" data-options="closed:true,modal:true,title:'编辑'" style="padding:5px;width:550px;height:350px;">  
<form id="videosetClassfirstForm">
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" class="required" id="videoName" name="videoName" /></td>
</tr>
<tr>
<td class="tableTdRight">二级频道：</td><td class="tableTdLeft"><input id="keyWord" type="text"></td>
</tr>
<tr>
<td class="tableTdRight">三级频道：</td><td class="tableTdLeft"><select id="video_isEffective"><option value="1">已发布</option><option value="0">未发布</option></select></td>
</tr>
</table>
</form>
</div>
</body>
</html>