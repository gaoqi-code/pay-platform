package com.hiveview.dao;


import com.hiveview.entity.UserBalanceDetail;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBalanceDetailMapperDao {

    int saveDetail(UserBalanceDetail record);

    UserBalanceDetail selectByPrimaryKey(Integer id);

}