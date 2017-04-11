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
</head>
<body  class="easyui-layout">
<div data-options="region:'center',title:'生产商信息'" class="regionCenter">
	<div id="common_search" class="common_search">
		<input type="button" id="cp_add" class="btn btn-success" value="添加">
<input type="text" id="cpName_search" placeholder="请输入名称"> <button class="btn btn-primary" id="cpSelectButton">查询</button>
	</div>
	<table id="tableCp"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'生产商信息'" style="padding:5px;width:500px;height:300px;">
	<form action="" id="detail_form">
			<input type="hidden" id="cpId"/>
	<table>
			<tr>	
				<td class="tableTdRight">生产商名称：</td>	
				<td class="tableTdLeft" style="width:180px;"><input type="text" id="cpName"></td>
			</tr>
			<tr>
				<td class="tableTdRight">状态：</td>	
				<td class="tableTdLeft"><select id="cpState">
					<option value="1">有效</option>
					<option value="0">无效</option>
				</select></td>
			</tr>
	</table>
	</form>
    </div>
</div>
<script type="text/javascript" src="js/client/cp_list.js"></script>
</body>
</html>