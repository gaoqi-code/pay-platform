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
<style type="text/css">
.inputCss{
line-height: normal;
color: #555;
vertical-align: middle;
-webkit-border-radius: 4px;
padding: 6px 5px;
-moz-border-radius: 4px;
border-radius: 4px;
font-size: 14px;
background-color: #fff;
border: 1px solid #ccc}</style>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/sys/user_list.js"></script>
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'用户管理'" class="regionCenter">
<div id="common_search" class="common_search">
	<input type="button" id="user_add" class="btn btn-success" value="添加用户">
	</div>
	<table id="user_table"></table>
	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'用户信息'" style="padding:5px;width:500px;height:300px;">
		<form action="sysUser/getList.json" id="user_detail_form">
    	<input type="hidden" id="userId">
    	<table>
    	<tr>
    	<td>名称：</td><td><input type="text" maxlength="10" id="userName" class="inputCss"></td>
    	</tr>
    	<tr>
    	<td>密码：</td><td><input type="password" id="userPwd" class="inputCss"></td>
    	</tr>
    	<tr>
    	<td>用户邮箱：</td><td><input type="text" id="userMail"  class="inputCss"><input type="hidden" id="oldUserMail"></td>
    	</tr>
    	<tr>
    	<td>角色：</td><td><select id="roleId" style="width:194px;"><option value="1">管理员</option></select></td>
    	</tr>
    	<tr>
    	<td>是否发布：</td>
    	<td><select id="isEffective" style="width:194px;">
    		<option value="1">有效</option>
    		<option value="0">无效</option>
    		</select></td>
    	</tr>
    	</table>
		</form>
    </div></div>
</body>
</html>