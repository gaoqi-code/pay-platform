package com.hiveview.dao;

import com.hiveview.entity.User;

import java.math.BigDecimal;

public interface UserMapperDao {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectUserByPrimaryKey(long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int updateBalance(User user);
}