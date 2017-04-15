package com.hiveview.service;

import java.math.BigDecimal;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 17:52
 */
public interface UserService {
    public int updateBalance(long userId, BigDecimal orderAmt);
}
