package com.hiveview.dao;


import com.hiveview.entity.UserBalanceDetail;

public interface UserBalanceDetailMapperDao {
    int deleteByPrimaryKey(Integer id);

    int saveDetail(UserBalanceDetail record);

    int insertSelective(UserBalanceDetail record);

    UserBalanceDetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserBalanceDetail record);

    int updateByPrimaryKey(UserBalanceDetail record);
}