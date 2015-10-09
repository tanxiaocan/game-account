package com.txc.account.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.txc.account.common.utils.ResponseUtil;
import com.txc.account.domain.Account;
import com.txc.account.domain.BattleSession;
import com.txc.account.domain.User;
import com.txc.account.domain.vo.AccountVO;
import com.txc.account.mybatis.mapper.AccountMapper;
import com.txc.account.mybatis.mapper.BattleSessionMapper;
import com.txc.account.mybatis.mapper.UserMapper;
import com.txc.account.service.BattleSessionService;

@Service("battleSessionService")
public class BattleSessionServiceImpl implements BattleSessionService {
	
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private AccountMapper accountMapper;
	@Autowired
	private BattleSessionMapper battleSessionMapper;
	
	public Map<String, Object> add(BattleSession obj) {
		String users = obj.getUsers();
		String[] userIds = users.split(",");
		for(String strId : userIds){
			Integer userId = Integer.valueOf(strId);
			User user = new User();
			user.setId(userId);
			user.setStatus(0);
			userMapper.updateByPrimaryKeySelective(user);
			Account account = new Account();
			account.setUserId(userId);
			account.setBalance(0);
			accountMapper.updateByUserId(account);
		}
		battleSessionMapper.insertSelective(obj);
		return ResponseUtil.success(obj.getId());
	}
	public Map<String, Object> update(BattleSession obj) {
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

	public Map<String,Object> getBattleSessions(BattleSession record) {
		List<BattleSession> list = battleSessionMapper.selectList();
		for (BattleSession bs : list){
			getUserNames(bs);
		}
		Map<String,Object> resp = ResponseUtil.success(list);
		return resp;
	}
	
	private void getUserNames(BattleSession record){
		String users = record.getUsers();
		String[] userIdStrs = users.split(",");
		String userNames = "";
		for(String userId:userIdStrs){
			String userName = userMapper.selectByPrimaryKey(Integer.valueOf(userId)).getName();
			userNames += userName + " ";
		}
		record.setUsers(userNames);
	}
	
    public Map<String, Object> endBattleSession(Integer id) {

        return null;
    }
	public Map<String, Object> getCurrentBattleSession() {
		BattleSession currentBs = battleSessionMapper.selectCurrentBean();
		Map<String,Object> resp = ResponseUtil.success(currentBs);
		return resp;
	}
	public Map<String, Object> openSession(Integer id) {
		BattleSession bs = battleSessionMapper.selectByPrimaryKey(id);
		String ending = bs.getEnding();
		String users = bs.getUsers();
		String[] userIdStr = users.split(",");
		Integer[] userIds = new Integer[userIdStr.length];
		for(int i=0;i<userIdStr.length;i++){
			userIds[i] = Integer.valueOf(userIdStr[i]);
		}
		if(ending==null||ending.equals("")){
			for(Integer userId:userIds){										
				Account account = new Account();
				account.setUserId(userId);
				account.setBalance(0);
				accountMapper.updateByUserId(account);
			}
		}else{
			String[] endings = ending.split(",");
			for(String end:endings){
				String[] msg = end.split(":");
				Account account = new Account();
				account.setUserId(Integer.valueOf(msg[0]));
				account.setBalance(Integer.valueOf(msg[1]));
				accountMapper.updateByUserId(account);
			}
		}
		
		return ResponseUtil.success(null);
	}

}
