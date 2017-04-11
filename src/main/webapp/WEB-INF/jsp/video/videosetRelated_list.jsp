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
<div id="dialog_related" data-options="closed:true,modal:true,iconCls:'icon-save'" style="padding:5px;width:850px;height:525px;">
<table id="tableVideosetRelated" style="height:240px;width:820px;"></table>
<table id="tableVideoset_related" style="height:240px;width:820px;"></table>
	<div id="common_search_videosetRelated" class="common_search">
	<input type="text" id="videosetName_related_search" placeholder="请输入专辑名称" />
	<input type="button"  class="btn btn-success" onclick="videosetRelateSearch()" value="查询"/>
	</div>
	<div id="common_search_videoset_related" class="common_search">
	<input type="text" id="videosetName_relate_select_search" placeholder="请输入专辑名称" />
	<select id="videosetType_relate_select_search" style="width:140px;"></select>
	<input type="button"  class="btn btn-success" onclick="relateListSearch()" value="查询"/>
	</div>
</div>
</body>
</html>