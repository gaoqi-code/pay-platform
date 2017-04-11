package com.hiveview.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.log4j.Logger;

public class RsyncUtils {
	private static Logger logger = Logger.getLogger(PCAddress.class);
	public static void rsyncExec(String commond){
		try {
			Process p = Runtime.getRuntime().exec(commond);
//			logger.info(">>>>>>>>>>>>>--"+p.getOutputStream());
//			logger.info(">>>>>>>>>>>>>--"+p.getInputStream());
			BufferedReader read = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line=null;
		      while((line=read.readLine())!=null){
		    	  logger.info(line);
		      } 
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		rsyncExec("notepad");
	}
}
