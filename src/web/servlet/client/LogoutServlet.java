package web.servlet.client;

import utils.MySessionContext;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/logout.do")
public class LogoutServlet extends HttpServlet {

    /**
     * The doGet method of the servlet. <br>
     * <p>
     * This method is called when a form has its tag value method equals to get.
     *
     * @param request  the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException      if an error occurred
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 移除 map中的这个session对象
        MySessionContext.delSessionByNormalLogout(request.getSession());
        // 将用户从session中移除
        request.getSession().removeAttribute("user");
        request.getSession().removeAttribute("userId");
        request.getSession().removeAttribute("msg");
        request.getServletContext().removeAttribute("msg");
        // 从客户端删除自动登录 cookie
        Cookie cookie = new Cookie("autoLogin", "msg");
        cookie.setPath(request.getContextPath());
        // 设置 cookie有效时间为0，表示通知浏览器立即删除这个cookie
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        // 重新跳转到 main.jsp界面进行显示
        response.sendRedirect("main.do");
    }

    /**
     * The doPost method of the servlet. <br>
     * <p>
     * This method is called when a form has its tag value method equals to post.
     *
     * @param request  the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException      if an error occurred
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        doGet(request, response);
    }

}
