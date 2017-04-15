package com.hiveview.service.impl;

import com.hiveview.dao.UserBalanceDetailMapperDao;
import com.hiveview.dao.UserMapperDao;
import com.hiveview.entity.User;
import com.hiveview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Date;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 17:52
 */
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapperDao userDao;
    @Autowired
    private UserBalanceDetailMapperDao userBalanceDetailDao;

    @Override
    public int updateBalance(long userId, BigDecimal orderAmt) {
        User user=userDao.selectUserByPrimaryKey(userId);
        BigDecimal oldBalance= user.getBalance();
        BigDecimal nowBalance=oldBalance.add(orderAmt);
        user.setBalance(nowBalance);
        user.setUpdateTime(new Date());
        return userDao.updateBalance(user);
    }
}
