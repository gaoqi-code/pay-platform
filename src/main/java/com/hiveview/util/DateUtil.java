package com.hiveview.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	/**
	 * 获取当前时间的秒数
	 * 
	 * @return
	 */
	private static SimpleDateFormat sdf = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	
	public static int getTime() {
		return (int) (System.currentTimeMillis() / 1000l);
	}
	
	public static String getStrDate(Integer intDate){
		
		String date = null;
		if(intDate != null){
			try {
				date = sdf.format(new Date((long)intDate * 1000));
			} catch (Exception e) {
				e.printStackTrace();
				date = intDate.toString();
			}
		}
		
		return date;
	}
	
	/**
	 * 转换成Timestamp类型
	 * @param date
	 * @return
	 */
	public static Timestamp getTimeStamp(Date date){
		String timestamp = null;
		Timestamp stamp = null;
		if(date != null){
			try {
				timestamp = sdf.format(date);
				stamp = Timestamp.valueOf(timestamp);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return stamp;
	}
	
	
	public static long GetDateMargin(String strBeginDate,String strEndDate){
		if(strBeginDate==null||strBeginDate.equals("")||strEndDate==null||strEndDate.equals("")){
			return -100;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    long margin = 0;
	    try {
			margin = sdf.parse(strEndDate).getTime() - sdf.parse(strBeginDate).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	    margin = margin/(1000*60*60*24);
	    return margin;
	}
}
