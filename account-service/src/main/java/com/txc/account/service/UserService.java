package com.txc.account.service;

import java.util.Map;

import com.txc.account.domain.User;

public interface UserService extends BaseService<User> {
	public Map<String, Object> getUsers(User user);
}
