package com.txc.account.service;

import java.util.Map;
import com.txc.account.domain.BattleSession;

public interface BattleSessionService extends BaseService<BattleSession> {
	public Map<String,Object> getBattleSessions(BattleSession record);
    public Map<String,Object> endBattleSession(Integer id);
    public Map<String,Object> getCurrentBattleSession();
    public Map<String,Object> openSession(Integer id);
}
