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
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-13 17:54
 */

@Controller
@RequestMapping("/query")
public class QueryOrderAction {
    protected Logger log = Logger.getLogger(QueryOrderAction.class);

    /**
     * queryOrder:(单笔订单查询).
     * @param request
     * @param mav
     * @author zhangsw
     * @return
     */
    @RequestMapping(value="queryOrder", method = RequestMethod.POST)
    public ModelAndView queryOrder(HttpServletRequest request, ModelAndView mav) {
        Map<?, ?> map = request.getParameterMap();
        // 组装请求参数
        Map<String, String> sPra = UtilPay.payReturnParamsFormat(map, null);
        sPra.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代
        log.debug("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

        // 组装请求数据
        Map<String, String> sParaTemp = YoiPayUtil.assemblyAlipayParams(sPra, Constants.INTERFACE_NAME_QUERYORDER);

        // 建立请求
        String url= ProperManager.getString("yoipay.query.url");
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
