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
<title>频道管理</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'频道管理'" class="regionCenter">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_classFirst" value="新增频道"/>
		<input type="text" id="classFirstName_search" placeholder="请输入频道名称" />
		<button class="btn btn-primary" onclick="CLASSFIRIST['search']()">查询</button>
	</div>
</div>
<div id="dialog_classFirstEdit" data-options="closed:true,modal:true" style="padding:5px;width:450px;height:400px;">  
<form id="firstForm">
<input type="hidden" id="classfirstId">
<table>
<tr>
<td class="tableTdRight">顺序：</td><td class="tableTdLeft"><input type="text" id="sequence"/></td>
</tr>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" id="firstclassName"/></td>
</tr>
<tr>
<td class="tableTdRight">状态：</td><td class="tableTdLeft"><select id="isEffective"><option value="1">已发布</option><option value="-1">未发布</option><option value="0">虚拟</option></select></td>
</tr>
<tr>
<td class="tableTdRight">运营图：</td>
<td class="tableTdLeft">
	<img id="showClassFirstImgUrl" alt="" src="" style="height:80px">
	<input type="hidden" id="pic"/>
	<span><input type="button" id="uploadify_pic" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgpicUpload_" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr><tr>
<td class="tableTdRight">图标：</td>
<td class="tableTdLeft">
	<span id="icon_span"></span>
	<span><input type="button" id="uploadify_icon" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="iconUpload_" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
</table>
</form>
</div>
<div id="dialog_classListEdit" data-options="closed:true,modal:true,draggable:false" style="padding:5px;width:650px;height:500px;">
	<jsp:include page="../../jsp/channel/classSecond_list.jsp"></jsp:include>
	<jsp:include page="../../jsp/channel/classThird_list.jsp"></jsp:include>
</div>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<script type="text/javascript" src="js/channel/classFirst_list.js"></script>
<script type="text/javascript" src="js/channel/classSecond_list.js"></script>
<script type="text/javascript" src="js/channel/classThird_list.js"></script>
</body>
</html>