package com.hiveview.util;

import com.hiveview.common.httpClient.Result;
import com.hiveview.common.httpClient.SendRequest;
import com.hiveview.common.pay.YoiPayConfig;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * UtilPay:{支付辅助类}
 * date: 2015年11月3日 下午5:09:21 
 * @author LiuJiangTao
 * @version
 */
public class UtilPay {

	/**
	 * resolvePara:(验证签名).
	 * @author zhangsw
	 * @return
	 */
	public static boolean resolvePara(Map<String,String> params,String key){
		//获取用户传输加密
		String sign = params.remove("sign");
		boolean res=false;
		//判断加密是否合法
		if(null!=sign && !"".equals(sign)){
			res=sign.equals(UtilPay.assemblySign(YoiPayConfig.INPUT_CHARSET_UTF_8,params, key));
		}
		return res;
	}
	
	/**
	 * assemblyCallBackPara:(组装回调信息).
	 * @author LiuJiangTao
	 * @param sPara 回调信息组合
	 * @return
	 */
	public static Map<String,String> assemblyCallBackPara(Map<String,String> sPara,String key){
		sPara = UtilPay.buildRequestPara(sPara, key);
		return sPara;
	}

	/**
	 * 除去数组中的空值和签名参数
	 * @param sArray 签名参数数组
	 * @return 去掉空格与签名参数后的新签名参数数组
	 */
	public static Map<String, String> paraFilter(Map<String, String> sArray) {
		Map<String, String> result = new HashMap<String, String>();
		if (sArray == null || sArray.size() <= 0) {
			return result;
		}
		for (String key : sArray.keySet()) {
			String value = sArray.get(key);
			if (value == null || value.equals("") || key.equalsIgnoreCase("sign")
					|| key.equalsIgnoreCase("sign_type")) {
				continue;
			}
			result.put(key, value);
		}
		return result;
	}

    /**
     * 生成要请求给支付宝的参数数组
     * @param sParaTemp 请求前的参数数组
     * @return 要请求的参数数组
     */
	public static Map<String, String> buildRequestPara(Map<String, String> sParaTemp,String key) {
		Map<String, String> sPara = paraFilter(sParaTemp);
		String mysign = assemblySign(YoiPayConfig.INPUT_CHARSET_UTF_8,sPara,key);
		sPara.put("sign", mysign);
		return sPara;
    }
	/**
	 * assemblySign:(对用户id进行加加密
	 * @author zhangsw
	 * @param map 参数
	 * @return
	 */
	public static String assemblySign(String characterEncoding,Map<String, String> map,String key) {
		StringBuffer sb = new StringBuffer();
		SortedMap mapParams=new TreeMap(map);
		Set es = mapParams.entrySet();//所有参与传参的参数按照accsii排序（升序）
		Iterator it = es.iterator();
		while(it.hasNext()) {
			Map.Entry entry = (Map.Entry)it.next();
			String k = (String)entry.getKey();
			Object v = entry.getValue();
			if(null != v && !"".equals(v)
					&& !"sign".equals(k) && !"key".equals(k)) {
				sb.append(k + "=" + v + "&");
			}
		}
		sb.append("key=" + YoiPayConfig.key);
		System.out.println("字符串拼接后是："+sb.toString());
		String sign = MD5Util.MD5Encode(sb.toString(),characterEncoding).toUpperCase();
		return sign;
	}

    /**
     * 建立请求，以表单HTML形式构�?（默认）
     * @param sParaTemp 请求参数数组
     * @param method 提交方式。两个�?可�?：post、get
     * @param btnName 确认按钮显示文字
     * @return 提交表单HTML文本
     */
    public static String buildRequest(Map<String, String> sParaTemp, String method, String btnName,String payUrl,String key) {
        //待请求参数数组
		Map<String, String> sPara = buildRequestPara(sParaTemp, key);
        List<String> keys = new ArrayList<String>(sPara.keySet());
        StringBuffer sbHtml = new StringBuffer();
        sbHtml.append("<form id=\"wkpaysubmit\" name=\"wkpaysubmit\" action=\"" + payUrl
                       + "\" method=\"" + method + "\">");
        for (int i = 0; i < keys.size(); i++) {
            String name = (String) keys.get(i);
            String value = (String) sPara.get(name);
            sbHtml.append("<input type=\"hidden\" name=\"" + name + "\" value=\"" + value + "\"/>");
        }
        sbHtml.append("<input type=\"submit\" value=\"" + btnName + "\" style=\"display:none;\"></form>");
        sbHtml.append("<script>document.forms['wkpaysubmit'].submit();</script>");
        return sbHtml.toString();
    }
    
    /**
     * 构造模拟远程HTTP的POST请求，获取支付宝的返回XML处理结果
     * @param sParaTemp 请求参数数组
     * @param url 网关地址
     * @return 支付宝返回XML处理结果
     * @throws Exception
     */
    public static String sendPostInfo(Map<String, String> sParaTemp,String url,String key) throws Exception {
        //待请求参数数组
		Map<String, String> sPara = buildRequestPara(sParaTemp, key);
		Result result = SendRequest.sendPost(url, null, sPara,YoiPayConfig.INPUT_CHARSET_UTF_8);
		String strResult = EntityUtils.toString(result.getHttpEntity(),YoiPayConfig.INPUT_CHARSET_UTF_8);
        return strResult;
    }

    /**
     * payReturnParamsFormat:(获取指定格式返回参数).
     * @author LiuJiangTao
     * @param requestParams 返回参数
     * @param charset 编码格式
     * @return
     */
    public static Map<String,String> payReturnParamsFormat(Map<?,?> requestParams,String charset){
    	 Map<String, String> params = new HashMap<String, String>();
         StringBuffer bf = new StringBuffer();
         for (Map.Entry<?, ?> entry : requestParams.entrySet()) {
         	bf.setLength(0);
 			String[] values = (String[]) entry.getValue();
 			for (String val : values) {
 				bf.append(val + ",");
 			}
 			bf.deleteCharAt(bf.length() - 1);
 			String valueStr = StringUtils.isNotBlank(charset) ? StrFormat(bf.toString(),charset): bf.toString();
            params.put(entry.getKey().toString(), valueStr);
         }
         return params;
    }
    
	/**
	 * 
	 * getpayReturnParamsForVerify:(根据当前系统版本获取指定格式返回参数).
	 * @author LiuJiangTao
	 * @param request
	 * @return
	 */
	public static Map<String, String> getpayReturnParamsForVerify(HttpServletRequest request) {
		Map<?,?> requestParams = request.getParameterMap();
		//获取当前系统版本
		String OS = System.getProperty("os.name").toLowerCase();
		//设置获取参数编码格式
		String charset = OS.contains("windows") ? "UTF-8" : null;
		//返回相应系统下支付宝返回参数
		return payReturnParamsFormat(requestParams,charset);
	}
    
    /**
     * StrFormat:(ISO-8859-1编码转换为指定编�?.
     * @author LiuJiangTao
     * @param str 要转码的字符串
     * @param charset 转码格式
     * @return
     */
	public static String StrFormat(String str,String charset) {
		try {
			str = new String(str.getBytes("ISO-8859-1"),charset);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return str;
	}
}
