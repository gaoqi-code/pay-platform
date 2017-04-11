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
<title>开发商列表</title>
<jsp:include page="../../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'开发商列表'" class="regionCenter">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_developer" value="添加"/>
		<input type="text" id="developerName_search">
		<select id="state_search"><option value=-1>全部</option><option value=1>有效</option><option value=0>无效</option></select>
		<input type="button" class="btn btn-primary" id="search_developer" value="查询"/>
	</div>
</div>
<div id="dialog" data-options="closed:true,modal:true" style="padding:5px;width:400px;height:190px;">  
	<form id="developerForm"><input type="hidden" id="id">
	<table>
	<tr>
	<td width="70px;">名称：</td><td class="tableTdLeft"><input type="text" id="developerName" class="easyui-validatebox" data-options="required:true" style="width:200px;" /></td>
	</tr>
	<tr>
	<td>状态：</td><td class="tableTdLeft">
	<select id="state" style="width:212px;"><option value="1">有效</option><option value="0">无效</option></select>
	</td>
	</tr>
	</table></form>
</div>
<script type="text/javascript" src="js/app/deveploer/developer_list.js"></script>
</body>
</html>