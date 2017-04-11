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
        .c_left{width: 210px;float:left;}
        .member_menu{border: 1px solid #EEE;}
        .member_menu li{width: 100%;height:35px;line-height:35px;border-bottom: 1px solid #eee;}
        .member_menu li a{margin-left:20px;}
        .gonggao_title{margin: 15px 5px;}
        .gonggao{border: 1px solid #EEE;}
        .gonggao li{width: 100%;height:45px;line-height:45px;border-bottom: 1px solid #eee;}
        .gonggao li a{margin-left: 15px;}
        .c_right{margin-left:10px;width: 958px;float: left;}
        .site-demo-upload, .site-demo-upload img{border-radius:0;}
    </style>
</head>
<body>
<div id="container">
            <form class="layui-form" action="" id="dataForm">
                <input type="hidden"  name="id" value="${product.id}">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">点击数</label>
                        <div class="layui-input-inline">
                            <input type="text" name="hits" value="${product.hits}" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">权重</label>
                    <div class="layui-input-inline">
                        <select name="weightValue">
                            <option value="0" <c:if test="${product.weightValue == 0}">selected=""</c:if>  >0</option>
                            <option value="5" <c:if test="${product.weightValue == 5}">selected=""</c:if>  >5</option>
                            <option value="10" <c:if test="${product.weightValue == 10}">selected=""</c:if> >10</option>
                            <option value="15" <c:if test="${product.weightValue == 15}">selected=""</c:if> >15</option>
                            <option value="20" <c:if test="${product.weightValue == 20}">selected=""</c:if> >20</option>
                            <option value="25" <c:if test="${product.weightValue == 25}">selected=""</c:if> >25</option>
                        </select>
                    </div>

                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">推荐</label>
                    <div class="layui-input-inline">
                        <select  name="recommend"  >
                            <option value="0" <c:if test="${product.recommend == 0}">selected=""</c:if> >未设置</option>
                            <option value="5" <c:if test="${product.recommend == 5}">selected=""</c:if> >最新</option>
                            <option value="10"<c:if test="${product.recommend == 10}">selected=""</c:if> >热门</option>
                            <option value="15"<c:if test="${product.recommend == 15}">selected=""</c:if> >推荐</option>
                            <option value="20" <c:if test="${product.recommend == 20}">selected=""</c:if> >置顶</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">确定</button>
                    </div>
                </div>
            </form>
            <div id="dataMsg"></div>
            <div id="productPager"></div>
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
        form.on('submit(demo1)', function(data){
            $.ajax({
                type: "POST",
                url: "/product/operation.json",
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

//        form.on('select', function(data){
//            var selectVal = data.value;
//            $("#status").val(selectVal)
//        });
    });
</script>
</body>
</html>
