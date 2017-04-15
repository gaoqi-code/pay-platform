package com.hiveview.util;

import com.hiveview.entity.BankForPay;
import com.hiveview.entity.BankList;
import com.hiveview.entity.BanksResponse;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;
import org.apache.commons.collections.map.HashedMap;
import org.dom4j.*;
import org.dom4j.io.SAXReader;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * ${DESCRIPTION}
 *
 * @author zhangsw
 * @create 2017-04-14 14:44
 */
public class XmlUtil {

    /**
     *  将传入xml文本转换成Java对象
     * @Title: toBean
     * @Description: TODO
     * @param xmlStr
     * @param cls  xml对应的class类
     * @return T   xml对应的class类的实例对象
     *
     * 调用的方法实例：PersonBean person=XmlUtil.toBean(xmlStr, PersonBean.class);
     */
    public static <T> T  toBean(String xmlStr,Class<T> cls){
        //注意：不是new Xstream(); 否则报错：java.lang.NoClassDefFoundError: org/xmlpull/v1/XmlPullParserFactory
        XStream xstream=new XStream(new DomDriver());
        xstream.processAnnotations(cls);
        T obj=(T)xstream.fromXML(xmlStr);
        return obj;
    }

    public static Map<String,String> getResult(String xml){
        Map<String,String> map = new HashMap<String, String>();
        try {
            Document document = DocumentHelper.parseText(xml);
            Element root = document.getRootElement();
            Iterator<Element> it = root.elementIterator();
            while (it.hasNext()) {
                Element element = it.next();
                map.put(element.getName(), element.getTextTrim());
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return map;
    }

    public static void main(String[] a)throws Exception {
        String str = "<?xml version=\"1.0\" encoding=\"GBK\" ?><B2CRep><bankCount>7</bankCount><bankList><bankRow><bankName>银联全渠道</bankName><bankID>888B</bankID><otherBankID>888B</otherBankID><cardType>01</cardType></bankRow></bankList></B2CRep>";
        BanksResponse bankList=XmlUtil.toBean(str,BanksResponse.class);

        System.out.println("count="+bankList.getBankCount());
        BankList list=bankList.getBankList();
        for(BankForPay bank:list.getBankList()){
            System.out.println("bankName="+bank.getBankName());
            System.out.println("BankID="+bank.getBankID());
            System.out.println("count="+bank.getCartType());
        }
    }
}
