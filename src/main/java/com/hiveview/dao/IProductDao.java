package com.hiveview.dao;

import com.hiveview.entity.Product;

import java.util.List;

public interface IProductDao extends IBaseDao<Product>{
    int deleteByPrimaryKey(Long id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> getProductPage(Product product);

    List<Product> getOpendProduct(Product product);
}