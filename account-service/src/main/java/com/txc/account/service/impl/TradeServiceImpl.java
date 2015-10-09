package com.txc.account.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.txc.account.common.utils.ResponseUtil;
import com.txc.account.domain.Account;
import com.txc.account.domain.BattleSession;
import com.txc.account.domain.Trade;
import com.txc.account.domain.vo.AccountVO;
import com.txc.account.mybatis.mapper.AccountMapper;
import com.txc.account.mybatis.mapper.BattleSessionMapper;
import com.txc.account.mybatis.mapper.TradeMapper;
import com.txc.account.service.TradeService;

@Service(value="tradeService")
public class TradeServiceImpl implements TradeService {
	@Autowired
	private  AccountMapper accountMapper;
	
	@Autowired
	private TradeMapper tradeMapper;
	
	@Autowired
	private BattleSessionMapper battleSessionMapper;
	
	public Map<String, Object> add(Trade obj) {
		int id = tradeMapper.insertSelective(obj);
		return ResponseUtil.success(id);
	}
	
	public Map<String,Object> doTrades(Trade[] obj){
		int count = 0;
		Integer cuInteger = obj[0].getBattleSessionId();
		Integer[] userIds = new Integer[obj.length+1];
		String ending = "";
		Integer toAccountId = null;
		Integer toUserId = null;
		for (Trade trade : obj){
			trade.setBattleSessionId(cuInteger);
			toUserId = trade.getToUserId();
			Integer fromUserId = trade.getFromUserId();
			toAccountId = accountMapper.selectByUserId(toUserId).getId();
			Integer fromAccountId = accountMapper.selectByUserId(fromUserId).getId();
			trade.setToAccountId(toAccountId);
			trade.setFromAccountId(fromAccountId);
			tradeMapper.insertSelective(trade);		
			doAccount(fromAccountId,trade.getAmount());
			doAccount(toAccountId,-trade.getAmount());
			userIds[count] = fromUserId;
			count ++;
		}
		if(toAccountId!=null){			
			userIds[count] = toAccountId;
		}
		for(Integer userId:userIds){
			ending += userId + ":" + accountMapper.selectByUserId(userId).getBalance()+",";
		}
		if(!ending.equals("")){			
			ending = ending.substring(0, ending.length()-1);
		}
		BattleSession battleSession = new BattleSession();
		battleSession.setId(cuInteger);
		battleSession.setEnding(ending);
		battleSessionMapper.updateByPrimaryKeySelective(battleSession);
		return ResponseUtil.success(count);
	}
	
	private void doAccount(Integer id,int amount){
		AccountVO accountVO = accountMapper.selectByPrimaryKey(id);
		int currentBalance = accountVO.getBalance();
		currentBalance += amount;
		Account account = new Account();
		account.setId(accountVO.getId());
		account.setBalance(currentBalance);
		accountMapper.updateByPrimaryKeySelective(account);
	}
	
	public Map<String, Object> update(Trade obj) {
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

	public Map<String, Object> getTrades(Trade trade) {
		// TODO Auto-generated method stub
		return null;
	}

}
