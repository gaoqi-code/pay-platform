<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- left -->
	<aside class="Hui-aside">
	<input runat="server" id="divScrollValue" type="hidden" value="" />
	<div class="menu_dropdown bk_2">
		<dl id="menu-product">
		  <c:forEach var="sysAuth" items="${leftMeau}">
			  <c:if test="${sysAuth.pid==0}">
				  <c:if test="${param.PID==sysAuth.authId}">
					 <li class="leftDivLi_" style="display: list-item;">
						 <ul>
							 <c:forEach var="chlidAuth" items="${leftMeau}">
								<c:if test="${sysAuth.authId==chlidAuth.pid}">
									<c:if test="${param.ID==chlidAuth.authId}">
										<li class="leftDivLiLi active_click" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>111${chlidAuth.authName}</li>
									</c:if>
									<c:if test="${param.ID!=chlidAuth.authId}">
										<li class="leftDivLiLi" page_id="${chlidAuth.authId}" onclick='gotoJSP("${chlidAuth.authAction}!PID=${sysAuth.authId}&ID=${chlidAuth.authId}")'>222${chlidAuth.authName}</li>
									</c:if>
								</c:if>
							 </c:forEach>
						 </ul>
					 </li>
				 </c:if>
				 <c:if test="${param.PID!=sysAuth.authId}">
					 <dt><i class="Hui-iconfont">&#xe620;</i> ${sysAuth.authName}<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			  		 <dd>
					 <ul>
					 <c:forEach var="chlidAuth" items="${leftMeau}">
						<c:if test="${sysAuth.authId==chlidAuth.pid}">
							<li><a data-href="${chlidAuth.authAction}" data-title="品牌管理" href="javascript:void(0)">${chlidAuth.authName}</a></li>
						</c:if>
					 </c:forEach>
					 </ul>
			  		<dd>
				 </c:if>
			  </c:if>
	  </c:forEach>
		</dl>
	</div>
</aside>