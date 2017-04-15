package com.hiveview.service.impl;

import com.hiveview.dao.OrderMapperDao;
import com.hiveview.entity.OrderInfo;
import com.hiveview.service.OrderInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 11:47
 */
@Service
public class OrderInfoServiceImpl implements OrderInfoService {
    @Autowired
    private OrderMapperDao orderMapperDao;
    @Override
    public OrderInfo getOrderInfoByOrderNo(String orderNo) {
        return orderMapperDao.getOrderInfoByOrderNo(orderNo);
    }

    @Override
    public int saveOrderInfo(OrderInfo orderInfo) {
        orderInfo.setAddTime(new Date());
        orderInfo.setUpdateTime(new Date());
        return orderMapperDao.saveOrderInfo(orderInfo);

    }

    @Override
    public int updateOrderInfo(OrderInfo orderInfo) {
        return orderMapperDao.updateOrderInfo(orderInfo);
    }
}
