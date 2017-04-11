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
<body  class="easyui-layout">
<div data-options="region:'center',title:'计费包管理'" class="regionCenter">
	<div id="common_search" class="common_search">
	<input type="button" id="btn_add" class="btn btn-success" value="添加">
	计费包名称：<input type="text" id="name_search">
	<button class="btn btn-primary" onclick="searchBilingPkg()">查询</button>
	</div>
	<table id="detail_table"></table>
	<div id="detail_dialog" data-options="closed:true,modal:true" style="padding:5px;width:500px;height:520px;">
	<form action="" name="pricepkgForm">
			<input type="hidden" name="pricePkgId"/>
	<table>
			<tr>	
				<td>顺序：</td>	
				<td><input type="text" name="seq"></td>
			</tr>
			<tr>	
				<td>名称：</td>	
				<td><input type="text" name="name"></td>
			</tr>
			<tr>	
				<td>说明：</td>	
				<td><input type="text" name="priceDesc"></td>
			</tr>
			<tr>	
				<td>价格：</td>	
				<td><input type="text" name="price">元</td>
			</tr>
			<tr>	
				<td>会员价格：</td>	
				<td><input type="text" name="vipPrice">麦粒</td>
			</tr>
<!-- 			<tr>	 -->
<!-- 				<td>discountId：</td>	 -->
<!-- 				<td><input type="text" id="discountId"></td> -->
<!-- 			</tr> -->
			<tr>	
				<td>使用时间：</td>	
				<td><input type="text" name="expiryTime"><select id="expiryTimeUnit" style="width:50px;"><option value=24>天</option></select></td>
			</tr>
			<tr>	
				<td>使用次数：</td>	
				<td><input type="text" name="expiryPlay"></td>
			</tr>
			<tr>	
				<td>状态：</td>	
				<td><select name="state"><option value=1>已上线</option><option value=0>已下线</option></select></td>
			</tr>
			<tr>	
				<td>图片：</td>
				<td>
					<img alt="" id="pic" style="height:80px;"/>
					<span class="spanUpload"><input type="button" id="pic_uploadify" value="浏览" class="btn btn-inverse">
					<input type="file" class="fileCommon"></span><span id="uploading_pic"><img src="images/uploading.gif"></span>
				</td>
			</tr>
	</table>
	</form>
    </div>
</div>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<!-- 页面相关JS -->
<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
<script type="text/javascript" src="js/biling/pricepkg_list.js"></script>
</body>
</html>