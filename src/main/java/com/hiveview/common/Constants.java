package com.hiveview.common;



public class Constants {
	
	/**
	 * 上传文件总目录
	 */
	public static String UPLOAD = "upload"; 
	
	/**
	 * apk上传目录
	 */
	public static String APK="tvapk";
	
	/**
	 * 二维码生成目录
	 */
	public static String MATRIX_OUT_PATH_KEY = "BitMatrixPath";
	
	/**
	 * LOGO 图标位置
	 */
	public static String MATRIX_LOGO_URL = "douban_img";
	
	/**
	 * LOGO 大小 默认为图片的1/5
	 */
	public static int MATRIX_LOGO_SIZE = 5;
	
	/**
	 * 二维码图片高
	 */
	public static int MATRIX_HEIGHT = 212;
	
	/**
	 * 二维码图片宽
	 */
	public static int MATRIX_WIDTH = 212;
	
	/**
	 * 二维码图片格式
	 */
	public static String MATRIX_IMG_SUFFIX = "jpg";
	
	/**
	 * 豆瓣搜索电影请求
	 */
	public static String DB_MOVE_SEARCH_URL = "http://api.douban.com/v2/movie/search?q={0}&start={1}&count={2}";
	///////////////// huan wang start /////////////////
	
	public static String cpKey_huan = "";
	public static String uri_huan = "http://www.5i.test.cedock.net/inject/json";
	public static int pageSize_huan = 10;
	
	///////////////// huan wang end ///////////////////
	
	/**
	 * 数据统计接口参数
	 * @author sunquan
	 *
	 */
	public static class DATA_COLLECT{
		/**
		 * 统计接口URL
		 */
		public static String DATA_COLLECT_URL = "data.domybox.com/data_collect/stat/deviceManage.json";
		/**
		 * 新增分配设备
		 */
		public static Integer DEVICE_ADD = 101;
		/**
		 * 生产商，
		 */
		public static Integer CP_ADD = 201;
		public static Integer CP_UPATE = 203;
		public static Integer CP_DELETE = 202;
		/**
		 * 渠道
		 */
		public static Integer CPCHANNEL_ADD = 301;
		public static Integer CPCHANNEL_UPATE = 303;
		public static Integer CPCHANNEL_DELETE = 302;
		/**
		 * 硬件型号
		 */
		public static Integer HARDWARE_ADD = 401;
		public static Integer HARDWARE_UPATE = 403;
		public static Integer HARDWARE_DELETE = 402;
	}
}
