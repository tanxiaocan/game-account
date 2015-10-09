package com.txc.account.service;

import java.util.Map;

import com.txc.account.domain.Trade;

public interface TradeService extends BaseService<Trade> {
	public Map<String,Object> getTrades(Trade trade);
	public Map<String,Object> doTrades(Trade[] obj);
}
