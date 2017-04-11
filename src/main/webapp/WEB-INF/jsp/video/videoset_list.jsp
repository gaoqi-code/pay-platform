<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>专辑管理</title>
<jsp:include page="../../jsp_css/commoncss.jsp"></jsp:include>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'视频管理'" class="regionCenter">
<input type="hidden" id="commonVideosetid">
<input type="hidden" id="videosetType_common">
	<table id="tableDiv"></table>
	<div id="common_search" class="common_search">
	<input type="button"  class="btn btn-success" id="add_t" value="添加"/>
	<input type="button"  class="btn btn-success" id="sync_videoset" value="同步" style="display:none;"/>
	<input type="text" id="videoSetName" placeholder="请输入视频集名称" />
	<select id="class_first" style="width:140px;"></select>
	<select id="isEffective_search" style="width:140px;"><option  value="1">上线</option><option value="0">下线</option><option value="-1">初始</option></select>
	<button class="btn btn-primary" onclick="videoSetSearch()">查询</button>
	</div>
</div>
	<div id="dialog" data-options="closed:true,modal:true" style="padding:5px;width:770px;height:530px;">  
<form id="videoSetForm">
    	<input type="hidden" id="videosetId">
    	<input type="hidden" id="uploadFlag">
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text"  class="easyui-validatebox" data-options="required:true" id="videosetName" /></td><td class="tableTdRight" style="width:85px;">类型：</td><td class="tableTdLeft"><select id="videoSetType"><option value="1">电视剧</option></select></td><td rowspan="3" class="tableTdRight">缩略图：</td>
<td class="tableTdLeft" rowspan="3" style="height:80px">
	<span id="showImgUrlDiv" style="display: inline-block;vertical-align: middle;"></span>
	<input type="hidden" id="imgUrl"/>
	<span><input type="button" id="uploadify_videoset" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="imgVideoUpload" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
<tr>
<td class="tableTdRight">年份：</td><td class="tableTdLeft"><input type="text" class="required" name="years" id="years" /></td><td class="tableTdRight">上映时间：</td><td class="tableTdLeft"><input type="text" id="isSuetime" name="isSuetime" /></td>
</tr>
<tr>
<td class="tableTdRight">主演：</td><td class="tableTdLeft"><input type="text" id="actors" /></td><td class="tableTdRight">导演：</td><td class="tableTdLeft"><input type="text" class="required" name="director" id="director" /></td>
</tr>
<tr>
<td class="tableTdRight">看点：</td><td  class="tableTdLeft"><input type="text" id="videosetFocus" /></td><td class="tableTdRight">总集数：</td><td class="tableTdLeft"><input type="text" id="videosetTotal" name="videosetTotal" value="1" class="easyui-validatebox" data-options="required:true,validType:'number'"/></td><td rowspan="3" class="tableTdRight">二维码：</td>
<td class="tableTdLeft" rowspan="3" style="height:80px">
	<img id="twoDimCode" alt="" src="" style="width:80px;height:80px">
	<input type="button" id="twoDimCodeBtn" class="btn btn-inverse" value="选择"/>
</td>
</tr>
<tr>
<td class="tableTdRight">关键字：</td><td class="tableTdLeft"><input type="text" id="keyWord" /></td><td class="tableTdRight">标签：</td><td class="tableTdLeft"><input type="text" class="required" id="tag" /></td>
</tr>
<tr>
<td class="tableTdRight">顺序：</td><td class="tableTdLeft"><input type="text" id="seq" /></td>
<td class="tableTdRight">是否多集：</td>
<td class="tableTdLeft"><select id="isSeries"><option value=0>单集</option><option value=1>多集</option></select></td>
</tr>
<tr>
<td class="tableTdRight">时长：</td><td class="tableTdLeft"><input type="text" id="timeLength" /></td>
<td class="tableTdRight">更新集数：</td>
<td class="tableTdLeft"><input type="text" id="videosetUpdate" /></td><td rowspan="3" class="tableTdRight">竖图：</td>
<td class="tableTdLeft" rowspan="3" style="height:80px">
	<span id="showVideosetTvImgDiv" style="display: inline-block;vertical-align: middle;"></span>
	<input type="hidden" id="videosetTvImg"/>
	<span><input type="button" id="uploadify_videosetTvImg" value="浏览" class="btn btn-inverse">
	<input type="file" class="fileCommon"></span><span id="videosetTvImgUpload" style="display:none;"><img src="images/uploading.gif"></span>
</td>
</tr>
<tr>
<td class="tableTdRight">简介：</td><td colspan="3" class="tableTdLeft"><textarea id="videosetBrief" class="required" name="videosetBrief" rows="4" style="width:399px;"></textarea></td>
</tr>
<tr>
<td class="tableTdRight">评分：</td>
<td class="tableTdLeft"><input type="text" id="score" value=0 /></td>
<td class="tableTdRight">是否3D：</td>
<td class="tableTdLeft"><select id="is3D"><option value=0>非3D</option><option value=1>3D</option></select></td>
</tr>
<tr>
<td class="tableTdRight">是否3D：</td>
<td class="tableTdLeft"><select id="is3D"><option value=0>非3D</option><option value=1>3D</option></select></td>
<td class="tableTdRight"></td>
<td class="tableTdLeft"></td>
</tr>
</table>
</form>
    </div>
<div id="dialog_groupVideo" data-options="closed:true,modal:true" style="padding:5px;width:720px;height:450px;">
<table id="tableGroupVideo"></table>
	<div id="common_search_groupVideo" class="common_search">
	<input type="text" id="videoName_groupVideo_search" placeholder="请输入剧集名称" />
	<select id="videoType_groupVideo"><option value=6>综艺</option></select>
	<select id="videoState_groupVideo" style="width:100px;"><option value="-1">初始</option><option value="1">已上线</option></select>
	<input type="text" id="playLength_video" placeholder="单位/分" style="width:50px;" value="1">
	<button class="btn btn-primary" onclick="VIDEOSET.SYNC.search()">查询</button>
	<button class="btn btn-primary"  id="sync_groupVideo">确认</button>
	</div>
</div>

<div id="dialog_sync" data-options="closed:true,modal:true,iconCls:'icon-save'" style="padding:5px;width:720px;height:450px;">
	<div id="common_search_sync" class="common_search">
	<input type="text" id="videoName_sync_search" placeholder="请输入剧集名称" />
	<select id="videosetType_sync"><option value="1">电影</option></select>
	<select id="videosetState_sync"><option value="0">待上线</option><option value="1">已上线</option></select>
	<button class="btn btn-primary" onclick="videoSyncSearch()">查询</button>
	<button class="btn btn-primary"  id="sync_video">同步</button>
	</div>
	<table id="tableSync"></table>
</div>
<div id="dialog_video" data-options="closed:true,modal:true" style="padding:5px;width:845px;height:525px;">
<table id="tableVideo" style="height:240px;width:820px;"></table>
<table id="tableVideoUrl" style="height:235px;width:820px;"></table>
	<div id="common_search_video" class="common_search">
	<input type="button"  class="btn btn-success" id="add_video" value="添加"/>
	<input type="text" id="videoName_search" placeholder="请输入剧集名称" />
	<select id="isEffective_video_search" style="width:140px;"><option  value="1">上线</option><option  value="0">下线</option><option  value="-1">初始</option></select>
	<button class="btn btn-primary" onclick="videoSearch()">查询</button>
	<button class="btn btn-primary" id="changeStateForVideoButton">上线</button>
	</div>
	<div id="common_search_videoUrl" class="common_search">
	<input type="button"  class="btn btn-success" id="add_videoUrl" value="添加"/>
	</div>
</div>
<div id="dialog_cast" data-options="closed:true,modal:true" style="padding:5px;width:850px;height:525px;">
<input type="hidden" id="videosetId_cast">
<table id="tableVideosetCast" style="height:240px;width:820px;"></table>
<table id="tableCast" style="height:205px;width:820px;"></table>
	<div id="common_search_videosetCast" class="common_search">
	<input type="text" id="videosetCastName_search" placeholder="请输入人物名称" />
	<input type="button"  class="btn btn-success" onclick="videosetCastSearch()" value="查询"/>
	</div>
	<div id="common_search_cast" class="common_search">
	<input type="text" id="castName_search" placeholder="请输入人物名称" />
	<select id="type_common_search_cast" style="width:140px;"></select>
	<input type="button"  class="btn btn-success" onclick="castListSearch()" value="查询"/>
	</div>
</div>
<div id="dialog_matrix" data-options="closed:true,modal:true,iconCls:'icon-save',title:'影评搜索'" style="padding:5px;width:520px;height:550px;">
	<div id="matrix_search_bar" class="common_search">
		<input type="text" id="matrix_video_name" placeholder="请输入搜索名称" />
		<input type="button"  class="btn btn-success" id="matrix_video_search" value="搜索"/>
	</div>
	<table id="table_matrix"></table>
</div>

<div id="dialog_moveVideo" data-options="closed:true,modal:true,title:'置顶'" style="padding:5px;width:350px;height:200px;">
	<input type="hidden" id="moveVideosetId">
	<input type="hidden" id="moveVideosetSeq">
	<table>
	<tr><td>视频名称：</td><td><input type="text" id="moveVideosetName"></td></tr>
	<tr><td>移动位置：</td><td><input type="text" id="moveVideosetSeq_"> 输入范围：1-50</td></tr>
	</table>
</div>

<div id="dialog_relateClass" data-options="closed:true,modal:true" style="padding:5px;width:700px;height:400px;">
	<div id="common_relateClass_search" class="common_search">
	<input type="button"  class="btn btn-success" id="add_relateClass" value="添加"/>
	</div>
	<table id="tableRelateClass"></table>
</div>

<div id="dialog_relateClassEdit" data-options="closed:true,modal:true" style="padding:5px;width:500px;height:240px;">
<input type="hidden" id="firstclassId_relateclass">
<input type="hidden" id="videosetId_relateclass">
<form id="relateClassEditForm">
<table>
<tr>
<td class="tableTdRight">顺序：</td><td class="tableTdLeft"><input type="text" class="required" id="sequence_relateclass" /></td><td>　</td>
</tr>
<tr>
<td class="tableTdRight">二极标签：</td><td class="tableTdLeft">
<select id="secondclassId_relateclass"></select>
</td><td></td>
</tr>
<tr>
<td class="tableTdRight">三级标签：</td><td class="tableTdLeft">
<select id="thirdclass_relateclass"></select>
</td>
</tr>
</table>
</form>
</div>

<jsp:include page="../../jsp/video/video_list.jsp"></jsp:include>
<jsp:include page="../../jsp/video/videourl_list.jsp"></jsp:include>
<jsp:include page="../../jsp/video/videosetRelated_list.jsp"></jsp:include>
	<script type="text/javascript" src="js/video/videoset_list.js"></script>
	<script type="text/javascript" src="js/video/video_list.js"></script>
	<script type="text/javascript" src="js/video/videourl_list.js"></script>
	<script type="text/javascript" src="js/video/videosetRelate_list.js"></script>
	<script type="text/javascript" src="js/common/jquery/jquery.ajaxupload.js"></script>
</body>
</html>