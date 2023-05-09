package web.servlet.client;

import domain.Collection;
import domain.Movie;
import domain.User;
import service.CollectionService;
import service.MovieService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = "/collect")
public class UserCollectServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("loginAndRegister.jsp");
        }
        /*request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");*/

        CollectionService service = new CollectionService();
        MovieService movieService = new MovieService();
        User user = (User) request.getSession().getAttribute("user");

        List<Collection> collections;
        try {
            collections = service.findAllRecordByUserName(user.getUsername());
            List<Movie> collectMovies = new ArrayList<>();
            for (Collection c : collections) {
                collectMovies.add(movieService.findMovieById(String.valueOf(c.getMovieId())));
            }
            request.setAttribute("collects", collectMovies);
            request.getRequestDispatcher("userCollect.jsp").forward(request, response);
        } catch (SQLException e) {
            e.printStackTrace();

        }


    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
