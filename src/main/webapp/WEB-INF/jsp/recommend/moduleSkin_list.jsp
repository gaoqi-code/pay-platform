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
<body  class="easyui-layout">
<div data-options="region:'center',title:'推荐背景图列表'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	</div>
	<table id="detail_table"></table>
</div>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'推荐背景图管理'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form">
			<input type="hidden" id="id"/>
			<input type="hidden" id="uploadFlag">
	<table>
			<tr>	
				<td>类型：</td>	
				<td><select id="recomType"></select></td>
			</tr>
			<tr>	
				<td>首屏背景：</td>	
				<td>
	<img id="imgUrlOutside_show" alt="" src="" style="height:80px">
	<input type="hidden" id="imgUrlOutside"/>
	<span><input type="button" id="uploadify_imgUrlOutside" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgUrlOutside_loading" style="display:none;"><img src="images/uploading.gif"></span>
				</td>
			</tr>
			<tr>	
				<td>内容背景：</td>	
				<td>
	<img id="imgUrlInside_show" alt="" src="" style="height:80px">
	<input type="hidden" id="imgUrlInside"/>
	<span><input type="button" id="uploadify_imgUrlInside" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgUrlInside_loading" style="display:none;"><img src="images/uploading.gif"></span>
				</td>
			</tr>
	</table>
	</form>
    </div>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/recommend/moduleSkin_list.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
</body>
</html>