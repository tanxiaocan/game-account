package com.txc.account.mybatis.mapper;

import java.util.List;

import com.txc.account.domain.User;
import com.txc.account.domain.vo.UserVO;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(User record);

    UserVO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);
    
    List<UserVO> selectByCondition(User record);
    
    int selectByName(String name);
}