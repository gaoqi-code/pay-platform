package com.hiveview.common.pay;

import com.itrus.util.Base64;

import cn.topca.api.cert.CertApiException;
import cn.topca.api.cert.CertSet;
import cn.topca.api.cert.CertStore;
import cn.topca.api.cert.Certificate;
import cn.topca.api.cert.Pkcs7;

public class CertTools {
	
	/**
	 * 消息签名
	 * @param oriData 原文信息
	 * @return String base64编码的签名结果
	 */
	public static String signMessage(String oriData){
		String signData = "";
		ConfigTool.getInstance();
		CertSet certs;
		try {
			certs = CertStore.listAllCerts();
			Certificate cert = certs.get(0);
			signData = Base64.encode(cert.signP7(oriData.getBytes()));
		} catch (CertApiException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return signData;
	}
	/**
	 * 消息验签
	 * @param signData 签名字符串
	 * @param oriData 原字符串
	 * @param charset 字符集（GBK或UTF-8两种可选），默认GBK
	 * @return
	 */
	public static boolean verifyMessage(String signData,String oriData,String charset) {
		String messVerifyResult = "";
		String certSN = "";
		String certDn = "";	
		String charsetStr = "GBK";
		if (null!=charset) {
			if (charset.equalsIgnoreCase("gbk")) {
				charsetStr = "GBK";
			}
			if (charset.equalsIgnoreCase("utf-8")) {
				charsetStr = "UTF-8";
			}
		}
		ConfigTool.getInstance();
		try {
			Pkcs7 pkcs7 = new Pkcs7(signData);
			Certificate cert = pkcs7.verify(oriData.getBytes(charsetStr));
			if(cert.verify()){
				messVerifyResult = "验签通过！";
				certSN = cert.serialNumber();
				certDn = "证书主题项："+cert.subject();
				return true;
			}else{
				messVerifyResult = "验签失败！";
			}
		} catch (CertApiException e) {
			if(e.getMessage().equals("5000001")){
				messVerifyResult = "验签失败！签名证书不受信任！";
			}else{
				messVerifyResult = "验签失败！";
			}
		} catch (Exception e) {
			e.printStackTrace();
			messVerifyResult = "验签失败！异常类型："+e.getClass()+",异常描述:"+e.getMessage();
		}
		return false;
	}
	
	public static void main(String[] args) {
		// TODO 自动生成的方法存根
		//String oriData = "<?xml version=\"1.0\" encoding=\"GBK\" ?><B2CReq><remark>成功</remark><errorCode>0000</errorCode><errorMsg>success</errorMsg><fileName>M100001520_20161206_00123.xls</fileName></B2CReq>";
//		String signData = "MIIGtgYJKoZIhvcNAQcCoIIGpzCCBqMCAQExCzAJBgUrDgMCGgUAMIHFBgkqhkiG\n9w0BBwGggbcEgbQ8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJHQksiID8+\nPEIyQ1JlcT48cmVtYXJrPuaIkOWKnzwvcmVtYXJrPjxlcnJvckNvZGU+MDAwMDwv\nZXJyb3JDb2RlPjxlcnJvck1zZz5zdWNjZXNzPC9lcnJvck1zZz48ZmlsZU5hbWU+\nTTEwMDAwMTY4MF8yMDE3MDIyN18wMDEueGxzPC9maWxlTmFtZT48L0IyQ1JlcT6g\nggQBMIID/TCCAuWgAwIBAgIUD1g3AjClRMRtsOWtVKVQb899TpMwDQYJKoZIhvcN\nAQELBQAwgYExCzAJBgNVBAYTAkNOMS0wKwYDVQQKDCTmtZnmsZ/nlKzmmJPnlLXl\nrZDmlK/ku5jmnInpmZDlhazlj7gxEjAQBgNVBAsMCeaKgOacr+mDqDEvMC0GA1UE\nAwwm5rWZ5rGf55Ss5piT55S15a2Q5pSv5LuY5pyJ6ZmQ5YWs5Y+4Q0EwHhcNMTYx\nMTE1MDY1NzM5WhcNMTcxMTE1MDY1NzM5WjBpMR4wHAYJKoZIhvcNAQkBFg84NDcx\nNTc3NkBxcS5jb20xHDAaBgNVBAMME+eUrOaYk+aUr+S7mOa1i+ivlUIxEjAQBgNV\nBAsMCeaKgOacr+mDqDEVMBMGA1UECgwM55Ss5piT5pSv5LuYMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo3QRoIqg2py5PQa46v8lzz3Lfat4oj9naWlG\n1G7bI/sIMuT/eqqLRUlsYABZfBp18fWf6HC27NEuxRO+DTA1CmoL1gViHVgbLru+\nb3gmAx1BEev47qB1GfeDJYC2nThtFvSJZr6sn7kPHFYDFgugQiyf542zg4As8kM5\nIrkrFIdMhLcg/ecnmPsZX+LZz8EhUh3OgyMSPbbJxKujIm5aYc41Robh8Hh1lqDg\nwfJ4jA678NGyWS7QjdUY2F/x9OyNZ2SoHxqI/aT2e5P5ABvKGcrUQvZZpbXcVIEa\n4+X6h1gbEw7A5ZP1FIy+8NOvDW5BE459sDOHFPRyyd1C6qOqNQIDAQABo4GDMIGA\nMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgWgMGYGA1UdHwRfMF0wW6BZoFeGVWh0dHA6\nLy90b3BjYS5pdHJ1cy5jb20uY24vcHVibGljL2l0cnVzY3JsP0NBPTU1QjlCRjBC\nOTcxQUQzRjhCRjdBOEIyMkIxMURBRUE5RkUxN0ExRTUwDQYJKoZIhvcNAQELBQAD\nggEBAMSEDHW0mgAbX1DInY0oa2+GxLZp3eo8qPpd8yvan/fRiGECtQ+4af2XRhB+\nXWbL5lWbRJkzvZnJkvx5LYYih0TDM2tyqeIM8uHkNAN/a3Dr4LrQCaiAH0VuAoWM\n/1pyVQQ6nf7VQgErrpxb07iyXhR28rdDUL5FodhDb7NVgGtES1SrhVE6C4u4lbOh\nIhSAuazJ/yDpunwqTERQVyu4P9O1pFpuuB0W0G7seADR6COqjxj+c8I5QZy1HAY9\n4ctEFNgQLoe6Q4/KOu4ZCH5d9Wruyuz2GaWi+SpoG1o0/p4d/A+4QoawBtAQkAEa\n+BHWvApLfufkEIRPpNo732SubXgxggHCMIIBvgIBATCBmjCBgTELMAkGA1UEBhMC\nQ04xLTArBgNVBAoMJOa1meaxn+eUrOaYk+eUteWtkOaUr+S7mOaciemZkOWFrOWP\nuDESMBAGA1UECwwJ5oqA5pyv6YOoMS8wLQYDVQQDDCbmtZnmsZ/nlKzmmJPnlLXl\nrZDmlK/ku5jmnInpmZDlhazlj7hDQQIUD1g3AjClRMRtsOWtVKVQb899TpMwCQYF\nKw4DAhoFADANBgkqhkiG9w0BAQEFAASCAQCgMKwcJKuKzVneuizZJ2+tcvvd7Uxy\na6TCnBr8q7MKFZ7OwCfEyan3FgHqmN1mNIrPaXtQRBTSB08iuRg2a8n7Ff94Vji5\n+Gaf/A7e53QpedoEahI2hRd+R+bXQGCH/+trMvnV1inV4PcBFiGwBZlfswiC19rO\n1ZNarcb1RCsb5gzvbExTMrv5myoTQuZXZzNR9aKETlUoGn+cJ6wbwXZOKo0enkGS\nba5sf2aFKPQZVTeUFKqZumGsktCvDpzRk70dhoX/jNvUb22/OeePp/IUN047sQDP\nSegHvcyK3OEC0oU6z9oeoSR8u1ZeCLf50oaQ/ZT7lFNgZT283Abec3Lr";
		
//		System.out.println("签名前："+signData);
		String oriData ="<?xml version=\"1.0\" encoding=\"GBK\" ?>"
		+"<B2CReq>"
		+"<remark>备用字段</remark>"
		+"</B2CReq>";

		String merSignMsg = CertTools.signMessage(oriData);
		System.out.println("签名后："+merSignMsg);
		System.out.println("签名结果："+CertTools.verifyMessage(merSignMsg,oriData,"GBK"));
	}

}
