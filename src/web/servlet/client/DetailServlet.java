package web.servlet.client;

import domain.Comment;
import domain.Movie;
import service.CommentService;
import service.MovieService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(urlPatterns = "/detail.do")
public class DetailServlet extends HttpServlet {

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
        /*request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");*/

        // 得到电影名
        String movieid = request.getParameter("movieid");
        MovieService service = new MovieService();
        // 查找评论
        CommentService commentService = new CommentService();
        try {
            // 查找这部电影
            Movie movie = service.findMovieById(movieid);

            double score = commentService.findScoreByMovieId(movieid).getScore();

            movie.setScore((int) score);
            request.setAttribute("detail", movie);

        } catch (Exception e) {
            e.printStackTrace();

        }


        List<Comment> comments = null;
        try {
            comments = commentService.findCommentsByMovieId(movieid);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        request.setAttribute("comments", comments);

            request.setAttribute("commentsSize", (int) Math.ceil((double)comments.size() / 4));

        request.getRequestDispatcher("/detail.jsp").forward(request, response);
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
