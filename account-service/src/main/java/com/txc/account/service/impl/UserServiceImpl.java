package com.txc.account.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.txc.account.common.utils.ResponseUtil;
import com.txc.account.domain.Account;
import com.txc.account.domain.User;
import com.txc.account.domain.vo.UserVO;
import com.txc.account.error.infoEnum.ErrorInfo;
import com.txc.account.mybatis.mapper.AccountMapper;
import com.txc.account.mybatis.mapper.UserMapper;
import com.txc.account.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private AccountMapper accountMapper;
	
	public Map<String, Object> add(User obj) {
		//校验查重
		int count = userMapper.selectByName(obj.getName());
		if(count>0){
			return ResponseUtil.fail(ErrorInfo.USER_ALREADYEXIST.code, ErrorInfo.USER_ALREADYEXIST.enMessage);
		}
		userMapper.insertSelective(obj);
		Account account = new Account();
		account.setBalance(0);
		account.setUserId(obj.getId());
		accountMapper.insertSelective(account);
		return ResponseUtil.success(obj.getId());
	}

	public Map<String, Object> update(User obj) {
		//校验查重
		UserVO oldU = userMapper.selectByPrimaryKey(obj.getId());
		if(!oldU.getName().equals(obj.getName())){
			int nameCount = userMapper.selectByName(obj.getName());
			if(nameCount>0){
				return ResponseUtil.fail(ErrorInfo.USER_ALREADYEXIST.code, ErrorInfo.USER_ALREADYEXIST.enMessage);
			}
		}
		int count = userMapper.updateByPrimaryKeySelective(obj);
		if(count>0){
			return ResponseUtil.success(count);
		}else{
			return ResponseUtil.fail(ErrorInfo.NOTEXIST.code, ErrorInfo.NOTEXIST.enMessage);
		}
	}

	public Map<String, Object> getById(Integer id) {
		UserVO user = userMapper.selectByPrimaryKey(id);
		if(user!=null){
			return ResponseUtil.success(user);
		}else{
			return ResponseUtil.fail(ErrorInfo.NOTEXIST.code, ErrorInfo.NOTEXIST.enMessage);
		}
	}

	public Map<String, Object> delete(Integer id) {
		int count = userMapper.deleteByPrimaryKey(id);
		if(count>0){
			return ResponseUtil.success(count);
		}else{
			return ResponseUtil.fail(ErrorInfo.NOTEXIST.code, ErrorInfo.NOTEXIST.enMessage);
		}
	}
	
	public Map<String, Object> getUsers(User user) {
		List<UserVO> list = userMapper.selectByCondition(user);
		return ResponseUtil.success(list);
	}

}
