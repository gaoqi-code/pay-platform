package com.hiveview.action.base;

import com.hiveview.entity.Paging;
import com.hiveview.entity.sys.SysUser;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

public class BaseController {
    public BaseController() {
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
    }


    private String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cs = request.getCookies();
        if(cs != null) {
            Cookie[] arr$ = cs;
            int len$ = cs.length;

            for(int i$ = 0; i$ < len$; ++i$) {
                Cookie c = arr$[i$];
                if(c.getName().equals(name)) {
                    return c.getValue();
                }
            }
        }

        return null;
    }

//    public String getCurrentLoginUsername(HttpServletRequest request, boolean isSysUser) {
//        String username = null;
//        Cookie[] cs = request.getCookies();
//        if(cs != null) {
//            Cookie[] assertion = cs;
//            int len$ = cs.length;
//
//            for(int i$ = 0; i$ < len$; ++i$) {
//                Cookie c = assertion[i$];
//                if(isSysUser && c.getName().equals("MEMBERTGC") || !isSysUser && c.getName().equals("ADMINTGC")) {
//                    username = this.getCookieValue(request, c.getValue());
//                    break;
//                }
//            }
//        }
//
//        if(username == null) {
//            username = request.getRemoteUser();
//        }
//
//        return username;
//    }


    public Integer getSysUserId(HttpServletRequest request) {
        SysUser currentUser = (SysUser) request.getSession().getAttribute("currentUser");
        Integer userId = null;
        if(currentUser != null) {
//            memberId = assertion.getPrincipal().getAttributes().get("memberId");
            userId = currentUser.getUserId();
        }

        return userId != null?userId:-1;
    }


    /**
     * 获得paging对象用于分页
     * @param request
     * @param tableName
     * @return
     */
    public Paging getPaging(HttpServletRequest request) {
        if(request == null) {
            return null;
        } else {
            Paging paging = new Paging();
            String pagesize = request.getParameter("pageSize");
            if (StringUtils.isNotEmpty(pagesize)) {
                paging.setPageSize(Integer.parseInt(pagesize));
            }
            String currentPage = request.getParameter("currentPage");
            if (StringUtils.isNotEmpty(currentPage)) {
                paging.setCurrentPage(Integer.parseInt(currentPage));
            }
            return paging;
        }
    }



}
