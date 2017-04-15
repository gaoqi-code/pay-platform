package com.hiveview.dao;

import com.hiveview.entity.User;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
@Repository
public interface UserMapperDao {

    User selectUserByPrimaryKey(long id);

    int updateBalance(User user);
}