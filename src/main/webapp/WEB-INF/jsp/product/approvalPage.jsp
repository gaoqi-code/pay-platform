<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<table class="layui-table" lay-skin="line">
    <colgroup>
        <col width="90">
        <col width="120">
        <col width="190">
        <col>
    </colgroup>
    <thead>
    <tr>
        <th>操作人</th>
        <th>状态</th>
        <th>添加时间</th>
        <th>内容</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${approvalRecords}" var="approval" >
    <tr class="text-c">
            <td>${approval.operationName}</td>
            <td >
                <c:if test="${approval.status == 4}">
                    审核成功
                </c:if>
                <c:if test="${approval.status == 5}">
                    审核失败
                </c:if>
                <c:if test="${approval.status == 7}">
                    关闭
                </c:if>
            </td>
        <td> <fmt:formatDate value="${approval.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
        <td>${approval.comment}</td>
    </tr>
    </c:forEach>
    <c:if test="${empty approvalRecords}">
        <tr>
            <td colspan="5" style="text-align: center;">暂无审批记录！</td>
        </tr>
    </c:if>
    </tbody>
</table>

   <input type="hidden" id="totalPages" value="${paging.totalPages}"/>
   <input type="hidden" id="currentPage" value="${paging.currentPage}"/>
<script type="text/javascript">
</script>