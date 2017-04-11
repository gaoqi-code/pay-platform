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
<body>
	<table id="tableSecond" style="height:200px;"></table>
	<input type="hidden" id="secondclassId">
	<div id="common_second_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_classSecond" value="添加"/>
		<input type="text" id="secondName_search" placeholder="请输入频道名称" />
		<button class="btn btn-primary" onclick='CLASSSECOND["search"]()'>查询</button>
		<button class="btn btn-success" onclick='CLASSSECOND["sumbitOpreate"]()'>保存</button>
	</div>
</body>
</html>