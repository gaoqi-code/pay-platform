//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.hiveview.filter;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class ParameterRequestWrapper extends HttpServletRequestWrapper {
    private static Map<String, Integer> excludeURL = new HashMap();
    private static Map<String, Map<String, Integer>> excludeAttribute = new HashMap();
    public static boolean open = true;
    private final static Logger logger = Logger.getLogger(ParameterRequestWrapper.class);
    static {
        SAXReader reader = new SAXReader();
        File file = new File(Thread.currentThread().getContextClassLoader().getResource("white-list.xml").getPath());
        Document document = null;

        try {
            document = reader.read(file);
            Element e = document.getRootElement();
            String isOpen = e.attribute("open").getValue();
            if(isOpen.equals("true")) {
                open = true;
            } else {
                open = false;
            }

            List childElements = e.elements();
            Iterator var7 = childElements.iterator();

            while(true) {
                while(var7.hasNext()) {
                    Element el = (Element)var7.next();
                    List childEl = el.elements();
                    if(childEl.size() == 0) {
                        excludeURL.put(el.attribute("URL").getValue(), Integer.valueOf(1));
                    } else {
                        HashMap map = new HashMap();
                        Iterator var11 = childEl.iterator();

                        while(var11.hasNext()) {
                            Element e1 = (Element)var11.next();
                            map.put(e1.getTextTrim(), Integer.valueOf(1));
                        }

                        excludeAttribute.put(el.attribute("URL").getValue(), map);
                    }
                }

                logger.debug("StringEscapeInterceptor.excludeURL=" + excludeURL);
                logger.debug("StringEscapeInterceptor.excludeAttribute=" + excludeAttribute);
                break;
            }
        } catch (DocumentException var12) {
            logger.error("XSS 攻击白名单初始化失败 请检查  class 根目录下 white-list.xml", var12);
        }

    }

    public ParameterRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    public Object getAttribute(String name) {
        if(super.getServletPath().indexOf(".jsp") <= 0 && super.getServletPath().indexOf(".ftl") <= 0) {
            if(!open) {
                return super.getAttribute(name);
            } else if(excludeURL.get(super.getServletPath()) != null || !(super.getAttribute(name) instanceof String) || excludeAttribute.get(super.getServletPath()) != null && ((Map)excludeAttribute.get(super.getServletPath())).get(name) != null) {
                return super.getAttribute(name);
            } else {
                logger.debug("ParameterRequestWrapper getAttribute before name=" + name + " value" + super.getAttribute(name));
                String value = StringEscapeUtils.escapeHtml4(String.valueOf(super.getAttribute(name)));
                logger.debug("ParameterRequestWrapper getAttribute after name=" + name + " value=" + value);
                return value;
            }
        } else {
            return super.getAttribute(name);
        }
    }

    public String getParameter(String name) {
        if(!open) {
            return super.getParameter(name);
        } else if(excludeURL.get(super.getServletPath()) != null || excludeAttribute.get(super.getServletPath()) != null && ((Map)excludeAttribute.get(super.getServletPath())).get(name) != null) {
            return super.getParameter(name);
        } else {
            logger.debug("ParameterRequestWrapper getParameter before name=" + name + " value" + super.getParameter(name));
            String value = StringEscapeUtils.escapeHtml4(super.getParameter(name));
            logger.debug("ParameterRequestWrapper getParameter after name=" + name + " value=" + value);
            return value;
        }
    }

    public Map getParameterMap() {
        Map map = super.getParameterMap();
        if(map != null && open) {
            if(excludeURL.get(super.getServletPath()) == null) {
                Map attribute = (Map)excludeAttribute.get(super.getServletPath());
                Object[] keys = map.keySet().toArray();

                for(int j = 0; j < keys.length; ++j) {
                    logger.debug("keys:" + j + "=" + keys[j]);
                    logger.debug("attribute=" + attribute);
                    if(attribute == null || attribute.get(keys[j]) == null) {
                        String[] values = (String[])map.get(String.valueOf(keys[j]));
                        logger.debug("before values:" + j + "=" + keys[j] + "=" + values[0]);

                        for(int i = 0; i < values.length; ++i) {
                            values[i] = StringEscapeUtils.escapeHtml4(values[i]);
                        }

                        logger.debug("after values:" + j + "=" + keys[j] + "=" + values[0]);
                    }
                }
            }

            return map;
        } else {
            return super.getParameterMap();
        }
    }

    public String[] getParameterValues(String name) {
        String[] values = super.getParameterValues(name);
        if(values != null && open) {
            if(excludeURL.get(super.getServletPath()) == null && (excludeAttribute.get(super.getServletPath()) == null || ((Map)excludeAttribute.get(super.getServletPath())).get(name) == null)) {
                for(int i = 0; i < values.length; ++i) {
                    logger.debug("ParameterRequestWrapper getParameterValues before name=" + name + " value" + values[i]);
                    values[i] = StringEscapeUtils.escapeHtml4(values[i]);
                    logger.debug("ParameterRequestWrapper getParameterValues after name=" + name + " value=" + values[i]);
                }
            }

            return values;
        } else {
            return super.getParameterValues(name);
        }
    }
}
