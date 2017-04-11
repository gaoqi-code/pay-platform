package com.hiveview.util;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;

import com.hiveview.common.Constants;

public class FilePathUtil {

	// 获得文件后缀名
	public static String getFileSuffixName(String fileName) {
		return fileName.substring(fileName.lastIndexOf(".") + 1,
				fileName.length());
	}

	// 创建目录
	public static String mkdir(String path, Integer flag) {
		String realPath = path + getYMD(flag);
		File saveFile = new File(realPath);
		if (!saveFile.exists() && !saveFile.isDirectory()) {
			saveFile.mkdir();
		}
		return realPath;
	}

	// 生成时间(年月日)
	public static String getYMD(Integer flag) {
		Calendar cal = Calendar.getInstance();// 使用日历类
		int year = cal.get(Calendar.YEAR);// 得到年
		int month = cal.get(Calendar.MONTH) + 1;// 得到月，因为从0开始的，所以要加1
		int day = cal.get(Calendar.DAY_OF_MONTH);// 得到天
		StringBuffer ymd = new StringBuffer("/");
		switch (flag) {
		case 1:
			return ymd.append(year).append(month).append(day).toString();
		default:
			return ymd.append(year).append(month).toString();
		}
	}

	public static String getVisitPath(String propPath, Integer visitWay,
			String basePath, String realPath, String newFileName) {
		StringBuilder configPath = null;
		if (null == visitWay) {
			String askPath = realPath.substring(realPath.lastIndexOf("/") + 1,
					realPath.length());
			String visitPath = propPath.substring(propPath.lastIndexOf("/"),
					propPath.length());
			configPath = new StringBuilder(basePath).append(visitPath)
					.append("/").append(askPath).append("/")
					.append(newFileName);
		} else {
			configPath = new StringBuilder(realPath).append("/").append(
					newFileName);
		}
		return configPath.toString();
	}
	public static String getVisitPath(String propPath,String basePath,String realPath,String newFileName){
		StringBuilder configPath = null;
		String visitPath=realPath.substring(realPath.lastIndexOf(Constants.UPLOAD)+6, realPath.length());
		configPath = new StringBuilder(basePath).append(visitPath).append("/").append(newFileName);
	    return configPath.toString();
	}

	//
	public static String getPathForProperties(String key) throws IOException {
		return ProperManager.getString(key);
	}
}
