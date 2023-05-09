package web.servlet.management;

import service.MovieService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/movieManagement")
public class MovieManagementServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       /* request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");*/
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("loginAndRegister.jsp");
        }
        MovieService service = new MovieService();
        try {
            request.setAttribute("allMovies", service.findAllMovies());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        request.getRequestDispatcher("/management/movieManagement.jsp").forward(request, response);

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
