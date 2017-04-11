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
    <form class="layui-form" action="" id="updatePWForm">
        <div class="layui-form-item">
            <label class="layui-form-label">原密码</label>
            <div class="layui-input-inline">
                <input type="password" name="pwd"   placeholder="" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux"></div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
                <input type="password" name="newPwd" id="newUserPwd_private"  placeholder="" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux"></div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
                <input type="password"  id="newUserPwd_private_"  placeholder="" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux"></div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" type="button" id="demo1">立即提交</button>
            </div>
        </div>
    </form>
</div>
<script src="../plugins/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use(['form', 'layedit', 'laydate','laypage'], function(){
        var form = layui.form()
                ,layer = layui.layer
                ,layedit = layui.layedit
                ,laydate = layui.laydate;
        var laypage = layui.laypage;

        //监听提交
        $("#demo1").click(function () {
            var newUserPwd_private = $("#newUserPwd_private").val();
            var newUserPwd_private_ = $("#newUserPwd_private_").val();
            if(newUserPwd_private!=newUserPwd_private_){
                layer.alert('两次输入的密码不同 ！');
                return;
            }
            $.ajax({
                type: "POST",
                url: "/sysUser/updateSysUserPwd.json",
                data: $("#updatePWForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if(data.code==-100){
                        layer.alert('您输入的原密码不正确！');
                    }else if(data.code>0){
                        layer.alert('修改成功!');
                        setTimeout(function(){
                            parent.layer.closeAll();
                        },1000);
                    }else{
                        layer.alert('修改密码失败！');
                    }
                }
            });
        });
    });
</script>
</body>
</html>
