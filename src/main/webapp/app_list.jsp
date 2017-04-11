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
<title>测试页面</title>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
</head>
<body>

<div id="sss">
	<a href="javascript:fnTest()">测试</a>
</div>

<div id="testContentDiv"></div>
<script type="text/javascript">
function fnTest(){
	$.ajax({url:"app/show.html",success:function(data){
		console.log(data);
		$("#sss").hide();
		$("#testContentDiv").html(data);
	}});
}
</script>
</body>
</html>