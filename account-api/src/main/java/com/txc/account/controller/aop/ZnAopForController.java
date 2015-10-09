package com.txc.account.controller.aop;

import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.txc.account.error.infoEnum.ErrorInfo;

@Aspect
@Component
public class ZnAopForController {
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Around("execution(* com.txc.account.controller..*.*(..))")
	public Object aroundPointcut(ProceedingJoinPoint pjp) throws Throwable {
		Object result = pjp.proceed();
		if (result instanceof Map) {
			Integer code = (Integer) ((Map) result).get("code");
			if (code != 0) {
				((Map) result).put("message", ErrorInfo.getZn(code));
			}
		}
		return result;
	}
}
