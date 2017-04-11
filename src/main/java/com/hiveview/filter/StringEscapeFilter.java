//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.hiveview.filter;

import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StringEscapeFilter implements Filter {
    private final static Logger logger = Logger.getLogger(StringEscapeFilter.class);
    public StringEscapeFilter() {
    }

    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("init StringEscapeFilter");
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        ParameterResponseWrapper responseWrapper = new ParameterResponseWrapper((HttpServletResponse)response);
        ParameterRequestWrapper parameterRequestWrapper = new ParameterRequestWrapper((HttpServletRequest)request);
        String path = ((HttpServletRequest)request).getServletPath();
        String requestType = ((HttpServletRequest)request).getHeader("X-Requested-With");
        logger.debug(path + "=" + requestType);
        if(ParameterRequestWrapper.open) {
            if(!StringUtils.isEmpty(requestType) && requestType.equals("XMLHttpRequest") && path.indexOf(".") < 0) {
                try {
                    chain.doFilter(parameterRequestWrapper, responseWrapper);
                } catch (Exception var13) {
                    logger.error(var13);
                }

                String context = responseWrapper.getResult();
                boolean isW = true;
                if(StringUtils.isEmpty(context)) {
                    logger.debug("StringUtils.isEmpty(context) 进来了");
                    byte[] isJson = responseWrapper.getResultDate();
                    context = new String(isJson, responseWrapper.getCharacterEncoding());
                    isW = true;
                }

                logger.debug("context=" + context);
                boolean isJson1 = false;

                try {
                    JSONObject.fromObject(context);
                    isJson1 = true;
                } catch (Exception var12) {
                    logger.error("JSONObject.fromObject have error", var12);
                }

                if(isJson1) {
                    context = StringEscapeUtils.unescapeHtml4(context);
                }

                logger.debug("context=" + context);
                if(isW) {
                    logger.debug("response.getOutputStream().write 进来了");
                    if(context != null) {
                        response.getOutputStream().write(context.getBytes(responseWrapper.getCharacterEncoding()));
                    }

                    response.getOutputStream().flush();
                } else {
                    logger.debug("response.getWriter().write 进来了");
                    if(context != null) {
                        response.getWriter().write(context);
                    }

                    response.getWriter().flush();
                }
            } else {
                chain.doFilter(parameterRequestWrapper, response);
            }
        } else {
            chain.doFilter(request, response);
        }

    }

    public void destroy() {
    }
}
