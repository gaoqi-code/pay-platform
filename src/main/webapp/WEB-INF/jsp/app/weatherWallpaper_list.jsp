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
<title>天气背景图</title>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body>
<body class="easyui-layout">
<div id="dialog_wallpaper_list" data-options="closed:true,modal:true,title:'背景图片列表'" style="padding:5px;width:800px;height:520px;">
	<table id="wallpager_table"></table>
	<div id="wallpaper_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_wallpaper" value="添加"/>
	</div>
</div>
<div id="dialog_wallpaper" data-options="closed:true,modal:true,title:'背景图片'" style="padding:5px;width:460px;height:410px;">  
	<input type="hidden" id="wallpaperId">
	<input type="hidden" id="weatherIconId">
	<table>
	<tr>
	<td>白天背景图：</td><td class="tableTdLeft" style="height:50px;background-color: #E1F1FD;">
		<input type="hidden" value="" id="wallpaperUrl_day" />
		<img id="showDayWallpaperUrl" alt="" src="" width="42px" />
		<input type="button" id="uploadifyLoad_wallday" value="浏览" class="btn btn-inverse" style="margin-bottom:10px">
		<input type="file" class="fileCommon">
	
	</td>
	</tr>
	<tr>
	<td>晚上背景图：</td><td class="tableTdLeft" style="height:50px;background-color: #E1F1FD;">
		<input type="hidden" value="" id="wallpaperUrl_night" />
		<img id="showNightWallpaperUrl" alt="" src="" width="42px" />
		<input type="button" id="uploadifyLoad_wallnight" value="浏览" class="btn btn-inverse" style="margin-bottom:10px">
		<input type="file" class="fileCommon">
	</td>
	</tr>
	<tr>
		<td>状态：</td>
		<td><select id="wallpaperState"><option value="1">有效</option><option value="0">无效</option></select>
		</td>
	</tr>
	</table>
</div>
</body>
</html>
<!-- validate -->

