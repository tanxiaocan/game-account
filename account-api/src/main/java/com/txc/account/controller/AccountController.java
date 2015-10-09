package com.txc.account.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="account")
public class AccountController extends BaseController {
	
	@RequestMapping(value="/session/current",method=RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getCurrentSession(@RequestParam Integer battleSessionId){
		Map<String,Object> resp = accountService.getCurrentSession(battleSessionId);
		return resp;
	}
	
}
