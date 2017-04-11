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
<jsp:include page="../../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>

<body  class="easyui-layout">
<div data-options="region:'center',title:'热门搜索'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	<select id="category"></select>
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true" style="padding:1px;width:850px;height:500px;">
	<form action="" id="detail_form" style="display:block;float:left;width:280px;">
	<table>
			<tr>	
				<td>顺序：</td>	
				<td><input type="text" id="sequence" value="1"></td>
			</tr>
			<tr>	
				<td>名称：</td>
				<td><input type="text" id="appName"></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td><select id="isEffective"><option value=1>有效</option><option value=0>无效</option></select></td>
			</tr>
			<tr>	
				<td>图标：</td>	
				<td><span id="appIcon_span"></span></td>
			</tr>
	</table>
	</form>
	<div style="float:left;width:550px;height:420px;">
	<div id="common_app_search" class="common_search">
	<input type="text" id="appName_search">
	<input type="button"  class="btn btn-primary" id="search_app" value="查询"/>
	</div>
	<table id="tableData"></table></div>
	<div class="clearBoth"></div>
    </div>
</div>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/app/app/searchapp_list.js"></script>
</body>
</html>