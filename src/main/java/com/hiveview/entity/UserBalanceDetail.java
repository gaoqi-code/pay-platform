package com.hiveview.entity;

import java.util.Date;

public class UserBalanceDetail {
    private Integer id;

    private Integer userId;

    private Byte detailType;

    private Long amount;

    private Long nowBalance;

    private Long lastBalance;

    private Date addTime;

    private String orderNo;

    private Byte balofpay;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Byte getDetailType() {
        return detailType;
    }

    public void setDetailType(Byte detailType) {
        this.detailType = detailType;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getNowBalance() {
        return nowBalance;
    }

    public void setNowBalance(Long nowBalance) {
        this.nowBalance = nowBalance;
    }

    public Long getLastBalance() {
        return lastBalance;
    }

    public void setLastBalance(Long lastBalance) {
        this.lastBalance = lastBalance;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Byte getBalofpay() {
        return balofpay;
    }

    public void setBalofpay(Byte balofpay) {
        this.balofpay = balofpay;
    }
}