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
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'渠道信息'" class="regionCenter">
	<input type="hidden" id="cpId">
	<div id="common_channel_search" class="common_search">
		<input type="button" id="cpChannel_add" class="btn btn-success" value="添加">
		<input type="text" id="cpChannelName_search" placeholder="请输入名称"> <button class="btn btn-primary" id="cpChannelSelectButton">查询</button>
	</div>
	<table id="tableCpChannel"></table>
</div>
<div id="dialog" data-options="closed:true,modal:true,title:'渠道信息'" style="padding:5px;width:500px;height:300px;">  
	<input type="hidden" id="cpChannelId">
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" id="cpChannelName" /></td>
</tr>
<tr>
<td class="tableTdRight">状态：</td>
<td class="tableTdLeft"><select type="text" id="cpChannelState">
		<option value="0">无效</option>
		<option value="1">有效</option>
	</select></td>
</tr>
<tr>
<td class="tableTdRight">是否验证MAC：</td>
<td class="tableTdLeft"><select id="isCheckMac"><option value="0">不验证</option><option value="1">验证</option></select></td>
</tr>
<tr>
<td class="tableTdRight">LOGO：</td>
<td class="tableTdLeft" colspan="3" style="height: 80px;">
	<img alt="" id="cpChannelLogo_url" style="width: 80px;height: 80px;"/>
	<input type="hidden" id="cpChannelLogo" readonly class="uploadify_input"/>
	<span class="spanUpload"><input type="button" id="cpChannelLogo_add" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><!-- <span style="color:red">561x347</span> -->
</td>
</tr>
</table>
</div>
<!-- 关联TV页面 -->
<div id="dialog_tv" data-options="closed:true,modal:true,title:'关联电视台信息'" style="padding:5px;width:800px;height:520px;">
	<div style="padding:1px;height:230px;">
		<table id="tv_add_list"></table>
	</div>
	<div id="common_tv_search">
		<input type="text" id="search_tvname" class="text">
		<input type="button" id="btn_tv_search" class="btn btn-primary" value="查询">
	</div>
	<div style="padding:1px;height:240px;">
		<table id="tv_list"></table>
	</div>
</div>
<script type="text/javascript" src="js/client/cpChannel_list.js"></script>
</body>
</html>