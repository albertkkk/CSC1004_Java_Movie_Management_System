package dao;

import domain.Movie;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import utils.DataSourceUtils;

import java.sql.SQLException;
import java.util.List;

/**
 * @ClassName: MovieDao.java
 * @Description: TODO(处理与 allmovies表相关的操作)
 */
public class MovieDao {

    /**
     * @return 所有电影的集合
     * @Description: TODO(查找所有电影)
     */
    public List<Movie> findAllMovies() throws SQLException {
        String sql = "select * from allmovies;";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        return runner.query(sql, new BeanListHandler<>(Movie.class));
    }


    /**
     * @return 对应种类的电影
     */
    public List<Movie> findMoviesByPage(int page) throws SQLException {
       if(page==0)
       {
           String sql = "select * from allmovies limit 0,12";
           QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
           return runner.query(sql, new BeanListHandler<Movie>(Movie.class));
       }else {
           String sql = "select * from allmovies where limit ?, ?";
           Object[] params = new Object[]{(page - 1) * 12, (page * 12)};
           QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
           return runner.query(sql, new BeanListHandler<Movie>(Movie.class), params);
       }
    }


    /**
     * @param movie 被修改的电影
     * @Description: TODO(修改电影信息)
     */
    public void updateMovie(Movie movie, String originName) throws SQLException {
        String sql = "update allmovies set name=?, score=?, years=?, country=?, type=? where id = ?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        int row = runner.update(sql, movie.getName(), movie.getScore(), movie.getYears(), movie.getCountry(),
                movie.getType(), movie.getId());
    }


    /**
     * @param movie
     * @Description: TODO(添加电影)
     */
    public void addMovie(Movie movie) throws SQLException {
        String sql = "insert into allmovies (id,name, score, director, scriptwriter, actor, years, country, languages," +
                "length, image, des, url, type) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        runner.update(sql, movie.getId(), movie.getName(), movie.getScore(), movie.getDirector(), movie.getScriptwriter(),
                movie.getActor(), movie.getYears(), movie.getCountry(), movie.getLanguages(), movie.getLength(), movie.getImage(),
                movie.getDes(), movie.getUrl(), movie.getType());
    }

    /**
     * @param movieName 要删除电影的名字
     * @Description: TODO(根据电影名字删除电影)
     */
    public void deleteMovieByName(String movieName) throws SQLException {
        String sql = "delete from allmovies where id = ?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        runner.update(sql, movieName);
    }

    /**
     * @param condition 查找的条件
     * @return
     * @throws SQLException
     * @Description: 根据模糊电影名查找电影
     */
    public List<Movie> findMoviesByDimName(String condition) throws SQLException {
        String sql = "SELECT * FROM allmovies WHERE `name` like ?";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        return runner.query(sql, new BeanListHandler<Movie>(Movie.class), "%"+condition+"%");
    }

    /**
     * @param movieId 电影id
     * @return Movie
     * @throws SQLException
     * @Description: 根据电影id查找电影
     */
    public Movie findMovieByID(String movieId) throws SQLException {
        String sql = "select * from allmovies where id= ? limit 1";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        return runner.query(sql, new BeanHandler<Movie>(Movie.class), movieId);
    }

    /**
     * 得到最大的电影 id
     *
     * @return int
     * @author
     */
    public int getMaxMovieId() throws SQLException {
        String sql = "select id from allmovies ORDER BY id desc LIMIT 0,1";
        QueryRunner runner = new QueryRunner(DataSourceUtils.getDataSource());
        int count = (int) runner.query(sql, new ScalarHandler<>("id"));
        return count;
    }
}
