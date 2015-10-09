package com.txc.account.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Trade {
    private Integer id;

    private Integer amount;

    private Integer toAccountId;

    private Integer fromAccountId;

    private Integer battleSessionId;
    
    private Integer fromUserId;
    
    private Integer toUserId;

    private Date createTime;

    private Date updateTime;
}