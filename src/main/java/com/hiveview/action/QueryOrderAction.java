package com.hiveview.action;

import com.hiveview.common.Constants;
import com.hiveview.common.pay.ProcessMessage;
import com.hiveview.common.pay.YoiPayConfig;
import com.hiveview.common.pay.YoiPaySubmit;
import com.hiveview.util.ProperManager;
import com.hiveview.util.UtilPay;
import com.hiveview.util.XmlUtil;
import com.hiveview.util.YoiPayUtil;
import com.hiveview.util.log.LogMgr;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
    /**
     * queryOrder:(单笔订单查询).
     * @param request
     * @param mav
     * @author zhangsw
     * @return
     */
    @RequestMapping(value="queryOrder", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView queryOrder(HttpServletRequest request, ModelAndView mav) {

        Map<?, ?> map = request.getParameterMap();
        // 组装请求参数
        Map<String, String> sPra = UtilPay.payReturnParamsFormat(map, null);

        // 验证请求是否合法
        LogMgr.writeSysInfoLog("开始验证请求是否合法>>>>>>>>>>>>>>>>>>>>>>");
        if (!UtilPay.resolvePara(sPra,YoiPayConfig.key)) {
            LogMgr.writeSysInfoLog("验证失败>>>>>>>>>>>>>>>>>>>>>>");
            mav.getModel().put("result", "请求非法！");
            mav.setViewName("pay/notify_url");
            return mav;
        }

        sPra.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代
        LogMgr.writeSysInfoLog("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

        //判断参数是否缺少参数
        LogMgr.writeSysInfoLog("开始验证参数是否为空>>>>>>>>>>>>>>>>>>>>>>");
        for (Map.Entry<String, String> entry : sPra.entrySet()) {
            if (StringUtils.isBlank(entry.getValue())) {
                if (entry.getKey().equals("orderNo")){
                    mav.getModel().put("result", entry.getKey() + "不能为空！");
                    mav.setViewName("pay/notify_url");
                    return mav;
                }
            }
        }

        // 组装请求数据
        Map<String, String> sParaTemp = YoiPayUtil.assemblyYoyipayParams(sPra, Constants.INTERFACE_NAME_QUERYORDER);

        // 建立请求
        String url= ProperManager.getString("yoipay.query.url");
        try {
            String base64 = YoiPaySubmit.sendPostInfo(sParaTemp,url);
            String result="";
            if(null!=base64){
                result = new String(ProcessMessage.Base64Decode(base64),"GBK");
                Map<String,Object> mapResult= XmlUtil.xml2map(result,false);
                mav.getModel().put("result", mapResult);
            }
        } catch (Exception e) {
            e.printStackTrace();
            mav.getModel().put("result", "查询支付订单失败！");
        }
        mav.setViewName("pay/notify_url");
        return mav;
    }
}
