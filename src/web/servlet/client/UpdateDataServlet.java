package web.servlet.client;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import domain.Movie;
import org.apache.log4j.Logger;
import service.MovieService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;


/**
 * 处理通过ajax传递过来的各种异步请求
 */
@WebServlet(urlPatterns = "/updateData")
public class UpdateDataServlet extends HttpServlet {
    static Logger logger = Logger.getLogger(UpdateDataServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");*/

        String nextPage = request.getParameter("page");
        int page = Integer.parseInt(nextPage);
        MovieService service = new MovieService();

        findMovieByPage(response, page, service);

    }


    private void findMovieByPage(HttpServletResponse response, int page, MovieService service) throws IOException {
        try {
            List<Movie> list = service.findMoviesByPage(page);
            int pageTotal = service.findAllMovies().size();
            outputToFront(response, list, pageTotal);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * 将数据传递给前端
     *
     * @param response  响应对象
     * @param list      输出的集合
     * @param pageTotal 符合查询结果的数量
     * @author
     */
    private void outputToFront(HttpServletResponse response, List<Movie> list, int pageTotal) throws IOException {
        System.out.println("PageTotal: " + pageTotal);
        JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(list));
        String result = jsonArray.toJSONString() + "|" + pageTotal;
        // 获取输出流
        PrintWriter writer = response.getWriter();
        writer.write(result);
        writer.close();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

}
