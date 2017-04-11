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
<title>应用类型管理</title>
<jsp:include page="../../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'应用类型管理'" class="regionCenter">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_category" value="添加"/>
		<input type="text" id="categoryName_search">
		<select id="state_search"><option value=-1>全部</option><option value=1>有效</option><option value=0>无效</option></select>
		<input type="button"  class="btn btn-primary" id="search_developer" value="查询"/>
	</div>
</div>
<div id="dialog" data-options="closed:true,modal:true,iconCls:'icon-save'" style="padding:5px;width:400px;height:230px;">  
<input type="hidden" id="categoryId">
<table>
<tr>
<td width="60px;">名称：</td><td class="tableTdLeft"><input type="text" id="categoryName" /></td>
</tr>
<tr>
<td>顺序：</td><td class="tableTdLeft"><input type="text" id="seq" /></td>
</tr>
<tr>
<td>状态：</td><td class="tableTdLeft"><select id="state"><option value="1">有效</option><option value="0">无效</option></select></td>
</tr>
</table>
</div>
<div id="dialog_tagList" data-options="closed:true,modal:true" style="padding:5px;width:600px;height:400px;">  
	<jsp:include page="../../../jsp/app/tag/tag_list.jsp"></jsp:include>
</div>
<script type="text/javascript" src="js/app/tag/category_list.js"></script>
<script type="text/javascript" src="js/app/tag/tag_list.js"></script>
</body>
</html>