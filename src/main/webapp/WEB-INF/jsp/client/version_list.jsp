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
.list_content_li_div{float:left;height:70px;margin-bottom:2px;border:1px solid red;}
.list_content_cp_div{float:left;height:100%; width:80px;margin-bottom:2px;}
.list_content_hardware_div{height:30px;width:540px; border-bottom:1px solid blue;}
.list_content_channel_div{height:30px; border-bottom:1px solid red;}
#cpchannel_list_div span{display:inline-block;}
#cpchannel_list_div span input{vertical-align: middle;margin-bottom:5px;}
#cp_list_div span{display:inline-block;}
#cp_list_div span input{vertical-align: middle;margin-bottom:5px;}
</style>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'版本版本'" class="regionCenter">
	<input type="hidden" id="cvId">
	<div id="common_search" class="common_search">
		<input type="button" id="version_add" class="btn btn-success" value="添加版本">
		<input type="text" id="version_search" placeholder="请输入版本号" />
		<select id="isEffective_search" style="width:120px;"><option value="1" selected="selected">已启用</option><option value="0">未启用</option></select>
		<button id="search_button" class="btn btn-primary">查询</button>
	</div>
	<table id="tableVersion"></table>
</div>
<div id="dialog_versionEdit" data-options="closed:true,modal:true,title:'版本信息'" style="padding:5px;width:520px;height:310px;">
<form id="testUserForm">
<input type="hidden" id="cvId"/>
<input type="hidden" id="uploadFlag"/>
<table>
<tr>
<td  style="width:90px;" class="tableTdLeft">版本号：</td><td class="tableTdLeft" style="width:320px;"><input type="text" class="required" name="version" id="version" /></td>
</tr>
<tr>
<td class="tableTdLeft">特性描述：</td><td class="tableTdLeft">
<input type="text" class="required" name="features" id="features" /></td>
</tr>
<tr>
<td class="tableTdLeft">升级类型：</td><td class="tableTdLeft" style="width:170px;">
<select id="type">
<option value="0">不升级</option>
<option value="1">可选升级</option>
<option value="2">强制升级</option>
</select>
</td>
</tr>
<tr>
<td class="tableTdLeft">状态：</td><td class="tableTdLeft">
<select id="isEffective">
<option value="1">有效</option>
<option value="0">无效</option>
</select></td>
</tr>
<tr>
<td class="tableTdLeft">升级地址：</td><td colspan="3" class="tableTdLeft">
	<input type="text" id="url" disabled="disabled" />
	<span><input type="button" id="uploadifyVersion" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgVideoUpload" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
</table>
</form>
</div>

<div id="dialog_versionUpdateShow" data-options="closed:true,modal:true,title:'详情'" style="padding:1px;width:800px;height:520px;">
	<div style="height:230px;"><table id="tableVersionUpdateSelected"></table></div>
	<div style="height:215px;">
	<div id="tableVersionUpdate_search_div">
		<select id="cp_list_select"></select><select id="hardware_list_select"></select>
	</div>
	<table id="tableVersionUpdate"></table>
	</div>
</div>

<script type="text/javascript" src="js/client/version_list.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
</body>
</html>