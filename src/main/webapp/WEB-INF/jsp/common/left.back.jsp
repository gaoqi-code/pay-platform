<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" type="text/css" href="css/left.css" />
<!-- left -->
<div data-options="region:'west',split:true,title:'菜单栏'" style="width:250px;height:600px;border-right:0px;">
<div id="leftDiv" class="leftDiv">
	<div class="leftContainer">
	<ul id="leftContainer">
		  <c:forEach var="sysAuth" items="${leftMeau}">
		  <c:if test="${sysAuth.pid==0}">
		  <c:if test="${param.PID==sysAuth.authId}">
		 	 
		 	 <li class="leftDivLi_" style="display: list-item;">
		 	 <ul>
		 	 <c:forEach var="chlidAuth" items="${leftMeau}">
		 	 	<c:if test="${sysAuth.authId==chlidAuth.pid}">
		 	 		<c:if test="${param.ID==chlidAuth.authId}">
						<li class="leftDivLiLi active_click" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>${chlidAuth.authName}</li>
		 	 		</c:if>
		 	 		<c:if test="${param.ID!=chlidAuth.authId}">
						<li class="leftDivLiLi" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>${chlidAuth.authName}</li>
		 	 		</c:if>
		 	 	</c:if>
		 	 </c:forEach>
		 	 </ul>
		 	 </li>
		 </c:if>
		 <c:if test="${param.PID!=sysAuth.authId}">
		 	 <li class="leftDivLi">${sysAuth.authName}</li>
		 	 <li class="leftDivLi_">
		 	 <ul>
		 	 <c:forEach var="chlidAuth" items="${leftMeau}">
		 	 	<c:if test="${sysAuth.authId==chlidAuth.pid}">
		 	 		<c:if test="${param.ID==chlidAuth.authId}">
						<li class="leftDivLiLi active_click" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>${chlidAuth.authName}</li>
		 	 		</c:if>
		 	 		<c:if test="${param.ID!=chlidAuth.authId}">
						<li class="leftDivLiLi" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>${chlidAuth.authName}</li>
		 	 		</c:if>
		 	 	</c:if>
		 	 </c:forEach>
		 	 </ul>
		 	 </li>
		 </c:if>
		  </c:if>
	  </c:forEach>
	</ul>
	</div>
</div>
</div>
<!-- left end -->
<script type="text/javascript" src="js/left.js"></script>