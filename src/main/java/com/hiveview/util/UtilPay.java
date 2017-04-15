package com.hiveview.util;

import java.io.UnsupportedEncodingException;
import java.security.SignatureException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.hiveview.common.httpClient.Result;
import com.hiveview.common.httpClient.SendRequest;
import com.hiveview.common.pay.DigestUtil;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.util.EntityUtils;

/**
 * UtilPay:{支付辅助类}
 * date: 2015年11月3日 下午5:09:21 
 * @author LiuJiangTao
 * @version
 */
public class UtilPay {
	// 字符编码格式 目前支持 utf-8
	public static String input_charset = "utf-8";
	// 签名方式 不需修改
	public static String sign_type = "MD5";
	
	/**
	 * resolvePara:(验证签名).
	 * @author zhangsw
	 * @return
	 */
	public static boolean resolvePara(HttpServletRequest request,String key){
		//获取参数集合
		Map<?,?> requestParams = request.getParameterMap();
		//转换格式
		Map<String,String> params = UtilPay.payReturnParamsFormat(requestParams,null);
		//获取用户传输加密
		String sign = params.remove("sign");
		//判断加密是否合法
		return sign.equals(UtilPay.assemblySign(params, key));
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
	 * 签名字符串
	 * @param text 要签名的字符串
	 * @param key 签名密匙
	 * @return 签名结果
	 */
	public static String sign(String text,String key) {
		text = text + key;
		return DigestUtils.md5Hex(getContentBytes(text, input_charset));
	}

	/**
	 * 签名字符�?
	 * @param text 要签名的字符串
	 * @param sign 签名结果
	 * @param key 签名密匙
	 * @return 签名结果
	 */
	public static boolean verify(String text, String sign,String key) {
		text = text + key;
		String mysign = DigestUtils.md5Hex(getContentBytes(text, input_charset));
		if (mysign.equals(sign)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @param content
	 * @param charset
	 * @throws SignatureException
	 * @throws UnsupportedEncodingException
	 */
	private static byte[] getContentBytes(String content, String charset) {
		if (charset == null || "".equals(charset)) {
			return content.getBytes();
		}
		try {
			return content.getBytes(charset);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("MD5签名过程中出现错�?指定的编码集不对,您目前指定的编码集是:"+ charset);
		}
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
		String mysign = assemblySign(sPara,key);
		sPara.put("sign", mysign);
		return sPara;
    }
	/**
	 * assemblySign:(对用户id进行加加密
	 * @author zhangsw
	 * @param map 参数
	 * @return
	 */
	public static String assemblySign(Map<String, String> map,String key) {
		StringBuffer parms = new StringBuffer();
		String[] strs = new String[map.size()];
		int i = 0;
		for (Map.Entry<String, String> entry : map.entrySet()) {
			strs[i++] = entry.getKey();
		}
		Arrays.sort(strs);
		for (String str : strs) {
			parms.append(str + "=" + map.get(str) + "&");
		}
		return sign(parms.toString(),key);
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
		Result result = SendRequest.sendPost(url, null, sPara,input_charset);
		String strResult = EntityUtils.toString(result.getHttpEntity(),input_charset);
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
