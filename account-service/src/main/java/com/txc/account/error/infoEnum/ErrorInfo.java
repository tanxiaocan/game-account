package com.txc.account.error.infoEnum;

public enum ErrorInfo {
	
	NOTEXIST(101,"record is not exist","记录不存在"),
	USER_ALREADYEXIST(102,"user name is already exist","用户名已存在");
	
	
	public final Integer code;
	public final String enMessage;
	public final String znMessage;
	
	private ErrorInfo(Integer code,String enMessage,String znMessage){
		this.code = code;
		this.enMessage = enMessage;
		this.znMessage = znMessage;
	}
	
	public static String getZn(Integer code){
		for(ErrorInfo info : ErrorInfo.values()){
			if(info.code == code){
				return info.znMessage;
			}
		}
		return null;
	}
}
