package com.txc.account.service.test;

import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.txc.account.domain.User;
import com.txc.account.service.UserService;

public class UserServiceTest extends BaseTest {
	UserService userService;
	@Before
	public void init(){
		super.init();
		userService = applicationContext.getBean(UserService.class);
	}

	@Test
	public void testAdd() {
		User user = new User();
		user.setName("谭晓灿");
		user.setAlias("风清扬");
		Map<String, Object> resp = userService.add(user);
		assert(resp.get("code").equals(0));
	}
	
	@Test
	public void testGetByCondition(){
		User user = new User();
		user.setName("谭晓灿");
		user.setAlias("风清扬");
		Map<String, Object> resp = userService.getUsers(user);
		assert(resp.get("code").equals(0));
	}

}
