package web.servlet.client;

//import com.mysql.jdbc.StringUtils;
import com.mysql.cj.util.StringUtils;
import domain.Movie;
import service.SearchService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * @ClassName: SearchServlet.java
 * @Description: 处理电影搜索逻辑
 * @author:
 * @version: V1.0
 */
@WebServlet(urlPatterns = "/search.do")
public class SearchServlet extends HttpServlet {

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
        doPost(request, response);
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
        /*request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");*/

        String searchCondition = request.getParameter("search");
        if (StringUtils.isEmptyOrWhitespaceOnly(searchCondition)) {
            response.sendRedirect("main.do");
        } else {
            SearchService service = new SearchService();

            List<Movie> movies;
            try {
                movies = service.search(searchCondition);
                request.setAttribute("movies", movies);
                request.setAttribute("pageNumber", (int) Math.ceil((double) movies.size() / 12));
                request.getRequestDispatcher("/searchResult.jsp").forward(request, response);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }
    }

}
