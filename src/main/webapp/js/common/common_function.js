$(function() {
});
HIVEVIEW.fn={};
HIVEVIEW.CONSTANT={};
HIVEVIEW.fn.app={
		"category":function(selectId){
			$.post("apptag/getCategroyListByPage.json",{"state":1,"rows":100},function(data){
				var rows=data.rows;
				HIVEVIEW.CONSTANT.appCategory=data.rows;
				$("#category").html('');
				if(rows.length==0)
					return;
				for(var i=0;i<rows.length;i++){
					$("#"+selectId).append('<option value='+rows[i].categoryId+'>'+rows[i].categoryName+'</option>');
				}
			},"json");
		}
};