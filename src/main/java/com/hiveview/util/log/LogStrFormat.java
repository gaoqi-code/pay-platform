package com.hiveview.util.log;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class LogStrFormat {
    LogStrFormat() {
    }

    public static String formatOperationLogStr(long memberID, LogStackVO logStackVO, Map<String, Object> params, Object returnValue) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(formatParamsLogStr(logStackVO, params, returnValue));
        logStr.append(" | memberID:");
        logStr.append(memberID);
        return logStr.toString();
    }

    public static String formatOperationLogStr(String accountName, LogStackVO logStackVO, Map<String, Object> params, Object returnValue) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(formatParamsLogStr(logStackVO, params, returnValue));
        logStr.append(" | accountName:");
        logStr.append(accountName);
        return logStr.toString();
    }

    public static <T> String formatOperationLogStr(long memberID, LogStackVO logStackVO, T... params) throws IllegalArgumentException, IllegalAccessException, NoSuchMethodException, SecurityException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(formatParamsLogStr(logStackVO, params));
        logStr.append(" | memberID:");
        logStr.append(memberID);
        return logStr.toString();
    }

    public static <T> String formatOperationLogStr(String accountName, LogStackVO logStackVO, T... params) throws IllegalArgumentException, IllegalAccessException, NoSuchMethodException, SecurityException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(formatParamsLogStr(logStackVO, params));
        logStr.append(" | accountName:");
        logStr.append(accountName);
        return logStr.toString();
    }

    public static String formatPerformanceLogStr(LogStackVO logStackVO, String className, String methodName, String costTime) {
        StringBuilder logStr = new StringBuilder();
        logStr.append(" ");
        logStr.append(logStackVO.getClassName());
        logStr.append(".");
        logStr.append(logStackVO.getMethodName());
        logStr.append("(");
        logStr.append(logStackVO.getFileName());
        logStr.append(":");
        logStr.append(logStackVO.getLineNumber());
        logStr.append(") |");
        logStr.append(" CLASSNAME:");
        logStr.append(className);
        logStr.append(" METHODNAME:");
        logStr.append(methodName);
        logStr.append(" COST_TIME:");
        logStr.append(costTime);
        logStr.append("ms");
        return logStr.toString();
    }

    public static String formatParamsLogStr(LogStackVO logStackVO, Map<String, Object> params, Object returnValue) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(" ");
        logStr.append(logStackVO.getClassName());
        logStr.append(".");
        logStr.append(logStackVO.getMethodName());
        logStr.append("(");
        logStr.append(logStackVO.getFileName());
        logStr.append(":");
        logStr.append(logStackVO.getLineNumber());
        logStr.append(") |");
        String paramClassName = params.getClass().getName();
        logStr.append(" PARAMCLASS:(CLASSTYPE:");
        logStr.append(paramClassName);
        logStr.append(" PARAMS:{");
        Iterator iterator = params.entrySet().iterator();

        for(int n = 1; iterator.hasNext(); ++n) {
            Entry me = (Entry)iterator.next();
            if(n == 1) {
                logStr.append((String)me.getKey() + ":" + me.getValue());
            } else {
                logStr.append(",");
                logStr.append((String)me.getKey() + ":" + me.getValue());
            }
        }

        logStr.append("})");
        logStr.append(formatReturnValues(returnValue));
        return logStr.toString();
    }

    public static <T> String formatParamsLogStr(LogStackVO logStackVO, T... params) throws IllegalArgumentException, IllegalAccessException, NoSuchMethodException, SecurityException, InvocationTargetException {
        Object returnValue = params[params.length - 1];
        StringBuilder logStr = new StringBuilder();
        logStr.append(" ");
        logStr.append(logStackVO.getClassName());
        logStr.append(".");
        logStr.append(logStackVO.getMethodName());
        logStr.append("(");
        logStr.append(logStackVO.getFileName());
        logStr.append(":");
        logStr.append(logStackVO.getLineNumber());
        logStr.append(") |");

        for(int i = 0; i < params.length - 1; ++i) {
            Object param = params[i];
            logStr.append(formatParamValues(param));
        }

        logStr.append(formatReturnValues(returnValue));
        return logStr.toString();
    }

    private static <T> String formatParamValues(T param) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        if(param == null) {
            logStr.append(" PARAM VALUE:{null})");
        } else {
            String paramClassName = param.getClass().getName();
            logStr.append(" PARAMCLASS:(CLASSTYPE:");
            logStr.append(paramClassName);
            if(paramClassName.indexOf("java.lang.Integer") == -1 && paramClassName.indexOf("java.lang.Long") == -1 && paramClassName.indexOf("java.lang.String") == -1 && paramClassName.indexOf("java.lang.Float") == -1 && paramClassName.indexOf("java.lang.Double") == -1 && paramClassName.indexOf("java.lang.Short") == -1 && paramClassName.indexOf("java.lang.Number") == -1) {
                if(paramClassName.indexOf("java.util.HashMap") == -1 && paramClassName.indexOf("java.util.HashTable") == -1 && paramClassName.indexOf("java.util.TreeMap") == -1) {
                    int var12 = 1;
                    logStr.append(" PARAMS:{");
                    Field[] var13 = param.getClass().getDeclaredFields();
                    Field[] var8 = var13;
                    int var7 = var13.length;

                    for(int var15 = 0; var15 < var7; ++var15) {
                        Field var14 = var8[var15];
                        if(var14.toGenericString().indexOf("static") == -1 && var14.toGenericString().indexOf("final") == -1) {
                            String fieldName = var14.getName();
                            Class fieldType = var14.getType();
                            Object obj = null;
                            if(fieldType.getName().indexOf("boolean") != -1) {
                                obj = invokeISMethod(param, fieldName);
                            } else {
                                obj = invokeGetMethod(param, fieldName);
                            }

                            if(var12 > 1) {
                                logStr.append(",");
                            }

                            logStr.append(fieldName + ":" + obj);
                            ++var12;
                        }
                    }
                } else {
                    logStr.append(" KEY-VALUES:{");
                    Map n = (Map)param;
                    Iterator fields = n.entrySet().iterator();

                    for(int f = 1; fields.hasNext(); ++f) {
                        Entry me = (Entry)fields.next();
                        if(f == 1) {
                            logStr.append(me.getKey() + ":" + me.getValue());
                        } else {
                            logStr.append(",");
                            logStr.append(me.getKey() + ":" + me.getValue());
                        }
                    }
                }
            } else {
                logStr.append(" VALUE:{");
                logStr.append(param);
            }

            logStr.append("})");
        }

        return logStr.toString();
    }

    private static <T> String formatReturnValues(T returnValue) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        logStr.append(" | RETURNVALUE:");
        if(returnValue == null) {
            logStr.append(" (VALUE:{null})");
        } else {
            String returnParentClassName = returnValue.getClass().getName();
            Object obj;
            Iterator var5;
            if(returnParentClassName.indexOf("java.util.ArrayList") == -1 && returnParentClassName.indexOf("java.util.LinkedList") == -1) {
                if(returnParentClassName.indexOf("java.util.HashSet") == -1 && returnParentClassName.indexOf("java.util.TreeSet") == -1) {
                    logStr.append(formatReturnValue(returnValue));
                } else {
                    logStr.append("(CLASSTYPE:");
                    logStr.append(returnParentClassName);
                    logStr.append(" SUBCLASSES:{");
                    Set returnValueSet1 = (Set)returnValue;
                    var5 = returnValueSet1.iterator();

                    while(var5.hasNext()) {
                        obj = (Object)var5.next();
                        logStr.append(formatReturnValue(obj));
                    }

                    logStr.append(")");
                }
            } else {
                logStr.append("(CLASSTYPE:");
                logStr.append(returnParentClassName);
                logStr.append(" SUBCLASSES:{");
                List returnValueSet = (List)returnValue;
                var5 = returnValueSet.iterator();

                while(var5.hasNext()) {
                    obj = (Object)var5.next();
                    logStr.append(formatReturnValue(obj));
                }

                logStr.append(")");
            }
        }

        return logStr.toString();
    }

    private static <T> String formatReturnValue(T returnObj) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        StringBuilder logStr = new StringBuilder();
        if(returnObj == null) {
            logStr.append(" VALUE:{null}");
        } else {
            String returnClassName = returnObj.getClass().getName();
            logStr.append("(CLASSTYPE:");
            logStr.append(returnClassName);
            if(returnClassName.indexOf("java.lang.Integer") == -1 && returnClassName.indexOf("java.lang.Long") == -1 && returnClassName.indexOf("java.lang.String") == -1 && returnClassName.indexOf("java.lang.Float") == -1 && returnClassName.indexOf("java.lang.Double") == -1 && returnClassName.indexOf("java.lang.Short") == -1 && returnClassName.indexOf("java.lang.Number") == -1) {
                if(returnClassName.indexOf("java.util.HashMap") == -1 && returnClassName.indexOf("java.util.HashTable") == -1 && returnClassName.indexOf("java.util.TreeMap") == -1) {
                    int var12 = 1;
                    logStr.append(" PROPERTIES:{");
                    Field[] var13 = returnObj.getClass().getDeclaredFields();
                    Field[] var8 = var13;
                    int var7 = var13.length;

                    for(int var15 = 0; var15 < var7; ++var15) {
                        Field var14 = var8[var15];
                        if(var14.toGenericString().indexOf("static") == -1 && var14.toGenericString().indexOf("final") == -1) {
                            String fieldName = var14.getName();
                            Class fieldType = var14.getType();
                            Object obj = null;
                            if(fieldType.getName().indexOf("boolean") != -1) {
                                obj = invokeISMethod(returnObj, fieldName);
                            } else {
                                obj = invokeGetMethod(returnObj, fieldName);
                            }

                            if(var12 > 1) {
                                logStr.append(",");
                            }

                            logStr.append(fieldName + ":" + obj);
                            ++var12;
                        }
                    }

                    logStr.append("}");
                } else {
                    logStr.append(" KEY-VALUES:{");
                    Map n = (Map)returnObj;
                    Iterator fields = n.entrySet().iterator();

                    for(int f = 1; fields.hasNext(); ++f) {
                        Entry me = (Entry)fields.next();
                        if(f == 1) {
                            logStr.append(me.getKey() + ":" + me.getValue());
                        } else {
                            logStr.append(",");
                            logStr.append(me.getKey() + ":" + me.getValue());
                        }
                    }

                    logStr.append("}");
                }
            } else {
                logStr.append(" VALUE:{");
                logStr.append(returnObj);
                logStr.append("}");
            }

            logStr.append(")");
        }

        return logStr.toString();
    }

    private static Object invokeGetMethod(Object owner, String attrName) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        String methodName = "get" + attrName.substring(0, 1).toUpperCase() + attrName.substring(1);
        Class cla = owner.getClass();
        Class[] cls = new Class[0];
        Object[] args = new Object[0];
        Method md = cla.getMethod(methodName, cls);
        Object result = md.invoke(owner, args);
        return result;
    }

    private static Object invokeISMethod(Object owner, String attrName) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        String methodName = "is" + attrName.substring(0, 1).toUpperCase() + attrName.substring(1);
        Class cla = owner.getClass();
        Class[] cls = new Class[0];
        Object[] args = new Object[0];
        Method md = cla.getMethod(methodName, cls);
        Object result = md.invoke(owner, args);
        return result;
    }

    public static String formatErrorLogStr(LogStackVO logStackVO, String desc) {
        StringBuilder logStr = new StringBuilder();
        logStr.append(" ");
        logStr.append(logStackVO.getClassName());
        logStr.append(".");
        logStr.append(logStackVO.getMethodName());
        logStr.append("(");
        logStr.append(logStackVO.getFileName());
        logStr.append(":");
        logStr.append(logStackVO.getLineNumber());
        logStr.append(") | ");
        if(desc != null && !desc.equals("")) {
            logStr.append(desc);
            logStr.append(" | ");
        }

        return logStr.toString();
    }

    public static <T> String formatTradeLogStr(LogStackVO logStackVO, String desc, T... params) throws IllegalArgumentException, IllegalAccessException, NoSuchMethodException, SecurityException, InvocationTargetException {
        Object returnValue = params[params.length - 1];
        StringBuilder logStr = new StringBuilder();
        logStr.append(" ");
        logStr.append(logStackVO.getClassName());
        logStr.append(".");
        logStr.append(logStackVO.getMethodName());
        logStr.append("(");
        logStr.append(logStackVO.getFileName());
        logStr.append(":");
        logStr.append(logStackVO.getLineNumber());
        logStr.append(") | ");
        logStr.append(desc);
        logStr.append("\n\t");
        logStr.append(" | ");

        for(int i = 0; i < params.length - 1; ++i) {
            Object param = params[i];
            logStr.append(formatParamValues(param));
            logStr.append("\n\t");
        }

        logStr.append(formatReturnValues(returnValue));
        logStr.append("\n\t");
        logStr.append("************************************************************************************************************");
        return logStr.toString();
    }
}
