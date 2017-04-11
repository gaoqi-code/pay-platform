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
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/client/tv_list.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'电视台'" class="regionCenter">
	<div id="common_search" class="common_search">
		<input type="button" id="btn_add" class="btn btn-success" value="添加">
		<input type="text" id="search_tvname" class="text">
		<input type="button" id="btn_tv_search" class="btn btn-primary" value="查询">
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'电视台'" style="padding:5px;width:600px;height:400px;">
	<form action="" id="detail_form">
			<input type="hidden" id="id"/>
	<table>
			<tr>	
				<td class="tableTdRight">顺序：</td>	
				<td class="tableTdLeft" style="width:180px;"><input type="text" id="sequence"></td>
				<td class="tableTdRight">电视台所属分类：</td>	
				<td class="tableTdLeft"><select id="mediatype">
					<option value="1">中央电视台</option>
					<option value="2">地方卫视</option>
					<option value="3">城市电视台</option>
				</select></td>
			</tr>
			<tr>
				<td class="tableTdRight">电视台ID：</td>	
				<td class="tableTdLeft"><input type="text" id="tvid"></td>	
				<td class="tableTdRight">电视台名称：</td>	
				<td class="tableTdLeft"><input type="text" id="tvname"></td>
			</tr>
			<tr>	
				<td class="tableTdRight">地域限制：</td>	
				<td class="tableTdLeft"><select id="areaLimit">
					<option value="1">全部地区</option>
					<option value="2">仅大陆</option>
				</select></td>
				<!-- 
				<td class="tableTdRight">节目单接口地址：</td>	
				<td class="tableTdLeft"><input type="text" id="epgAddress"></td>
				 -->
				<td class="tableTdRight">直播地址：</td>	
				<td class="tableTdLeft"><input type="text" id="liveurl"></td>
			</tr>
			<tr>	
				<td class="tableTdRight">回看状态：</td>	
				<td class="tableTdLeft"><select id="viewback"><option value="0">禁止回看</option><option value="1">允许回看</option></select></td>
				<td class="tableTdRight">状态：</td>	
				<td><select id="isEffective"><option value="0">待发布</option><option value="1">发布</option></select></td>
			</tr>
			<tr>	
				<td class="tableTdRight">台标：</td>	
				<td class="tableTdLeft" colspan="3" style="height: 80px;">
				<img alt="" id="tvlogo_url" style="width: 80px;height: 80px;"/>
				<input type="hidden" id="tvlogo" readonly class="uploadify_input"/>
				<span class="spanUpload"><input type="button" id="tvlogo_add" value="浏览" class="btn btn-inverse">
				<input type="file" class="fileCommon"></span><!-- <span style="color:red">561x347</span> -->
			</tr>
	</table>
	</form>
    </div>
</div>
</body>
</html>