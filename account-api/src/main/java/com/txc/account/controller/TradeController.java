package com.txc.account.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.txc.account.domain.Trade;

@Controller
@RequestMapping(value="trade")
public class TradeController extends BaseController {
	
	@RequestMapping(value="/dotrade",method=RequestMethod.POST)
	public Map<String,Object> doTrade(@RequestBody Trade[] trades){
		Map<String,Object> resp = tradeService.doTrades(trades);
		return resp;
	}
}
