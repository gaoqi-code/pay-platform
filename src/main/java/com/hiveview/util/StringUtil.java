package com.hiveview.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.List;

import com.hiveview.common.Constants;
import com.hiveview.entity.sys.SysAuth;

public class StringUtil {

	public static String getNewString(String text, String propValue) {
		if(text.indexOf(Constants.APK)<=0)
			return "";
		text = text.substring(text.indexOf(Constants.APK)+6);
		String[] arg = text.split("/");
		StringBuffer s = new StringBuffer(propValue);
		return s.append("/").append(arg[1]).append("/").append(arg[2]).toString();
	}

	public static void writerString(String text) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(new File("E:/home/info.log")));
			writer.write(text);
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void createHtml(List<SysAuth> list){
		String testStr = "";
		System.out.println(new File(testStr).exists());
	}
	public static void main(String[] args) {
//		String picPath = "http://124.207.119.78/tvapk/appVersion/20142/1392812177755.apk";
//		StringUtil.getNewString(picPath,"d://home");
//		System.out.println(StringUtil.getNewString(picPath,"d://home"));
		String testStr = "E:/device.csv";
		System.out.println(new File(testStr).exists());
	}
}
