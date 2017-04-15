package com.hiveview.common.pay;

import cn.topca.api.cert.CertApiException;
import cn.topca.api.cert.TCA;

import java.io.IOException;
import java.io.InputStream;


public class ConfigTool {
    private static ConfigTool configTool = null;
    private ConfigTool(){}
    public static ConfigTool getInstance(){
    	if(configTool==null){
    		configTool = new ConfigTool();
    		try {
				configTool.init();
			} catch (IOException e) {
				System.out.println("CA初始化失败");
				configTool = null;
				return null;
			} catch (CertApiException e) {
				System.out.println("CA初始化失败");
				configTool = null;
				return null;
			}
    		return configTool;
    	}else{
    		return configTool;	
    	}
    }
    private static boolean initialized = false;
    private void init() throws IOException, CertApiException {
        if (initialized)
            return;
        InputStream is = ConfigTool.class.getClassLoader().getResourceAsStream("SCTopESA.config.json");
        byte[] buf = new byte[is.available()];
        is.read(buf);
        is.close();
        String json = new String(buf, "UTF-8");
        TCA.config(json);
        initialized = true;
    }
   
}