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
<!-- 页面相关JS -->
<script type="text/javascript" src="js/bluray/hdsubjectcontent_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'hdsubjectcontent'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'用户信息',iconCls:'icon-save'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form">
			<input type="hidden" id="contentId"/>
			<input type="hidden" id="contentType"/>
	<table>
			<tr>	
				<td>seq：</td>	
				<td><input type="text" id="seq"></td>
			</tr>
			<tr>	
				<td>subjectId：</td>	
				<td><input type="text" id="subjectId"></td>
			</tr>
			<tr>	
				<td>contentId：</td>	
				<td><input type="text" id="contentId"></td>
			</tr>
			<tr>	
				<td>contentName：</td>	
				<td><input type="text" id="contentName"></td>
			</tr>
			<tr>	
				<td>contentType：</td>	
				<td><input type="text" id="contentType"></td>
			</tr>
			<tr>	
				<td>contentDesc：</td>	
				<td><input type="text" id="contentDesc"></td>
			</tr>
			<tr>	
				<td>createdTime：</td>	
				<td><input type="text" id="createdTime"></td>
			</tr>
			<tr>	
				<td>updatedTime：</td>	
				<td><input type="text" id="updatedTime"></td>
			</tr>
			<tr>	
				<td>isEffective：</td>	
				<td><input type="text" id="isEffective"></td>
			</tr>
	</table>
	</form>
    </div>
    </div>
</body>
</html>