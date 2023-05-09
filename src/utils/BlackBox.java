package utils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @ClassName: UtilTest
 * @Description: 一个中间层，用在servlet和service，service和dao层之间
 * @author:
 **/
public class BlackBox {

    public static Object getData(String className, String methodName, Object... params) throws Exception {
        Class<?> cl = Class.forName(className);
        return getInfo(cl, methodName, params);
    }

    private static Object getInfo(Class<?> cl, String m, Object... params) throws IllegalAccessException, InstantiationException, InvocationTargetException, NoSuchMethodException {
        Method[] methods = cl.getDeclaredMethods();
        for (Method method :
                methods) {
            String name = method.getName();
            if (name.equals(m)) {
                return method.invoke(cl.getDeclaredConstructor().newInstance(), (Object) params);
            }
        }
        return null;
    }

}
