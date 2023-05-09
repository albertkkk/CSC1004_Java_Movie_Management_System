package web.servlet.client;

import domain.Comment;
import domain.User;
import org.apache.log4j.Logger;
import service.CommentService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/comment.do")
public class CommentServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(CommentServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");*/

        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("loginAndRegister.jsp");
        }

        String description = request.getParameter("description");
        int score = Integer.valueOf(request.getParameter("score"));
        String movieId = request.getParameter("movieId");
        User user = (User) request.getSession().getAttribute("user");
        PrintWriter writer = response.getWriter();


        Comment comment = new Comment();
        comment.setScore(score);
        comment.setMovieId(Integer.valueOf(movieId));
        comment.setDescription(description);
        comment.setUserName(user.getUsername());

        CommentService service = new CommentService();
        try {
            service.addComment(comment);
            writer.write("ok");
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        doPost(request, response);
    }
}
