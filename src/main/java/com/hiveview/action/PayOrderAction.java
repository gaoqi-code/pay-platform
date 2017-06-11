package com.hiveview.action;

import com.google.common.collect.Maps;
import com.hiveview.common.Constants;
import com.hiveview.common.pay.CertTools;
import com.hiveview.common.pay.ProcessMessage;
import com.hiveview.common.pay.YoiPayConfig;
import com.hiveview.common.pay.YoiPaySubmit;
import com.hiveview.entity.BankForPay;
import com.hiveview.entity.OrderInfo;
import com.hiveview.entity.OrderVo;
import com.hiveview.service.OrderInfoService;
import com.hiveview.service.UserBalanceDetailService;
import com.hiveview.service.UserService;
import com.hiveview.util.*;
import com.hiveview.util.log.LogMgr;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/pay")
public class PayOrderAction {

	@Autowired
	private OrderInfoService orderInfoService;
	@Autowired
	private UserService userService;
	@Autowired
	private UserBalanceDetailService userBalanceDetailService;
	/**
	 * payFiter:(用户过滤和分发支付请求).
	 * @param request
	 * @param mav
	 * @author zhangsw
	 * @return
	 */
	@RequestMapping(value="payOrder", method = RequestMethod.POST)
	public ModelAndView pay(HttpServletRequest request,ModelAndView mav,OrderVo orderVo) {

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

		//判断参数是否缺少参数
		LogMgr.writeSysInfoLog("开始验证参数是否为空>>>>>>>>>>>>>>>>>>>>>>");
		for (Map.Entry<String, String> entry : sPra.entrySet()) {
			if (StringUtils.isBlank(entry.getValue())) {
				if (entry.getKey().equals("curType")
						|| entry.getKey().equals("orderNo")
						|| entry.getKey().equals("userId")
						|| entry.getKey().equals("orderAmt")
						||entry.getKey().equals("notifyURL")
						||entry.getKey().equals("returnURL")
						||entry.getKey().equals("bankId")){

					mav.getModel().put("result", entry.getKey() + "不能为空！");
					mav.setViewName("pay/notify_url");
					return mav;
				}
			}
		}
		String orderNo = DateUtil.getOrderNum() + DateUtil.getThree();
		String businessNo=sPra.get("orderNo");
		sPra.put("orderNo", orderNo);//商户代码
		sPra.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代码
		sPra.put("notifyURL", ProperManager.getString("pay.notify.url"));
		sPra.put("returnURL", ProperManager.getString("pay.return.url"));
		LogMgr.writeSysInfoLog("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

		OrderInfo orderInfo=new OrderInfo();
		orderInfo.setOrderNo(orderNo);
		orderInfo.setBusinessNo(businessNo);
		orderInfo.setUserId(orderVo.getUserId());
		orderInfo.setDataStatus(OrderInfo.ORDER_SATTUS_PAY);
		orderInfo.setProductName(orderVo.getGoodsName());
		orderInfo.setTotalFee(orderVo.getOrderAmt());
		orderInfo.setNotifyUrl(orderVo.getNotifyURL());
		orderInfo.setReturnUrl(orderVo.getReturnURL());

		// 判断是否为重复请求，或者修改后请求
		OrderInfo order=orderInfoService.getOrderInfoByOrderNo(orderNo);
		if(null==order){
			orderInfoService.saveOrderInfo(orderInfo);
		}else {
			if (order.getDataStatus() == OrderInfo.ORDER_SATTUS_COMPLETE) {
				mav.getModel().put("result", "订单已支付，请刷新页面或联系客服处理");
				mav.setViewName("notifyurl");
				return mav;
			}
		}

		// 组装请求数据
		Map<String, String> sParaTemp = YoiPayUtil.assemblyYoyipayParams(sPra, Constants.INTERFACE_NAME_PAY);
		// 建立请求
		String sHtmlText = YoiPaySubmit.buildRequest(sParaTemp, "post", "确认");
		// 添加请求信息到本地数据库
		mav.getModel().put("sHtmlText", sHtmlText);
		mav.setViewName("pay/yoipayapi");
		return mav;
	}

	/**
	 * getBanksForPay:(获取付款银行).
	 * @param request
	 * @param mav
	 * @author zhangsw
	 * @return
	 */
	@RequestMapping(value="getBanksForPay", method = RequestMethod.POST)
	public ModelAndView getBanksForPay(HttpServletRequest request,ModelAndView mav){
		Map<?, ?> map = request.getParameterMap();
		// 组装请求参数
		Map<String, String> sPra = UtilPay.payReturnParamsFormat(map, null);
		LogMgr.writeSysInfoLog("sPra>>>>>>>>>>>>>>>>>>>>>>" + sPra.toString());

		// 验证请求是否合法
		LogMgr.writeSysInfoLog("开始验证请求是否合法>>>>>>>>>>>>>>>>>>>>>>");
		if (!UtilPay.resolvePara(sPra,YoiPayConfig.key)) {
			LogMgr.writeSysInfoLog("验证失败>>>>>>>>>>>>>>>>>>>>>>");
			mav.getModel().put("result", "请求非法！");
			mav.setViewName("pay/notify_url");
			return mav;
		}

		// 组装请求数据
		Map<String, String> sParaTemp = YoiPayUtil.assemblyYoyipayParams(sPra, Constants.INTERFACE_NAME_GETBANKS);

		// 建立请求
		String url=ProperManager.getString("yoipay.getbanksforpay.url");
		try {
			//base64解码
			String base64 = YoiPaySubmit.sendPostInfo(sParaTemp,url);
			String result="";
			if(null!=base64 && !"".equals(base64) ){
				result = new String(ProcessMessage.Base64Decode(base64),"GBK");
				Map<String,Object> mapResult=XmlUtil.xml2map(result,false);
				String bankCount= (String) mapResult.get("bankCount");
				Map<String,Object> bankRowsMap= (Map<String, Object>) mapResult.get("bankList");
				List<BankForPay> bankList =(ArrayList<BankForPay>) bankRowsMap.get("bankRow");
				mav.getModel().put("bankCount", bankCount);
				mav.getModel().put("bankList", bankList);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mav.setViewName("pay/banks_for_pay");
		return mav;
	}


	/**
	 * returnUrl:(处理支付同步调用).
	 * @param request
	 * @param mav
	 * @author zhangsw
	 * @return
	 */
	@RequestMapping(value="returnUrl", method = RequestMethod.POST)
	public ModelAndView returnUrl(HttpServletRequest request,ModelAndView mav){
		//获取甬易支付POST过来反馈信息
		Map<String, String> params = UtilPay.getpayReturnParamsForVerify(request);
		LogMgr.writeSysInfoLog("params>>>>>>>>>>>>>>>>>>>>>>" + params.toString());

		String tranSerialNo="";
		String orderNo="";
		String redirectUrl="";
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
					sign=CertTools.verifyMessage(signData,xmlString,YoiPayConfig.INPUT_CHARSET_GBK);
				}

				if(!sign){
					mav.getModel().put("result", "结果验签失败！");
					return mav;
				}else {
					Map<String, String>  mapValues= XmlUtil.xml2map(xmlString,false);
					 tranSerialNo=mapValues.get("tranSerialNo");//甬易支付平台交易号
					 orderNo=mapValues.get("orderNo");//原商户订单号
					// 根据返回订单号获取订单详情
					OrderInfo order=orderInfoService.getOrderInfoByOrderNo(orderNo);
					// 如果订单不存在为空，则返回到异常页。
					if (order == null) {
						LogMgr.writeSysInfoLog(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>订单不存在");
						mav.getModel().put("result", "订单不存在！");
						return mav;
					}
					//支付回调地址
					redirectUrl = order.getReturnUrl();
					//BigDecimal orderAmt=BigDecimal.valueOf(Double.valueOf(mapValues.get("orderAmt")));
					BigDecimal orderAmt=new BigDecimal(mapValues.get("orderAmt")).setScale(2,BigDecimal.ROUND_DOWN);
					String tranStat=mapValues.get("tranStat");
					//支付成功
					if(Constants.YOYI_TRANSTATE_HASPAY.equals(tranStat)){
						//判断是否处理过业务
						if(Integer.valueOf(Constants.YOYI_TRANSTATE_HASPAY)!=order.getDataStatus()){
							//更新订单状态
							order.setDataStatus(Integer.valueOf(tranStat));
							order.setTradeNo(tranSerialNo);
							orderInfoService.updateOrderInfo(order);
							//更新用户余额
							//userService.updateBalance(order.getUserId(),orderAmt,orderNo);
						}

						//回调链接
						Map<String, String> newHashMap = Maps.newHashMap();
						newHashMap.put("orderNo", order.getBusinessNo());
						newHashMap.put("code", "200");
						newHashMap.put("orderAmt",String.valueOf(orderAmt));
						String reSign=UtilPay.assemblySign(YoiPayConfig.INPUT_CHARSET_UTF_8,newHashMap, YoiPayConfig.key);
						newHashMap.put("sign",reSign );
						newHashMap.remove("orderAmt");
						newHashMap.put("tradeNo",tranSerialNo );

						return new ModelAndView(new RedirectView(redirectUrl), newHashMap);
					}
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


	/**
	 * notifyUrl:(处理支付异步调用).
	 * @param request
	 * @param mav
	 * @author zhangsw
	 * @return
	 */
	@RequestMapping(value="notifyUrl", method = RequestMethod.POST)
	public ModelAndView notifyUrl(HttpServletRequest request,ModelAndView mav){
		//获取甬易支付POST过来反馈信息
		Map<String, String> params = UtilPay.getpayReturnParamsForVerify(request);
		LogMgr.writeSysInfoLog("params>>>>>>>>>>>>>>>>>>>>>>" + params.toString());

		String tranSerialNo="";
		String orderNo="";
		String redirectUrl="";
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
					sign=CertTools.verifyMessage(signData,xmlString,YoiPayConfig.INPUT_CHARSET_GBK);
				}
				if(!sign){
					mav.getModel().put("result", "结果验签失败！");
				}else {
					Map<String, String>  mapValues= XmlUtil.xml2map(xmlString,false);
					tranSerialNo=mapValues.get("tranSerialNo");//甬易支付平台交易号
					orderNo=mapValues.get("orderNo");//原商户订单号
					// 根据返回订单号获取订单详情
					OrderInfo order=orderInfoService.getOrderInfoByOrderNo(orderNo);
					// 如果订单不存在为空，则返回到异常页。
					if (order == null) {
						LogMgr.writeSysInfoLog(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>订单不存在");
						mav.getModel().put("result", "订单不存在！");
					}
					//支付回调地址
					redirectUrl = order.getNotifyUrl();
					BigDecimal orderAmt=new BigDecimal(mapValues.get("orderAmt")).setScale(2,BigDecimal.ROUND_DOWN);
					String tranStat=mapValues.get("tranStat");
					//支付成功
					if(Constants.YOYI_TRANSTATE_HASPAY.equals(tranStat)){
						//判断是否处理过业务
						if(Integer.valueOf(Constants.YOYI_TRANSTATE_HASPAY)!=order.getDataStatus()){
							//更新订单状态
							order.setDataStatus(Integer.valueOf(tranStat));
							order.setTradeNo(tranSerialNo);
							orderInfoService.updateOrderInfo(order);
							//更新用户余额
							//userService.updateBalance(order.getUserId(),orderAmt,orderNo);
						}
						//定义下级转发参数
						Map<String,String> newHashMap = Maps.newHashMap();
						newHashMap.put("orderNo", order.getBusinessNo());
						newHashMap.put("code", "200");
						newHashMap.put("orderAmt",String.valueOf(orderAmt));

						String reSign=UtilPay.assemblySign(YoiPayConfig.INPUT_CHARSET_UTF_8,newHashMap, YoiPayConfig.key);
						newHashMap.put("sign",reSign );
						newHashMap.remove("orderAmt");

						newHashMap.put("tradeNo",tranSerialNo );

						LogMgr.writeSysInfoLog("CallBack>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Start");
						String result = UtilPay.sendPostInfo(newHashMap, redirectUrl, YoiPayConfig.key);
						mav.getModel().put("result", result);
						LogMgr.writeSysInfoLog("CallBack>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>End");
					}
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

	public static void main(String[] args) {
		BigDecimal orderAmt=new BigDecimal("0.1").setScale(2,BigDecimal.ROUND_DOWN);
		System.out.println(String.valueOf(orderAmt));
	}
}
