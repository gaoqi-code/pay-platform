<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>



<table class="table table-border table-bordered table-bg">
    <thead>
    <tr>
        <th scope="col" colspan="6">文章列表</th>
    </tr>
    <tr class="text-c">
        <th>文章标题</th>
        <th>浏览量</th>
        <th>操作人</th>
        <th>更新时间</th>
        <th>修改</th>
        <th>删除</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${articles}" var="article" >
    <tr class="text-c">
        <%--<td><input type="checkbox" value="1" name=""></td>--%>
        <%--<td>1</td>--%>
            <td>${article.title}</td>
            <td>${article.pageView}</td>
            <td>${article.userName}</td>
            <td> <fmt:formatDate value="${article.updateTime != null ? article.updateTime:article.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
        <td class="td-manage">
            <%--<a style="text-decoration:none" onClick="admin_stop(this,'10001')" href="javascript:;" title="停用">--%>
                <%--<i class="Hui-iconfont">&#xe631;</i></a>--%>
            <a title="编辑" href="javascript:;" name="edit" id="${article.id}" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
            <%--<a title="删除" href="javascript:;" onclick="admin_del(this,'1')" class="ml-5" style="text-decoration:none">--%>
                <%--<i class="Hui-iconfont">&#xe6e2;</i></a>--%>
        </td>
        <td class="td-manage">
            <a title="编辑" href="javascript:;" name="delete" id="${article.id}" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
    </tr>
    </c:forEach>
    <c:if test="${empty articles}">
        <tr>
            <td colspan="6" style="text-align: center;">暂无文章！</td>
        </tr>
    </c:if>
    </tbody>
</table>

   <input type="hidden" id="totalPages" value="${paging.totalPages}"/>
   <input type="hidden" id="currentPage" value="${paging.currentPage}"/>
<script type="text/javascript">
    $(function () {
        $("a[name='delete']").click(function() {
            var thisObj = $(this);
            var id = thisObj.attr("id");

            layer.confirm("您确定要删除此文章吗？", {
                btn: ['确定','取消'] //按钮
            }, function(index){
                $.ajax({
                    type: "POST",
                    url: "/article/delete.json",
                    data: {articleId:id},
                    dataType: "json",
                    success: function(data){
                        layer.close(index);
                        if(data) {
                            thisObj.parents("tr").remove();
                        }else {
                            layer.msg("操作失败！");
                        }
                    }
                });
            });
        });
        $("a[name='edit']").click(function() {
            location.href = "/article/toAdd/"+$(this).attr("id")+".html";
        });
    });
</script> 