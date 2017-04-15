package com.hiveview.dao;

import com.hiveview.entity.OrderInfo;
import org.apache.ibatis.annotations.Param;

public interface OrderMapperDao {

    int insert(OrderInfo record);

    int saveOrderInfo(OrderInfo record);

    OrderInfo getOrderInfoByOrderNo(@Param("orderNo") String orderNo);

    int updateOrderInfo(OrderInfo record);

    int updateByPrimaryKey(OrderInfo record);
}