package com.hiveview.entity;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 17:01
 */
@XStreamAlias("B2CRep")
public class BanksResponse {
    @XStreamAlias("bankCount")
    private  int bankCount;
    @XStreamAlias("bankList")
    private  BankList bankList;

    public int getBankCount() {
        return bankCount;
    }

    public void setBankCount(int bankCount) {
        this.bankCount = bankCount;
    }

    public BankList getBankList() {
        return bankList;
    }

    public void setBankList(BankList bankList) {
        this.bankList = bankList;
    }
}
