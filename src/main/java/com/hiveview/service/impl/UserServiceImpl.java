package com.hiveview.service.impl;

import com.hiveview.common.Constants;
import com.hiveview.dao.UserBalanceDetailMapperDao;
import com.hiveview.dao.UserMapperDao;
import com.hiveview.entity.User;
import com.hiveview.entity.UserBalanceDetail;
import com.hiveview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 17:52
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapperDao userDao;
    @Autowired
    private UserBalanceDetailMapperDao userBalanceDetailDao;

    @Override
    public int updateBalance(long userId, BigDecimal orderAmt,String orderNo) {
        User user=userDao.selectUserByPrimaryKey(userId);
        BigDecimal oldBalance= user.getBalance();
        if(null==oldBalance){
            oldBalance=new BigDecimal("0");
        }
        BigDecimal nowBalance=oldBalance.add(orderAmt);
        user.setBalance(nowBalance);
        user.setUpdateTime(new Date());
        saveUserBalanceDetail(oldBalance,nowBalance,orderAmt,orderNo,user.getId());
        return userDao.updateBalance(user);
    }

    public void saveUserBalanceDetail(BigDecimal oldBalance,BigDecimal nowBalance,BigDecimal orderAmt,String orderNo,Integer userId){
        UserBalanceDetail userBalanceDetail=new UserBalanceDetail();
        userBalanceDetail.setOrderNo(orderNo);
        userBalanceDetail.setUserId(userId);
        userBalanceDetail.setAmount(orderAmt);
        userBalanceDetail.setBalofpay(Constants.TRADE_TYPE_CHONGZHI);//消费类型
        userBalanceDetail.setDetailType(Constants.BALOFPAY_TYPE_SHOURU);//收支状态
        userBalanceDetail.setLastBalance(oldBalance);
        userBalanceDetail.setNowBalance(nowBalance);
        userBalanceDetail.setAddTime(new Date());
        userBalanceDetailDao.saveDetail(userBalanceDetail);
    }
}
