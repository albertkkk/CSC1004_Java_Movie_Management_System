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

@WebServlet(urlPatterns = "/register.do")
public class RegisterServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(RegisterServlet.class);
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
        String username  = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String gender = request.getParameter("gender");
        String address = request.getParameter("address");

        // 创建 UserService对象
        UserService service = new UserService();
        if(username != null){
            User user1 = null;
            try {
                // 查找数据库中是否存在同名用户
                user1 = service.findUserByUserName(username);
                if(user1 != null){
                    // 如果存在同名用户，则注册失败，提示用户名已存在
                    response.getWriter().write("注册失败！用户名已存在！");
                    throw new Exception("注册失败！用户名已存在！");
                }else{
                    // 如果不存在同名用户，则进行注册
                    response.getWriter().write("ok");
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(password);
                    user.setEmail(email);
                    user.setGender(gender);
                    user.setAddress(address);
                    // 注册用户
                    service.register(user);

                }
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("register_meesage", e.getMessage());
                request.getRequestDispatcher("loginAndRegister.jsp").forward(request, response);
            }
        }
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
