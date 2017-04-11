<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>



<table class="table table-border table-bordered table-bg">
    <thead>
    <tr>
        <th scope="col" colspan="10">顾问列表</th>
    </tr>
    <tr class="text-c">
        <th>名称</th>
        <th>类型</th>
        <th>等级</th>
        <th>执业年限</th>
        <th>公司</th>
        <th>审核状态</th>
        <th>账户状态</th>
        <th>更新时间</th>
        <th>审批</th>
        <th>设置</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${members}" var="member" >
    <tr class="text-c">
        <%--<td><input type="checkbox" value="1" name=""></td>--%>
        <%--<td>1</td>--%>
            <td>${member.name}</td>
            <td>
                <c:if test="${member.adviserType == '1-'}">金融顾问</c:if>
                <c:if test="${member.adviserType == '2-'}">企业顾问</c:if>
                <c:if test="${member.adviserType == '3-'}">法律顾问</c:if>
            </td>
            <td>
                <c:if test="${member.level == 1}">普通顾问</c:if>
                <c:if test="${member.level == 2}">金牌顾问</c:if>
            </td>
            <td>
                ${member.workAge}
            </td>
            <td>
                ${member.companyName}
            </td>
            <td >
                <c:if test="${member.checkStatus == 3}">
                    审核中
                </c:if>
                <c:if test="${member.checkStatus == 4}">
                    审核成功
                </c:if>
                <c:if test="${member.checkStatus == 5}">
                    审核失败
                </c:if>
            </td>
            <td >
                <c:if test="${member.status == 1}">
                    有效
                </c:if>
                <c:if test="${member.status == 2}">
                    禁用
                </c:if>
            </td>
            <td> <fmt:formatDate value="${member.updateTime != null ? member.updateTime:member.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
        <td class="td-manage">
            <%--<a style="text-decoration:none" onClick="admin_stop(this,'10001')" href="javascript:;" title="停用">--%>
                <%--<i class="Hui-iconfont">&#xe631;</i></a>--%>
            <a title="编辑" href="javascript:;" onclick="admin_edit('审批','/member/toApproval/${member.id}.html','1','800','500')" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
            <%--<a title="删除" href="javascript:;" onclick="admin_del(this,'1')" class="ml-5" style="text-decoration:none">--%>
                <%--<i class="Hui-iconfont">&#xe6e2;</i></a>--%>
        </td>
        <td class="td-manage">
            <a title="编辑" href="javascript:;" onclick="admin_edit('设置','/member/toSetting/${member.id}.html','1','800','500')" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
    </tr>
    </c:forEach>
    <c:if test="${empty members}">
        <tr>
            <td colspan="9" style="text-align: center;">暂无顾问！</td>
        </tr>
    </c:if>
    </tbody>
</table>

   <input type="hidden" id="totalPages" value="${paging.totalPages}"/>
   <input type="hidden" id="currentPage" value="${paging.currentPage}"/>
<script type="text/javascript">

</script> 