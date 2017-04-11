package com.hiveview.util;

public class TestUtils {

	public static void main(String[] args) {
		for(int i=0;i<=255;i++){
			for(int j=0;j<=255;j++){
				System.out.println("14-3D-F2-01-"+convertDecimalToBinary(i)+"-"+convertDecimalToBinary(j));
			}
		}
	}

	public static String convertDecimalToBinary(int value) {
		if(value<=15)
			return ("0"+Integer.toHexString(value)).toUpperCase();
		return Integer.toHexString(value).toUpperCase();
	}
}
