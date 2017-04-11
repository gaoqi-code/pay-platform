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
                <input type="hidden"  name="id" value="${category.id}">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">类目名称</label>
                        <div class="layui-input-inline">
                            <input type="text" name="name" value="${category.name}" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-input-block">
                        <button class="layui-btn" id="addAttr" type="button" >添加属性</button>
                    </div>
                </div>
                <div id="attrArea">
                    <input type="hidden" id="attrSize" value="${category.attributes.size()}">
                    <c:forEach items="${category.attributes}" var="attribute" varStatus="status">
                    <div class="layui-form-item">
                        <label class="layui-form-label">属性</label>
                        <div class="layui-input-inline">
                            <input type="hidden" name="attributes[${status.index}].classId" value="${attribute.classId}">
                            <input type="input" name="attributes[${status.index}].name" value="${attribute.name}" autocomplete="off" class="layui-input">
                        </div>
                        <button class="layui-btn" name="deletAttr" onclick="removeItem(this)" type="button" >删除</button>
                    </div>
                    </c:forEach>
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
        layui.use(['form', 'layedit', 'laydate','laypage'], function(){
            var form = layui.form()
                    ,layer = layui.layer
                    ,layedit = layui.layedit
                    ,laydate = layui.laydate;
            var laypage = layui.laypage;

            //监听提交
            form.on('submit(demo1)', function(data){
                $.ajax({
                    type: "POST",
                    url: "/category/operation.json",
                    data: $("#dataForm").serialize(),
                    dataType: "json",
                    success: function (data) {
                        if (data) {
                            layer.alert("设置成功");
                            parent.layer.closeAll();
                        } else {
                            layer.msg("失败！");
                        }
                    }
                });
                return false;
            });
            var attrSize = ${category.attributes.size()};
            var classId = ${category.id};

            $("#addAttr").click(function () {
                attrSize += 1;
               var content =  '<div class="layui-form-item">'
                                + '<label class="layui-form-label">属性</label>'
                                + '<div class="layui-input-inline">'
                                    + '<input type="hidden" name="attributes['+attrSize+'].classId" value="'+classId+'">'
                                    + '<input type="input" name="attributes['+attrSize+'].name" autocomplete="off" class="layui-input">'
                                + ' </div>'
                                + ' <button class="layui-btn" name="deletAttr" onclick="removeItem(this)" type="button" >删除</button>'
                            + ' </div>';
                $("#attrArea").append(content);
            });
//            $("button[name='deletAttr']").click(function () {
//                $(this).parents(".layui-form-item").remove();
//            });
        });
    });
    function removeItem(obj) {
        $(obj).parents(".layui-form-item").remove();
    }
</script>
</body>
</html>
