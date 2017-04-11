var back_data = {};
var dataTable = {};
var imgHrefValue="";
var table_content = "";
var _tableID = "";
var allCount = -1;
var chooseTr=0;//记录是否选择行，用于在每一行加一人上radio,check
var reserveValue = -100;//备用字段
//var testData = {"data":{"allCount":739241,"currentPage":1,"list":[{"endTime":null,"resourceAreas":"全国","resourceAuditState":1,"resourceCount":1,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":114069,"resourceImg":"","resourceTime":"2011-06-01 14:31:00","resourceTitle":"化肥：部分地区复合肥价格情况","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:22:27","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":2,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114068,"resourceImg":"","resourceTime":"2011-06-01 14:30:59","resourceTitle":"马铃薯施氮磷钾的比例","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:22:06","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":0,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114067,"resourceImg":"","resourceTime":"2011-06-01 14:30:57","resourceTitle":"如何对老菜地进行改良","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:21:40","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":0,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114066,"resourceImg":"","resourceTime":"2011-06-01 14:30:57","resourceTitle":"农药除草剂的分类","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:21:04","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":0,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114065,"resourceImg":"","resourceTime":"2011-06-01 14:30:45","resourceTitle":"化学除草存在问题及对策","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:20:31","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":0,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114064,"resourceImg":"","resourceTime":"2011-06-01 14:30:32","resourceTitle":"棉花田药害发生原因和补救措施","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:20:02","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"全国","resourceAuditState":0,"resourceCount":1,"resourceEvaluate":{"rateClick":0,"recommendCount":0},"resourceId":114063,"resourceImg":"","resourceTime":"2011-06-01 14:30:31","resourceTitle":"水稻干尖线虫病的发生与防治","resourceType":3625,"resourceUpdateTime":"2013-04-29 16:19:02","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":17,"recommendCount":0},"resourceId":214,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg338.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"香椿高效栽培","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:07:32","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":5,"recommendCount":0},"resourceId":211,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg333.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"温室黄瓜的定植技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:07:05","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":4,"recommendCount":0},"resourceId":209,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg330.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"脱毒红薯高产栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:06:38","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":6,"recommendCount":0},"resourceId":206,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg326.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"塑料大棚春黄瓜提前栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:06:13","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":5,"recommendCount":0},"resourceId":198,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg315.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"秋播大白菜优质丰产栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:05:50","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":3,"recommendCount":1},"resourceId":681,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg283.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"温室西葫芦栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:05:25","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":4,"resourceEvaluate":{"rateClick":6,"recommendCount":0},"resourceId":425,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg282.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"马铃薯高产技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:04:58","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":4,"recommendCount":0},"resourceId":680,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg281.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"温室蔬菜有机栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:04:32","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":4,"recommendCount":0},"resourceId":679,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg278.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"温室辣椒早春栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:04:06","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":3,"recommendCount":0},"resourceId":678,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg276.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"吐鲁番温室辣椒秋延晚栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:03:34","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":677,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg274.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"吐鲁番地区温室蔬菜病虫害综合防治技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:03:06","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":676,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg272.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"吐鲁番地区日光温室蔬菜冬季安全管理技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:02:39","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":675,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/xjsczz001.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"蔬菜病虫害非化学防治","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:02:14","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":6,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":411,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg255.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"黄瓜病虫害防治","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:01:50","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":410,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg254.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"黄瓜高效栽培技术上","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:01:24","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":4,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":409,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg253.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"番茄优质高效栽培","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:00:54","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":142,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg233.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"蔬菜无土栽培新技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:00:29","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":7,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":125,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg210.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"魔芋种植技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 17:00:04","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":616,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg195.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"马铃薯高效栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:59:40","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":89,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg183.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"樱桃番茄种植技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:59:14","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":88,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg182.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"樱桃萝卜栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:58:46","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":590,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg168.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"无公害茄子防治技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:58:20","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":71,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg164.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"象牙菜栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:57:52","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":70,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg163.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"芽苗菜的高产栽培技术(二)","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:57:29","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":69,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg162.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"芽苗菜高产栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:56:54","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":67,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg160.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"芽苗菜无土栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:56:30","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":66,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg158.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"南方设施蔬菜新技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:56:04","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":577,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg157.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"雪梨包心菜的日光温室种植技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:55:38","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":4,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":65,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg155.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"绿色芽菜生产技术-1","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:55:11","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":64,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg152.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"苦苣的栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:54:41","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":63,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg151.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"苦瓜栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:54:13","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":570,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg147.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"芹芽栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:53:48","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":58,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg146.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"黑番茄栽培管理技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:53:22","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":56,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg143.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"瓜果类蔬菜施肥技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:52:56","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":1,"recommendCount":0},"resourceId":55,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg142.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"根用芥菜高产栽培及加工技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:52:21","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":54,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg140.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"菜豆高产栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:51:55","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":53,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg138.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"荸荠栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:51:26","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":51,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg134.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"白玉春萝卜栽培技术","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:50:59","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":562,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg133.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"薯芋类蔬菜病虫害及防治（二）","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:50:33","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":41,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg124.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"莲藕优质高产栽培","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:49:50","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":5,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":40,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg123.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"茭白、青花菜、西生菜、冬瓜01","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:49:21","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":2,"recommendCount":0},"resourceId":39,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg122.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"农家致富小窍门-韭菜优质高效栽培","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:48:37","startTime":null,"userInfo":{"userName":"农技推广"}},{"endTime":null,"resourceAreas":"","resourceAuditState":0,"resourceCount":3,"resourceEvaluate":{"rateClick":3,"recommendCount":0},"resourceId":38,"resourceImg":"upload/nongkeyuan/videothumbs_basic_data/videoimg121.jpg","resourceTime":"2012-10-21 22:25:17","resourceTitle":"农家致富小窍门-大姜优质高效栽培","resourceType":3841,"resourceUpdateTime":"2013-03-19 16:46:08","startTime":null,"userInfo":{"userName":"农技推广"}}],"pageSize":50},"msg":"success"};
(function(){  
	  window['_G'] = {};
})();


(function() {
	//从后台取出的数据，【为一个JSON结构的数据】
	//var back_data = new Array();
    //定义一个createTable函数  
    function createTable() {
    	var data = arguments[0];
    	
    	if (data['operateTr'] == "radio") {
    		chooseTr = 1;
    	} else if (data['operateTr'] == "checkbox") {
    		chooseTr = 2;
    	} else {
    		chooseTr = 0;
    	}
    	
    	if(!arguments[1]){
    		createTableHeader(data);
    	}
		
		
    	var tempData = new Array();
    	this.tableId = data.ID["listID"];
    	this.back_data = tempData;
    	this.content = null;
    	this.currentPage = 1;
    	this.pageSize = 10;
    	$('#'+data.ID["listID"]).html('<tr><td><img src="images/common/loading.gif"></td></tr>');
    	_tableID=data.ID["listID"];
    	//通过post方式向url里获得JSON结构的数据
        $.ajax({
            type: "POST",
            dataType: "json",
            url: data.url,
            async: false,
            data: data.parameter,
            success: function(backData){
        		//backData = testData;
        		if("failure"==backData.msg){
        			$('#'+data.ID["listID"]).html("<tr><td>程序异常!</td></tr>");
        			return;
        		}
        		var tableList = backData.list;
        		back_data = tableList;
        		tempData.push(tableList);
        		
        		allCount = backData.allCount;
        		
        		//********************************************** 生成表格 start *****************************************//
        		//table_content= '<div id="listCss"><table class="x-table">';
        		if(null==back_data||0==allCount){
        			$('#'+data.ID["listID"]).html("<tr><td>无信息</td></tr>");
        			//document.getElementById(data.ID["pageID"]).style.display = "none";
        			$("#"+data.ID["pageID"]).hide();
        			return;
        		}else{
        			$("#"+data.ID["pageID"]).show();
        		}
        		$('#'+data.ID["listID"]).html("");//置空表格
        		for(var currentArrayIndex=0; currentArrayIndex<back_data.length;currentArrayIndex++){
        			table_content = '';
        			var rowId="";
        			if(chooseTr==1){
        				table_content += '<tr id="tr_'+currentArrayIndex+'"><td style="width:40px;"><div><input type="radio" name="tableRadio"></div></td>';   				
        			}else if(chooseTr==2){
        				table_content += '<tr id="tr_'+currentArrayIndex+'"><td style="width:30px;"><div><input type="checkbox" name="tableCheckbox"></div></td>';
        			}else{
        				table_content += '<tr id="tr_'+currentArrayIndex+'">';
        			}
        			var rowTdIndex = 0;
        			for(var key in data['field']){
        				//记录一个每一行的主键标识
        				if(rowId==""){
        					if(typeof back_data[currentArrayIndex][key] == "string"){
        						rowId='"'+back_data[currentArrayIndex][key]+'"';
        					}else{
        						rowId=back_data[currentArrayIndex][key];
        					}
        				}
        				
        				//记录每一个单元格是否要做特殊操作
        				var operate = data['field'][key]['operate'];
        				
        				//对json数据作深度解析
        				var keyArray = key.split(".");
        				var tempKey = back_data[currentArrayIndex][keyArray[0]];
        				for(var indexKey=1;indexKey<keyArray.length;indexKey++){
        					back_data[currentArrayIndex][keyArray[indexKey]];
        					if(typeof tempKey == "object"){
        						tempKey=tempKey[keyArray[indexKey]];
        					}
        				}
        				
        				if(operate=="get"){  // 为空不做操作
        					reserveValue = tempKey;
        					//break;
        				}
        				
        				//操作要打印的文本
        				if(null!=data['operateText']&&""!=data['operateText']){
        					for(var operateTextArray=0;operateTextArray<data['operateText'].length;operateTextArray++){
        						if(data['operateText'][operateTextArray][key]!=null){
        							if(0==tempKey){
        								tempKey='<span class="stateClassForZero">'+data['operateText'][operateTextArray][key][tempKey];+'</span>';
        							}else{
        								tempKey=data['operateText'][operateTextArray][key][tempKey];
        							}
        						}
        					}
        				}
        				
        				//操作TdCss
        				if(null!=data['operateTdCss']&&""!=data['operateTdCss']){
        					table_content+='<td id="td_'+rowId+'_'+rowTdIndex+'" style="';
        					for(var operateTdCssArray=0;operateTdCssArray<data['operateTdCss'].length;operateTdCssArray++){
        						if(data['operateTdCss'][operateTdCssArray][key]!=null){
        							var tempCssProperty = data['operateTdCss'][operateTdCssArray][key];
        							for(var cssProperty in tempCssProperty){
        								table_content+=cssProperty+':'+tempCssProperty[cssProperty]+';';
        							}
        							break;
        						}
        					}
        					table_content+='"><div>';
        				}else{
        					table_content+='<td  id="td_'+rowId+'_'+rowTdIndex+'"><div>';
        				}
        				rowTdIndex++;//追加一个单元格则rowTdIndex+1。
        				if(operate==null){  // 为空不做操作
        					table_content += tempKey;
        				}else{ //不为空，则添加点击事件
        					if(operate=="span"){
        						table_content += '<span class="links" id='+key+rowId+'>'+tempKey+'</span>';
        					}else if(operate=="font"){
        						if(tempKey.length>30){
        							table_content += '<span title="'+tempKey+'" class="links" id='+key+rowId+'>'+tempKey.substring(0, 30)+'...</span>';
        						}else{
               						table_content += '<span class="links" id='+key+rowId+'>'+tempKey+'</span>';
        						}
        					}else if(operate=="img"){
        						var tempCss = new StringBuffer();
        						if(data['field'][key]['css']!=null){
        							for(var str in data['field'][key]['css'][0]){
            							tempCss.append(str).append(":").append(data['field'][key]['css'][0][str]).append(";");
            						}
        						}
        						var attribute = new StringBuffer();
        						if(data['field'][key]['attribute']!=null){
        							for(var str in data['field'][key]['attribute'][0]){
        								attribute.append(str).append('="').append(back_data[currentArrayIndex][data['field'][key]['attribute'][0][str]]).append('"');
            						}
        						}
        						table_content += '<span onclick="'+operate+'OnClick('+rowId+')"><img '+attribute.toString()+' style="'+tempCss.toString()+'" src="'+tempKey+'" /></span>';
        					}else if(operate=="display"){
        						//table_content += '<a href="javascript:'+operate+'('+rowId+');">'+back_data[currentArrayIndex][key]+'</a>';
        						//$('#td_'+rowId+'_'+rowTdIndex).css("display","none");
        					}else if(typeof operate == "object"){
        						if(operate['format']!=null){
        							table_content += '<span class="links" id='+key+rowId+'>'+operate['format'](back_data[currentArrayIndex]);+'</span>';
        						}else{
        							//table_content += '<span class="links" id='+key+rowId+'>'+back_data[currentArrayIndex][key]+'</span>';
        						}
        					}else{
        						table_content += '<a href="javascript:'+operate+'('+rowId+','+currentArrayIndex+');">'+tempKey+'</a>';
        					}
        				}
        				table_content+='</div></td>';
        			}

        			//追加其它操作=》编辑，删除
        			if(data['operate']!=null){
        				table_content+='<td><div style="white-space: nowrap;">';
        				for(var key in data['operate']){
        					if(typeof data['operate'][key] == "object"){
        						if(data['operate'][key][0]=="format"){
        							table_content+=data['operate'][key][1](back_data[currentArrayIndex],currentArrayIndex);
        						}else if(reserveValue==-100){
        							table_content += '<button id='+key+rowId+' class="'+data['operate'][key][1]+'" onclick='+key+'('+rowId+','+currentArrayIndex+')>'+data['operate'][key][0]+'</button> ';
        						}else{
        							var operateIndex = reserveValue%2==0?reserveValue:reserveValue+1;
        							var operateCssIndex = reserveValue%2==1?3:1;
        							table_content += '<button id='+key+rowId+' class="'+data['operate'][key][operateCssIndex]+'" onclick='+key+'('+rowId+','+currentArrayIndex+')>'+data['operate'][key][operateIndex]+'</button> ';
        							operateIndex=null;
        							operateCssIndex=null;
        							reserveValue = -100;
        						}
        					}else if(key=="format"){
        						table_content+=data['operate'][key](back_data[currentArrayIndex],currentArrayIndex);
        					}else{
        						table_content += '<a href="javascript:'+key+'('+rowId+','+currentArrayIndex+')">'+data['operate'][key]+'</a>';
        					}
        				}
        				table_content+='</div></td>';
        			}
        			table_content += '</tr>';
        			
        			if(data.ID["listID"]!=null){
        				$('#'+data.ID["listID"]).append(table_content);
        				appendOverForOperate(currentArrayIndex,rowId);
        			}
        			
        		}
        		//table_content += '</table></div><div style="clear:both;"></div>';
        		//$('#'+data.ID["listID"]).html(table_content);
        		
    			if(null!=data['operatesProperty']){
    				if(null!=data['operatesProperty']['img']){
    		    		$('img').error(function() {
    		    			$(this).attr("src", "images/common/error1.gif");
    		    		});
    				}
    			}
    			
    			bindTableChangeTrColor(data.ID["listID"]);
    			bindTableClickTrColor(data.ID["listID"]);
    			if(data.ID["pageID"]!=null){
    				//调用分页  //backData.currentPage
    				initPage(data.ID["pageID"], backData.allCount, backData.pageSize, backData.currentPage);	
    				$("#"+data.ID["pageID"]+" .pagination-page-list").val(data['parameter']['pageSize']);
	    			var allPage = Math.ceil(backData.allCount/backData.pageSize);
	    			//绑定回到首页
	    			$("#"+data.ID["pageID"]+" .pagination-start").click(function(val){
	    				if(data.parameter.currentPage==1){
	    					return;
	    				}
	    				data.parameter.currentPage=1;
	    				reCreate(data);
	    			});
	    			//绑定跳到尾页
	    			$("#"+data.ID["pageID"]+" .pagination-end").click(function(val){
	    				if(data.parameter.currentPage==allPage){
	    					return;
	    				}
	    				data.parameter.currentPage=allPage;
	    				reCreate(data);
	    			});
	    			
	    			//绑定跳到指定页
	    			$("#"+data.ID["pageID"]+" .pagination-num").click(function(val){
	    				data.parameter.currentPage=parseInt(this.innerHTML);
	    				reCreate(data);
	    			});
	    			
	    			//绑上一页
	    			$("#"+data.ID["pageID"]+" .pagination-prev").click(function(val){
	    				if(data.parameter.currentPage==1){
	    					return;
	    				}
	    				data.parameter.currentPage=data.parameter.currentPage-1;
	    				reCreate(data);
	    			});
	    			
	    			//绑定下一页
	    			$("#"+data.ID["pageID"]+" .pagination-next").click(function(val){
	    				if(data.parameter.currentPage==allPage){
	    					return;
	    				}
	    				data.parameter.currentPage=parseInt(data.parameter.currentPage)+1;
	    				reCreate(data);
	    			});
	    			
	    			//绑定变化
	    			$("#"+data.ID["pageID"]+" .pagination-page-list").change(function(val){
	    				data.parameter.currentPage=1;
	    				data.parameter.pageSize=this.value;
	    				reCreate(data,tableList);
	    			});
    			
    			}
    			/***********js控制表头与表身的宽度对齐**********/
    			if("none"!=data.ID["listID"])
    				theaderAndtfoot(data.ID["listID"]);
    			
    			return this;
            }});
        
        
        //var ss = this.back_data
        this.getRow = function(dataIndex){
        	return dataTable[data.ID["listID"]].content[dataIndex];
        };
        
    }
    //把$函数注册到G命名空间中  
    window['_G']['createTable'] = createTable;  
})();

//生成表头
function createTableHeader(){
	var data = arguments[0];

	/*** 生成表头 start ***/
	var table_head = new StringBuffer();
	if(data['table_head']!=null){
		if(chooseTr==1){
			table_head.append('<tr id="t_head"><th><div>选择</div></th>');
		}else if(chooseTr==2){
			table_head.append('<tr id="t_head"><th><div><input class="header-check" type="checkbox" name="tableCheckbox"></div></th>');
		}else{
			table_head.append('<tr id="t_head">');
		}
		for(var key in data['table_head']){
			table_head.append('<th><div>'+key+'</div></th>');
		}
		table_head.append('</tr>');
	}
	//$('#'+data.ID["listID"]+'_table').html(table_head);
	$('#'+data.ID["listID"]+'_header').html(table_head.toString());//生成表头
	/*** 生成表头 end ***/
}

//实例表格
function getDataTable(){
	dataTable[arguments[0].ID["listID"]]=new _G.createTable(arguments[0]);
	dataTable[arguments[0].ID["listID"]].content = back_data;//dataTable[arguments[0].ID["listID"]].back_data[0];
	dataTable[arguments[0].ID["listID"]].currentPage=arguments[0]['parameter']['currentPage'];
	dataTable[arguments[0].ID["listID"]].pageSize=arguments[0]['parameter']['pageSize'];
	return dataTable[arguments[0].ID["listID"]];
}

//重新生成表格
function reCreate(){
	var newTable = new _G.createTable(arguments[0],true).checkboxSelectAndCannel(arguments[0].ID["listID"]);
	if(dataTable[arguments[0].ID["listID"]]!=null){
		dataTable[arguments[0].ID["listID"]].content = newTable.back_data[0];
		dataTable[arguments[0].ID["listID"]].currentPage=arguments[0]['parameter']['currentPage'];
		dataTable[arguments[0].ID["listID"]].pageSize=arguments[0]['parameter']['pageSize'];
	}
}

/** bind mouse event**/
function bindTableChangeTrColor(targetId){
	/* 一级菜单 */
	$('#'+targetId+' tr').each(function(index){
		$(this).mouseover(function(){
			$(this).css("background","#F8F8F8");
		}).mouseout(function(){
			$(this).css("background","#FFFFFF");
		});
	});
}

/** bind click event**/
function bindTableClickTrColor(targetId){
	/* 一级菜单 */
//	$('#'+targetId+' tr').each(function(index){
//		$(this).click(function(){
//			console.log("=========="+index);
//		});
//	});
}

//控制表头与表身的宽度对齐
function theaderAndtfoot(tableId){
	var table_header =document.getElementById(tableId+"_header");
	var table =document.getElementById(tableId);
	if(table_header==null||table==null||table.rows[0]==null){
		return;
	}
	var tds = table.rows[0].cells;
	if(tds.length<=1){
		return;
	}
	var ths=table_header.rows[0].cells;
	var ths_index = 0;
	var table_width=0;
	var tempWidth = 0;//记录第一个单元格里div的宽度
	for(var i=0;i<tds.length;i++){
		if($(tds[i]).css('display')=="none"){
			continue;
		}
		
		if(i!=tds.length-1){
			//$(tds[i]).children("div").width($(tds[i]).children("div").width());
			tempWidth = $(tds[i]).children("div").width();
			//$(tds[i]).children("div").width(tempWidth);
			$(ths[ths_index]).children("div").width(tempWidth);
			//console.log(tempWidth);
			table_width += tempWidth;
		}else{
			if($('#'+_tableID).height()>$('#'+_tableID).parent().height()){
				//$(tds[i]).children("div").width($(tds[i]).children("div").width()-14);
				tempWidth = $(tds[i]).children("div").width();
				table_width+=tempWidth;
				//$("#"+tableId).parent("div").width();
				//$(ths[ths_index]).children("div").width(tempWidth+$("#"+tableId).parent("div").width()-table_width);
				$(ths[ths_index]).children("div").width(tempWidth+14);
			}else{
				$(ths[ths_index]).children("div").width($(tds[i]).children("div").width());
			}
		}
		ths_index++;
	}
}

/*** 当浏览器宽度发生改变时同时调整表头与表格的宽度  ***/
$(window).resize(function() {theaderAndtfoot(_tableID);});

_G.createTable.prototype.tableCallBack = function(callbackdata){
	var windowobj = $(window);
//	var browserwidth = windowobj.width();
	var browserheight = windowobj.height();
	var	scrollLeft = windowobj.scrollLeft();
	var	scrollTop = windowobj.scrollTop();
 
	var dialog_targetDiv = $('#'+callbackdata);
	dialog_targetDiv.width();
	
	$('#'+callbackdata).css("top",(browserheight - dialog_targetDiv.height())/2+"px");
	return this;
};

/**对齐表身与表头**/
_G.createTable.prototype.changeTheaderAndtfoot = function(callbackdata){
	var table_header =document.getElementById(callbackdata+"_header");
	var table =document.getElementById(callbackdata);
	if(table_header==null||table==null||table.rows.lenght==0){
		return this;
	}
	var tds = table.rows[0].cells;
	var ths=table_header.rows[0].cells;
	var ths_index = 0;
	for(var i=0;i<tds.length;i++){
		if($(tds[i]).css('display')=="none"){
			continue;
		}
		if(i!=tds.length-1){
			$(ths[ths_index]).children("div").width($(tds[i]).children("div").width());
		}else{
			if($('#'+_tableID).height()>$('.tableDiv').height()){
				$(ths[ths_index]).children("div").width($(tds[i]).children("div").width()+14);
			}else{
				$(ths[ths_index]).children("div").width($(tds[i]).children("div").width());
			}
		}
		ths_index++;
	}
	return this;
};

//复选框的全选和取消全选
_G.createTable.prototype.checkboxSelectAndCannel = function(callbackdata){
	$("#"+callbackdata+"_header input[type='checkbox']").click(function(){
		var objs = document.getElementsByName("tableCheckbox");
		if($("input[type='checkbox']").eq(0).is(':checked')){
			for(var i=1;i<objs.length;i++){
				objs[i].checked = true;
			}
		}else{
			for(var i=1;i<objs.length;i++){
				objs[i].checked = false;
			}
		}
	});
	return this;
};

//当单元格生成一行之后调用的函数
function appendOverForOperate(){
	
}

//////////////////////////////////////////////////
var currentPageSize = 10;
function initPage(){
	
	var pageDetailId = arguments[0];
	var allCount = arguments[1];
	var pageSize = arguments[2];
	var currentPage = arguments[3];
	
	$("#" + pageDetailId).html("");
	if (allCount == 0)
		return;
	var sbody = "";
	/*总页数*/
	var allpage = allCount % pageSize == 0 ? allCount / pageSize
			: (allCount - allCount % pageSize) / pageSize + 1;
	//js中的运算符/不同于java中的运算符/
	//js：	9 / 10 = 0.9
	//java:	9 / 10 = 0;
	/*是否有上一页*/
	var hasPrePage = null;
	/*是否有下一页*/
	var hasNextPage = null;
	/* 显示开始 */
	var showStart = 1;
	/* 显示结束 */
	var showEnd = 1;
	if (currentPage < 1)
		currentPage = 1;
	if (currentPage > allpage)
		currentPage = allpage;
	hasPrePage = currentPage > 1 ;
	hasNextPage = currentPage < allpage;
	showStart = currentPage - 5 <= 1 ? 1 : currentPage + 5 >= allpage 
			? allpage>10?allpage - 10 : 1:currentPage - 5;
	showEnd = currentPage + 5 <= allpage ? currentPage + 5 <= 11 ? allpage>=11 ? 11:allpage : currentPage + 5
			: currentPage + 5 >= allpage ? allpage : currentPage + 5;

			sbody+='<span>每页<select class="pagination-page-list"><option value=10>10</option><option value=50>50</option><option value=100>100</option><option value=300>300</option><option value=500>500</option></select>条 ';

	sbody +=" 共"+allCount+"条"+allpage+"页</span> ";
	
	sbody +="<a href='javascript:;' class='pagination-start'>首页</a>&nbsp;&nbsp;";
	sbody +="<a href='javascript:;' class='pagination-prev'>上一页</a>&nbsp;&nbsp;";
	
	for(var i = showStart ; i < currentPage ; i++)//当前页之前的页码
			sbody += "<a href='javascript:void(0);' class='pagination-num'>" 
			+ i + "</a>";
	if(undefined == currentPage){
		currentPage = "";
	}
	//当前页
	sbody +="<span class='current'>"+currentPage+"</span>";
	
	//当前页之后的页码
	for(var i = currentPage + 1 ; i <= showEnd ;i++){
		sbody += "<a href='javascript:;' class='pagination-num'>"
			+ i + "</a>";
	}

	
	sbody +="<a href='javascript:;' class='pagination-next'>下一页</a>";
	sbody +="<a href='javascript:;' class='pagination-end'>尾页</a>";
	
//	if(allpage>1){
//		sbody += "&nbsp;&nbsp;&nbsp;&nbsp;<span class='allcount'>跳转到</span><input type='text' id='curPage' class='input_edit' size='1' onkeyup=\"value=value.replace(/[^\\d]/g,'')\"/>";
//		sbody +="<a href='javascript:void(0);' onclick='gotoPage("+$("#curPage").val()+"," + allpage + ");' class='go'>页</a>";
//	}
	$("#" + pageDetailId).append(sbody);
}


function isReadOnly(flag){
	return !flag ? "class='disableButton' disabled='disabled'" : "class='button'";
}

function bindChangePage(){
	currentPageSize = $("#selectPageSize").val();
	parameter['pageSize'] = currentPageSize;
	getList(parameter);
}