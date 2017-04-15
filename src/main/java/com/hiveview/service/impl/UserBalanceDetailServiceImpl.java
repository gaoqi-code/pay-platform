package com.hiveview.service.impl;

import com.hiveview.dao.UserBalanceDetailMapperDao;
import com.hiveview.entity.UserBalanceDetail;
import com.hiveview.service.UserBalanceDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 18:28
 */
@Service
public class UserBalanceDetailServiceImpl implements UserBalanceDetailService {
    @Autowired
    private UserBalanceDetailMapperDao userBalanceDetailDao;
    @Override
    public int saveDetail(UserBalanceDetail userBalanceDetail) {
        return userBalanceDetailDao.saveDetail(userBalanceDetail);
    }
}
