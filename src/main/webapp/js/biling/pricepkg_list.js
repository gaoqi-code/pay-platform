//
var parameter = {};
$(function(){
	//init dataGridTable
	BILING_PKG.initDataGrid();
	//init dialog
	$('#detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				BILING_PKG["submitModel"]();
			}
		},{
			text:'取消',
			handler:function(){
				$('#detail_dialog').dialog('close');
			}
		}]
	});
	//open add dialog
	$('#btn_add').click(function(){
		//clear default values
		document.forms["pricepkgForm"].reset();
		$('form input[name="pricePkgId"]').val('');
		$('#pic').attr('src',"");
		$("#uploading_pic").hide();
		$('#detail_dialog').dialog({title:"添加计费包",closed:false});
	});
	_initFileUpload("pic_uploadify",{
		data : {imgName : "bilingPath"},
		onComplete : function(file, response) {// 文件提交完成后可执行的方法
			var imgUrl = ParseTextToJsonObject(response);
			$("#pic").attr("src",imgUrl);
			$("#uploading_pic").hide();
		},
		onSubmit : function(file, extension) {
			if (extension && /^(jpg|png|jpeg|gif)$/.test(extension)) {
				$("#uploading_pic").show();
			} else {
				$.messager.alert(titleInfo, "非图片类型文件，请重传");
				return false;
			}
		}
	 });
});
var BILING_PKG = {
		infoEdit:function(id){
			$('#detail_table').datagrid('selectRecord',id);
			var rowInfo =  $('#detail_table').datagrid('getSelected');
			if(rowInfo){
//				$("#uploading_pic").hide();
//				$('#pricePkgId').val(rowInfo.pricePkgId);
//				$('#seq').val(rowInfo.seq);$('#name').val(rowInfo.name);
//				$('#pic').attr("src",rowInfo.pic);
//				$('#priceDesc').val(rowInfo.priceDesc);
//				$('#price').val(rowInfo.price);
//				$('#vipPrice').val(rowInfo.vipPrice);
//				$('#discountId').val(rowInfo.discountId);
//				$('#discountName').val(rowInfo.discountName);
//				$('#expiryTime').val((rowInfo.expiryTime)/24/60/60);
//				$('#expiryPlay').val(rowInfo.expiryPlay);
//				$('#state').val(rowInfo.state);
				$._setFormData("pricepkgForm",rowInfo);
				$('form input[name="expiryTime"]').val((rowInfo.expiryTime)/24/60/60);
				$("#uploading_pic").hide();
				$('#pic').attr("src",rowInfo.pic);
				$('#detail_dialog').dialog({title:"编辑计费包",closed:false});
			}
		},
		submitModel:function(){
//			var dataInfo={
//					seq:$('#seq').val(),
//					name:$('#name').val(),
//					pic:$('#pic').attr("src"),
//					priceDesc:$('#priceDesc').val(),
//					price:$('#price').val(),
//					vipPrice:$('#vipPrice').val(),
//					discountId:$('#discountId').val(),
//					discountName:$('#discountName').val(),
//					expiryTime:$('#expiryTime').val(),
//					expiryPlay:$('#expiryPlay').val(),
//					state:$('#state').val(),
//					"pricePkgId":$('#pricePkgId').val()
//					};
			var dataInfo = $._getFormData("pricepkgForm");
			if($("#expiryTimeUnit").val()==24)
				dataInfo["expiryTime"]=dataInfo["expiryTime"]*24*60*60;
//			else if($("#expiryTimeUnit").val()=="30"){
//				dataInfo["expiryTime"]=dataInfo["expiryTime"]*24*60*60*30;
//			}
			var pic=$('#pic').attr("src");
			dataInfo["pic"]=pic;
			if(HIVEVIEW.upload.isRsync(pic)){
				_sendFileToServer("bilingPath",HIVEVIEW.upload.separate(pic));
				dataInfo["pic"]=HIVEVIEW.upload.urlCombination({
					"confUrl":HIVEVIEW.upload.conf.bilingPath,"showUrl":pic
				});
			}
			
			if(null==dataInfo["pricePkgId"]||dataInfo["pricePkgId"]==""){
				$.post("pricepkg/add.json",dataInfo,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
						$('#detail_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'保存成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,"保存失败！");
					}
				},"json");
			}else{
				$.post("pricepkg/update.json",dataInfo,function(data){
					if(1==data.code){
						$('#detail_table').datagrid('reload');
						$('#detail_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					}else{
						$.messager.alert(titleInfo,"修改失败！");
					}
				},"json");
			}
		},
		infoDelete:function(pricePkgId){
			$.messager.confirm(titleInfo, '您确定删除吗？', function(r){
				if (r){
					var rowInfo = $('#detail_table').datagrid('getSelected');
					if(rowInfo){
						$.post("pricepkg/delete.json",{"pricePkgId":pricePkgId},function(data){
							if(1==data.code){
								$('#detail_table').datagrid('reload');
								$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
							}else{
								$.messager.alert(titleInfo,"删除失败！");
							}
						},"json");
					}
				}
			});
		},
		initDataGrid:function(){
			$('#detail_table').datagrid({
				nowrap: true,
				autoRowHeight:true,
				striped: true,
				toolbar: "#common_search",
				fit:true,
				fitColumns:true,
				collapsible:true,
				url:'pricepkg/getList.json',
				queryParams:parameter,
				remoteSort: false,
				singleSelect:true,
				idField:'pricePkgId',
				columns:[[
				{field:'seq',title:'顺序',width:100},
				{field:'name',title:'名称',width:100},
				{field:'pic',title:'图片',width:80,formatter:function(val){
					return '<img style="height:40px;" src='+val+'>';
				}},{field:'priceDesc',title:'说明',width:100},
				{field:'price',title:'价格',width:100},
				{field:'vipPrice',title:'会员价',width:100},
//				{field:'discountId',title:'discountId',width:100},
				{field:'expiryTime',title:'使用时间',width:100,formatter:function(val){
					return (val/24/60/60)+"天";
				}},{field:'expiryPlay',title:'使用次数',width:100},
				{field:'state',title:'状态',width:100,formatter:function(val){
					return val==1?'<span class="STATE1">已启用</span>':'<span class="STATE0">未启用</span>';
				}},
				{field:'pricePkgId',title:'操作',width:100,formatter:function(value){
							return '<a href=javascript:BILING_PKG["infoEdit"]('+value+')>编辑</a>'+' <a href=javascript:BILING_PKG["infoDelete"]('+value+')>删除</a>';
						}
					}
				]],
				pagination:true,
				rownumbers:true
			});
		}
};
//dataGrid load data
function searchBilingPkg(){
	parameter["name"]=$("#name_search").val();
	$('#detail_table').datagrid('load',parameter);
}
