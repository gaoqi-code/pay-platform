<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>



<table class="table table-border table-bordered table-bg">
    <thead>
    <tr>
        <th scope="col" colspan="5">会员列表</th>
    </tr>
    <tr class="text-c">
        <th>名称</th>
        <th>性别</th>
        <th>电话</th>
        <th>会员类型</th>
        <th>注册时间</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${members}" var="member" >
    <tr class="text-c">
            <td>${member.name}</td>
            <td>
                <c:if test="${member.sex == 'none'}">未填</c:if>
                <c:if test="${member.sex == 'male'}">男</c:if>
                <c:if test="${member.sex == 'female'}">女</c:if>
            </td>
            <td>${member.mobile}</td>
            <td>
                <c:if test="${member.type == 0}">普通会员</c:if>
                <c:if test="${member.type == 1}">顾问会员</c:if>
            </td>
            <td> <fmt:formatDate value="${member.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
    </tr>
    </c:forEach>
    <c:if test="${empty members}">
        <tr>
            <td colspan="5" style="text-align: center;">暂无会员！</td>
        </tr>
    </c:if>
    </tbody>
</table>
   <input type="hidden" id="totalPages" value="${paging.totalPages}"/>
   <input type="hidden" id="currentPage" value="${paging.currentPage}"/>
<script type="text/javascript">

</script> 