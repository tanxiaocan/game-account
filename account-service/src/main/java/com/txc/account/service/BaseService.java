package com.txc.account.service;

import java.util.Map;

public interface BaseService<T>{	
	public Map<String,Object> add(T obj);
	public Map<String,Object> update(T obj);
	public Map<String,Object> getById(Integer id);
	public Map<String,Object> delete(Integer id);
}
