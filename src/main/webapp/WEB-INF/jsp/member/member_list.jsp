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
	<title>顾问管理</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 顾问管理 <span class="c-gray en">&gt;</span> 顾问列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="text-c">
		<form class="layui-form" action="" id="needForm">
		<div class="layui-form-item">
			<div class="layui-inline">
			<label class="layui-form-label">顾问状态</label>
			<div class="layui-input-inline">
				<select  lay-filter="statusSearch" id="statusSearch">
					<option value="-1">全部</option>
					<%--<option value="宁波"selected="" disabled="">宁波</option>--%>
					<option value="3" >审核中</option>
					<option value="4" >审核成功</option>
					<option value="5" >审核失败</option>
				</select>
			</div>
			</div>
			<button type="button"  class="btn btn-success" name="" id="search" ><i class="Hui-iconfont">&#xe665;</i>搜索</button>
		</div>
		<%--<div class="layui-input-block">--%>
		<%--<button class="layui-btn" lay-submit="" lay-filter="demo1" >搜索</button>--%>
		<%--</div>--%>
		</form>
	</div>
	<div id="dataMsg"></div>
	<div id="memberPager"></div>
</div>
<!--_footer 作为公共模版分离出去-->
<jsp:include page="../common/static-js.jsp"></jsp:include>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript">


    $(function () {
        layui.use(['form','laypage', 'layer'], function(){
            var laypage = layui.laypage
                ,layer = layui.layer;

            var form = layui.form()
                ,layedit = layui.layedit
                ,laydate = layui.laydate;
            //以下将以jquery.ajax为例，演示一个异步分页
            var pageSize = 5;
            function paging(curr){
				var statusSearch = $("#statusSearch").val();
				statusSearch = statusSearch == -1 ? "" : statusSearch;
                $.ajax({
                    type: "POST",
                    url: "/member/page.html",
                    data: {
						checkStatus :statusSearch,
                        currentPage :curr || 1,
                        pageSize : pageSize
                    },
                    success: function(data){
                        $("#dataMsg").html(data);
                        var totalPages = $("#totalPages").val();
                        //显示分页
                        laypage({
                            cont: 'memberPager', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
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
            $("#search").click(function () {
                paging();
            });
        });
    })


	/*管理员-编辑*/
	function admin_edit(title,url,id,w,h){
		layer_show(title,url,w,h);
	}
</script>
</body>
</html>