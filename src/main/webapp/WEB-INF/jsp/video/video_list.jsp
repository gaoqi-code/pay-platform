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
</head>
<body class="easyui-layout">
<div id="dialog_videoEdit" data-options="closed:true,modal:true,title:'剧集列表'" style="padding:5px;width:550px;height:420px;">  
<form id="videoForm">
<input type="hidden" id="videoId">
<input type="hidden" id="cpVideosetId">
<input type="hidden" id="videoIdSource" disabled="disabled"/>
<input type="hidden" id="videosetTotal_huan"/>
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" class="required" id="videoName" name="videoName" /></td><td class="tableTdRight">顺序：</td><td class="tableTdLeft"><input type="text" class="required" id="sequence" name="sequence" /></td>
</tr>
<tr>
<td class="tableTdRight">年份：</td><td class="tableTdLeft"><input type="text" id="year" name="year" class="required" onfocus="WdatePicker({dateFmt:'yyyy'})"/></td><td class="tableTdRight">关键字：</td><td class="tableTdLeft"><input id="keyWord_video" type="text"></td>
</tr>
<tr>
<td class="tableTdRight">期（综艺）</td><td class="tableTdLeft"><input type="text" class="required" id="phase" name="phase" /></td><td class="tableTdRight">看点：</td><td class="tableTdLeft"><input type="text" id="videoFocus" name="videoFocus" /></td>
</tr>
<tr>
<td class="tableTdRight">季（综艺）</td><td class="tableTdLeft"><input type="text" class="required" id="season" name="season" /></td><td class="tableTdRight">时长：</td><td class="tableTdLeft"><input type="text" class="required" id="playLength" value="60" name="playLength" /></td>
</tr>
<tr>
<td class="tableTdRight">简介：</td><td colspan="3" class="tableTdLeft"><textarea rows="4" style="width:390px;" id="videoBrief" name="videoBrief"></textarea></td>
</tr>
<tr>
<td class="tableTdRight">缩略图：</td>
<td colspan="3" class="tableTdLeft">
	<img id="showVideoImgUrl" alt="" src="" style="height:80px">
	<input type="hidden" id="videoImg"/>
	<span><input type="button" id="uploadify_video" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgVideoUpload_" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
</table>
</form>
</div>
</body>
</html>