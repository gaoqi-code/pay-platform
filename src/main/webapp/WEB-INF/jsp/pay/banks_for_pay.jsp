<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>选择支付银行</title>
    <script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
</head>
<body>

<div id="testContentDiv"></div>
<script type="text/javascript">

</script>
<div align="center" style="height: 500px; padding-left: 20px; padding-top: 20px;">
    <table border="1px">
        <tr >
            <td colspan="4">总数：${bankCount}</td>
        </tr>
        <tr>
            <td>银行名称</td>
            <td>银行代码</td>
            <td>跨行代码</td>
            <td>支持的银行卡类型</td>
        </tr>

        <c:forEach var ="bank" items="${bankList}">
        <tr>
            <td>${bank.bankName}</td>
            <td>${bank.bankID}</td>
            <td>${bank.otherBankID}</td>
            <td>
                <c:if test="${bank.cardType == '01' }">借记卡</c:if>
                <c:if test="${bank.cardType == '02'}">信用卡卡</c:if>
                <c:if test="${bank.cardType == 'X'}">借记/信用卡都支持</c:if>
            </td>
        </tr>
        </c:forEach>
    </table>
</div>
</body>
</html>