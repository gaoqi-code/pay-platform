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
<title>蜂巢管理云平台</title>
<jsp:include page="../../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/app/app/appTop_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'应用/游戏榜单'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	分类：<select id="select_category">
	</select>
	榜单类型：<select id="select_toptype">
		<option value="1">付费榜</option>
		<option value="2">热销榜</option>
		<option value="3">免费榜</option>
	</select>
	</div>
	<table id="detail_table"></table>
</div>
<div id="detail_dialog" data-options="closed:true,modal:true,title:'榜单信息'" style="padding:5px;width:880px;height:475px;">
	<form action="" id="detail_form" style="display:block;float:left;width:240px;">
	<table>
			<tr>	
				<td>顺序：</td>	
				<td><input type="text" class="easyui-numberbox" id="seq"></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td>
				<select id="isEffective">
						<option value="1">有效</option>
						<option value="0">无效</option>
					</select>
				</td>
			</tr>
			<tr>	
				<td>应用ID：</td>	
				<td><input type="text" id="appId" readonly></td>
			</tr>
			<tr>
			<td>应用名称：</td>	
			<td><input type="text" id="appName" readonly></td>
			</tr>
	</table>
	</form>
	<div style="float:left;width:615px;height:390px;">
	<div id="search_bar" class="common_search">
	<input type="text" name="appName">
	<input type="button"  class="btn btn-primary" id="searchAapp_button" value="查询"/>
	</div>
	<table id="applist_table"></table>
	</div>
</div>
</body>
</html>