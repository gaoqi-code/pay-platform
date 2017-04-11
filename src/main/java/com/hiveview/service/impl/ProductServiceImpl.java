package com.hiveview.service.impl;

import com.hiveview.dao.IProductDao;
import com.hiveview.entity.Product;
import com.hiveview.service.IProductService;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by hxq on 2017/3/13.
 */
@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductDao productDao;


    @Override
    public Product getProductById(Long productId) {
        return productDao.selectByPrimaryKey(productId);
    }

    @Override
    public int updateProduct(Product product) {
        return productDao.updateByPrimaryKeySelective(product);
    }

    @Override
    public int saveProduct(Product product) {
        return productDao.insertSelective(product);
    }

    @Override
    public List<Product> getProductPage(Product product) {
        return productDao.getProductPage(product);
    }

    @Override
    public List<Product> getOpendProductPage(Product product) {
        return productDao.getOpendProduct(product);
    }

    @Override
    public Product getProductDetail(long productId) {
        Product product = new Product();
        product.setId(productId);
        List<Product> result = productDao.getOpendProduct(product);
        if (CollectionUtils.isNotEmpty(result)) {
            product = result.get(0);
        }
        return product;
    }
}
