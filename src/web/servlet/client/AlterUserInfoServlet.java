package web.servlet.client;

import domain.User;
import org.apache.log4j.Logger;
import service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = "/alterUserInfo.do")
public class AlterUserInfoServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(AlterUserInfoServlet.class);
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        response.setCharacterEncoding("utf-8");*/
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("loginAndRegister.jsp");
        }
        // 获得要设置的新密码
        String introduce = request.getParameter("introduce");
        String password = request.getParameter("password");

        User user = (User) request.getSession().getAttribute("user");
        if (password != null && !"".equals(password)) {
            // 将这个新密码存到 User对象中
            user.setPassword(password);
        }
        if (introduce != null) {
            user.setIntroduce(introduce);
        }
        UserService service = new UserService();
        PrintWriter writer = response.getWriter();
        try {
            service.updateUser(user);
            writer.write("ok");

        } catch (Exception e) {
            e.printStackTrace();
            writer.write("false");
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
