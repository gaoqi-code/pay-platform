package com.hiveview.common.pay;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

import com.cfca.util.pki.PKIException;
import com.cfca.util.pki.api.KeyUtil;
import com.cfca.util.pki.api.SignatureUtil;
import com.cfca.util.pki.cert.X509Cert;
import com.cfca.util.pki.cipher.JCrypto;
import com.cfca.util.pki.cipher.JKey;
import com.cfca.util.pki.cipher.Session;
import com.cfca.util.pki.encoders.Base64;

/**
 * @ClassName: ProcessMessage
 * @Description: 提供对消息进行签名和验签的方法
 * @date 2012-7-04 上午09:51:34
 * @author chenshanjun
 * @version	1.0
 */
public class ProcessMessage {
	public ProcessMessage(){
		
	}
	
	/**
	 * 对消息进行签名
	 * @param srcMessage  原始消息
	 * @param certPath    签名证书路径
	 * @param password    获取密钥的密码
	 * @return b64SignMsg 签名之后的消息
	 */
	public static byte[] signMessage(String srcMessage,String certPath,String password){
		byte[] b64SignMsg = null;
		try {
			Session session = makeSession();
			if(session != null){
				JKey priKey = KeyUtil.getPriKey(certPath, password);	//获得私钥
				SignatureUtil signUtil = new SignatureUtil();
				b64SignMsg = signUtil.p1SignMessage(srcMessage.getBytes(), SignatureUtil.MD5_RSA, priKey, session);
			}
		} catch (PKIException e) {
			e.printStackTrace();
			b64SignMsg = null;
		}
		return b64SignMsg;
	}
	
	/**
	 * 对消息进行验签
	 * @param srcMessage 原始消息
	 * @param resMessage 签名之后的消息
	 * @param certPath   证书路径
	 * @return           true表示验签成功；false表示验签失败
	 */
	public static boolean verifyMessage(String srcMessage,String resMessage,String certPath){
		Session session = makeSession();
		try {
			if(session != null){
				X509Cert cert = new X509Cert(new FileInputStream(certPath));
				SignatureUtil signUtil = new SignatureUtil();
				boolean verify = signUtil.p1VerifySignMessage(srcMessage.getBytes(), resMessage.getBytes(), SignatureUtil.MD5_RSA, cert, session);
				if(!verify){
					return false;
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return false;
		} catch (PKIException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**
	 * 对消息进行验签
	 * @param srcMessage 原始消息
	 * @param resMessage 签名之后的消息
	 * @param bCert      证书
	 * @return           true表示验签成功；false表示验签失败
	 */
	public static boolean verifyMessage(String srcMessage,String resMessage,byte[] bCert){
		Session session = makeSession();
		try {
			if(session != null){
				X509Cert cert = new X509Cert(bCert);
				SignatureUtil signUtil = new SignatureUtil();
				boolean verify = signUtil.p1VerifySignMessage(srcMessage.getBytes(), resMessage.getBytes(), SignatureUtil.MD5_RSA, cert, session);
				if(!verify){
					return false;
				}
			}
		}catch (PKIException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/** 
	 * 对消息进行Base64编码
	 * @param content 原始消息 
	 * @return 编码后的Base64字符串
	*/ 
	public static String Base64Encode(byte[] content){
		// Base64编码
		byte[] encData = Base64.encode(content);
		return new String(encData);
	}
	
	
	/** 
	 * 对消息进行Base64解码
	 * @param content 原始消息 
	 * @return 解码后的Base64字节数组
	*/ 
	public static byte[] Base64Decode(String content){
		//解码
		byte[] decData = null;
		try {
			decData = Base64.decode(content.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return decData;
	}
	
	/**
	 * 初始化加密库，获得会话session
	 * @return Session
	 */
	private static Session makeSession(){
		try {
			JCrypto jcrypto = JCrypto.getInstance();
			jcrypto.initialize(JCrypto.JSOFT_LIB, null);
			Session session = jcrypto.openSession(JCrypto.JSOFT_LIB);
			return session;
		} catch (PKIException e) {
			e.printStackTrace();
			return null;
		}
	}
}
