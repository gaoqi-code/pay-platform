package com.hiveview.service;

import com.hiveview.entity.OrderInfo;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 11:44
 */
public interface OrderInfoService {

    public OrderInfo getOrderInfoByOrderNo(String orderNo);

    public int saveOrderInfo(OrderInfo orderInfo);

    public int updateOrderInfo(OrderInfo orderInfo);
}
