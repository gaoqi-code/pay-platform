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
	 * 支付请求接口名
	 */
	public static String INTERFACE_NAME_PAY = "anonymousPayOrder";

	/**
	 * 获取付款银行接口名
	 */
	public static String INTERFACE_NAME_GETBANKS = "getBanksForPay";

	/**
	 * 单笔订单查询接口名
	 */
	public static String INTERFACE_NAME_QUERYORDER = "QueryOrder";

	/**
	 * 退款接口名
	 */
	public static String INTERFACE_NAME_REFUNDORDER = "RefundOrder";

	/**
	 * 退款订单查询接口名
	 */
	public static String INTERFACE_NAME_QUERYREFUNDORDER = "QueryRefundOrder";

	/**
	 * 甬易支付平台返回码—未支付
	 */
	public static String YOYI_TRANSTATE_NOPAY ="0";
	/**
	 * 甬易支付平台返回码—已支付
	 */
	public static String YOYI_TRANSTATE_HASPAY ="1";
	/**
	 * 甬易支付平台返回码—支付失败
	 */
	public static String YOYI_TRANSTATE_PAYFAIL ="2";

	/**
	 * 消费类型--充值
	 */
	public static int TRADE_TYPE_CHONGZHI =1;

	/**
	 * 收支类型--收入
	 */
	public static int BALOFPAY_TYPE_SHOURU =1;

	/**
	 * 收支类型--支出
	 */
	public static int BALOFPAY_TYPE_ZHICHU =2;
}
