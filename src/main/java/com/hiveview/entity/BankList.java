package com.hiveview.entity;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;
import com.thoughtworks.xstream.annotations.XStreamImplicit;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 15:38
 */

public class BankList {
    @XStreamImplicit(itemFieldName="bankRow")
    private List<BankForPay> bankList;

    public List<BankForPay> getBankList() {
        return bankList;
    }

    public void setBankList(List<BankForPay> bankList) {
        this.bankList = bankList;
    }
}
