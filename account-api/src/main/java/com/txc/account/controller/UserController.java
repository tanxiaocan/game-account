package com.txc.account.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.txc.account.domain.User;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
	
	@RequestMapping("/getById")
	public Map<String,Object> getById(@RequestParam Integer id){
		Map<String, Object> resp = userService.getById(id);
		return resp;
	}
	
	@RequestMapping("/add")
	@ResponseBody
	public Map<String,Object> add(@RequestBody User user){
		Map<String,Object> resp = userService.add(user);
		return resp;
	}
	
	@RequestMapping("/modify")
	public Map<String,Object> modify(@RequestBody User user){
		Map<String,Object> resp = userService.update(user);
		return resp;
	}
	
	@RequestMapping("/delete")
	public Map<String,Object> delete(@RequestParam Integer id){
		Map<String, Object> resp = userService.delete(id);
		return resp;
	}
	
	@RequestMapping(value="/getList",method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getListByCondition(@RequestParam(required=false) String name,@RequestParam(required=false) String alias){
		User user = new User();
		user.setName(name);
		user.setAlias(alias);
		Map<String,Object> resp = userService.getUsers(user);
		return resp;
	}
	
	@RequestMapping("/view")
	public String getView(){
		return "user/user_query";
	}
	
}
