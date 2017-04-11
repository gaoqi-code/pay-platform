<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/jsp/common/global.jsp" %>
    <meta charset="UTF-8">
    <base href="<%=basePath%>">
    <title>企巴巴</title>
    <link rel="stylesheet" href="../css/buysell.css">
    <link rel="stylesheet" href="../plugins/layui/css/global.css">
    <style>
        .memver_c{margin-top: 15px;margin-bottom: 15px;}
        .member_menu li{width: 100%;height:35px;line-height:35px;border-bottom: 1px solid #eee;}
        .member_menu li a{margin-left:20px;}
        .site-demo-upload, .site-demo-upload img{border-radius:0;}
    </style>
</head>
<body>
<div id="container">
            <form class="layui-form" action="" id="dataForm">
                <input type="hidden"  name="level" value="${parentCategory.level != null ? parentCategory.level +1 :1 }">
                <input type="hidden"  name="parentFullName" value="${parentCategory.fullName}">
                <input type="hidden"  name="parentId" value="${parentCategory.id}">
                <input type="hidden"  name="parentCode" value="${parentCategory.code}">
                <input type="hidden"  name="fullName">
                <%--<c:if test="${level != 1}">--%>
                <%--<div class="layui-form-item">--%>
                    <%--<label class="layui-form-label">父级目录</label>--%>
                    <%--<div class="layui-input-inline">--%>
                        <%--<select lay-filter="parentSelect" name="parentId">--%>
                            <%--<option value="">请选择</option>--%>
                            <%--<c:forEach items="${parentCategorys}" var="category">--%>
                                <%--<option id="category${category.id}" value="${category.id}" code="${category.code}" fullName="${category.fullName}" >${category.name}</option>--%>
                            <%--</c:forEach>--%>
                        <%--</select>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--</c:if>--%>
                <c:if test="${parentCategory != null}">
                    <div class="layui-form-item">
                        <label class="layui-form-label">父类目名称</label>
                        <label class="layui-form-label">
                                ${parentCategory.name}
                        </label>
                    </div>
                </c:if>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">类目名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="name" id="categoryName"  class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">类目使用范围</label>
                        <div class="layui-input-inline">
                            <select  name ="type">
                                <option value="4">通用</option>
                                <option value="1">产品</option>
                                <option value="2">需求</option>
                                <option value="3">顾问</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">确定</button>
                    </div>
                </div>
            </form>
</div>
<script src="../plugins/layui/layui.js" charset="utf-8"></script>
<script>
    $(function () {
        var level = $("input[name='level']").val();
        layui.use(['form', 'layedit'], function(){
            var form = layui.form()
                    ,layer = layui.layer
                    ,layedit = layui.layedit
                    ,laydate = layui.laydate;
            var laypage = layui.laypage;

            //监听提交
            form.on('submit(demo1)', function(data){
                var fullName;
                if(level == 1){
                    fullName =  $("#categoryName").val();
                }else {
                    fullName = $("input[name='parentFullName']").val()+"-"+$("#categoryName").val();
                }
                $("input[name='fullName']").val(fullName);
                $.ajax({
                    type: "POST",
                    url: "/category/addCategory.json",
                    data: $("#dataForm").serialize(),
                    dataType: "json",
                    success: function (data) {
                        if (data) {
                            layer.alert("设置成功");
//                            parent.layer.closeAll();
                            parent.location.reload();
                        } else {
                            layer.msg("失败！");
                        }
                    }
                });
                return false;
            });
//            form.on('select(parentSelect)', function(data) {
//                var $obj = $("#category"+data.value);
//                $("input[name='parentFullName']").val($obj.attr("fullName"));
//                $("input[name='parentCode']").val($obj.attr("code"));
//            })
        });
    });
</script>
</body>
</html>
