package com.hiveview.action;

import com.hiveview.common.Constants;
import com.hiveview.common.pay.CertTools;
import com.hiveview.common.pay.ProcessMessage;
import com.hiveview.common.pay.YoiPayConfig;
import com.hiveview.common.pay.YoiPaySubmit;
import com.hiveview.util.ProperManager;
import com.hiveview.util.UtilPay;
import com.hiveview.util.YoiPayUtil;
import com.hiveview.util.log.LogMgr;
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
 * @create 2017-04-13 18:31
 */
@Controller
@RequestMapping("/refund")
public class RefundOrderAction {

    /**
     * refundOrder:(单笔退款).
     * @param request
     * @param mav
     * @author zhangsw
     * @return
     */
    @RequestMapping(value="refundOrder", method = RequestMethod.POST)
    public ModelAndView refundOrder(HttpServletRequest request, ModelAndView mav) {
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

        sPra.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代码
        sPra.put("notifyURL", ProperManager.getString("yoipay.refund.notify.url"));
        LogMgr.writeSysInfoLog("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

        // 组装请求数据
        Map<String, String> sParaTemp = YoiPayUtil.assemblyYoyipayParams(sPra, Constants.INTERFACE_NAME_REFUNDORDER);

        // 建立请求
        String url= ProperManager.getString("yoipay.refund.url");
        try {
            String base64 = YoiPaySubmit.sendPostInfo(sParaTemp,url);
            String result="";
            if(null!=base64){
                result = new String(ProcessMessage.Base64Decode(base64),"GBK");
            }
            mav.getModel().put("result", result);
        } catch (Exception e) {
            mav.getModel().put("result", "退款失败！");
            e.printStackTrace();
        }
        mav.setViewName("pay/banks_for_pay");
        return mav;
    }

    /**
     * refundNotifyUrl:(处理退款异步调用).
     * @param request
     * @param mav
     * @author zhangsw
     * @return
     */
    @RequestMapping(value="refundNotifyUrl", method = RequestMethod.POST)
    public ModelAndView refundNotifyUrl(HttpServletRequest request,ModelAndView mav){
        //获取甬易支付POST过来反馈信息
        Map<String, String> params = UtilPay.getpayReturnParamsForVerify(request);
        LogMgr.writeSysInfoLog("params>>>>>>>>>>>>>>>>>>>>>>" + params.toString());
        try {
            if(null!=params){

                //通知结果数据
                String tranData=params.get("tranData");//Base64编码
                String xmlString=new String(ProcessMessage.Base64Decode(tranData),"GBK");

                //甬易对通知结果的签名数据
                String signData=params.get("signData");
                boolean sign=false;
                //验证签名合法性
                if(null!=signData){
                    sign= CertTools.verifyMessage(signData,xmlString, YoiPayConfig.INPUT_CHARSET_GBK);
                }

                if(sign){
                    mav.getModel().put("result", xmlString);
                }else {
                    mav.getModel().put("result", "结果验签失败！");
                }
            }else {
                mav.getModel().put("result", "结果为空！");

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        mav.setViewName("pay/notify_url");
        return mav;
    }
}
