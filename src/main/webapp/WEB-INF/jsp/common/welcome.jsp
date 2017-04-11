<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<base href="<%=basePath%>">
<div data-options="region:'center',title:'欢迎页面'">
<h1 style="width:100%;text-align: center">中讯担保<br />管理平台</h1>
</div>
