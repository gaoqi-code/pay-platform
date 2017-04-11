package com.hiveview.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class IOUtil {
	/**************************** IO TEST start  * @throws FileNotFoundException ********************************/
	public static String getFileString(String filePath){
		StringBuffer data = new StringBuffer();
		//读取数据 
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(filePath);
			int c = -1;
			while ((c = fis.read()) != -1) {
				char ch = (char) c;
				data.append(ch);
			}
			fis.close();
			return data.toString();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	public static String getFileString(URL filePath){
		StringBuffer data = new StringBuffer();
		//读取数据 
		BufferedReader fis = null;
		try {
			fis = new BufferedReader(new InputStreamReader(filePath.openStream()));
			int c = -1;
			while ((c = fis.read()) != -1) {
				char ch = (char) c;
				data.append(ch);
			}
			fis.close();
			return data.toString();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**************************** IO TEST end   ********************************/
	public static void main(String[] args) {
		String []str = getFileString("E:\\Book1.cvs").split("\n");
		System.out.println(str.length);
	}
}
