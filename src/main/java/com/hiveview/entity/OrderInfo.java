package com.hiveview.entity;

import java.math.BigDecimal;
import java.util.Date;

public class OrderInfo {

    public static final int ORDER_SATTUS_PAY=0;//0 待支付
    public static final int ORDER_SATTUS_COMPLETE=100;// 1 支付成功
    public static final int ORDER_SATTUS_FAIL=400;//2 支付失败
    public static final int ORDER_SATTUS_REFUNDED=300;//已退款
    public static final int ORDER_SATTUS_STATEMENT=200;//已结算

    private Integer id;

    private String productName;

    private Integer dataStatus;

    private BigDecimal totalFee;

    private Date addTime;

    private Date updateTime;

    private Integer userId;

    private String orderNo;
    private String tradeNo;
    private String businessNo;

    private String notifyUrl;//服务器异步通知页面路径

    private String returnUrl;//页面跳转同步通知页面路径
    private String fromIp;//来源ip
    private String fromOs;//来源系统标识

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(Integer dataStatus) {
        this.dataStatus = dataStatus;
    }

    public BigDecimal getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(BigDecimal totalFee) {
        this.totalFee = totalFee;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getTradeNo() {
        return tradeNo;
    }

    public void setTradeNo(String tradeNo) {
        this.tradeNo = tradeNo;
    }

    public String getNotifyUrl() {
        return notifyUrl;
    }

    public void setNotifyUrl(String notifyUrl) {
        this.notifyUrl = notifyUrl;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public String getBusinessNo() {
        return businessNo;
    }

    public void setBusinessNo(String businessNo) {
        this.businessNo = businessNo;
    }

    public String getFromIp() {
        return fromIp;
    }

    public void setFromIp(String fromIp) {
        this.fromIp = fromIp;
    }

    public String getFromOs() {
        return fromOs;
    }

    public void setFromOs(String fromOs) {
        this.fromOs = fromOs;
    }
}