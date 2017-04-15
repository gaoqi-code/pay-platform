<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/common/global.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=staticPath %>menu/css/base.css" type="text/css" rel="stylesheet" />
<link href="<%=staticPath %>menu/css/layout.css" type="text/css" rel="stylesheet"/>
<title>支付错误</title>
</head>
<body>
	<div class="g-hd hd-new">
    	<a href="#" class="logo"></a>
    	<div class="br"></div>
    	<span class="tips" style="top:41px;+line-height:30px;+top:34px">支付异常</span>
    </div>
	<div class="w1000 mt20">
		<div class="pay404">
			<div class="pay404-c">
				<img src="<%=staticPath %>menu/images/warn-l.png" width="57" height="58"/>
				<p>抱歉！找不到您要的页面，</p>
				<p>最可能的原因是：1）地址中存在错误。2）链接已过期</p>
			</div>
		</div>
		<div class="linkContent">
			<h3>点击链接继续浏览</h3>
			<div class="clickLink">
				<a href="<%=memberWebPath %>" target="_self" class="ablue mr10">返回我的会员中心</a>
				<a href="<%=coidWebPath %>" target="_self" class="ablue mr10">返回库币商城首页</a>
				<a href="<%=wkWebPaht %>" target="_self" class="ablue">返回中国网库</a>
			</div>
		</div>
	</div>
</body>
</html>