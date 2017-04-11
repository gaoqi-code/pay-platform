package com.hiveview.service;

import com.hiveview.entity.Product;

import java.util.List;

/**
 * Created by hxq on 2017/3/13.
 */
public interface IProductService {


    Product getProductById(Long productId);

    int updateProduct(Product product);

    int saveProduct(Product product);

    List<Product> getProductPage(Product product);

    List<Product> getOpendProductPage(Product product);

    Product getProductDetail(long productId);
}
