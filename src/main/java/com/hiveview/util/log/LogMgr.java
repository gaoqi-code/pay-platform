package com.hiveview.util.log;

import org.apache.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * Created by hxq on 2017/3/6.
 */
public class LogMgr {
    public static final Logger errorLogger = Logger.getLogger("error");
    public static final Logger debugLogger = Logger.getLogger("debug");
    public static final Logger infoLogger = Logger.getLogger("info");


    public LogMgr() {
    }

    public static void writeErrorLog(Throwable e) {
        LogStackVO logStackVO = getCurrentThreadStackTrace();
        errorLogger.error(LogStrFormat.formatErrorLogStr(logStackVO, (String)null), e);
    }

    public static void writeErrorLog(String msg, Throwable e) {
        LogStackVO logStackVO = getCurrentThreadStackTrace();
        errorLogger.error(LogStrFormat.formatErrorLogStr(logStackVO, msg), e);
    }



    public static void writeDebugLog(String logStr) {
        debugLogger.debug(logStr);
    }

    public static void writeDebugLog(Map<String, Object> params, Object returnValue) {
        LogStackVO logStackVO = getCurrentThreadStackTrace();

        try {
            debugLogger.debug(LogStrFormat.formatParamsLogStr(logStackVO, params, returnValue));
        } catch (NoSuchMethodException var4) {
            errorLogger.error("log Format error!", var4);
        } catch (SecurityException var5) {
            errorLogger.error("log Format error!", var5);
        } catch (IllegalAccessException var6) {
            errorLogger.error("log Format error!", var6);
        } catch (IllegalArgumentException var7) {
            errorLogger.error("log Format error!", var7);
        } catch (InvocationTargetException var8) {
            errorLogger.error("log Format error!", var8);
        }

    }

    public static <T> void writeDebugLog(T... params) {
        LogStackVO logStackVO = getCurrentThreadStackTrace();

        try {
            debugLogger.debug(LogStrFormat.formatParamsLogStr(logStackVO, params));
        } catch (IllegalArgumentException var3) {
            errorLogger.error("log Format error!", var3);
        } catch (IllegalAccessException var4) {
            errorLogger.error("log Format error!", var4);
        } catch (NoSuchMethodException var5) {
            errorLogger.error("log Format - invoke get method error!", var5);
        } catch (SecurityException var6) {
            errorLogger.error("log Format - invoke get method error!", var6);
        } catch (InvocationTargetException var7) {
            errorLogger.error("log Format - invoke get method error!", var7);
        }

    }

    public static void writeSysInfoLog(String logStr) {
        infoLogger.info(logStr);
    }

    private static LogStackVO getCurrentThreadStackTrace() {
        LogStackVO logStackVO = new LogStackVO();
        StackTraceElement ste = Thread.currentThread().getStackTrace()[3];
        String className = ste.getClassName();
        String methodName = ste.getMethodName();
        int lineNumber = ste.getLineNumber();
        String fileName = ste.getFileName();
        logStackVO.setClassName(className);
        logStackVO.setMethodName(methodName);
        logStackVO.setLineNumber(lineNumber);
        logStackVO.setFileName(fileName);
        return logStackVO;
    }

}

