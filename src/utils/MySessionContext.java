package utils;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName: MySessionContext
 * @Description: 存储 Session对象，用于用户的强制下线等待操作
 * @author:
 **/
public class MySessionContext {
    /**
     * userID--->userSession
     */
    private static Map<String, HttpSession> sessionMap = new HashMap<>();
    static Logger logger = Logger.getLogger(MySessionContext.class);

    /**
     * 增加 Session对象
     *
     * @param session 要添加的用户 Session对象
     * @author
     */
    public static synchronized void addSession(HttpSession session) {
        if (session != null) {
            sessionMap.put((String) session.getAttribute("userId"), session);
        }
    }

    /**
     * 账号在其它地方登录，挤掉线时，删除已登录的session,即非正常退出
     *
     * @param session 要删除的sesion
     * @author
     */
    public static synchronized void delSession(HttpSession session) {
        if (session != null) {
            try{
                String userId = (String) session.getAttribute("userId");
                if(userId != null && !"".equals(userId)){
                    //移出session
                    HttpSession session2 = sessionMap.remove(userId);
                    if (session2 != null) {
                        session2.setAttribute("msg", "你被踢下线！！！");
                    }
                }
            }catch (IllegalStateException e){
                // 如果发生了 Session already invalidated错误，不处理该错误
                e.printStackTrace();
            }
        }
    }

    /**
     * 正常退出时，删除 session
     *
     * @param session 要删除的session
     * @author
     */
    public static synchronized void delSessionByNormalLogout(HttpSession session) {
        if (session != null) {
            //移出session
            sessionMap.remove(session.getAttribute("userId"));
        }
    }

    public static synchronized HttpSession getSession(String userId) {
        if (userId == null) {
            return null;
        }
        return (HttpSession) sessionMap.get(userId);
    }

    public static Map<String, HttpSession> getMySessionMap() {
        return sessionMap;
    }

    public static boolean isExitSession(String userId) {
        return sessionMap.containsKey(userId);
    }

}
