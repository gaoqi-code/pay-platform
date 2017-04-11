package com.hiveview.util;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

public class ProperManager {
	
	private static final ResourceBundle RESOURCE_BUNDLE =ResourceBundle.getBundle("conf");
	
	/**
	 * 读取默认的config.properties文件
	 * @param key 
	 * @return value
	 */
	public static String getString(String key) {
		try {
			return RESOURCE_BUNDLE.getString(key);
		} catch (MissingResourceException e) {
			throw new RuntimeException( "! config : "+ key + '!');
		}
	}
	
	/**
	 * 读取指定的.properties文件
	 * @param key
	 * @return
	 */
	public static String getString(String key,String url) {
		try {
			return ResourceBundle.getBundle(url).getString(key);
		} catch (MissingResourceException e) {
			e.printStackTrace();
			throw new RuntimeException( "! config : "+ key + '!');
		}
	}
}
