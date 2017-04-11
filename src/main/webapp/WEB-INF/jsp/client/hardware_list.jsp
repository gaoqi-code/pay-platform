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
<script type="text/javascript" src="js/client/hardware_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'硬件型号'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	生产商：<select id="search_cp"></select>
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'硬件型号',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form">
			<input type="hidden" id="id"/>
	<table>
			<tr>	
				<td>生产商：</td>	
				<td><select id="cpId"></select></td>
			</tr>
			<tr>	
				<td>硬件型号：</td>	
				<td><input type="text" id="hardwareNo"></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td><select id="isEffective"><option value="1">有效</option><option value="0">无效</option></select></td>
			</tr>
	</table>
	</form>
    </div>
</div>
</body>
</html>