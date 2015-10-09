package com.txc.account.controller;
import org.springframework.beans.factory.annotation.Autowired;

import com.txc.account.service.AccountService;
import com.txc.account.service.BattleSessionService;
import com.txc.account.service.TradeService;
import com.txc.account.service.UserService;


public class BaseController {
	@Autowired
	protected UserService userService;
	@Autowired
	protected BattleSessionService battleSessionService;
	@Autowired
	protected TradeService tradeService;
	@Autowired
	protected AccountService accountService;
}
