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
<style type="text/css">
.rateList{display:inline-block;float:left;width:80px;}
</style>
</head>
<body class="easyui-layout">
<div id="dialog_videoUrlEdit" data-options="closed:true,modal:true" style="padding:2px;width:600px;height:300px;">  
<input type="hidden" id="videoId_url">
<input type="hidden" id="videoType_url">
<form id="videoUrlFrom">
<table>
<tr>
<td class="tableTdRight" style="width:70px;">m3u8地址：</td><td class="tableTdLeft"><input type="text" id="m3u8" /></td>
</tr>
<tr>
<td class="tableTdRight">mp4地址：</td><td class="tableTdLeft"><input type="text" id="mp4"></td>
</tr>
<tr>
<td class="tableTdRight">开始时间：</td><td class="tableTdLeft"><input type="text" id="startTime"></td>
</tr>
<tr>
<td class="tableTdRight">结束时间：</td><td class="tableTdLeft"><input type="text" id="endTime"></td>
</tr>
<tr>
<td class="tableTdRight">码流：</td><td class="tableTdLeft"><div id="vid_content"></div></td>
</tr>
</table>
</form>
</div>
</body>
</html>