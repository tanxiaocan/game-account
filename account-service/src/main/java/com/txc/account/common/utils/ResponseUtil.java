package com.txc.account.common.utils;

import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;

public class ResponseUtil {
	//成功时的返回
	public static <T> Map<String,Object> success(T t){
		Map<String,Object> resp = new HashMap<String, Object>();
		resp.put("code", 0);
		resp.put("success",true);
		resp.put("data", t);
		return resp;
	}
	//失败时的返回
	public static Map<String,Object> fail(Integer code,String message){
		Map<String,Object> resp = new HashMap<String, Object>();
		resp.put("code", code);
		resp.put("message", message);
		return resp;
	}
	
}
