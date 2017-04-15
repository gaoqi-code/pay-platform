/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hiveview.common.httpClient;

import java.util.HashMap;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;

/**
 * 
 * @author LiuJt
 * @time 2014-9-10 上午10:21:23
 * @version: 2.0
 * @description:定义采集返回页面对象
 */
public class Result {

	private String cookie;
	private int statusCode;
	private HashMap<String, String> headerAll;
	private HttpEntity httpEntity;
	private String redirectUrl;
	private HttpResponse response;

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public HashMap<String, String> getHeaders() {
		return headerAll;
	}

	public void setHeaders(Header[] headers) {
		headerAll = new HashMap<String, String>();
		for (Header header : headers) {
			headerAll.put(header.getName(), header.getValue());
		}
	}

	public HttpEntity getHttpEntity() {
		return httpEntity;
	}

	public void setHttpEntity(HttpEntity httpEntity) {
		this.httpEntity = httpEntity;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}

	public HttpResponse getResponse() {
		return response;
	}

	public void setResponse(HttpResponse response) {
		this.response = response;
	}
}
