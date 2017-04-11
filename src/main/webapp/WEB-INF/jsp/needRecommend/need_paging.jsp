<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>



<table class="table table-border table-bordered table-bg">
    <thead>
    <tr>
        <th scope="col" colspan="5">需求列表</th>
    </tr>
    <tr class="text-c">
        <th>需求标题</th>
        <th>类目</th>
        <th>状态</th>
        <th>更新时间</th>
        <th>添加推荐</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${needs}" var="need" >
    <tr class="text-c">
        <%--<td><input type="checkbox" value="1" name=""></td>--%>
        <%--<td>1</td>--%>
            <td>${need.title}</td>
            <td>${need.className}</td>
            <td >
                <c:if test="${need.status == 3}">
                    审核中
                </c:if>
                <c:if test="${need.status == 4}">
                    审核成功
                </c:if>
                <c:if test="${need.status == 5}">
                    审核失败
                </c:if>
                <c:if test="${need.status == 6}">
                    下架
                </c:if>
                <c:if test="${need.status == 7}">
                    关闭
                </c:if>
            </td>
            <td> <fmt:formatDate value="${need.updateTime != null ? need.updateTime:need.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
        <td class="td-manage">
            <a title="编辑" href="javascript:;"  onclick="admin_edit('设置','/needRecommend/toSetting/add/${need.id}.html','1','500','300')"  class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
    </tr>
    </c:forEach>
    <c:if test="${empty needs}">
        <tr>
            <td colspan="6" style="text-align: center;">暂无需求！</td>
        </tr>
    </c:if>
    </tbody>
</table>

   <input type="hidden" id="totalPages" value="${paging.totalPages}"/>
   <input type="hidden" id="currentPage" value="${paging.currentPage}"/>
<script type="text/javascript">
</script>