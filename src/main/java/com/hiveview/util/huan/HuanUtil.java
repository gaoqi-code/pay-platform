package com.hiveview.util.huan;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.DigestUtils;

import com.alibaba.fastjson.JSON;
import com.hiveview.common.Constants;
import com.hiveview.entity.po.huanwang.ContentMedia;
import com.hiveview.entity.po.huanwang.ContentVideo;
import com.hiveview.entity.po.huanwang.JsonStr;
import com.hiveview.entity.video.Video;
import com.hiveview.entity.video.VideoSet;
import com.hiveview.util.HttpUtil;

public class HuanUtil {

	//封装Json参数
	private static JsonStr getJsonStr(String action,Integer mediaId,Object obj){
		JsonStr jsonStr = new JsonStr();
		jsonStr.setSecretkey(DigestUtils.md5DigestAsHex(mediaId.toString().getBytes()));
		jsonStr.setAction(action);
		jsonStr.setCpkey(Constants.cpKey_huan);
		jsonStr.setContent(obj);
		return jsonStr;
	}
	
	//封装请求参数
	public static Map<String,String> getMap(String reqAction,Integer arg1,Object Obj){
		Map<String,String> map = new HashMap<String, String>();
		map.put("jsonStr",JSON.toJSONString(getJsonStr(reqAction,arg1,Obj)));
		return map;
	}
	
	//发送请求
	public static void syncDataToHuan(Map<String,String> map){
		System.out.println(Constants.uri_huan);
//		HttpUtil.reqPost(Constants.uri_huan,map);
	}
	
	public static void threadSyncMediaForHuan(String action,VideoSet videoSet){
		ContentMedia media = new ContentMedia();
		media.setMediaId(Integer.parseInt(videoSet.getVideosetId()+""));
		media.setModel(videoSet.getClassFirstName());
		media.setTitle(videoSet.getVideosetName());
		media.setDirector(videoSet.getDirector());
		media.setStarring(videoSet.getActors());
		syncDataToHuan(getMap(action,media.getMediaId(),media));
	}
	
	public static void threadSyncVideoForHuan(String action,Video video){
		ContentVideo cv = new ContentVideo();
		cv.setMediaId(Integer.parseInt(video.getVideosetId()+""));
		cv.setVideoId(Integer.parseInt(video.getVideoId()+""));
		cv.setEpisode(video.getEpisode());
		cv.setTitle(video.getVideoName());
//		cv.setType("完整版");
		syncDataToHuan(getMap(action,cv.getMediaId(),cv));
	}
}
