package service;

import dao.MovieDao;
import domain.Movie;

import java.sql.SQLException;
import java.util.List;

/**
 * @ClassName: MovieService.java
 * @Description: 与电影相关的业务逻辑处理
 * @author:
 */
public class MovieService {
    private MovieDao dao = new MovieDao();

    /**
     * @return
     * @Description: TODO(获取所有电影)
     */
    public List<Movie> findAllMovies() throws SQLException {
        return dao.findAllMovies();
    }

    /**
     * @return 电影集合
     * @Description: 获取对应种类的12部电影
     */
    public List<Movie> findMoviesByPage(int page) throws SQLException {
        return dao.findMoviesByPage(page);
    }

    /**
     * @param movie 被添加的电影
     */
    public void addMovie(Movie movie) throws SQLException {
        dao.addMovie(movie);
    }

    /**
     * @param movieId 要被删除电影的电影名
     */
    public void deleteMovieById(String movieId) throws SQLException {
        dao.deleteMovieByName(movieId);
    }

    /**
     * @param movie 被更新的电影
     */
    public void updateMovie(Movie movie, String originName) throws SQLException {
        dao.updateMovie(movie, originName);
    }

    /**
     * 根据电影id查找电影
     *
     * @param movieId 电影id
     * @return domain.Movie
     */
    public Movie findMovieById(String movieId) throws SQLException {
        return dao.findMovieByID(movieId);
    }

    /**
     * 得到电影的所有数量
     *
     * @return int
     * @author
     */
    public int getMaxMovieId() throws SQLException {
        return dao.getMaxMovieId();
    }
}
