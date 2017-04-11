<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<base href="<%=basePath%>">
<!-- 页面相关JS -->
<script type="text/javascript">
	var castId=${castId};
	var castType=${castType};
</script>
<script type="text/javascript" src="js/bluray/castphotos_list.js"></script>
<body  class="easyui-layout">
	<div id="common_search_photo" class="common_search">
	<input type="button" id="btn_add_photo" class="btn btn-success" value="添加">
	<input type="button" id="btn_add_photo" class="btn btn-success" value="返回">
	</div>
	<table id="detail_table_photo"></table>
	<div id="detail_dialog_photo" data-options="closed:false,modal:true,title:' ',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form_photo">
			<input type="hidden" id="photoId"/>
	<table>
			<tr>	
				<td>存放地址：</td>	
				<td><input type="text" id="photoUrl"></td>
			</tr>
			<tr>	
				<td>描述：</td>	
				<td><input type="text" id="photoDesc"></td>
			</tr>
	</table>
	</form>
</body>
</html>