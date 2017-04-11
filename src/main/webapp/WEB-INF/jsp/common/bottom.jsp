<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- bottom -->
<style type="text/css">
.bottomCss{
height:30px;background:#2B9A94;padding:10px;
text-align: center;
line-height: 30px;
}
</style>
<div style="clear:both;"></div>
<div data-options="region:'south',border:false" class="bottomCss">
<span id="Copyright" style="color:#FFFFFF;">中讯担保 &copy; 2013 hiveview.com</span>
</div>
<!-- bottom -->
<script>	
$(document).ready(function (){
	$('#dialog_update_password_for_private_person').dialog({
		buttons:[{text:'确定',handler:function(){
			var userPwd_private = $("#userPwd_private").val();
			var newUserPwd_private = $("#newUserPwd_private").val();
			var newUserPwd_private_ = $("#newUserPwd_private_").val();
			if(newUserPwd_private!=newUserPwd_private_){
				$.messager.alert(titleInfo,'两次输入的密码不同 ！');
				return;	
			}
			if(userPwd_private==newUserPwd_private){
				$('#dialog_update_password_for_private_person').dialog('close');
				return;
			}
			//修改密码
			$.post("sysUser/updateSysUserPwd.json",{"pwd":userPwd_private,"newPwd":newUserPwd_private},function(data){
				if(data.code==-100){
					$.messager.alert(titleInfo,'您输入的原密码不正确！');
				}else if(data.code>0){
					$.messager.alert(titleInfo,'修改成功成功，请退出重新登录！');
					$('#dialog_update_password_for_private_person').dialog('close');
				}else{
					$.messager.alert(titleInfo,'修改密码失败！');
				}
			});
		}
		},{text:'取消',handler:function(){
			$('#dialog_update_password_for_private_person').dialog('close');
		}
		}]
	});
	$("#update_password_for_private_person").click(function(){
		$('#dialog_update_password_for_private_person form')[0].reset();
		$('#dialog_update_password_for_private_person').dialog({title:"修改密码",closed:false});
	});

	
});
</script>