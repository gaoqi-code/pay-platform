<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><!DOCTYPE HTML>
<html>
<head>
    <%@ include file="/WEB-INF/jsp/common/global.jsp" %>
    <base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="Bookmark" href="/favicon.ico" >
    <link rel="Shortcut Icon" href="/favicon.ico" />
    <![endif]-->
    <jsp:include page="../common/static.jsp"></jsp:include>
    <![endif]-->
    <title>文章管理</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 文章管理
    <span class="c-gray en">&gt;</span> 添加文章
    <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" >
        <i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div id="container">
    <form class="layui-form" action="" id="articleForm">
        <input type="hidden" name="id" value="${article.id}">
        <div class="layui-form-item">
            <label class="layui-form-label"><span class="redColorClass">*</span>文章标题</label>
            <div class="layui-input-inline">
                <input type="input" name="title" value="${article.title}" lay-verify="title" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux"></div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label"><span class="redColorClass">*</span>文章浏览量</label>
            <div class="layui-input-inline">
                <input type="input" name="pageView" value="${article.pageView}" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux"></div>
        </div>


        <%--<div class="layui-form-item">--%>
            <%--<label class="layui-form-label"><span class="redColorClass">*</span>文章类型</label>--%>
            <%--<div class="layui-input-inline">--%>
                <%--<select  lay-verify="oneLevel" lay-filter="oneLevel" id="oneLevel">--%>
                    <%--<option value="">请选择</option>--%>
                    <%--<c:forEach items="${oneLevelCategories}" var="category">--%>
                        <%--<option value="${category.id}" <c:if test="${category.id == selectClass.oneLevel}">selected=""</c:if>  >${category.name}</option>--%>
                    <%--</c:forEach>--%>
                <%--</select>--%>
            <%--</div>--%>
            <%--<div class="layui-input-inline">--%>
                <%--<select  lay-filter="twoLevel" id="twoLevel">--%>
                    <%--<option value="">请选择</option>--%>
                    <%--&lt;%&ndash;<option value="宁波"selected="" disabled="">宁波</option>&ndash;%&gt;--%>
                    <%--<c:forEach items="${twoLevelCategories}" var="category">--%>
                        <%--<option value="${category.id}" <c:if test="${category.id == selectClass.twoLevel}">selected=""</c:if> >${category.name}</option>--%>
                    <%--</c:forEach>--%>
                <%--</select>--%>
            <%--</div>--%>
            <%--<div class="layui-input-inline">--%>
                <%--<select lay-filter="threeLevel" id="threeLevel">--%>
                    <%--<option value="">请选择</option>--%>
                    <%--<c:forEach items="${threeLevelCategories}" var="category">--%>
                        <%--<option value="${category.id}" <c:if test="${category.id == selectClass.threeLevel}">selected=""</c:if> >${category.name}</option>--%>
                    <%--</c:forEach>--%>
                <%--</select>--%>
            <%--</div>--%>
            <%--<input type="hidden" id="classId" name ="classId" value="${article.classId}" >--%>
        <%--</div>--%>



        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">文章介绍</label>
            <div class="layui-input-block">
                <textarea class="layui-textarea layui-hide" name="content" lay-verify="content" id="LAY_demo_editor">${article.content}</textarea>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
            </div>
        </div>
    </form>
</div>
<script src="../plugins/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use(['form', 'layedit', 'laydate','upload'], function(){
        var form = layui.form()
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;

        layedit.set({
            uploadImage: {
                url: '/newFileUpload/upload.json' //接口url
                ,type: 'post' //默认post
            }
        });
        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //自定义验证规则
        form.verify({
            title: function(value){
                if(value.length < 3){
                    return '文章标题至少得5个字符！';
                }
            },
//            oneLevel: function(value){
//                if(value.length < 1){
//                    return '请选择文章类型！';
//                }
//            },
            content: function(value){
                layedit.sync(editIndex);
            }
        });


        //监听提交
        form.on('submit(demo1)', function(data){
            $.ajax({
                type: "POST",
                url: "/article/addOrUpdate.json",
                data: $("#articleForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data) {
                        location.href = "/article/list.html";
                    } else {
                        layer.msg("发布失败！");
                    }
                }
            });
            return false;
        });



//
//        form.on('select', function(data){
//            var oldDom = data.elem;
//            var selectVal = data.value;
//            var classId = $("#classId").val();
//            if(selectVal != classId) {
//                $("#classId").val(selectVal)
//            }else{
//                return;
//            }
//            var level = $(oldDom).attr("id");
//            if(level != "threeLevel") {
//                $.ajax({
//                    type: "POST",
//                    url: "/member/category/getSonCategory.json",
//                    data: {parentId:selectVal},
//                    dataType: "json",
//                    async:false,
//                    success: function (data) {
//                        if (data.flag) {
//                            var content = '<option value="">请选择</option>';
//                            data.categorys.forEach(function(item,index) {
//                                content += '<option value="'+item.id+'">'+item.name+'</option>';
//                            });
//                            if(level == "oneLevel") {
//                                $("#twoLevel").html(content);
//                            }else {
//                                $("#threeLevel").html(content);
//                            }
//                            form.render('select');
//                        } else {
//                            layer.msg("类目加载失败！");
//                        }
//                    }
//                });
//            }
//        });

    });
</script>
</body>
</html>
