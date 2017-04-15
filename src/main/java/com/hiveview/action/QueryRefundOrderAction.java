package com.hiveview.action;

import com.hiveview.common.Constants;
import com.hiveview.common.pay.ProcessMessage;
import com.hiveview.common.pay.YoiPayConfig;
import com.hiveview.common.pay.YoiPaySubmit;
import com.hiveview.util.ProperManager;
import com.hiveview.util.UtilPay;
import com.hiveview.util.YoiPayUtil;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * ${退款订单查询}
 *
 * @author zhangsw
 * @create 2017-04-13 18:33
 */
@Controller
@RequestMapping("/refundQuery")
public class QueryRefundOrderAction {

    protected Logger log = Logger.getLogger(QueryRefundOrderAction.class);


    /**
     * queryRefundOrder:(单笔退款订单查询).
     * @param request
     * @param mav
     * @author zhangsw
     * @return
     */
    @RequestMapping(value="queryRefundOrder", method = RequestMethod.POST)
    public ModelAndView refundQuery(HttpServletRequest request, ModelAndView mav) {
        Map<?, ?> map = request.getParameterMap();
        // 组装请求参数
        Map<String, String> sPra = UtilPay.payReturnParamsFormat(map, null);
        sPra.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代码
        log.debug("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

        // 组装请求数据
        Map<String, String> sParaTemp = YoiPayUtil.assemblyAlipayParams(sPra, Constants.INTERFACE_NAME_QUERYREFUNDORDER);

        // 建立请求
        String url= ProperManager.getString("yoipay.query.refund.url");
        try {
            String base64 = YoiPaySubmit.sendPostInfo(sParaTemp,url);
            String result="";
            if(null!=base64){
                result = new String(ProcessMessage.Base64Decode(base64),"GBK");
            }
            mav.getModel().put("result", result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        mav.setViewName("pay/banks_for_pay");
        return mav;
    }
}
