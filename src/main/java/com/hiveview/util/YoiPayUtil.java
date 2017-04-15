package com.hiveview.util;

import com.hiveview.common.pay.CertTools;
import com.hiveview.common.pay.ProcessMessage;
import com.hiveview.common.pay.YoiPayConfig;
import org.apache.log4j.Logger;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
/**
 * YoiPayUtil:{支付宝支付辅助类}
 * date: 2015-10-30 上午10:44:01 
 * @author LiuJiangTao
 * @version
 */
public class YoiPayUtil {
	public static String key = "wrry7ky3ont1f57fcznd8d1kzq9ystsd";
	
	/**
	 * assemblyAlipayParams:(组装要提交给甬易支付平台的参数集合).
	 * @author zhangsw
	 * @param sPra 参数集合
	 * @return
	 */
	public static Map<String, String> assemblyAlipayParams(Map<String, String> sPra,String interfaceName){

		//商品名称
		String goodsName=sPra.get("goodsName");
		//交易数据
		String xmlSourceData=MapToXmlUtil.callMapToXML(sPra);
		System.out.println("xmlSourceData>>>>>>>>>>>>>>>>>>>>>>"+xmlSourceData);

		//base64加密用GBK编码
		String tranData = ProcessMessage.Base64Encode(xmlSourceData.getBytes(Charset.forName("GBK")));
		System.out.println("tranData>>>>>>>>>>>>>>>>>>>>>>"+tranData);

		//签名模式：ITRUS
		String signMsg = CertTools.signMessage(xmlSourceData);
		System.out.println("signMsg>>>>>>>>>>>>>>>>>>>>>>"+signMsg);

		// 把请求参数打包成数组
		Map<String, String> sParaTemp = new HashMap<String, String>();
		sParaTemp.put("interfaceName", interfaceName);//接口名称
		sParaTemp.put("version", YoiPayConfig.VERSION);//版本号
		sParaTemp.put("tranData", tranData);//交易数据
		sParaTemp.put("merSignMsg", signMsg);//订单签名数据
		sParaTemp.put("merchantId", YoiPayConfig.MERCHANT_ID);//商户代码
		//支付请求时需要传入商品名称
		if(null!=goodsName&&!"".equals(goodsName)){
			sParaTemp.put("goodsName", goodsName);//商品名称
		}

		return sParaTemp;
	}

}
