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
        .gonggao li{width: 100%;height:45px;line-height:45px;border-bottom: 1px solid #eee;}
        .gonggao li a{margin-left: 15px;}
        .site-demo-upload, .site-demo-upload img{border-radius:0;}
    </style>
</head>
<body>
<div id="container">
            <form class="layui-form" action="" id="dataForm">
                <input type="hidden" id="relateId" name="relateId" value="${need.id}">
                <div class="layui-form-item">
                    <label class="layui-form-label">当前产品状态:</label>
                    <label class="layui-form-label">
                        <c:if test="${need.status == 3}">
                            审核中
                        </c:if>
                        <c:if test="${need.status == 4}">
                            审核成功
                        </c:if>
                        <c:if test="${need.status == 5}">
                            审核失败
                        </c:if>
                        <c:if test="${need.status == 7}">
                            关闭
                        </c:if>
                    </label>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">审批</label>
                    <div class="layui-input-inline">
                        <select  lay-filter="statusSearch"  id="statusSearch">
                            <option value="">请选择</option>
                            <option value="4" >批准</option>
                            <option value="5" >驳回</option>
                            <option value="7" >关闭</option>
                        </select>
                        <input type="hidden" id="status" name="status" value="${need.status}">
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">备注：</label>
                    <div class="layui-input-block">
                        <textarea placeholder="请输入内容" name="comment" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">确定</button>
                    </div>
                </div>
            </form>
            <div id="dataMsg"></div>
            <div id="needPager"></div>
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
                url: "/need/approval.json",
                data: $("#dataForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data) {
//                        parent.layer.closeAll();
                        parent.location.reload();
                    } else {
                        layer.msg("发布失败！");
                    }
                }
            });
            return false;
        });


        var pageSize = 5;
        function paging(curr){
            $.ajax({
                type: "POST",
                url: "/need/approvalPage.html",
                data: {
                    relateId:$("#relateId").val(),
                    currentPage :curr || 1,
                    pageSize : pageSize
                },
                success: function(data){
                    $("#dataMsg").html(data);
                    var totalPages = $("#totalPages").val();
                    //显示分页
                    laypage({
                        cont: 'needPager', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        pages: totalPages, //通过后台拿到的总页数
                        curr: curr || 1, //当前页
                        groups: 5 ,//连续显示分页数
                        jump: function(obj, first){ //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                paging(obj.curr);
                            }
                        }
                    });
                }
            });
        };
        //运行
        paging();

        form.on('select', function(data){
            var selectVal = data.value;
            $("#status").val(selectVal)
        });
    });
</script>
</body>
</html>
