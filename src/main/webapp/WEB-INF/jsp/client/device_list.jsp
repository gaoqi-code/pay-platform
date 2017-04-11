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
<title>蜂巢TV内容管理云平台</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript"
	src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="js/common/jquery/jquery.ajaxupload.js"></script>
<script type="text/javascript" src="js/client/device_list.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center'" class="regionCenter">
		<input type="hidden" id="cvId">
		<div id="common_search" class="common_search">
			<input type="button" id="device_add" class="btn btn-success"
				value="添加设备"> <select id="cpList_search"
				style="width: 130px;"></select> <select id="cpChannelList_search"
				style="width: 120px;"></select> <select id="deviceState_search"
				style="width: 120px;"><option value="1" selected="selected">已激活</option>
				<option value="0">未激活</option></select>
			<button id="search_button" class="btn btn-primary">查询</button>
			<button id="upload_button" class="btn btn-primary"
				style="display: none;">批量导入设备</button>
			<input type="button" id="batch_export" class="btn btn-success"
				value="批量导出">
		</div>
		<table id="tableDevice"></table>
	</div>
	<div id="dialog_dievice"
		data-options="closed:true,modal:true,title:'设备信息',iconCls:'icon-save'"
		style="width: 550px; height: 350px;">
		<form id="deviceForm">
			<input type="hidden" id="id" />
			<table>
				<tr>
					<td class="tableTdRight">设备ID：</td>
					<td class="tableTdLeft"><input type="text" class="required"
						name="deviceId" id="deviceId" /></td>
					<td class="tableTdRight">SN：</td>
					<td class="tableTdLeft"><input type="text" class="required"
						name="deviceId" id="deviceSn" /></td>
				</tr>
				<tr>
					<td class="tableTdRight">MAC：</td>
					<td class="tableTdLeft"><input type="text" class="required"
						name="deviceMac" id="deviceMac" /></td>
					<td class="tableTdRight">版本：</td>
					<td class="tableTdLeft"><input type="text" class="required"
						name="deviceVersion" id="deviceVersion" /></td>
				</tr>
				<tr>
					<td class="tableTdRight">生产商：</td>
					<td class="tableTdLeft"><select id="cpList"></select></td>
					<td class="tableTdRight">渠道：</td>
					<td class="tableTdLeft"><select id="cpChannelList"></select></td>
				</tr>
				<tr>
					<td class="tableTdRight">状态：</td>
					<td class="tableTdLeft"><select id="deviceState">
							<option value="1">已激活</option>
							<option value="0">未激活</option>
					</select></td>
				</tr>
			</table>
		</form>
	</div>
	<div id="dievice_export" data-options="closed:true,modal:true,title:'导出设备信息',iconCls:'icon-save'"
			style="width: 600px; height: 400px;">
		<form action="device/exportDevice.json" id="exportDevice" method="post">
			<table>
				<tr>
					<td class="tableTdRight">未激活设备数量：</td>
					<td class="tableTdLeft"><input type="text" readonly
						id="available" /></td>
				</tr>
				<tr>
					<td class="tableTdRight">数量：</td>
					<td class="tableTdLeft"><input type="text"
						class="easyui-numberbox required" id="amount" name="amount" /></td>
				</tr>
				<td class="tableTdRight">生产商：</td>
				<td class="tableTdLeft"><select name="cpId" id="export_cpList"></select>
					<input type="hidden" id="h_cpName" name="cpName"></td>
				<td class="tableTdRight">硬件版本号：</td>
				<td class="tableTdLeft"><select name="hardwareId"
					id="export_hardwareNo"></select> <input type="hidden"
					id="h_hardwareNo" name="hardwareNo"></td>
				<tr>
					<td class="tableTdRight">渠道：</td>
					<td class="tableTdLeft"><select name="cpChannelId"
						id="export_cpChannelList"></select> <input type="hidden"
						id="h_cpChannelName" name="cpChannelName"></td>
				</tr>
				<tr>
					<td class="tableTdRight">rom版本：</td>
					<td class="tableTdLeft"><input type="text" class="required"
						name="romVersion" id="export_romVersion" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>