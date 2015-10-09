package com.txc.account.service.test;

import org.junit.Before;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BaseTest {
	protected ApplicationContext applicationContext;
	@Before
	public void init(){
		applicationContext = new ClassPathXmlApplicationContext("spring-config.xml");
	}
}
