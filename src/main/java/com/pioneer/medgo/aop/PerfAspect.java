package com.pioneer.medgo.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerfAspect {

	@Around("execution(* com.pioneer.medgo.controller..*(..))") // * com.pioneer.medgo.service..*(..)) ||
	public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
		String methodName = joinPoint.getSignature().toShortString();
		long start = System.currentTimeMillis();

		try {
			return joinPoint.proceed(); // 실제 메서드 실행
		} finally {
			long end = System.currentTimeMillis();
			System.out.println("⏳ " + methodName + " 실행 시간(ms): " + (end - start));
		}
	}
}
