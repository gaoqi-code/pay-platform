package com.hiveview.util;
  
import java.io.File;  
import java.io.IOException;  
import java.io.StringWriter;
import java.util.*;

import net.sf.json.JSON;  
import net.sf.json.JSONObject;  
  
import org.apache.commons.io.FileUtils;  
import org.dom4j.Attribute;  
import org.dom4j.Document;  
import org.dom4j.DocumentException;  
import org.dom4j.DocumentHelper;  
import org.dom4j.Element;  
import org.dom4j.io.OutputFormat;  
import org.dom4j.io.XMLWriter;  
  
/**
 * xml转map，map转xml 带属性  
 * http://happyqing.iteye.com/blog/2316275  
 * @author happyqing 
 * @since 2016.8.8 
 */  
@SuppressWarnings({ "rawtypes", "unchecked" })  
public class XmlUtil {
    // 字符编码格式 目前支持 gbk 或 utf-8
    public static String encoding_charset = "UTF-8";
    /**
     * xml转map 不带属性 
     * @param xmlStr 
     * @param needRootKey 是否需要在返回的map里加根节点键 
     * @return 
     * @throws DocumentException 
     */  
    public static Map xml2map(String xmlStr, boolean needRootKey) throws DocumentException {  
        Document doc = DocumentHelper.parseText(xmlStr);  
        Element root = doc.getRootElement();  
        Map<String, Object> map = (Map<String, Object>) xml2map(root);  
        if(root.elements().size()==0 && root.attributes().size()==0){  
            return map;  
        }  
        if(needRootKey){  
            //在返回的map里加根节点键（如果需要）  
            Map<String, Object> rootMap = new HashMap<String, Object>();  
            rootMap.put(root.getName(), map);  
            return rootMap;  
        }  
        return map;  
    }  
  
    /** 
     * xml转map 带属性 
     * @param xmlStr 
     * @param needRootKey 是否需要在返回的map里加根节点键 
     * @return 
     * @throws DocumentException 
     */  
    public static Map xml2mapWithAttr(String xmlStr, boolean needRootKey) throws DocumentException {  
        Document doc = DocumentHelper.parseText(xmlStr);  
        Element root = doc.getRootElement();  
        Map<String, Object> map = (Map<String, Object>) xml2mapWithAttr(root);  
        if(root.elements().size()==0 && root.attributes().size()==0){  
            return map; //根节点只有一个文本内容  
        }  
        if(needRootKey){  
            //在返回的map里加根节点键（如果需要）  
            Map<String, Object> rootMap = new HashMap<String, Object>();  
            rootMap.put(root.getName(), map);  
            return rootMap;  
        }  
        return map;  
    }  
  
    /** 
     * xml转map 不带属性 
     * @param e 
     * @return 
     */  
    private static Map xml2map(Element e) {  
        Map map = new LinkedHashMap();  
        List list = e.elements();  
        if (list.size() > 0) {  
            for (int i = 0; i < list.size(); i++) {  
                Element iter = (Element) list.get(i);  
                List mapList = new ArrayList();  
  
                if (iter.elements().size() > 0) {  
                    Map m = xml2map(iter);  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(m);  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(m);  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), m);  
                } else {  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(iter.getText());  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(iter.getText());  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), iter.getText());  
                }  
            }  
        } else  
            map.put(e.getName(), e.getText());  
        return map;  
    }  
  
    /** 
     * xml转map 带属性 
     * @param e 
     * @return 
     */  
    private static Map xml2mapWithAttr(Element element) {  
        Map<String, Object> map = new LinkedHashMap<String, Object>();  
  
        List<Element> list = element.elements();  
        List<Attribute> listAttr0 = element.attributes(); // 当前节点的所有属性的list  
        for (Attribute attr : listAttr0) {  
            map.put("@" + attr.getName(), attr.getValue());  
        }  
        if (list.size() > 0) {  
  
            for (int i = 0; i < list.size(); i++) {  
                Element iter = list.get(i);  
                List mapList = new ArrayList();  
  
                if (iter.elements().size() > 0) {  
                    Map m = xml2mapWithAttr(iter);  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(m);  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(m);  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), m);  
                } else {  
  
                    List<Attribute> listAttr = iter.attributes(); // 当前节点的所有属性的list  
                    Map<String, Object> attrMap = null;  
                    boolean hasAttributes = false;  
                    if (listAttr.size() > 0) {  
                        hasAttributes = true;  
                        attrMap = new LinkedHashMap<String, Object>();  
                        for (Attribute attr : listAttr) {  
                            attrMap.put("@" + attr.getName(), attr.getValue());  
                        }  
                    }  
  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            // mapList.add(iter.getText());  
                            if (hasAttributes) {  
                                attrMap.put("#text", iter.getText());  
                                mapList.add(attrMap);  
                            } else {  
                                mapList.add(iter.getText());  
                            }  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            // mapList.add(iter.getText());  
                            if (hasAttributes) {  
                                attrMap.put("#text", iter.getText());  
                                mapList.add(attrMap);  
                            } else {  
                                mapList.add(iter.getText());  
                            }  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else {  
                        // map.put(iter.getName(), iter.getText());  
                        if (hasAttributes) {  
                            attrMap.put("#text", iter.getText());  
                            map.put(iter.getName(), attrMap);  
                        } else {  
                            map.put(iter.getName(), iter.getText());  
                        }  
                    }  
                }  
            }  
        } else {  
            // 根节点的  
            if (listAttr0.size() > 0) {  
                map.put("#text", element.getText());  
            } else {  
                map.put(element.getName(), element.getText());  
            }  
        }  
        return map;  
    }  
      
    /** 
     * map转xml map中没有根节点的键 
     * @param map 
     * @param rootName 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static Document map2xml(Map<String, Object> map, String rootName) throws DocumentException, IOException  {  
        Document doc = DocumentHelper.createDocument();  
        Element root = DocumentHelper.createElement(rootName);  
        doc.add(root);  
        map2xml(map, root);
        //System.out.println(doc.asXML());
        //System.out.println(formatXml(doc));
        return doc;  
    }

    /**
     * map转xml map中没有根节点的键
     * @param map
     * @param rootName
     * @param charset
     * @throws DocumentException
     * @throws IOException
     */
    public static Document map2xml(Map<String, Object> map, String rootName,String charset) throws DocumentException, IOException  {
        encoding_charset=charset;
        Document doc = DocumentHelper.createDocument();
        Element root = DocumentHelper.createElement(rootName);
        doc.add(root);
        map2xml(map, root);
        //System.out.println(doc.asXML());
        //System.out.println(formatXml(doc));
        return doc;
    }

    /** 
     * map转xml map中含有根节点的键 
     * @param map 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static Document map2xml(Map<String, Object> map) throws DocumentException, IOException  {  
        Iterator<Map.Entry<String, Object>> entries = map.entrySet().iterator();  
        if(entries.hasNext()){ //获取第一个键创建根节点  
            Map.Entry<String, Object> entry = entries.next();  
            Document doc = DocumentHelper.createDocument();  
            Element root = DocumentHelper.createElement(entry.getKey());  
            doc.add(root);  
            map2xml((Map)entry.getValue(), root);  
            //System.out.println(doc.asXML());  
            //System.out.println(formatXml(doc));  
            return doc;  
        }  
        return null;  
    }  
      
    /** 
     * map转xml 
     * @param map 
     * @param body xml元素 
     * @return 
     */  
    private static Element map2xml(Map<String, Object> map, Element body) {  
        Iterator<Map.Entry<String, Object>> entries = map.entrySet().iterator();  
        while (entries.hasNext()) {  
            Map.Entry<String, Object> entry = entries.next();  
            String key = entry.getKey();  
            Object value = entry.getValue();  
            if(key.startsWith("@")){    //属性  
                body.addAttribute(key.substring(1, key.length()), value.toString());  
            } else if(key.equals("#text")){ //有属性时的文本  
                body.setText(value.toString());  
            } else {  
                if(value instanceof List ){
                    List list = (List)value;  
                    Object obj;  
                    for(int i=0; i<list.size(); i++){  
                        obj = list.get(i);  
                        //list里是map或String，不会存在list里直接是list的，  
                        if(obj instanceof Map){
                            Element subElement = body.addElement(key);  
                            map2xml((Map)list.get(i), subElement);  
                        } else {  
                            body.addElement(key).setText((String)list.get(i));  
                        }  
                    }  
                } else if(value instanceof Map ){
                    Element subElement = body.addElement(key);  
                    map2xml((Map)value, subElement);  
                } else {  
                    body.addElement(key).setText(value.toString());  
                }  
            }  
            //System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());  
        }  
        return body;  
    }  
      
    /** 
     * 格式化输出xml 
     * @param xmlStr 
     * @return 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static String formatXml(String xmlStr) throws DocumentException, IOException  {  
        Document document = DocumentHelper.parseText(xmlStr);  
        return formatXml(document);  
    }  
      
    /** 
     * 格式化输出xml 
     * @param document 
     * @return 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static String formatXml(Document document) throws DocumentException, IOException  {
        // 格式化输出格式  
        OutputFormat format = OutputFormat.createPrettyPrint();  
        format.setEncoding(encoding_charset);
        StringWriter writer = new StringWriter();  
        // 格式化输出流  
        XMLWriter xmlWriter = new XMLWriter(writer, format);  
        // 将document写入到输出流  
        xmlWriter.write(document);  
        xmlWriter.close();  
        return writer.toString();  
    }
    /**
     * map生成无换行xml
     * @param map
     * @param rooName
     * @return
     * @throws DocumentException
     * @throws IOException
     */
    public static String callMapToXML(Map map,String rooName) {
        StringBuffer sb = new StringBuffer();
        sb.append("<?xml version=\"1.0\" encoding=\""+encoding_charset+"\" ?><"+rooName+">");
        mapToXMLTest2(map, sb);
        sb.append("</"+rooName+">");
        try {
            return new String(sb.toString().getBytes("UTF-8"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    private static void mapToXMLTest2(Map map, StringBuffer sb) {
        Set set = map.keySet();
        for (Iterator it = set.iterator(); it.hasNext();) {
            String key = (String) it.next();
            Object value = map.get(key);
            if (null == value)
                value = "";
            if (value.getClass().getName().equals("java.util.ArrayList")) {
                ArrayList list = (ArrayList) map.get(key);
                sb.append("<" + key + ">");
                for (int i = 0; i < list.size(); i++) {
                    HashMap hm = (HashMap) list.get(i);
                    mapToXMLTest2(hm, sb);
                }
                sb.append("</" + key + ">");

            } else {
                if (value instanceof HashMap) {
                    sb.append("<" + key + ">");
                    mapToXMLTest2((HashMap) value, sb);
                    sb.append("</" + key + ">");
                } else {
                    sb.append("<" + key + ">" + value + "</" + key + ">");
                }

            }

        }
    }
    public static void main(String[] args) throws DocumentException, IOException {
        String str = "<?xml version=\"1.0\" encoding=\"GBK\" ?><B2CRep><bankCount>7</bankCount><bankList><bankRow><bankName>银联全渠道</bankName><bankID>888B</bankID><otherBankID>888B</otherBankID><cardType>01</cardType></bankRow><bankRow><bankName>银联全渠道</bankName><bankID>888C</bankID><otherBankID>888C</otherBankID><cardType>01</cardType></bankRow><bankRow><bankName>银联扫码</bankName><bankID>969C</bankID><otherBankID>969C</otherBankID><cardType>01</cardType></bankRow><bankRow><bankName>支付宝APP支付</bankName><bankID>980C</bankID><otherBankID>980C</otherBankID><cardType>X</cardType></bankRow><bankRow><bankName>民生微信公众号支付</bankName><bankID>993C</bankID><otherBankID>993C</otherBankID><cardType>01</cardType></bankRow><bankRow><bankName>民生微信扫码</bankName><bankID>994C</bankID><otherBankID>994C</otherBankID><cardType>01</cardType></bankRow><bankRow><bankName>民生支付宝扫码</bankName><bankID>995C</bankID><otherBankID>995C</otherBankID><cardType>X</cardType></bankRow></bankList></B2CRep>";
        long begin = System.currentTimeMillis();
        Map<String, Object> map = xml2map(str, false);
        System.out.println("耗时:"+(System.currentTimeMillis()-begin));

        JSON json = JSONObject.fromObject(map);
        System.out.println(json.toString(1)); // 格式化输出

        Document doc = map2xml(map, "B2CRep","GBK");
        //Document doc = map2xml(map); //map中含有根节点的键
        System.out.println(formatXml(doc));
    }
}  