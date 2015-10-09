package com.txc.account.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.txc.account.common.utils.ResponseUtil;
import com.txc.account.domain.Account;
import com.txc.account.domain.BattleSession;
import com.txc.account.domain.vo.AccountVO;
import com.txc.account.mybatis.mapper.AccountMapper;
import com.txc.account.mybatis.mapper.BattleSessionMapper;
import com.txc.account.service.AccountService;

@Service(value="accountService")
public class AccountServiceImpl implements AccountService {
	@Autowired
	private BattleSessionMapper battleSessionMapper;
	@Autowired
	private AccountMapper accountMapper;
	public Map<String, Object> add(Account obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, Object> update(Account obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, Object> getById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, Object> delete(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, Object> getCurrentSession(Integer battleSessionId) {
		BattleSession bs = battleSessionMapper.selectByPrimaryKey(battleSessionId);
		String users = bs.getUsers();
		String userIds[] = users.split(",");
		List<AccountVO> list = new ArrayList<AccountVO>();
		for(String userIdStr : userIds){
			Integer userId = Integer.valueOf(userIdStr);
			AccountVO account = accountMapper.selectByUserId(userId);
			
			list.add(account);
		}
		Map<String,Object> resp = ResponseUtil.success(list);
		return resp;
	}
}
