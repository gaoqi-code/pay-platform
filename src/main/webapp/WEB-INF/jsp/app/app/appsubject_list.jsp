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
<title>应用/游戏专题管理</title>
<jsp:include page="../../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<body  class="easyui-layout">
<div data-options="region:'center',title:'应用/游戏专题'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	<select id="search_imgSize">
		<option id="-1">所有尺寸</option>
		<option id="320x180">320x180</option>
		<option id="260x360">260x360</option>
	</select>
	类别：<select id="search_category">
		<option value="">全部</option>
	</select>
	专题名：<input type="text" id="search_text" class="text">
	<input type="button" id="btn_search" class="btn btn-primary" value="查询">
	</div>
	<table id="detail_table"></table>
</div>
	<div id="detail_dialog" data-options="closed:true,modal:true,title:'专题信息'" style="width:470px;height:450px;">
	<form action="" id="detail_form">
			<input type="hidden" id="subjectId"/>
	<table>
			<tr>	
				<td class="tableTdRight">顺序：</td>	
				<td class="tableTdLeft"><input type="text" id="seq" class="easyui-numberbox"></td>
				<td class="tableTdRight">状态：</td>	
				<td class="tableTdLeft">
					<select id="isEffective">
						<option value="1">有效</option>
						<option value="0">无效</option>
					</select>
				</td>
			</tr>
			<tr>	
				<td class="tableTdRight">专题名：</td>	
				<td class="tableTdLeft"><input type="text" id="subjectName"></td>
				<td class="tableTdRight">尺寸：</td>	
				<td class="tableTdLeft"><select id="imgSize">
					<option id="320x180">320x180</option>
					<option id="260x360">260x360</option>
				</select></td>
			</tr>
			<tr>
				<td class="tableTdRight">类型：</td>	
				<td class="tableTdLeft"><select id="categoryId"></select></td>
			</tr>
			<tr>
				<td class="tableTdRight">描述：</td>	
				<td class="tableTdLeft" colspan="3"><textarea maxlength="200" style="width:340px;height: 70px;" id="subjectDesc"></textarea></td>
			</tr>
			<tr>	
				<td class="tableTdRight">缩略图：</td>	
				<td class="tableTdLeft" colspan="3"  style="height: 80px;">
					<img alt="" id="subjectPic_url" style="width: 80px;height: 80px;"/>
					<input type="hidden" id="subjectPic" readonly class="uploadify_input"/>
					<span class="spanUpload"><input type="button" id="filePath_add_uploadify_pic" value="浏览" class="btn btn-inverse">
					<input type="file" class="fileCommon"></span><span style="color:red">202x270</span>
				</td>
			</tr>
			<tr>	
				<td class="tableTdRight">背景图：</td>	
				<td class="tableTdLeft" colspan="3" style="height: 80px;">
					<img alt="" id="subjectBgImg_url" style="width: 80px;height: 80px;"/>
					<input type="hidden" id="subjectBgImg" readonly class="uploadify_input"/>
					<span class="spanUpload"><input type="button" id="filePath_add_uploadify_bg" value="浏览" class="btn btn-inverse">
					<input type="file" class="fileCommon"></span><span style="color:red">561x347</span>
				</td>
			</tr>
	</table>
	</form>
    </div>
	<%-- 添加专题内容--%>
	<div id="subject_dialog" data-options="closed:true,modal:true,title:'详细内容',iconCls:'icon-save'" style="width:850px;height:520px;">
		<jsp:include page="../../../jsp/app/app/appsubjectcontent_list.jsp"></jsp:include>
	</div>
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/app/app/appsubject_list.js"></script>
</body>
</html>