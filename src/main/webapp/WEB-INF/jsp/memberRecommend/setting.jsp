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
                <input type="hidden" id="memberRecommendId"  name="id" value="${memberRecommend.id}">
                <input type="hidden"  name="memberId" value="${memberRecommend.memberId}">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">板块</label>
                        <div class="layui-input-inline">
                            <input type="text" name="plate" value="${memberRecommend.plate}" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">顺序</label>
                        <div class="layui-input-inline">
                            <input type="text" name="recommendOrder" value="${memberRecommend.recommendOrder}" class="layui-input">
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
        layui.use(['form'], function(){
            var form = layui.form(),layer = layui.layer;
            //监听提交
            form.on('submit(demo1)', function(data){
                $.ajax({
                    type: "POST",
                    url: "/memberRecommend/addRecommend.json",
                    data: $("#dataForm").serialize(),
                    dataType: "json",
                    success: function (data) {
                        if (data) {
                            layer.msg("设置成功");
                            setTimeout(function () {
                                if($("#memberRecommendId").val()) {
                                    parent.location.reload();
                                }else {
                                    parent.parent.location.reload();
                                }
                            },500);
                        } else {
                            layer.msg("失败！");
                        }
                    }
                });
                return false;
            });
        });
    });
</script>
</body>
</html>
