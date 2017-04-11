$(function() {
	$("#submit_login").click(function(){
		login();
	});
	$("#reset_login").click(function(){
		resetBtn();
	});
	
	$("#userMail").blur(function(){
		//.trim()==""
		if($("#userMail").val()==null||$("#userMail").val()==""){
			$("#userMail").addClass("warm");
		}else{
			$("#userMail").removeClass("warm");
		}
	});
	$("#userPwd").blur(function(){
		if($("#userPwd").val()==null||$("#userPwd").val()==""){
			$("#userPwd").addClass("warm");
		}else{
			$("#userPwd").removeClass("warm");
		}
	});
	$('input :eq(0)').focus();
	
	$("#userMail").change(function(){
		removeErrorInfo();
	});
	$("#userPwd").change(function(){
		removeErrorInfo();
	});
});

document.onkeydown = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e.keyCode == 13) {
		login();
		return false;
	}
};

function login() {
	var flag = true;
	//.trim()
	var userMail = $("#userMail").val();
	var userPwd = $("#userPwd").val();
	if(userMail==""||userMail==null){
		$("#userMail").addClass("warm");
		$("#userMail").focus();
		flag=false;
		return;
	}
	
	if(userPwd==""||userPwd==null){
		$('#userPwd').addClass("warm");
		$('#userPwd').focus();
		flag=false;
		return;
	}
	
	if(flag){
		$("#loginForm").submit();
	}
}
function resetBtn(){
	$("input").val("");
}
function removeErrorInfo(){
	$("#loginerrorinfo").html("");
}