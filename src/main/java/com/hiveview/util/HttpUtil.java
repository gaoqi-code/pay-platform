package com.hiveview.util;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.client.params.HttpClientParams;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;


public class HttpUtil {
	private final static Logger LOG = Logger.getLogger(HttpUtil.class.getName());
	
	public static String reqPost(String url,Map<String,String> headers){
		 Long s = System.currentTimeMillis();
		 HttpClient client=new DefaultHttpClient();
		 String respBody="";
			try { 
				HttpPost post=new HttpPost(url);
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
				for(String key:headers.keySet()){
					urlParameters.add(new BasicNameValuePair(key,headers.get(key)));
				}
				post.setEntity(new UrlEncodedFormEntity(urlParameters,HTTP.UTF_8));
				HttpResponse resp = client.execute(post);
				 if(resp.getStatusLine().getStatusCode() == 200){
					 HttpEntity entity =resp.getEntity();
					respBody = EntityUtils.toString(entity).toString();
				 }else{
					 respBody=null;
				 }
			}catch (ClientProtocolException e) {
				e.printStackTrace();
			}catch (IOException e) {
				e.printStackTrace();
			}catch (Exception e) {
				e.printStackTrace();
			}finally{
				client.getConnectionManager().shutdown();
			}
			Long e = System.currentTimeMillis();
			LOG.info(MessageFormat.format("请求经过:{0} ", e-s));
			return respBody;
	}
	
	public static String reqPost(String url,Map<String,String> headers,Map<String,String> parameters){
		 Long s = System.currentTimeMillis();
		 HttpClient client=new DefaultHttpClient();
		 String respBody="";
			try { 
				HttpPost post=new HttpPost(url);
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
				for(String key:headers.keySet()){
					post.setHeader(key,headers.get(key));
				}
				for(String key:parameters.keySet()){
					urlParameters.add(new BasicNameValuePair(key,parameters.get(key)));
				}
				post.setEntity(new UrlEncodedFormEntity(urlParameters,HTTP.UTF_8));
				HttpResponse resp = client.execute(post);
				 if(resp.getStatusLine().getStatusCode() == 200){
					 HttpEntity entity =resp.getEntity();
					respBody = EntityUtils.toString(entity).toString();
				 }else{
					 respBody=null;
					 LOG.info("Connection refused!!!");
				 }
			}catch (ClientProtocolException e) {
				LOG.info(url);
				e.printStackTrace();
			}catch (IOException e) {
				LOG.info(url);
				e.printStackTrace();
			}catch (Exception e) {
				LOG.info(url);
				e.printStackTrace();
			}finally{
				client.getConnectionManager().shutdown();
			}
			Long e = System.currentTimeMillis();
			LOG.info(MessageFormat.format("请求经过:{0} ", e-s));
			return respBody;
	}
	
	public static String reqPost(String url){
		 Long s = System.currentTimeMillis();
		 HttpClient client=new DefaultHttpClient();
		 String respBody="";
			try {
				HttpPost post=new HttpPost(url); 
				 HttpResponse resp = client.execute(post);
				 if(resp.getStatusLine().getStatusCode() == 200){
					 HttpEntity entity =resp.getEntity();
					respBody = EntityUtils.toString(entity).toString();
				 }else{
					 respBody=null;
				 }
			}catch (ClientProtocolException e) {
				e.printStackTrace();
			}catch (IOException e) {
				e.printStackTrace();
			}catch (Exception e) {
				e.printStackTrace();
			}finally{
				client.getConnectionManager().shutdown();
			}
			Long e = System.currentTimeMillis();
			LOG.info(MessageFormat.format("请求经过:{0} ", e-s));
			return respBody;
	}

	public static String reqGet(String url){
		 HttpClient client=new DefaultHttpClient();
		 client.getParams().setIntParameter("http.socket.timeout", 1000 * 60);
		 String respBody="";
			try {
				HttpGet get =new HttpGet(url);
				HttpClientParams.setCookiePolicy(client.getParams(), CookiePolicy.BROWSER_COMPATIBILITY);
				HttpResponse resp = client.execute(get);
				 if(resp.getStatusLine().getStatusCode() == 200){
					 HttpEntity entity =resp.getEntity();
					 respBody = EntityUtils.toString(entity).toString();
				 }else{
					 respBody="";
				 }
			}catch (ClientProtocolException e) {
				e.printStackTrace();
			}catch (IOException e) {
				e.printStackTrace();
			}catch (Exception e) {
				e.printStackTrace();
			}finally{
				client.getConnectionManager().shutdown();
			}
			return respBody;
	}
	
	
	
	public static boolean reqGetRange(String url){
		boolean acceptRanges=false;
		Long s = System.currentTimeMillis();
		HttpClient client=new DefaultHttpClient();
		HttpHead httpHead = new HttpHead(url);
		HttpResponse resp;
		try {
			resp = client.execute(httpHead);
			if(resp.getStatusLine().getStatusCode() == 200){
				Header[] headers=resp.getHeaders("Content-Length");
				if(headers.length >0){
					Long contentLength = Long.valueOf(headers[0].getValue());
					httpHead.abort();
				    httpHead = new HttpHead(url);   
				    httpHead.addHeader("Range", "bytes=0-"+(contentLength-1));   
				    resp = client.execute(httpHead);   
				    if(resp.getStatusLine().getStatusCode() == 206){   
				        acceptRanges = true;   
				    }   
				    httpHead.abort();   
				}
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			client.getConnectionManager().shutdown();
		}
		Long e = System.currentTimeMillis();
		LOG.info(MessageFormat.format("请求经过:{0}s", e-s));
		return acceptRanges;
	}
	
	public static void main(String[] args) {
		Map<String,String> map = new HashMap<String, String>();
		map.put("trackName", "林成功地成");
		reqPost("http://localhost:8080/codec/cdnapi/updateCdnTaskTrack.json", map);
	}
}
