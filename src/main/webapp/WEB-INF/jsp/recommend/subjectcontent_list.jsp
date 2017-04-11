<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/recommend/subjectcontent_list.js"></script>
<body class="easyui-layout">
<input type="hidden" id="ct_subject_id">
		<table id="selected_table" style="height: 235px;"></table>
		<span style="border: 2px"></span>
	<div id="select_tool" class="common_search">
		<select id="contentType">
		</select>
		<input type="text" id="txt_search" class="txt">
		<input type="button" id="select_search" class="btn btn-success" value="搜索">
	</div>
	<table id="select_table" style="height: 248px;"></table>
	<div id="selected_dialog" data-options="closed:true,modal:true,title:'详细内容'" style="width:500px;height:350px;">
		<input type="hidden" id="selected_subjectId" >
		<input type="hidden" id="selected_contentId" >
		<input type="hidden" id="selected_contentType" >
		<table>
			<tr>	
				<td>顺序：</td>	
				<td><input type="text" id="selected_seq" class="easyui-numberbox" data-options="min:1"></td>
			</tr>
			<tr>
				<td>名称：</td>	
				<td><input type="text" id="selected_contentName" readonly></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td><select id="selected_isEffective"><option value="1">有效</option><option value="0">无效</option></select></td>
			</tr>
<!-- <tr> -->
<!-- <td>图片：</td> -->
<!-- <td class="tableTdLeft"> -->
<!-- 	<span id="showContentImgDiv" style="display: inline-block;vertical-align: middle;"></span> -->
<!-- 	<input type="hidden" id="contentImg"/> -->
<!-- 	<span><input type="button" id="uploadify_contentImg" value="浏览" class="btn btn-inverse"> -->
<!-- 	<input type="file" class="fileCommon"></span><span id="contentImgUpload" style="display:none;"><img src="images/uploading.gif"></span> -->
<!-- </td> -->
<!-- </tr> -->
		</table>
	</div>
	<div id="img_dialog" data-options="closed:true,title:''" style="width: 300px;height: 200px;">
		<img id="content_img" alt="缩略图" width="100%" height="100%">
	</div>
</body>
</html>