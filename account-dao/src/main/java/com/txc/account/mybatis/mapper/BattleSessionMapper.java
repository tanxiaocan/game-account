package com.txc.account.mybatis.mapper;

import java.util.List;

import com.txc.account.domain.BattleSession;

public interface BattleSessionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BattleSession record);

    int insertSelective(BattleSession record);

    BattleSession selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BattleSession record);

    int updateByPrimaryKey(BattleSession record);
    
    BattleSession selectCurrentBean();
    
    List<BattleSession> selectList();
}