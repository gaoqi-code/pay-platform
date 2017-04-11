<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
	+ request.getServerName() + ":" + request.getServerPort()
	+ path + "/";
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="/js/common/jquery/jquery-1.9.1.js" charset="utf-8"></script>
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/plugins/layui/css/layui.css"  media="all">




