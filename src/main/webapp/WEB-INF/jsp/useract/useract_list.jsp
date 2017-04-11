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
<title>蜂巢TV内容管理云平台</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/useract/useract_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'操作记录'" class="regionCenter">
	<div id="common_search" class="common_search">
	模块：<select id="action">
		<option value="hdfocus">蓝光焦点图</option>
		<option value="hdsubject">蓝光专题</option>
		<option value="searchvideoset">蓝光热搜</option>
		<option value="videoSet">视频管理</option>
		<option value="classFirst">频道管理</option>
		<option value="focus">蜂巢焦点图</option>
		<option value="subject">蜂巢专题</option>
		<option value="videosetRecom">影院推荐</option>
		<option value="moduleskin">首屏背景</option>
		<option value="appfocus">应用推荐</option>
		<option value="apptop">应用榜单</option>
		<option value="appsubject">应用专题</option>
	</select>
	<input type="button" id="btn_search" class="btn btn-primary" value="查询">
	</div>
	<table id="detail_table"></table>
</div>
</body>
</html>