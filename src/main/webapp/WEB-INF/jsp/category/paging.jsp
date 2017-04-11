<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>



<table class="table table-border table-bordered table-bg">
    <thead>
    <tr>
        <th scope="col" colspan="9">类目列表</th>
    </tr>
    <tr class="text-c">
        <%--<th width="25"><input type="checkbox" name="" value=""></th>--%>
        <%--<th width="40">ID</th>--%>
        <th>类目名称</th>
        <th>类目等级</th>
        <th>类目code</th>
        <th>更新时间</th>
        <th>添加子类目</th>
        <th>设置</th>
        <th>删除</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${categorys}" var="category" >
    <tr class="text-c">
        <%--<td><input type="checkbox" value="1" name=""></td>--%>
        <%--<td>1</td>--%>
            <td>${category.name}</td>
            <td>${category.level}</td>
            <td>${category.code}</td>
            <td> <fmt:formatDate value="${category.updateTime != null ? category.updateTime:category.addTime}"   pattern="yyyy-MM-dd HH:mm:ss" type="date" dateStyle="long" /></td>
        <td class="td-manage">
            <a title="添加子类目" href="javascript:void(0);" onclick="admin_edit('添加子类目','/category/toAdd/${category.id}.html','1','800','500')" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
        <td class="td-manage">
            <a title="编辑" href="javascript:void(0);" onclick="admin_edit('设置','/category/toSetting/${category.id}.html','1','800','500')" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
        <td class="td-manage">
            <a title="删除" href="javascript:void(0);" name="delete" code="${category.code}" class="ml-5" style="text-decoration:none">
                <i class="Hui-iconfont">&#xe6df;</i></a>
        </td>
    </tr>
    </c:forEach>
    <c:if test="${empty categorys}">
        <tr>
            <td colspan="5" style="text-align: center;">暂无类目！</td>
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
            var code = thisObj.attr("code");
            layer.confirm("您确定要删除此目录以及它的子目录吗？", {
                btn: ['确定','取消'] //按钮
            }, function(index){
                $.ajax({
                    type: "POST",
                    url: "/category/delete.json",
                    data: {code:code},
                    dataType: "json",
                    success: function(data){
                        layer.close(index);
                        if(data) {
//                            thisObj.parents("tr").remove();
                            location.reload();
                        }else {
                            layer.msg("操作失败！");
                        }
                    }
                });
            }, function(index){
//                 layer.close(index);
            });
        });
    });

</script> 