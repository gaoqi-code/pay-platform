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
<script type="text/javascript" src="js/sys/role_list.js"></script>
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'角色管理'" class="regionCenter">
<div id="common_search" class="common_search">
	<input type="button" id="role_add" class="btn btn-success" value="添加角色">
	</div>
	<table id="role_table"></table>
	<div id="role_detail_dialog" data-options="closed:true,modal:true,title:'角色信息',iconCls:'icon-save'" style="padding:5px;width:500px;height:500px;">
		<form action="" id="role_detail_form">
    	<input type="hidden" id="roleId">
    	<table>
    	<tr>
    	<td>角色名称：</td><td><input type="text" id="roleName"></td>
    	</tr>
    	<tr>
    	<td>是否发布：</td>
    	<td><select id="isEffective">
    		<option value="0">无效</option>
    		<option value="1">有效</option>
    		</select></td>
    	</tr>
    	<tr>
    		<td colspan="2">
	    		<div id="auth_tree">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
    		</td>
    	</tr>
    	</table>
    	<!-- test start -->
	<div class="right" style="display:none;">
				<ul class="list">
				<li class="highlight_red"></li>
				<li><p><br/><input type="checkbox" id="py" class="checkbox first" checked />
						<input type="checkbox" id="sy" class="checkbox first" checked /><input type="checkbox" id="pn" class="checkbox first" checked /><span>关联父</span>
						<input type="checkbox" id="sn" class="checkbox first" checked />
						</p>
				</li>
				</ul>

	</div>
<!-- end -->
		</form>
    </div>
    </div>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.excheck-3.5.min.js"></script>
</body>
</html>