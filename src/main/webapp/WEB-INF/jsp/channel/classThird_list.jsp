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
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<title>频道管理</title>
</head>
<body class="easyui-layout">
	<input type="hidden" id="thirdclassId">
	<div id="common_third_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_classThird" value="添加"/>
		<input type="text" id="thirdName_search" placeholder="请输入频道名称" />
		<button class="btn btn-primary" onclick='CLASSTHIRD["search"]()'>查询</button>
	</div>
	<table id="tableThird" style="height:250px;"></table>
</body>
</html>