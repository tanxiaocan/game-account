package com.txc.account.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.txc.account.domain.BattleSession;

@Controller
@RequestMapping(value="battleSession")
public class BattleSessionController extends BaseController {
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> add(@RequestBody BattleSession battleSession){
		Map<String,Object> resp = battleSessionService.add(battleSession);
		return resp;
	}
	
	@RequestMapping(value="/view",method=RequestMethod.GET)
	public ModelAndView getView(@RequestParam(required=false) Integer battleSessionId){
		ModelAndView mav = new ModelAndView("battle/battle");
		if(battleSessionId!=null){
			mav.addObject("battleSessionId", battleSessionId);
		}		
		return mav;
	}
	
	@RequestMapping(value="/view/manage",method=RequestMethod.GET)
	public ModelAndView getListView(@RequestParam(required=false) Integer battleSessionId){
		ModelAndView mav = new ModelAndView("battle/battle_manage");	
		return mav;
	}
	
	@RequestMapping(value="/getList",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getList(){
		Map<String,Object> resp = battleSessionService.getBattleSessions(null);
		return resp;
	}
	
	/**
	 * open a battleSession
	 * @return
	 */
	@RequestMapping(value="/open",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> openSession(@RequestParam Integer battleSessionId){
		Map<String,Object> resp = battleSessionService.openSession(battleSessionId);
		return resp;
	}
}
