package com.hiveview.util;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class FileUtil {


	// 通过文件路径得到文件
	public static File getFileByUrl(String url) {
		return new File(url);
	}
	public static String getFileMD5String(String url) {
		// 缓冲区大小（这个可以抽出一个参数）
		int bufferSize = 256 * 1024;
		FileInputStream fileInputStream = null;
		DigestInputStream digestInputStream = null;
		try {
			// 拿到一个MD5转换器（同样，这里可以换成SHA1）
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			// 使用DigestInputStream
			fileInputStream = new FileInputStream(url);
			digestInputStream = new DigestInputStream(fileInputStream,messageDigest);
			// read的过程中进行MD5处理，直到读完文件
			byte[] buffer = new byte[bufferSize];
			while (digestInputStream.read(buffer) > 0);
			// 获取最终的MessageDigest
			messageDigest = digestInputStream.getMessageDigest();
			// 拿到结果，也是字节数组，包含16个元素
			byte[] resultByteArray = messageDigest.digest();
			// 同样，把字节数组转换成字符串
			return byteArrayToHex(resultByteArray);
		} catch (NoSuchAlgorithmException e) {
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				digestInputStream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				fileInputStream.close();
			} catch (Exception e) {
				e.printStackTrace();	
			}

		}
	}

	// 得到文件大小
	public static long getFileSizes(String url) {
		long s = -1;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(getFileByUrl(url));
			s = fis.available();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return s;
	}

	public static void main(String[] args) throws IOException {
		long begin = System.currentTimeMillis();
		String md5 = getFileMD5String("/wz/1393381595917.apk");

		long end = System.currentTimeMillis();
		System.out.println("md5:" + md5);
		System.out.println("time:" + ((end - begin) / 1000) + "s");
		System.out.println("文件大小：" + getFileSizes("/wz/1393381595917.apk"));

	}

	public static String byteArrayToHex(byte[] byteArray) {
		// 首先初始化一个字符数组，用来存放每个16进制字符
		char[] hexDigits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a', 'b', 'c', 'd', 'e', 'f' };
		// new一个字符数组，这个就是用来组成结果字符串的（解释一下：一个byte是八位二进制，也就是2位十六进制字符（2的8次方等于16的2次方））
		char[] resultCharArray = new char[byteArray.length * 2];
		// 遍历字节数组，通过位运算（位运算效率高），转换成字符放到字符数组中去
		int index = 0;
		for (byte b : byteArray) {
			resultCharArray[index++] = hexDigits[b >>> 4 & 0xf];
			resultCharArray[index++] = hexDigits[b & 0xf];
		}
		// 字符数组组合成字符串返回
		return new String(resultCharArray);
	}
}  