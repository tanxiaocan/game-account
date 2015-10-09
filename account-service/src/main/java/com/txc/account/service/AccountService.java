package com.txc.account.service;

import java.util.Map;

import com.txc.account.domain.Account;
import com.txc.account.domain.BattleSession;

public interface AccountService extends BaseService<Account> {
	public Map<String,Object> getCurrentSession(Integer battleSessionId);
}
