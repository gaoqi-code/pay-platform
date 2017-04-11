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
<title></title>
</head>
<body>
	<div id="common_tag_search" class="common_search">
		<input type="button"  class="btn btn-success" id="add_apptag" value="添加"/>
		<input type="text" id="tagName_search">
		<select id="state_apptag_search"><option value=-1>全部</option><option value=1>有效</option><option value=0>无效</option></select>
		<input type="button"  class="btn btn-primary" id="search_apptag" value="查询"/>
	</div>
<table id="tableAppTag"></table>
<div id="dialog_tagEdit" data-options="closed:true,modal:true,iconCls:'icon-save'" style="padding:5px;width:400px;height:230px;">  
<input type="hidden" id="tagId">
<table>
<tr>
<td class="tableTdRight">名称：</td><td class="tableTdLeft"><input type="text" id="tagName" /></td>
</tr>
<tr>
<td class="tableTdRight">顺序：</td><td class="tableTdLeft"><input type="text" id="tagSeq" /></td>
</tr>
<tr>
<td class="tableTdRight">状态：</td><td class="tableTdLeft"><select id="tagState"><option value="1">有效</option><option value="0">无效</option></select></td>
</tr>
</table>
</div>
</body>
</html>
<!-- validate -->

