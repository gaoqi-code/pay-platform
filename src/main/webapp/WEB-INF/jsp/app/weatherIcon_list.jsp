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
<title>天气图标</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'天气图标管理'" class="regionCenter">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_weather" value="添加"/>
	</div>
</div>
<div id="dialog" data-options="closed:true,modal:true,title:'天气信息'" style="padding:5px;width:460px;height:410px;">  
	<input type="hidden" id="id">
	<table>
	<tr>
	<td width="80px;">天气名称：</td><td class="tableTdLeft"><input type="text" id="name" /></td>
	</tr>
	<tr>
	<td>白天图标：</td><td class="tableTdLeft" style="height:50px;background-color: #E1F1FD;"><input type="hidden" value="" id="iconUrl_day" />
		<img id="showDayIconUrl" alt="" src="" width="42px" />
		<input type="button" id="uploadifyLoad_day" value="浏览" class="btn btn-inverse" style="margin-bottom:10px">
		<input type="file" class="fileCommon"><font color="red">120X128</font>
	
	</td>
	</tr>
	<tr>
	<td>晚上图标：</td><td class="tableTdLeft" style="height:50px;background-color: #E1F1FD;"><input type="hidden" value="" id="iconUrl_night" />
		<img id="showNightIconUrl" alt="" src="" width="42px" />
		<input type="button" id="uploadifyLoad_night" value="浏览" class="btn btn-inverse" style="margin-bottom:10px">
		<input type="file" class="fileCommon"><font color="red">120X128</font>
	</td>
	</tr>
	</table>
</div>
<jsp:include page="../../jsp/app/weatherWallpaper_list.jsp" />
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<script type="text/javascript" src="js/app/weatherIcon_list.js"></script>
<script type="text/javascript" src="js/app/weatherWallpaper_list.js"></script>
</body>
</html>