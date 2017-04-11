package com.hiveview.util;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

/**
 * 
 * @author gonglixun
 *
 */
public class PCAddress {
	static Logger logger = Logger.getLogger(PCAddress.class);
	public static String getIpAddress(HttpServletRequest request) {
			String ip = request.getHeader("X-Forwarded-For");
			if (!checkIp(ip)) {
				ip = request.getHeader("Proxy-Client-IP");
				logger.info("检测外部代理的ip地址："+ip);
			}
			if (!checkIp(ip)) {
				ip = request.getHeader("WL-Proxy-Client-IP");// 
				logger.info("检测局域网ip地址："+ip);
			}
			if (!checkIp(ip)) {
				ip = request.getRemoteAddr();// 
				logger.info("获取实际ip地址："+ip);
			}
			return ip;	
	}
	
	private static boolean checkIp(String ip) {
		if (ip == null || ip.length() == 0 || "unkown".equalsIgnoreCase(ip)|| ip.split(".").length != 4) {
			return false;
		}
		logger.info("检查ip------>request.getHeader(X-Forwarded-For)："+ip);
		return true;
	}

}
