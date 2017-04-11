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
<script type="text/javascript" src="js/cache/cacheurl_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'缓存管理'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	接口名称：<input type="text" id="search_name" class="text">
	接口地址：<input type="text" id="search_url" class="text">
	<input type="button" id="btn_search" class="btn btn-primary" value="搜索">
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'缓存管理',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form">
			<input type="hidden" id="id"/>
	<table>
			<tr>	
				<td>接口名称：</td>	
				<td><input type="text" id="cacheName"></td>
			</tr>
			<tr>	
				<td>接口路径：</td>	
				<td><input type="text" id="cacheUrl"></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td><select id="isEffective">
					<option value="1">有效</option>
					<option value="0">无效</option>
				</select></td>
			</tr>
	</table>
	</form>
    </div>
</div>
</body>
</html>