package com.hiveview.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTime {

	public static final String PATTERN_HOUR = "yyyy-MM-dd HH";
	public static final String PATTERN_DAY = "yyyy-MM-dd";
	public static final String PATTERN_MONTH = "yyyy-MM";
	public static final String PATTERN_YEAR = "yyyy";
	public static final String PATTERN_SECOND = "yyyy-MM-dd HH:mm:ss";

	public static Timestamp currentHour() {
		return currentTime(PATTERN_MONTH);
	}

	public static Timestamp currentDay() {
		return currentTime(PATTERN_DAY);
	}

	public static Timestamp currentMonth() {
		return currentTime(PATTERN_MONTH);
	}

	public static Timestamp currentYear() {
		return currentTime(PATTERN_YEAR);
	}

	public static Timestamp currentTime() {
		long time = System.currentTimeMillis();
		return new Timestamp(time);
	}

	public static Timestamp currentTime(String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		Date date = null;
		try {
			String string = format.format(new Date());
			date = format.parse(string);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return new Timestamp(date.getTime());
	}

	public static Timestamp getTime(String source, String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		Date date = null;
		try {
			date = format.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return new Timestamp(date.getTime());
	}

	public static void main(String[] args) {
		System.out.println(getTime("2013-10-24 00:00:00", PATTERN_SECOND));
	}
}
