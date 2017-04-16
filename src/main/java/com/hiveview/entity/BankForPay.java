package com.hiveview.entity;

import com.thoughtworks.xstream.annotations.XStreamAlias;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 15:27
 */

public class BankForPay {

    private  String bankName;
    private  String bankID;
    private  String otherBankID;
    private  String cartType;

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankID() {
        return bankID;
    }

    public void setBankID(String bankID) {
        this.bankID = bankID;
    }

    public String getOtherBankID() {
        return otherBankID;
    }

    public void setOtherBankID(String otherBankID) {
        this.otherBankID = otherBankID;
    }

    public String getCartType() {
        return cartType;
    }

    public void setCartType(String cartType) {
        this.cartType = cartType;
    }
}
