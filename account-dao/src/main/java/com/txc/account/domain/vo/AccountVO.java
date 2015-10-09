package com.txc.account.domain.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountVO {
    private Integer id;

    private Integer balance;

    private Integer userId;
    
    private String userName;
}
