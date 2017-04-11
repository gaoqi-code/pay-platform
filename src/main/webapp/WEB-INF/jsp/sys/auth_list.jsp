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
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/sys/auth_list.js"></script>
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'权限管理'" class="regionCenter">
<div id="common_search" class="common_search">
	<input type="button" id="auth_add" class="btn btn-success" value="添加权限">
	<input type="text" id="authName_search">
	<input type="button" id="auth_search" class="btn btn-success" value="查询">
	</div>
	<table id="auth_table"></table>
	<div id="auth_detail_dialog" data-options="closed:true,modal:true,title:'权限设置',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
		<form action="" id="auth_detail_form">
    	<input type="hidden" id="authId">
    	<table>
    	<tr>
    	<td>权限名称：</td><td><input type="text" id="authName"></td>
    	</tr>
    	<tr>
    	<td>父级编号：</td><td><select id="pid"></select></td>
    	</tr>
    	<tr>
    	<td>展示顺序：</td><td><input type="text" value="1" id="authSeq"></td>
    	</tr>
    	<tr>
    	<td>连接路径：</td><td><input type="text" id="authAction"></td>
    	</tr>
    	<tr>
    	<td>是否发布：</td>
    	<td><select id="isEffective">
    		<option value="0">无效</option>
    		<option value="1">有效</option>
    		</select></td>
    	</tr>
    	<tr>
    		<td>
	    		<div id="auth_tree">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
    		</td>
    	</tr>
    	</table>
		</form>
    </div>
</div>
</body>
</html>