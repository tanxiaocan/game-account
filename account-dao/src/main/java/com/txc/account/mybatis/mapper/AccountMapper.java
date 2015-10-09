package com.txc.account.mybatis.mapper;

import com.txc.account.domain.Account;
import com.txc.account.domain.vo.AccountVO;

public interface AccountMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Account record);

    int insertSelective(Account record);

    AccountVO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Account record);

    int updateByPrimaryKey(Account record);
    
    int updateByUserId(Account record);
    
    AccountVO selectByUserId(Integer userId);
}