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
<title>演职员管理</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/bluray/cast_list.js"></script>
<script type="text/javascript" src="js/bluray/castphotos_list.js"></script>
<body  class="easyui-layout">
<div id="centerDiv"  data-options="region:'center',title:'演职员'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加"/>
	<select id="search_select">
		<option value="0">全部</option>
		<option value="1">导演</option>
		<option value="2">制片</option>
		<option value="3">主演/演唱者/主持人/配音</option>
		<option value="4">演员/MV演员/嘉宾/配音 角色</option>
		<option value="5">作词</option>
		<option value="6">作曲</option>
		<option value="7">主持人</option>
		<option value="8">嘉宾</option>
		<option value="9">配音</option>
		<option value="10">名星</option>
		<option value="11">出品人</option>
		<option value="12">编剧</option>
	</select>
	<input type="text" id="search" class="text"/><input type="button" id="btn_search" value="查询" class="btn btn-primary" />
	</div>
	<table id="detail_table"></table>
</div>

<div id="detail_dialog" data-options="closed:true,modal:true,title:'演职员信息',iconCls:'icon-save'" style="padding:5px;width:500px;height:350px;">
	<form action="" id="detail_form">
			<input type="hidden" id="castId"/>
	<table>
		<tr>	
			<td class="tableTdRight">姓名：</td>	
			<td class="tableTdLeft"><input type="text" id="castName"></td>
			<td class="tableTdRight">类别：</td>
			<td class="tableTdLeft">
				<select id="castType">
					<option value="1">导演</option>
					<option value="2">制片</option>
					<option value="3">主演/演唱者/主持人/配音</option>
					<option value="4">演员/MV演员/嘉宾/配音 角色</option>
					<option value="5">作词</option>
					<option value="6">作曲</option>
					<option value="7">主持人</option>
					<option value="8">嘉宾</option>
					<option value="9">配音</option>
					<option value="10">名星</option>
					<option value="11">出品人</option>
					<option value="12">编剧</option>
				</select>
			</td>
		</tr>
		<tr>	
			<td class="tableTdRight">人物简介：</td>	
			<td class="tableTdLeft" colspan="3">
				<textarea style="width:350px;height: 90px;" id="castDesc" ></textarea>
			</td>
		</tr>
		<tr>	
			<td class="tableTdRight">头像：</td>	
			<td class="tableTdLeft" colspan="3">
				<img id="castPicture_url" alt="" style="width:100px;height: 100px;">
				<input type="hidden" id="castPicture" readonly class="uploadify_input"/>
				<span class="spanUpload"><input type="button" id="castPic_add_uploadify" value="浏览" class="btn btn-inverse">
				<input type="file" class="fileCommon"></span><span style="color:red">352x469</span>
			</td>
		</tr>
		<tr>	
		</tr>
	</table>
	</form>
</div>
	<!-- 右侧图片列表 -->
	<div id="photo_div" data-options="region:'east',split:true,collapsed:false,title:'图片信息'" style="width:250px;padding:1px;">
		<div id="common_search_photo" style="display: none;" class="common_search">
		<input type="button" id="btn_add_photo" class="btn btn-success" value="添加">
		</div>
		<table id="detail_table_photo"></table>
		<div id="detail_dialog_photo" data-options="closed:true,modal:true,title:'添加图片',iconCls:'icon-save'" style="padding:5px;width:500px;height:320px;">
		<form action="" id="detail_form_photo">
				<input type="hidden" id="photoId"/>
		<table>
				<tr>	
					<td class="tableTdRight">描述：</td>	
					<td class="tableTdLeft"><textarea style="width: 300px;height: 90px;" id="photoDesc"></textarea></td>
				</tr>
				<tr>	
					<td class="tableTdRight">存放地址：</td>	
					<td class="tableTdLeft" style="width: 300px;">
					<img alt="" id="photoUrl_url" style="width: 100px;height: 100px;">
					<input type="hidden" id="photoUrl" readonly class="uploadify_input"/>
					<span class="spanUpload"><input type="button" id="filePath_add_uploadify" value="浏览" class="btn btn-inverse">
					<input type="file" class="fileCommon"></span>
					</td>
				</tr>
		</table>
		</form>
		</div>
	</div> 
</body>
</html>