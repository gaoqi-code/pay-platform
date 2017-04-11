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
<title>应用管理</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout">
<input type="hidden" id="uploadFlag">
<div data-options="region:'center',title:'应用管理'" class="regionCenter">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_app" value="添加"/>
		<input type="text" id="appName_search">
		<select id="state_search" style="width:90px;"><option value=-1>全部</option><option value=1>有效</option><option value=0>无效</option></select>
		<select id="appType_search" style="width:90px;"><option value=-1>全部</option><option value=1>一般应用</option><option value=0>系统应用</option></select>
		<input type="button"  class="btn btn-primary" id="search_app" value="查询"/>
	</div>
</div>
<div id="dialog" data-options="closed:true,modal:true,iconCls:'icon-save'" style="padding:5px;width:620px;height:520px;">  
	<input type="hidden" id="appId">
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" id="appName" /></td>
</tr>
<tr>
<td class="tableTdRight">标识：</td><td class="tableTdLeft"><input type="text" id="bundleId" /></td>
</tr>
<tr>
<td class="tableTdRight">开发商：</td>
<td class="tableTdLeft"><select id="developerId"><option value="1">中讯担保</option></select></td>
</tr>
<tr>
<td class="tableTdRight">顺序：</td>
<td class="tableTdLeft"><input type="text" id="seq" /></td>
</tr>
<tr>
<td class="tableTdRight">外接设备：</td>
<td class="tableTdLeft"><input type="text" id="usbDevice" style="width:430px;" /></td>
</tr>
<tr>
<td class="tableTdRight">描述：</td>
<td class="tableTdLeft"><textarea id="appDescribe" style="width:430px;"></textarea></td>
</tr>
<tr>
<td class="tableTdRight">分类：</td>
<td class="tableTdLeft"><select id="category"><option value="-1">无类型</option></select> <select id="tag"><option value="-1">无标签</option></select></td>
</tr>
<!-- <tr> -->
<!-- <td class="tableTdRight">分类2：</td> -->
<!-- <td class="tableTdLeft"><select id="category2"><option value="-1">无类型</option></select> <select id="tag2"><option value="-1">无标签</option></select></td> -->
<!-- </tr> -->
<tr>
<td class="tableTdRight">级别：</td><td class="tableTdLeft"><select id="appType"><option value="0">系统</option><option value="1">一般</option></select></td>
</tr>
<tr>
<td class="tableTdRight">状态：</td><td class="tableTdLeft"><select id="state"><option value="1">有效</option><option value="0">无效</option></select></td>
</tr>
<tr>
<td class="tableTdRight">是否收费：</td><td class="tableTdLeft"><select id="isPay"><option value="1">收费</option><option value="0">免费</option></select></td>
</tr>
<tr>
<td class="tableTdRight">图标：</td><td class="tableTdLeft">
<input type="hidden" id="appIcon" />
<img src="" id="show_appIcon" style="width:70px;">
<input type="button" id="uploadify" value="浏览" class="btn btn-inverse">
<input type="file" class="fileCommon"><span id="imgVideoUpload" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
</table>
</div>
<div id="dialog_appVersionList" data-options="closed:true,modal:true" style="padding:5px;width:1000px;height:520px;">  
	<jsp:include page="../../jsp/app/version/app_version_list.jsp"></jsp:include>
</div>
<div id="dialog_history_list" data-options="closed:true,modal:true" style="padding:5px;width:1000px;height:420px;">  
	<table id="tableHistoryList"></table>
</div>
<div id="dialog_appVersionImgList" data-options="closed:true,modal:true" style="padding:5px;width:1000px;height:520px;">  
	<jsp:include page="../../jsp/app/version/appversionimg_list.jsp"></jsp:include>
</div>
<script type="text/javascript" src="js/app/app_list.js"></script>
<script type="text/javascript" src="js/app/version/app_version_list.js"></script>
<script type="text/javascript" src="js/app/version/appversionimg_list.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
</body>
</html>