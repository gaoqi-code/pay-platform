package com.hiveview.dao;

import com.hiveview.entity.OrderInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMapperDao {


    int saveOrderInfo(OrderInfo record);

    OrderInfo getOrderInfoByOrderNo(@Param("orderNo") String orderNo);

    int updateOrderInfo(OrderInfo record);

}