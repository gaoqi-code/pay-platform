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
<script type="text/javascript" src="js/bluray/searchvideoset_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'热门搜索'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	</div>
	<table id="detail_table"></table>
</div>

	<div id="detail_dialog" data-options="closed:true,modal:true,title:'详细信息',iconCls:'icon-save'" style="padding:5px;width:500px;height:500px;">
		<div id="select_tool" class="common_search">
			<select id="videosetType">
			</select>
			<input type="text" id="txt_search" class="txt">
			<input type="button" id="btn_search" class="btn btn-primary" value="查询">
		</div>
		<table id="select_table" style="height: 300px;"></table>
    </div>
	<div id="detail_edit_dialog" data-options="closed:true,modal:true,title:'修改信息',iconCls:'icon-save'" style="padding:5px;width:300px;height:220px;">
		<input type="hidden" id="edit_videosetId"/>
		<input type="hidden" id="edit_videosetType"/>
		<form>
		<table>
				<tr>	
					<td>顺序：</td>	
					<td><input type="text" id="edit_sequence" class="easyui-numberbox"></td>
				</tr>
				<tr>	
					<td>名称：</td>	
					<td><input type="text" id="edit_name" readonly></td>
				</tr>
				<tr>	
					<td>状态</td>	
					<td><select id="edit_isEffective">
							<option value="1">有效</option>
							<option value="0">无效</option>
						</select>
					</td>
				</tr>
		</table>
		</form>
    </div>
</body>
</html>