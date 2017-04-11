package com.hiveview.common;

import java.util.HashMap;
import java.util.Map;

public class Msg {
	Msg(){
		
	}
	
	public static final String GET_SYSUSER_ERROE = "获取系统用户列表失败!";
	
	public static Map<String, String> sessionIdMap = null;
	
	
	public static Map<String, String> getInstance(){
		if(sessionIdMap==null){
			sessionIdMap = new HashMap<String, String>();
		}	
		return sessionIdMap;
	}
}
