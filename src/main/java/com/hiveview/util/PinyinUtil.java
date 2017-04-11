package com.hiveview.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class PinyinUtil {
	public static String getFirstHanyuPinyin(String strCN){  
        if(null == strCN){  
            return null;  
        }  
        StringBuffer firstSpell = new StringBuffer();  
        char[] charOfCN = strCN.toCharArray();  
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();  
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);  
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);  
        for (int i = 0; i < charOfCN.length; i++) {  
            // 是否为中文字符  
            if (charOfCN[i] > 128) {  
                String[] spellArray;
				try {
					spellArray = PinyinHelper.toHanyuPinyinStringArray(charOfCN[i], format);
	                if (null != spellArray) {  
	                    firstSpell.append(spellArray[0].charAt(0));  
	                }else{  
	                    firstSpell.append(charOfCN[i]);  
	                }  

				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
				}  
            } else {  
                firstSpell.append(charOfCN[i]);  
            }  
        }  
        return firstSpell.toString().replace("《", "").replace("》", "").replace("·","").toLowerCase();  
    }  

	public static void main(String[] args) {
		System.out.println(getFirstHanyuPinyin("我是这个的asd123<《约翰尼·德普abcTV"));
	}
}
