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
<title></title>
<script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>

<!-- table js -->
<script type="text/javascript" src="js/common/table/page.js"></script>
<script type="text/javascript" src="js/common/table/common_list_table_header.js"></script>
<script type="text/javascript" src="js/app/operate_history/operate_history_list.js"></script>
<!-- ajax cache setting -->
<script type="text/javascript" src="<%=basePath%>js/common/ajaxcache.js"></script>
<!-- dialog -->
<link rel="stylesheet" type="text/css" href="css/common/dialog/model_window.css" />
<script type="text/javascript" src="js/common/dialog/model_window.js"></script>
<script type="text/javascript" src="js/common/dialog/easy_model_window.js"></script>

<!-- 文件上传 -->
<link rel="stylesheet" type="text/css" href="js/common/uploadify/uploadify.css" />
<script type="text/javascript" src="js/common/uploadify/swfobject.js"></script>
<script type="text/javascript" src="js/common/uploadify/jquery.uploadify.v2.1.4.js"></script>
</head>
<body>
<div class="search">
<input type="text" id="account_s" placeholder=" 请输入账户名称" />
<button id="search_button" onclick="operateHistorySearch()">查询</button>
<button id="back_button" class="btn btn-primary buttonmargin">返回</button>
</div>

<div class="clearboth x-table-header">
	<table id="app_list_header" class="x-table"></table>
</div>
<div class="tableDiv">
	<table id="app_list" class="x-table"></table>
</div>
	<div id="app_page" class="pagination"></div>

<!-- other dialog -->
<div id="dialog_div"></div>
<div id="hyalineDiv"></div>
<div id="modelDiv" class="modelDiv">
<div id="modelDivTitle" class="modelDivTitle"></div>
<div class="modelDivContent" id="modleDivContent">
<input type="hidden" id="appId" value="${param.appId}">
<input type="hidden" id="operateType" value="${param.operateType}">
<input type="hidden" id="prevPage" value="${param.prevPage}">
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
<td class="tableTdRight">分类：</td>
<td class="tableTdLeft"><select id="category"><option value="-1">无类型</option></select> <select id="tag"><option value="-1">无标签</option></select></td>
</tr>
<tr>
<td class="tableTdRight">分类2：</td>
<td class="tableTdLeft"><select id="category2"><option value="-1">无类型</option></select> <select id="tag2"><option value="-1">无标签</option></select></td>
</tr>
<tr>
<td class="tableTdRight">级别：</td><td class="tableTdLeft"><select id="appType"><option value="0">系统</option><option value="1">一般</option></select></td>
</tr>
<tr>
<td class="tableTdRight">状态：</td><td class="tableTdLeft"><select id="state"><option value="1">有效</option><option value="0">无效</option></select></td>
</tr>
<tr>
<td class="tableTdRight">图标：</td><td class="tableTdLeft">
<input type="hidden" id="appIcon" />
<img src="" id="show_appIcon">
<input type="file" name="file" id="uploadify" />
</td>
</tr>
</table>
</div>
<div class="modelDivBottom"><button class="btn btn-primary" onclick="submit_model_window()">确认</button>  <button class="btn btn-info" onclick="closeModelDiv()">取消</button></div>
</div>
</body>
<script type="text/javascript" src="js/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="js/jquery/jquery.metadata.js"></script>
</html>
<!-- validate -->

