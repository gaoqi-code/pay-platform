<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<base href="<%=basePath%>">
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<style type="text/css">
.topCss{
height:60px;background:#B3DFDA;
/* padding:10px;padding-left:50px; */
background-image: url("images/project/background_top.png");
/* background-repeat: no-repeat; */
/* background-position-x: 3px;background-position-y: 15px; */
}
.topCss a{color:#FFFFFF;}
</style>
<div data-options="region:'north',border:false" class="topCss">
<h1 style="color:#FFFFFF;margin:0px;padding:5px;font-size:24px;">中讯担保</h1>
<a style="position: absolute;bottom: 5px;right: 45px;" href="javascript:void(0);" id="update_password_for_private_person">修改密码</a>
<a style="position: absolute;bottom: 5px;right: 15px;" href="logout.html">退出</a>
</div>
<div id="dialog_update_password_for_private_person" data-options="closed:true,modal:true" style="padding:5px;width:550px;height:210px;">
 <form id="dialog_update_password_for_private_person_form" action="" method="post"><table>
    	<tr>
    	<td>原密码：</td><td><input type="password" class="inputCss" id="userPwd_private"></td>
    	</tr>
    	<tr>
    	<td>新密码：</td><td><input type="password" class="inputCss" id="newUserPwd_private" ></td>
    	</tr>
    	<tr>
    	<td>确认密码：</td><td><input type="password" class="inputCss" id="newUserPwd_private_"></td>
    	</tr>
    </table></form>
</div>