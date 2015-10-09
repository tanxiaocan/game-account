package com.txc.account.mybatis.mapper;

import com.txc.account.domain.Trade;

public interface TradeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Trade record);

    int insertSelective(Trade record);

    Trade selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Trade record);

    int updateByPrimaryKey(Trade record);
}