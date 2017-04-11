package com.hiveview.action;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.StringUtil;
import com.hiveview.action.base.BaseController;
import com.hiveview.entity.Paging;
import com.hiveview.entity.Product;
import com.hiveview.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductAction extends BaseController {

    @Autowired
    private IProductService productService;



    @RequestMapping(value="/list")
    public String list() {
        return "product/product_list";
    }

    /**
     * 去审批
     * @param id
     * @param mav
     * @return
     */
    @RequestMapping(value="/toApproval/{id}")
    public ModelAndView toApproval(@PathVariable("id") long id,ModelAndView mav) {
        Product product = productService.getProductById(id);
        mav.getModel().put("product", product);
        mav.setViewName("product/approval");
        return mav;
    }
    @RequestMapping(value="/page")
    public ModelAndView page(HttpServletRequest request, ModelAndView mav) {
        Paging paging = super.getPaging(request);
        Product product = new Product();
        String status = request.getParameter("status");
        if (StringUtil.isNotEmpty(status)) {
                product.setStatus(Integer.parseInt(status));
        }
        Page<Object> page = PageHelper.startPage(paging.getCurrentPage(), paging.getPageSize());
        List<Product> products =  productService.getProductPage(product);
        paging.setTotalPages(page.getPages());
        mav.getModel().put("paging",paging);
        mav.getModel().put("products",products);
        mav.setViewName("product/paging");
        return mav;
    }

    /**
     * 去设置页面
     * @param id
     * @param mav
     * @return
     */
    @RequestMapping(value="/toSetting/{id}")
    public ModelAndView toSetting(@PathVariable("id") long id,ModelAndView mav) {
        Product product = productService.getProductById(id);
        mav.getModel().put("product", product);
        mav.setViewName("product/setting");
        return mav;
    }


}
